import firebase from 'firebase/app'
import 'firebase/auth'
import router from '../../router'
import axios from 'axios'

const state = {
  user: {
    email: null,
    emailVerified: false,
    admin: false,
    token: null
  }
}
 
const actions = {
  async userSignUp ({ commit }, user) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      if (user.password !== user.passwordConfirm) throw new Error('Passwords don\'t match.')
      let firebaseUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      if (firebaseUser) {
        commit('SET_USER',  {email: null, emailVerified: false, admin: false, token: null})
        commit('SET_MESSAGE', {'type': 'info', 'content': `Please, verify your email (${firebaseUser.user.email}), confirm your subscription and login below.`})
        await firebase.auth().currentUser.sendEmailVerification()
        router.replace('login')
      }
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'warning', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },

  async userSignIn ({ commit }, user) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      if (!user.email || !user.password) throw new Error('Fill Email and Password.')
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      let firebaseUser = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      if (firebaseUser || firebaseUser.user.emailVerified) {
          const idTokenResult = await firebase.auth().currentUser.getIdTokenResult()
          const token = await firebase.auth().currentUser.getIdToken()
          commit('SET_USER',  {email: firebaseUser.user.email, emailVerified: true, admin: idTokenResult.claims.admin, token: token})
          router.replace('/')
      } else {
        commit('SET_MESSAGE', {'type': 'info', 'content': 'Please, verify your email, confirm your subscription and login below.'})
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found': // I didn't like the original message :(
          commit('SET_MESSAGE', {'type': 'error', 'content': `That account doesn’t exist. Enter a different account or create a new one. `})
          break;
        default:
          commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
          break;
      }
    }
    commit('SET_LOADING', false)
  },
  
  async userGoogleSignIn ({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      const provider = new firebase.auth.GoogleAuthProvider()
      let firebaseUser = await firebase.auth().signInWithPopup(provider)
      if (firebaseUser) {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult()
        const token = await firebase.auth().currentUser.getIdToken()
        commit('SET_USER',  {email: firebaseUser.user.email, emailVerified: true, admin: idTokenResult.claims.admin, token: token})
        router.replace('/')
      }
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async userSignOut ({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await firebase.auth().signOut()
      commit('SET_USER',  {email: null, emailVerified: false, admin: false, token: null})
      router.push({ name: 'landing'}).catch(()=> {}) //avoid NavigationDuplicated error
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async userDelete ({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      await firebase.auth().currentUser.delete()
      commit('SET_USER',  {email: null, emailVerified: false, admin: false, token: null})
      router.replace('/')
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async userResetPassword ({commit}, user) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      if (!user.email) throw new Error('Enter a valid email to reset your password.')
      await firebase.auth().sendPasswordResetEmail(user.email)
      commit('SET_MESSAGE', {'type': 'info', 'content': `Please, verify your email (${user.email}), reset your password and login below.`})
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  },
  
  async userGrantAdministrator ({commit}, email) {
    commit('SET_LOADING', true)
    commit('SET_MESSAGE', {type: null, content: null})
    try {
      if (!email) throw new Error('Enter a valid email to grant administrator privileges.')
      const res = await axios({
        method: 'patch',
        url: `${process.env.VUE_APP_API_LOGIN}/grant/admin/${email}`,
        headers: { 'Authorization': `Bearer ${state.user.token}` }
      }) 
      commit('SET_MESSAGE', {'type': 'info', 'content': res.data.message})
    } catch (error) {
      commit('SET_MESSAGE', {'type': 'error', 'content': error.message})
    }
    commit('SET_LOADING', false)
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

const getters = {
  getUser (state) {
    return state.user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
