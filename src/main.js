import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false

Vue.prototype.$http = require('@/middleware/axios').default
Vue.prototype.$libraries = require('@/libraries/index')

new Vue({
  router: require('./router').default,
  render: h => h(App)
}).$mount('#app')
