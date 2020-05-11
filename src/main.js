// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import Animated from 'animate.css'      // animated library
import ViewUI from 'view-design'      // iView.design
import 'view-design/dist/styles/iview.css'

import ElementUI from 'element-ui';    // element-ui
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

import echarts from 'echarts'     // echarts  
Vue.prototype.$echarts = echarts

import axios from 'axios'                        // axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(Animated)
Vue.use(ViewUI)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 },{locale});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
