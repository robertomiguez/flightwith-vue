const state = {
  message: {type: null, content: null},
  loading: false
}


const actions = {
  updateMessage({commit}, message) {
    commit('SET_MESSAGE', message)
  }  
}

const mutations = {
  SET_MESSAGE (state, payload) {
    state.message = payload
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}

const getters = {
  getMessage (state) {
    return state.message
  },
  getLoading (state) {
    return state.loading
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
