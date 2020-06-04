<template>
  <div class='body'>
      <HeaderPage/>
      <div class="tag">Only return flights</div>
      <div class="cards">
         <div class="card" v-for='ticket of query.data.tickets' :key='ticket.id'>
            <p>Departing: {{ formatDate(ticket.outboundLeg.departureDate) }}</p>
            <p>Carrier: {{ ticket.outboundLeg.carrierName }}</p>
            <p>airport: {{ ticket.outboundLeg.placeName }} - {{ ticket.outboundLeg.iataCode }}</p>
            <p>-----------------------------------------------------------</p>
            <p>Returning: {{ formatDate(ticket.inboundLeg.departureDate) }} </p>
            <p>Carrier: {{ ticket.inboundLeg.carrierName }}</p>
            <p>airport: {{ ticket.inboundLeg.placeName }} - {{ ticket.inboundLeg.iataCode }}</p>
            <p>-----------------------------------------------------------</p>
            <p>Price: {{ query.data.currencySymbol }}{{ ticket.minPrice }}</p>
            <p>direct: {{ticket.direct }}</p>
            <p>Quoted at  {{ ticket.quoteDateTime }} </p>
            <button class="button button_orange" @click="openUrl(`https://www.skyscanner.net/transport/flights/${ticket.outboundLeg.iataCode}/${ticket.inboundLeg.iataCode}/${formatDateYMD(ticket.outboundLeg.departureDate)}/${formatDateYMD(ticket.inboundLeg.departureDate)}`)">Example itinerary - Skyscanner</button>
         </div>
      </div> 
      <BottomPage/>
      <div class='end'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderPage from "../components/HeaderPage";
import BottomPage from "../components/BottomPage";
import { utilMixin } from "../mixins/utilMixin";


export default {
  name: 'QueryDetail',
  components: {
    HeaderPage, BottomPage
  },
  mixins: [utilMixin],
  data () {
    return {
        query:{data:{tickets:{}}}
    }
  },
  props: {
    queryId: {
      type: String,
      required: true
    }
  },  
  created() {
    this.queries ? this.query = this.queries.find(query => query.id == this.queryId) : this.$router.push({ name: 'NotFound' })
  },
  computed: mapGetters({
    queries: 'getQueries'
  })

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
  text-align: left;
  line-height: 1.6;
  height: 365px;
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
  font-size: 15px;
  cursor: pointer;
  border-radius: 8px;
  margin: 10px 5% 0 5%;
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

/* Large rounded green border */
hr.new5 {
  border: 10px solid green;
  border-radius: 5px;
}

</style>
