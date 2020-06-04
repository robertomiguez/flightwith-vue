<template>
  <div v-show=query.data.tickets.length>
    <h3 class='title'>{{query.id}} - Tickets</h3>
    <table>
      <thead> 
      <tr>
        <th>quote id</th>
        <th>price</th>
        <th>direct</th>
        <th>quote</th>
        <th>departure</th>
        <th>carrier</th>
        <th>iata</th>
        <th>place</th>
        <th>return</th>
        <th>carrier</th>
        <th>iata</th>
        <th>airport</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='ticket of query.data.tickets' :key='ticket.quoteId'>
        <td>{{ticket.quoteId}}</td>
        <td>{{ticket.minPrice}}</td>
        <td>{{ticket.direct}}</td>
        <td>{{ticket.quoteDateTime}}</td>
        <td>{{ticket.outboundLeg.departureDate}}</td>
        <td>{{ticket.outboundLeg.carrierName}}</td>
        <td>{{ticket.outboundLeg.iataCode}}</td>
        <td>{{ticket.outboundLeg.placeName}}</td>
        <td>{{ticket.inboundLeg.departureDate}}</td>
        <td>{{ticket.inboundLeg.carrierName}}</td>
        <td>{{ticket.inboundLeg.iataCode}}</td>
        <td>{{ticket.inboundLeg.placeName}}</td>
        <td class='actions'>
          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'wpforms' }" class="icon"  @click="openUrl(`https://www.skyscanner.net/transport/flights/${ticket.outboundLeg.iataCode}/${ticket.inboundLeg.iataCode}/${formatDateYMD(ticket.outboundLeg.departureDate)}/${formatDateYMD(ticket.inboundLeg.departureDate)}`)"/>
          <font-awesome-icon icon='trash-alt' class="icon" @click=deleteTicket([query.id,ticket]) />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { utilMixin } from "../../mixins/utilMixin";

export default {
    name: 'ListTicket',
    props: {
        query: {
            type: Object,
            required: true
        }
    },
    mixins: [utilMixin],
    methods: {
      ...mapActions([
          'deleteTicket'
      ])
    }

}
</script>

<style scoped>
.title {
    margin: 30px 0 10px 0 ;
    font-size: 20px;
    font-weight: 700;
} 

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

  td:nth-of-type(1):before { content: "id"; }
  td:nth-of-type(2):before { content: "active"; }
  td:nth-of-type(3):before { content: "country"; }
  td:nth-of-type(4):before { content: "locale"; }
  td:nth-of-type(5):before { content: "currency"; }
  td:nth-of-type(6):before { content: "currencySymbol"; }
  td:nth-of-type(7):before { content: "deal"; }
  td:nth-of-type(8):before { content: "standard"; }
  td:nth-of-type(9):before { content: "originCity"; }
  td:nth-of-type(10):before { content: "originCountry"; }
  td:nth-of-type(11):before { content: "destinationCity"; }
  td:nth-of-type(12):before { content: "destinationCountry"; }

}
</style>