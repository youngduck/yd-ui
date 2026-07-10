#!/usr/bin/env node
/**
 * CHANGELOG 자동 생성 스크립트 (릴리스 시점 실행)
 *
 * 마지막 릴리스 태그 이후의 커밋 메시지를 타입별로 분류해
 * package.json 버전의 새 섹션을 CHANGELOG 맨 위에 생성합니다.
 * 같은 버전 섹션이 이미 있으면 통째로 재생성(교체)하므로 여러 번 실행해도 안전합니다.
 *
 * 사용법:
 *   npm run changelog              # CHANGELOG.md 갱신
 *   npm run changelog -- --dry-run # 파일 수정 없이 생성 결과 미리보기
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = path.join(__dirname, "..", "CHANGELOG.md");
const PACKAGE_JSON_PATH = path.join(__dirname, "..", "package.json");

// 커밋 메시지 타입을 CHANGELOG 섹션으로 매핑
const TYPE_TO_SECTION = {
  feat: "추가",
  fix: "수정",
  refactor: "변경",
  style: "변경",
  chore: "변경",
  docs: "변경",
  test: "변경",
  perf: "변경",
  ci: "변경",
  build: "변경",
  revert: "제거",
};

const SECTION_ORDER = ["추가", "수정", "변경", "제거"];

const COMMIT_PATTERN = /^(feat|fix|refactor|style|docs|test|chore|perf|ci|build|revert)(\(.+\))?:\s*(.+)$/;

function sh(command) {
  return execSync(command, { encoding: "utf-8" }).trim();
}

/** 마지막 릴리스 태그. 없으면 null (전체 이력 대상) */
function getLastTag() {
  try {
    return sh("git describe --tags --abbrev=0");
  } catch {
    return null;
  }
}

/** 태그 이후 커밋 메시지 목록 (머지 커밋 제외, 오래된 순) */
function getCommitMessages(lastTag) {
  const range = lastTag ? `${lastTag}..HEAD` : "HEAD";
  const raw = sh(`git log ${range} --pretty=%s --no-merges --reverse`);
  return raw === "" ? [] : raw.split("\n");
}

/** 커밋 메시지들을 섹션별로 분류. 형식이 안 맞는 메시지는 건너뛰고 경고 */
function groupBySection(messages) {
  const sections = Object.fromEntries(SECTION_ORDER.map((name) => [name, []]));
  const skipped = [];

  for (const message of messages) {
    const match = message.match(COMMIT_PATTERN);
    if (!match) {
      skipped.push(message);
      continue;
    }
    const [, type, , content] = match;
    sections[TYPE_TO_SECTION[type]].push(`- ${type}: ${content.trim()}`);
  }

  return { sections, skipped };
}

/** 새 버전 섹션 마크다운 생성 */
function buildVersionSection(version, sections) {
  const date = new Date().toISOString().slice(0, 10);
  const branch = sh("git rev-parse --abbrev-ref HEAD");

  const lines = [`## [${version}] - ${date}`, "", `**Branch**: \`${branch}\``];
  for (const name of SECTION_ORDER) {
    lines.push(`### ${name}`);
    lines.push(...sections[name]);
    lines.push("");
  }
  lines.push("---");
  return lines.join("\n");
}

/** CHANGELOG에 버전 섹션 삽입. 같은 버전 섹션이 있으면 교체, 없으면 맨 위에 추가 */
function upsertVersionSection(changelog, version, newSection) {
  const lines = changelog.split("\n");
  const isVersionHeading = (line) => /^## \[\d+\.\d+\.\d+\]/.test(line);

  const start = lines.findIndex((line) => line.startsWith(`## [${version}]`));
  if (start === -1) {
    return `${newSection}\n${changelog}`;
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (isVersionHeading(lines[i])) {
      end = i;
      break;
    }
  }
  return [...lines.slice(0, start), newSection, ...lines.slice(end)].join("\n");
}

function main() {
  const dryRun = process.argv.includes("--dry-run");

  const { version } = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
  const lastTag = getLastTag();

  // 버전 미범프 가드: 이대로 진행하면 직전 릴리스 섹션을 덮어쓰게 됨
  if (lastTag === `v${version}`) {
    console.error(`❌ package.json 버전(${version})이 마지막 태그(${lastTag})와 같습니다. 버전을 먼저 올려주세요.`);
    process.exit(1);
  }

  const messages = getCommitMessages(lastTag);

  if (messages.length === 0) {
    console.log(`ℹ️ ${lastTag ?? "시작"} 이후 커밋이 없어 CHANGELOG를 생성하지 않습니다.`);
    return;
  }

  const { sections, skipped } = groupBySection(messages);
  const newSection = buildVersionSection(version, sections);

  if (skipped.length > 0) {
    console.warn(`⚠️ 형식이 맞지 않아 건너뛴 커밋 ${skipped.length}건:`);
    for (const message of skipped) console.warn(`   - ${message}`);
  }

  if (dryRun) {
    console.log(`\n📋 [dry-run] ${lastTag ?? "전체 이력"} 이후 ${messages.length}개 커밋 기준 생성 결과:\n`);
    console.log(newSection);
    return;
  }

  const changelog = fs.readFileSync(CHANGELOG_PATH, "utf-8");
  fs.writeFileSync(CHANGELOG_PATH, upsertVersionSection(changelog, version, newSection), "utf-8");
  console.log(`✅ CHANGELOG 업데이트 완료: [${version}] 섹션 생성 (커밋 ${messages.length - skipped.length}건 반영)`);
}

main();
