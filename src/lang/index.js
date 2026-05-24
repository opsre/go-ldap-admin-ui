import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'
import elementEnUS from 'element-ui/lib/locale/lang/en'
import elementJaJP from 'element-ui/lib/locale/lang/ja'
import elementEsES from 'element-ui/lib/locale/lang/es'
import elementKoKR from 'element-ui/lib/locale/lang/ko'

import zhCN from './zh-CN'
import enUS from './en-US'
import jaJP from './ja-JP'
import esES from './es-ES'
import koKR from './ko-KR'

Vue.use(VueI18n)

export const LocaleKey = 'locale'
export const DefaultLocale = 'zh-CN'
export const SupportedLocales = ['zh-CN', 'en-US', 'ja-JP', 'es-ES', 'ko-KR']

export const localeOptions = [
  { value: 'zh-CN', labelKey: 'locale.zhCN' },
  { value: 'en-US', labelKey: 'locale.enUS' },
  { value: 'ja-JP', labelKey: 'locale.jaJP' },
  { value: 'es-ES', labelKey: 'locale.esES' },
  { value: 'ko-KR', labelKey: 'locale.koKR' }
]

export function normalizeLocale(locale) {
  if (!locale) return DefaultLocale
  const normalized = locale.replace('_', '-')
  if (SupportedLocales.includes(normalized)) return normalized
  const lang = normalized.split('-')[0]
  return SupportedLocales.find(item => item.startsWith(`${lang}-`)) || DefaultLocale
}

export function getLocale() {
  return normalizeLocale(Cookies.get(LocaleKey) || window.navigator.language)
}

export function setLocale(locale) {
  const normalized = normalizeLocale(locale)
  Cookies.set(LocaleKey, normalized)
  i18n.locale = normalized
  return normalized
}

const messages = {
  'zh-CN': { ...zhCN, ...elementZhCN },
  'en-US': { ...enUS, ...elementEnUS },
  'ja-JP': { ...jaJP, ...elementJaJP },
  'es-ES': { ...esES, ...elementEsES },
  'ko-KR': { ...koKR, ...elementKoKR }
}

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: DefaultLocale,
  silentTranslationWarn: true,
  messages
})

export default i18n
