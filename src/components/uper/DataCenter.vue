<template>
  <div class="data-center">
        <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    //   this.enableLoading()
    //   this.loadingData()
    //   this.disableLoading()
    this.drawChart()
  },
  methods:{
       ...mapActions([
        'enableLoading',
        'disableLoading'
      ]),
      async loadingData(){
  
      },
      drawChart() {
            let myChart = this.$echarts.init(document.getElementById("main"));
            let option = {
                title: {
                text: "ECharts 入门示例"
                },
                tooltip: {},
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 200]
                    }
                ]
            };

            myChart.setOption(option);
    }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){


}
@media only screen and (max-width:540px){


}
</style>
