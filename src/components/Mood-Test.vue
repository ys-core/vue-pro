<template>
  <div class="mood-warpper">
      <div class="mood-center"></div>
      <div class="mood-left"></div>
      <div class="mood-right"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: 'mood pages.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){
.mood-warpper{
    overflow: hidden;       // trigger the BFC
    position: relative;
    width: 100%;
    padding: 0 20% 0 15%;
    box-sizing: border-box;
    border: 1px solid orange;
    .mood-center{
        float: left;
        height: 30rem;
        width: 100%;
        background-color: red;
    }
    .mood-left{
      float: left;
      height: 10rem;
      width: 100%;
      // position: relative;
      // left: -15%;
      // margin-left: -100%;
      background-color: yellowgreen;
    }
    .mood-right{
      float: left;
      height: 10rem; 
      width: 20%;
      // margin-left: -20%;
      // position: relative;
      // right: -20%;
      background-color: blueviolet;
    }
}

}
@media only screen and (max-width:540px){


}
</style>
