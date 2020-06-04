<template>
  <div class="login">
    <h3>Sign In </h3>
    <Message/>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <span class="c_button"><a class='button' :class="{blue: !loading, grey: loading, disabled: loading }" href="javascript:void(0);" @click="login">Sign In</a></span>
    <div class="link">
      <a href="javascript:void(0);" @click="reset">Forgot your password?</a>
    </div>
    <div class="link">
      No account? <router-link :to="{name: 'signup'}">Create one!</router-link>
    </div>
    <hr>
    <div class="social">
      or Sign In with Google <br>
      <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../assets/google-logo.png">
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Message from '../components/Message'
  
  export default {
    name: 'Login',
    components: {
      Message
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([
        'userSignIn',
        'userGoogleSignIn',
        'userResetPassword',
        'updateMessage'
      ]),
      login: function(){
        if (this.loading) return
        this.userSignIn({ email: this.email, password: this.password })
      },
      socialLogin() {
        if (this.loading) return
        this.userGoogleSignIn()
      },
      reset: function(){
        if (this.loading) return
        this.userResetPassword({ email: this.email })
      },
    },
    beforeDestroy () {
      this.updateMessage({type: null, content: null})
    },
    computed: 
      mapGetters({
        loading: 'getLoading'
      }) 
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    position: relative;
    width: 300px;
    height: auto;
    padding: 20px;
    margin: 70px auto;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.171);
  }
  input {
    margin: 10px 0;
    padding: 15px;
  }
  .link {
    margin: 10px 0px 0px 0px;
    font-size: 14px;
  }
  hr {
    margin: 25px 0px;
  }
  .c_button {
    padding-left: 0px;
  }
  .button {
    text-align: center;
    text-decoration: none;
    font: 12px/25px Arial, sans-serif;
    padding: 3px 20px;
    text-shadow: 1px 1px 1px rgba(255,255,255, .22);

    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;

    -webkit-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
    -moz-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
    box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);

    -webkit-transition: all 0.15s ease;
    -moz-transition: all 0.15s ease;
    -o-transition: all 0.15s ease;
    -ms-transition: all 0.15s ease;
    transition: all 0.15s ease;

  }
  .blue {
      color: #f6f7f4;
      background: #054691; /* Old browsers */
      background: -moz-linear-gradient(top,  #054691 0%, #0765cf 100%); /* FF3.6+ */
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#054691), color-stop(100%,#0765cf)); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(top,  #054691 0%, #0765cf 100%); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(top,   #054691 0%, #0765cf  100%); /* Opera 11.10+ */
      background: -ms-linear-gradient(top,   #054691 0%, #0765cf  100%); /* IE10+ */
      background: linear-gradient(top,   #054691 0%, #0765cf  100%); /* W3C */
  }
  .grey {
      color: #f6f7f4;
      background: #3b3b3b; /* Old browsers */
      background: -moz-linear-gradient(top,  #3b3b3b 0%, #535353 100%); /* FF3.6+ */
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3b3b3b), color-stop(100%,#535353)); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(top,  #3b3b3b 0%, #535353 100%); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(top,   #3b3b3b 0%, #535353  100%); /* Opera 11.10+ */
      background: -ms-linear-gradient(top,   #3b3b3b 0%, #535353  100%); /* IE10+ */
      background: linear-gradient(top,   #3b3b3b 0%, #535353  100%); /* W3C */
  }
  .disabled {
    cursor: not-allowed;
  }
  .social {
    margin: 15px 0px 0px 0px;
    font-size: 14px;
  }
  .social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
    margin: 25px 0px 0px 0px;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }  

</style>