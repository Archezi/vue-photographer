import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      navOpen: false,
      title: 'test title',
      sliderView: true,
      gridView: false
    }
  },
  mutations: {
    toggleNav(state) {
      state.navOpen = !state.navOpen
    },
    toggleSliderView(state) {
      state.sliderView = !state.sliderView
      state.gridView = !state.gridView
    },
    toggleGridView(state) {
      state.gridView = !state.gridView
      state.sliderView = !state.sliderView
    }
  },
  actions: {},
  getters: {}
})

export default store
