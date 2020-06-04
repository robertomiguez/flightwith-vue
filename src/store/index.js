import Vuex from 'vuex'
import Vue from 'vue'
import query from './modules/query'
import login from './modules/login'
import filterFlight from './modules/filterFlight'
import generic from './modules/generic'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        query,
        login,
        filterFlight,
        generic
    }
})