<template>
  <div class="sign-up">
    <h3>Sign Up</h3>
    <Message/>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="password" v-model="passwordConfirm" placeholder="Confirm Password"><br>
    <span class="c_button"><a class='button' :class="{blue: !loading, grey: loading, disabled: loading }" href="javascript:void(0);" @click="signUp">Sign Up</a></span>
    <span class="footer"><a  href="javascript:void(0);" @click="goBack">or go back to login</a></span>
    <!-- <div class="footer">
      or go back to <router-link :to="{name: 'login'}">login</router-link>.
    </div> -->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Message from '../components/Message'
  export default {
    name: 'SignUp',
    components: {
      Message
    },
 
    data() {
      return {
        email: '',
        password: '',
        passwordConfirm: ''
      }
    },
    methods: {
      ...mapActions([
        'userSignUp',
        'updateMessage'
      ]),

      signUp: function() {
        if (this.loading) return
        this.userSignUp({ email: this.email, password: this.password, passwordConfirm: this.passwordConfirm })
      },
      goBack: function() {
        if (this.loading) return
        this.updateMessage({type: null, content: null})
        this.$router.push({name:'login'})      
      }
    },
    computed: 
      mapGetters({
        loading: 'getLoading'
      })
  }
</script>

 <style scoped>
  .sign-up {
    position: relative;
    width: 300px;
    margin: 70px auto;
    text-align: center;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.171);
  }
  input {
    margin: 10px 0;
    padding: 15px;
  }

  .footer {
    margin: 15px 0px 0px 0px;
    font-size: 13px;
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

  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }

</style>
