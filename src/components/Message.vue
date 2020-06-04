<template>
    <div :class="message.type === 'error' ? 'error' : 'warning'" v-show="message.content">
      {{ message.content }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   name: 'Message',
   computed: 
      mapGetters({
        message: 'getMessage',
      })
  
}
</script>

<style scoped>
.error {
  color : darkred;
  font-size: 14px;
  padding-top: 10px;
}
.warning {
  color : darkmagenta;
  font-size: 14px;
  padding-top: 10px;
}
.info {
  color : darkslateblue;
  font-size: 14px;
  padding-top: 10px;
}

</style>