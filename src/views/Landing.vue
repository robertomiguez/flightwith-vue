<template>
  <div class='body'>
      <HeaderPage/>
      <Message class='message'/>
      <div class="tag">Only return flights</div>
      <div class="cards">
        <div class="card" v-for='query of queries' :key='query.id'>
          <p class='cities'>{{ query.data.route.originCity }} to {{ query.data.route.destinationCity }}</p>
          
          <p v-for='ticket of query.data.tickets.slice(0,5)' :key='ticket.id'>
            {{ formatDate(ticket.outboundLeg.departureDate) }} - {{ formatDate(ticket.inboundLeg.departureDate) }} - {{ query.data.currencySymbol }}{{ ticket.minPrice }}
          </p>

          <button class="button button_orange" @click="$router.push({name: 'queryDetail', params: { queryId: query.id},})">more</button>
        </div>
      </div>
      <BottomPage/>
      <div class='end'/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeaderPage from "../components/HeaderPage";
import BottomPage from "../components/BottomPage";
import { utilMixin } from "../mixins/utilMixin";
import Message from '../components/Message'

export default {
  name: 'Landing',
  components: {
    HeaderPage, BottomPage, Message
  },
  mixins: [utilMixin],
  methods: {
    ...mapActions([
      'loadQueries',
      'updateMessage'
    ])
  },
  mounted () {
    this.loadQueries(true)
  },
  computed: mapGetters({
    queries: 'getQueries'
  }),
  beforeDestroy () {
    this.updateMessage({type: null, content: null})
  }

}
</script>

<style scoped>
.body {
    font-family: 'Quicksand', sans-serif;
}

.cards {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.card {
  flex: 0 350px;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  margin: 1% 1%;
  box-shadow: 0 4px 8px 0 #00000033;
  padding: 16px;
  text-align: center;
  line-height: 1.6;
  height: 220px;
}

.cities {
  font-size: 17px;
  font-weight: 600;
}

.button {
  background-color: #054691;
  border: none;
  color: white;
  padding: 3px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  margin: auto 30% 0 30%;
}

.button_orange {
  background-color: white;
  color: #054691;
  border: 2px solid #054691;
}

.logo {
  /* width: 24px; */
  vertical-align: top;
}

.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: '';
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}

.end {
   margin-top:35px;
}

.message {
  margin: auto;
  width: 30%;
  border: 0px;
  padding: 10px;
  text-align: center;
}

</style>
