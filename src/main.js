import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlaneSlash, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faWpforms} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlaneSlash, faCheck, faTrashAlt, faTwitter, faWpforms )

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app = ''

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
