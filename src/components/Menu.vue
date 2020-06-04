<template>
  <div id="menu">
    <div id="header">
      <div id="nav">
        <router-link :to="{name: 'landing'}" exact>
          <img class="logo" src="../assets/logo.png" alt="logo">
        </router-link>
        <router-link v-show=!user.emailVerified :to="{name: 'login'}">login</router-link>
        <a v-show=user.emailVerified href="javascript:void(0);" @click="logout">logout</a>
        <!-- <label class="listbox">London</label> -->
        <router-link v-show=user.admin :to="{name: 'grant'}">Grant</router-link>
        <router-link v-show=user.admin :to="{name: 'filterflight'}">Filter flight</router-link>
        <router-link v-show=user.admin :to="{name: 'query'}">Query</router-link>
        <label class="user" v-show='user.emailVerified'> {{ user.email }} </label>
        <router-link v-show=user.emailVerified :to="{name: 'profile'}" exact>
          <img class="user-image" src="../assets/user-white.png" alt="logo">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions([
      'userSignOut'
    ]),
    logout: function() {
      if (this.loading) return
      this.userSignOut()
    }
  }
  
}
</script>

<style scoped>
#menu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #606cee;
}

#header {
  margin: 0px auto;
  padding: 15px;
  background-color: #606cee;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  position: fixed;
  z-index: 999;
}

#header #nav {
  max-width: 100%;
  min-width: 250px;
  box-sizing: border-box;
  margin: 0px auto;
}

#header #nav a {
  margin-right: 1.9em;
  color: #fff;
  text-decoration: none;
  letter-spacing: .070em;
  font-size: 12px;
}

#header #nav a.router-link-exact-active {
  color: #fff;
}

#header #nav .logo {
  width: 24px;
  display: inline-block;
  vertical-align: middle;
}

#header #nav .user-image {
  width: 24px;
  vertical-align: middle;
  float: right;
}

.user {
  font-size: 10px;
  float: right;
  padding: 7px;
  letter-spacing: 0.5px;
  color: #fff;
}

</style>
