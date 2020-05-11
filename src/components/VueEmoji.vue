<template>
  <div class="emoji">
    <VueEmoji @input="onInput" width="50%" height="400" :value="comment" />
  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'

export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      VueEmoji
  },
  methods:{
      onInput(event) {
        // console.log(event.data)
        this.comment= event.data
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
