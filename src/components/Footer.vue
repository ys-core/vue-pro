<template>
  <div class="footer">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: 'yonnsonglee.top@2017-2020. 版权归前端小智所有.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
    width: 100%;
    margin: 0 auto;
    min-height: 8vh;
    background: black;
    color: white;
    font-size: 0.8rem;
    text-align: center;
    line-height: 8vh;
}
</style>
