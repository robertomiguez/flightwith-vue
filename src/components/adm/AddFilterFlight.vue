<template>
  <div>
      <h3 class='title'>Add Filter Flight</h3>
      <div>
          <form @submit.prevent="onSubmit">
              <InputTextPrice v-model="flight.standard" :v="$v.flight.standard" name="Standard"/>
              <InputTextPrice v-model="flight.deal" :v="$v.flight.deal" name="Deal"/>
              <InputText v-model="flight.country" :v="$v.flight.country" name="Country"/>
              <InputText v-model="flight.locale" :v="$v.flight.locale" name="Locale"/>
              <InputText v-model="flight.currency" :v="$v.flight.currency" name="Currency"/>
              <InputTextCity v-model="flight.route.originCity" :v="$v.flight.route.originCity" name="Origin City"/>
              <InputTextCity v-model="flight.route.destinationCity" :v="$v.flight.route.destinationCity" name="Destination City"/>

              <input type="submit" value="submit">
          </form>
      </div>

  </div>  
</template>

<script>
import { mapActions } from 'vuex'
import { required, minValue, minLength } from "vuelidate/lib/validators"
import formMixin from '../../mixins/validationMixin'
import InputTextPrice from './../form/InputTextPrice'
import InputText from './../form/InputText'
import InputTextCity from './../form/InputTextCity'

const initialFlight = {
        flightId: '',
        active: 'false',
        standard: '',
        deal: '',
        country: 'UK',
        locale: 'en-UK',
        currency: 'GBP',
        currencySymbol: '',
        route: {
          originPlace: '',
          originCity: '',
          originCountry: '',
          destinationPlace: '',
          destinationCity: '',
          destinationCountry: ''
        }    
      }
 
export default {
    name: 'AddFilterFlight',
    mixins: [formMixin],
    components: {
      InputTextPrice,
      InputText,
      InputTextCity
    },
    data() {
      return {
        flight: JSON.parse(JSON.stringify(initialFlight)) //cloning object
      }
    },
    methods: {
      ...mapActions(['addFilterFlight']),
      onSubmit() {
          this.$v.flight.$touch()
          if(this.$v.flight.$error) return
          // to form submit after this
          this.addFilterFlight(this.flight) 
          this.flight = JSON.parse(JSON.stringify(initialFlight)) //cloning object
          this.$v.flight.$reset()
          // alert('Form submitted')
      }
    },
    validations: {
      flight: {
        standard: { required, minValue: minValue(1) },
        deal: { required, minValue: minValue(1) },
        country: { required },
        locale: { required },
        currency: { required },
        route: {
          originCity: { required, minLength: minLength(3) },
          destinationCity: { required, minLength: minLength(3) }
        }  
      }
    }
}
</script>

<style scoped>

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* float: right; */
}

input[type=submit]:hover {
  background-color: #45a049;
}

.title {
    margin: 70px 0 10px 0 ;
    font-size: 20px;
    font-weight: 700;
}   

@media screen and (max-width: 600px) {
  
  input[type=submit] {
    width: 100%;
    margin-top: 1px;
  }
}

</style>