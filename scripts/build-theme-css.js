#!/usr/bin/env node
/**
 * YD-UI를 쓰는 프로젝트에서 불러올 테마 파일(dist/theme.css)을 만든다. Rollup 빌드 후 실행한다.
 *
 * 프로젝트의 CSS 파일에 아래 세 줄을 추가한다.
 *   @import "tailwindcss";
 *   @import "@youngduck/yd-ui/theme.css";   ← 이 파일
 *   @import "@youngduck/yd-ui/styles";      ← dist/index.css (토큰 :root 변수 + 컴포넌트 CSS)
 *
 * - @theme reference: 색·간격 이름만 Tailwind 에 등록한다. 변수 값은 dist/index.css 가 이미 내보내므로 중복 출력하지 않는다.
 * - @source "./*.js": 프로젝트의 Tailwind가 배포된 JS를 읽고 컴포넌트에 필요한 클래스(SelectBox의 flex 등)를 생성한다.
 * 프로젝트에서 여러 CSS 파일을 따로 불러올 필요가 없도록 한 파일로 합친다.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STYLES_DIR = path.join(__dirname, "..", "src", "styles");
const OUTPUT_PATH = path.join(__dirname, "..", "dist", "theme.css");

const read = (name) => fs.readFileSync(path.join(STYLES_DIR, name), "utf-8").trim();

const toReference = (css, name) => {
  if (!css.includes("@theme {")) {
    throw new Error(`${name} 에서 '@theme {' 를 찾지 못했습니다. 토큰 파일 구조가 바뀌었다면 이 스크립트도 고쳐야 합니다.`);
  }
  return css.replaceAll("@theme {", "@theme reference {");
};

const output = [
  "/* @youngduck/yd-ui Tailwind 테마 — scripts/build-theme-css.js 가 생성한 파일입니다. 직접 수정하지 마세요. */",
  toReference(read("token.primitive.css"), "token.primitive.css"),
  toReference(read("token.semantic.css"), "token.semantic.css"),
  read("token.utilities.css"),
  '@source "./*.js";',
].join("\n\n");

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${output}\n`);
console.log(`✅ ${path.relative(process.cwd(), OUTPUT_PATH)} 생성`);
