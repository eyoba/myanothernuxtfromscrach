import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      data(state, value) {
        state.data = value
      }
    }
  })
}

export default createStore
