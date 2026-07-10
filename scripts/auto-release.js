import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJsonPath = join(__dirname, '..', 'package.json')

// package.json에서 version 읽기
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
const version = packageJson.version
const tagName = `v${version}`

console.log(`${tagName} version 배포시작!`)

try {
  // 0. CHANGELOG 생성 (마지막 태그 이후 커밋 기준) 및 커밋
  console.log(`📝 Generating CHANGELOG...`)
  execSync('node scripts/update-changelog.js', { stdio: 'inherit' })

  const changelogDirty = execSync('git status --porcelain CHANGELOG.md', { encoding: 'utf-8' }).trim()
  if (changelogDirty) {
    console.log(`📝 Committing CHANGELOG...`)
    execSync('git add CHANGELOG.md', { stdio: 'inherit' })
    execSync(`git commit -m "docs: v${version} CHANGELOG 갱신"`, { stdio: 'inherit' })
  }

  // 1. 빌드 실행
  console.log(`🔨 Building project...`)
  execSync('npx pnpm run build', { stdio: 'inherit' })

  // 2. Git tag 생성
  console.log(`📌 Creating git tag: ${tagName}`)
  execSync(`git tag ${tagName}`, { stdio: 'inherit' })

  // 3. Git push origin branch + tag
  console.log(`📤 Pushing branch and tag to origin: ${tagName}`)
  execSync('git push origin HEAD', { stdio: 'inherit' })
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' })

  // 4. npm publish
  console.log(`📦 Publishing to npm...`)
  execSync('npm publish', { stdio: 'inherit' })

  console.log(`✅ Successfully released ${version}!`)
} catch (error) {
  console.error(`❌ Release failed:`, error.message)
  globalThis.process.exit(1)
}
