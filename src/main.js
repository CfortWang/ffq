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
}
Vue.prototype.showMsg = function (msg) {
  let ele1 = document.getElementById('msg')
  let ele2 = document.getElementById('cover')
  document.getElementsByClassName('msg-contents')[0].innerHTML = msg
  ele1.style.display = 'block'
  ele2.style.display = 'block'
}
Vue.prototype.closeMsg = function () {
  let ele1 = document.getElementById('msg')
  let ele2 = document.getElementById('cover')
  ele1.style.display = 'none'
  ele2.style.display = 'none'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
