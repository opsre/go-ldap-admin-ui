import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PanelGroup from '@/views/dashboard/components/PanelGroup.vue'
import { getDash } from '@/api/dashboards/dashboard'

jest.mock('@/api/dashboards/dashboard', () => ({
  getDash: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('Dashboard PanelGroup.vue', () => {
  beforeEach(() => {
    getDash.mockResolvedValue({ data: [] })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('reloads dashboard data when locale changes', async() => {
    const store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state: {
            locale: 'zh-CN'
          },
          mutations: {
            SET_LOCALE(state, locale) {
              state.locale = locale
            }
          }
        }
      },
      getters: {
        locale: state => state.settings.locale
      }
    })

    shallowMount(PanelGroup, {
      localVue,
      store,
      stubs: ['count-to', 'svg-icon', 'el-row', 'el-col']
    })
    await flushPromises()

    store.commit('settings/SET_LOCALE', 'en-US')
    await flushPromises()

    expect(getDash).toHaveBeenCalledTimes(2)
  })
})
