<template>
<div>
  <h3 class='title'>Queries</h3>
  <div>
    <table>
      <thead> 
      <tr>
        <th>id</th>
        <th>active</th>
        <th>country</th>
        <th>locale</th>
        <th>currency</th>
        <th>currencySymbol</th>
        <th>deal</th>
        <th>standard</th>
        <th>originCity</th>
        <th>originCountry</th>
        <th>destinationCity</th>
        <th>destinationCountry</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='query of queries' :key='query.id'>
        <td>{{query.id}}</td>
        <td>{{query.data.active}}</td>
        <td>{{query.data.country}}</td>
        <td>{{query.data.locale}}</td>
        <td>{{query.data.currency}}</td>
        <td>{{query.data.currencySymbol}}</td>
        <td>{{query.data.deal}}</td>
        <td>{{query.data.standard}}</td>
        <td>{{query.data.route.originCity}}</td>
        <td>{{query.data.route.originCountry}}</td>
        <td>{{query.data.route.destinationCity}}</td>
        <td>{{query.data.route.destinationCountry}}</td>
        <td class='actions'>
          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'wpforms' }" class="icon" @click=showTickets(query) />
          <font-awesome-icon :icon='active(query.data.active)' class="icon" @click=activeQuery(query) />
          <font-awesome-icon icon='trash-alt' class="icon" @click=deleteQuery(query.id) />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <ListTicket :query='query'/>
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListTicket from './ListTicket'

export default {
    name: 'ListQuery',
    components: {
      ListTicket
    },
    methods: {
      ...mapActions([
          'loadQueries',
          'showTickets',
          'deleteQuery',
          'activeQuery'
      ]),
      active(active){
        return active ?  'plane-slash' : 'check'
      }
    },
    created () {
        this.loadQueries()
        this.showTickets({data:{tickets:[]}})
    },
    computed: mapGetters({
        queries: 'getQueries',
        query: 'getQuery'
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
  width: 60px;
}
.icon {
  margin: 2px;
  cursor: pointer;
}

.title {
    margin: 70px 0 10px 0 ;
    font-size: 20px;
    font-weight: 700;
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