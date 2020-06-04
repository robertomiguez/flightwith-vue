<template>
    <div class="footer">
        <div class="follow">
            Follow us <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }" @click="openUrl('https://twitter.com/rmiguez')" class='icon'/>
        </div>
    </div>
</template>

<script>
import { utilMixin } from "../mixins/utilMixin";

export default {
    name: 'BottomPage',
    mixins: [utilMixin]
}
</script>

<style scoped>
.footer {
   position: fixed;
   bottom: 0;
   width: 100%;
   background-color: #606cee;
   color: white;
   text-align: right;
   height: 30px;

}
.follow {
    padding: 5px 15px 0 0;
}
.icon {
    cursor: pointer;
}
</style>