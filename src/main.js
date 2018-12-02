// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.prototype.jumpTo = function (url) {
  window.location.href = url
}
Vue.prototype.goBack = function () {
  window.history.back()
  console.log("1")
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
