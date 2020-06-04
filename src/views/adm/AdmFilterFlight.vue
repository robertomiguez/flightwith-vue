<template>
  <div>
    <AddFilterFlight/>
    <ListFilterFlight/>
    <Message/>
  </div>
</template>

<script>
import ListFilterFlight from '../../components/adm/ListFilterFlight'
import AddFilterFlight from '../../components/adm/AddFilterFlight'
import Message from '../../components/Message'

export default {
  name: 'AdmFilterFlight',
  components: {
    AddFilterFlight,
    ListFilterFlight,
    Message
  }  
}
</script>

<style scoped>
</style>