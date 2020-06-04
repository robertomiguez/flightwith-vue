<template>
<div>
  <div v-for='filter of filters' :key='filter.id'>
    <table>
      <thead> 
      <tr>
        <th>flightId</th>
        <th>active</th>
        <th>standard</th>
        <th>deal</th>
        <th>country</th>
        <th>locale</th>
        <th>currency</th>
        <th>symbol</th>
        <th>o.place</th>
        <th>o.city</th>
        <th>o.country</th>
        <th>d.place</th>
        <th>d.city</th>
        <th>d.country</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='flight of filter.data.flights' :key='flight.flightId'>
        <td>{{flight.flightId}}</td>
        <td>{{flight.active}}</td>
        <td>{{flight.standard}}</td>
        <td>{{flight.deal}}</td>
        <td>{{flight.country}}</td>
        <td>{{flight.locale}}</td>
        <td>{{flight.currency}}</td>
        <td>{{flight.currencySymbol}}</td>
        <td>{{flight.route.originPlace}}</td>
        <td>{{flight.route.originCity}}</td>
        <td>{{flight.route.originCountry}}</td>
        <td>{{flight.route.destinationPlace}}</td>
        <td>{{flight.route.destinationCity}}</td>
        <td>{{flight.route.destinationCountry}}</td>
        <td class='actions'>
          <font-awesome-icon :icon='active(flight.active)' class="icon" @click=activeFilterFlight(flight) />
          <font-awesome-icon icon='trash-alt' class="icon" @click=delFilterFlight(flight) />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ListFilterFlight',
    methods: {
        ...mapActions([
            'loadFilterFlights','delFilterFlight','activeFilterFlight'
        ]),
        active(active){
          return active ?  'plane-slash' : 'check'
        }
    },
    mounted () {
        this.loadFilterFlights()
    },
    computed: mapGetters({
        filters: 'getFilterFlights'
    })
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 10px;
  font-size: 13px;
}

th, td {
  text-align: left;
  padding: 3px;
}
th {
  background-color: #b8b6b6
}

tr:nth-child(even){background-color: #f2f2f2}

.actions {
  width: 40px;
}
.icon {
  margin: 2px;
  cursor: pointer;
}
/*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
@media
  only screen 
  and (max-width: 760px), (min-device-width: 768px) 
  and (max-device-width: 1024px)  {

  /* Force table to not be like tables anymore */
  table, thead, tbody, th, td, tr {
    font-size: 14px;
    display: block;
  }

  th, td {
    text-align: left;
    padding: 1px;
    background-color: #ccc;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin: 0 0 1rem 0;
  }
    
  tr:nth-child(odd) {
    background: #ccc;
  }
  
  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  td:nth-of-type(1):before { content: "flightId"; }
  td:nth-of-type(2):before { content: "active"; }
  td:nth-of-type(3):before { content: "standard"; }
  td:nth-of-type(4):before { content: "deal"; }
  td:nth-of-type(5):before { content: "country"; }
  td:nth-of-type(6):before { content: "locale"; }
  td:nth-of-type(7):before { content: "currency"; }
  td:nth-of-type(8):before { content: "currencySymbol"; }
  td:nth-of-type(9):before { content: "originPlace"; }
  td:nth-of-type(10):before { content: "originCity"; }
  td:nth-of-type(11):before { content: "originCountry"; }
  td:nth-of-type(12):before { content: "destinationPlace"; }
  td:nth-of-type(13):before { content: "destinationCity"; }
  td:nth-of-type(14):before { content: "destinationCountry"; }

}
</style>