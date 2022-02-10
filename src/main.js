import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/stylesheet.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'sm',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x'
      },
      iconPrefix: ''
    }
  }
})

Vue.config.productionTip = false

library.add(fas)
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.prototype.$http = require('@/middleware/axios').default
Vue.prototype.$libraries = require('@/libraries/index')

new Vue({
  router: require('./router').default,
  render: h => h(App)
}).$mount('#app')
