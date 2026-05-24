import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { getLocale, setLocale } from '@/lang'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  locale: getLocale()
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_LOCALE: (state, locale) => {
    state.locale = setLocale(locale)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  setLocale({ commit }, locale) {
    commit('SET_LOCALE', locale)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
