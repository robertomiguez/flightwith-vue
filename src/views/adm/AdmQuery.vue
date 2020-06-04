<template>
  <div>
    <ListQuery/>
    <Message/>
  </div>
</template>

<script>
import ListQuery from '../../components/adm/ListQuery'
import Message from '../../components/Message'

export default {
  name: 'AdmQuery',
  components: {
    ListQuery,
    Message
  }  
}
</script>

<style scoped>
</style>