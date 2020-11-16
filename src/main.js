import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import router from './routes'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material-design-icons/styles.css';
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)

Vue.prototype.$API = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://trelloprojectapp.herokuapp.com';
import store from './store'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




