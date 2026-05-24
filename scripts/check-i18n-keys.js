const fs = require('fs')
const path = require('path')

const locales = ['zh-CN', 'en-US', 'ja-JP', 'es-ES', 'ko-KR']
const migratedVueFiles = [
  'src/views/login/index.vue',
  'src/views/changePassword/index.vue',
  'src/views/error-page/401.vue',
  'src/views/error-page/404.vue',
  'src/layout/components/Navbar.vue',
  'src/layout/components/Sidebar/Item.vue',
  'src/layout/components/Sidebar/SidebarItem.vue',
  'src/layout/components/TagsView/index.vue',
  'src/components/Breadcrumb/index.vue',
  'src/components/LangSelect/index.vue',
  'src/views/personnel/user/index.vue',
  'src/views/personnel/group/index.vue',
  'src/views/system/api/index.vue',
  'src/views/system/menu/index.vue',
  'src/views/system/role/index.vue',
  'src/views/log/operation-log/index.vue',
  'src/views/groupUser/userList/index.vue',
  'src/views/profile/components/UserCard.vue',
  'src/views/personnel/fieldRelation/index.vue',
  'src/components/IconSelect/index.vue',
  'src/components/Upload/SingleImage.vue',
  'src/components/Upload/SingleImage2.vue',
  'src/components/Upload/SingleImage3.vue'
]

function parseLocale(locale) {
  const file = path.join(__dirname, '..', 'src', 'lang', `${locale}.js`)
  const source = fs.readFileSync(file, 'utf8')
  const jsonLike = source
    .replace(/^export default\s*/, '')
    .replace(/,\s*([}\]])/g, '$1')

  // Locale files are static object literals owned by this project.
  // Evaluating them here keeps the check dependency-free for Vue CLI 4.
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${jsonLike});`)()
}

function flatten(prefix, value, out) {
  Object.keys(value).sort().forEach(key => {
    const next = prefix ? `${prefix}.${key}` : key
    if (value[key] && typeof value[key] === 'object' && !Array.isArray(value[key])) {
      flatten(next, value[key], out)
    } else {
      out.push(next)
    }
  })
}

function keysOf(locale) {
  const data = parseLocale(locale)
  const keys = []
  flatten('', data, keys)
  return keys
}

const base = keysOf('zh-CN')
let failed = false

locales.filter(locale => locale !== 'zh-CN').forEach(locale => {
  const keys = keysOf(locale)
  const missing = base.filter(key => !keys.includes(key))
  const extra = keys.filter(key => !base.includes(key))
  if (missing.length || extra.length) {
    failed = true
    console.error(`${locale} key mismatch`)
    if (missing.length) console.error(`  missing: ${missing.join(', ')}`)
    if (extra.length) console.error(`  extra: ${extra.join(', ')}`)
  }
})

if (failed) {
  process.exit(1)
}

function stripVueNonRuntimeText(source) {
  return source
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
}

migratedVueFiles.forEach(file => {
  const abs = path.join(__dirname, '..', file)
  const source = stripVueNonRuntimeText(fs.readFileSync(abs, 'utf8'))
  const chineseLines = source
    .split('\n')
    .map((line, index) => ({ line: line.trim(), index: index + 1 }))
    .filter(item => /[\u4e00-\u9fff]/.test(item.line))

  if (chineseLines.length) {
    failed = true
    console.error(`${file} still contains untranslated Chinese runtime text`)
    chineseLines.forEach(item => {
      console.error(`  ${item.index}: ${item.line}`)
    })
  }
})

if (failed) {
  process.exit(1)
}

console.log('frontend i18n keys are complete')
