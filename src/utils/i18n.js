import i18n from '@/lang'

export function buildAcceptLanguage(locale) {
  const lang = locale.split('-')[0]
  return `${locale},${lang};q=0.9`
}

export function translateRouteTitle(meta = {}) {
  if (meta.titleKey && i18n.te(meta.titleKey)) {
    return i18n.t(meta.titleKey)
  }
  if (meta.name) {
    const key = `route.${meta.name}`
    if (i18n.te(key)) {
      return i18n.t(key)
    }
  }
  return meta.title || ''
}
