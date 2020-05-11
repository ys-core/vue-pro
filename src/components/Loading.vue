
<template>
<!-- <div v-loading.fullscreen.lock="fullscreenLoading" class="loading-core">
        
</div> -->
<div>

</div>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: true
      }
    },
    mounted(){
         const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.9)',
          customClass : 'loading-style'
        })
    },
    methods: {
    

    }
  }
</script>

<style lang="scss" scoped>

</style>




