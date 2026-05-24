import defaultSettings from '@/settings'
import { translateRouteTitle } from '@/utils/i18n'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle, meta) {
  const translatedTitle = meta ? translateRouteTitle(meta) : pageTitle
  if (translatedTitle) {
    return `${translatedTitle} - ${title}`
  }
  return `${title}`
}
