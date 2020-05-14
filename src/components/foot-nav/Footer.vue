<template>
  <div class="footer">
    <span>{{ msg }}</span><br />
	<a>{{ ICP }}</a>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: 'yongsonglee.top@2017-2020 | 版权归前端小智所有.',
	  ICP: '苏ICP备20005151号-1'
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
	padding-top:2vh;
    font-size: 0.7rem;
    text-align: center;
    line-height: 3vh;
	a{
		color:lightblue;
	}
}
</style>
