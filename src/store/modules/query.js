/**
 *
 * store to holds queries state 
 *
 */
import axios from 'axios'

const state = {
  queries: [],
  query: {}
}
 
const actions = {
  async loadQueries({ commit }, active) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      let queries = await axios({
        method: 'get',
        url: process.env.VUE_APP_API_QUERIES,
        params: {
          active: active
        }  
      }) 
      commit('SET_QUERIES', queries.data)
      if (!queries.data.length) {
        commit('SET_MESSAGE', {'type': 'error', 'content': 'There is no queries.'})
      }
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  showTickets({commit},query){
    commit( 'SET_QUERY' , query )
  },

  async activeQuery({ commit, rootGetters }, query){
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await axios({
        method: 'patch',
        url: `${process.env.VUE_APP_API_QUERIES}/${query.id}`,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}` },
        data: {active: !query.data.active}
      }) 
      commit( 'ACTIVE_QUERY' , query )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },

  async deleteQuery({ commit, rootGetters },id) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await axios({
        method: 'delete',
        url: `${process.env.VUE_APP_API_QUERIES}/${id}`,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}` }
      }) 
      commit( 'DELETE_QUERY', id )
      commit( 'SET_QUERY' , {data:{tickets:[]}} )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },

  async deleteTicket({ commit, rootGetters },params) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    let [queryId, ticket] = params
    try {
      // await axios.delete(`${process.env.VUE_APP_API_QUERIES}/${queryId}/ticket/${ticket.quoteId}`, {data: ticket})
      await axios({
        method: 'delete',
        url: `${process.env.VUE_APP_API_QUERIES}/${queryId}/ticket/${ticket.quoteId}`,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}` },
        data: ticket 
        }) 
      commit( 'DELETE_TICKET', ticket.quoteId )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  }

}

const mutations = {
  SET_QUERIES (state, queries) {
    state.queries = queries
  },
  SET_QUERY (state, query) {
    state.query = query
  },
  ACTIVE_QUERY (state, query) {
    // state.queries.forEach(q => {
    //   if (q.id === query.id) q.data.active = !query.data.active
    // })
    state.queries = state.queries.map(q => q.id !== query.id ? q: {...q, data : {...q.data, active: !q.data.active}})
  },
  DELETE_QUERY (state, id) {
    state.queries = state.queries.filter(data => data.id !== id )
  },
  DELETE_TICKET (state, ticketId) {
    state.query.data.tickets = state.query.data.tickets.filter(t => t.quoteId !== ticketId )
  },
}

const getters = {
  getQueries (state) {
    if (state.queries.length !== 0) {
      return state.queries
    }
  },
  getQuery (state) {
    return state.query
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
