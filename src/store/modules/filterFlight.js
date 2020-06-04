/**
 *
 * store to holds filter flights state 
 * this store works with only one document called 'unique'
 * instead of one document per filter, we have only one document with map per filter.
 * cut costs on readings in firestore
 *
 */
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const state = {
  filters: []
}
 
const actions = {

  async loadFilterFlights( { commit, rootGetters } ) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      const filters = await axios({
        method: 'get',
        url: process.env.VUE_APP_API_FILTER_FLIGHTS,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}` }
      }) 
      commit('SET_FILTER_FLIGHTS', filters.data)
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },

  async addFilterFlight({ commit, rootGetters }, flight) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    flight.flightId = uuidv4()
    
    const verifyCallAPI = (arrayObj,arrayName) =>{
      if (!arrayObj) {
        commit('SET_LOADING', false)
        throw new Error(`the result of ${arrayName} API is empty .`)
      }
    }
    
    const fillPlace = async (leg) => {
      let places = await axios.get(`${process.env.VUE_APP_API_PLACES}/${flight.country}/${flight.currency}/${flight.locale}`, 
      {
        params: {
          query: flight.route[`${leg}City`] 
        }
      })
      verifyCallAPI(places.data.body.Places,'Places');   
      ({PlaceId: flight.route[`${leg}Place`] , CountryName: flight.route[`${leg}Country`] } = places.data.body.Places[0])
    }

    const fillCurrency = async () => {
      let currencies = await axios.get(`${process.env.VUE_APP_API_CURRENCIES}`)
      verifyCallAPI(currencies.data.body.Currencies,'Currencies');
      let currency = currencies.data.body.Currencies.find(currency=>currency.Code===flight.currency)
      flight.currencySymbol = currency.Symbol
    }

    try {
      await Promise.all([fillPlace('origin'),fillPlace('destination'),fillCurrency()])
      //only one document 'unique' so add to array of objects
      await axios({
        method: 'post',
        url: process.env.VUE_APP_API_FILTER_FLIGHTS,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}`},
        data: flight
        }) 
       commit( 'ADD_FILTER_FLIGHT' , flight )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async activeFilterFlight({ commit, rootGetters },flight){
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await axios({
        method: 'patch',
        url: `${process.env.VUE_APP_API_FILTER_FLIGHTS}/active`,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}`},
        data: flight
      }) 
      commit( 'ACTIVE_FILTER_FLIGHT' , flight )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async delFilterFlight({ commit, rootGetters },flight) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await axios({
        method: 'delete',
        url: process.env.VUE_APP_API_FILTER_FLIGHTS,
        headers: { 'Authorization': `Bearer ${rootGetters.getUser.token}`}, 
        data: flight
      }) 
    commit( 'DELETE_FILTER_FLIGHT' , flight )
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  }
}

const mutations = {
  SET_FILTER_FLIGHTS (state, filters) {
    state.filters = filters
  },
  ADD_FILTER_FLIGHT (state, flight) {
    state.filters[0].data.flights.unshift(flight)
  },
  ACTIVE_FILTER_FLIGHT (state, flight) {
    state.filters[0].data.flights = state.filters[0].data.flights.map(f => f.flightId !== flight.flightId ? f: {...f, active: !f.active})
  },
  DELETE_FILTER_FLIGHT (state, flight) {
    state.filters[0].data.flights = state.filters[0].data.flights.filter(f => f.flightId !== flight.flightId )
  }
}

const getters = {
  getFilterFlights (state) {
    if (state.filters.length !== 0) {
      return state.filters
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
