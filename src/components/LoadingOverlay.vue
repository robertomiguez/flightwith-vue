<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'LoadingOverlay',
        components: {
            Loading
        },
        computed: 
            mapGetters({
                isLoading: 'getLoading',
            })

    }
</script>