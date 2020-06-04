import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index.js'
// import store from './store/modules/login.js'
// import firebase from 'firebase/app'
// import 'firebase/auth';

import Landing from './views/Landing'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Profile from './views/Profile'
import AdmFilterFlight from './views/adm/AdmFilterFlight'
import QueryDetail from './views/QueryDetail'
import NotFound from './views/NotFound'
import AdmQuery from './views/adm/AdmQuery'
import AdmGrantPrivileges from './views/adm/AdmGrantPrivileges'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    { 
      path: '*',
      redirect: { name: 'NotFound' }
    },
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/queryDetail/:queryId',
      name: 'queryDetail',
      component: QueryDetail,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/filterflight',
      name: 'filterflight',
      component: AdmFilterFlight,
      beforeEnter: (to, from, next) => store.getters.getUser.admin ? next() : next('login'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/query',
      name: 'query',
      component: AdmQuery,
      beforeEnter: (to, from, next) => store.getters.getUser.admin ? next() : next('login'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/grant',
      name: 'grant',
      component: AdmGrantPrivileges,
      beforeEnter: (to, from, next) => store.getters.getUser.admin ? next() : next('login'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const emailVerified = store.getters.getUser.emailVerified
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if ( requiresAuth && !emailVerified ) next('login')
  else next()
})

export default router
