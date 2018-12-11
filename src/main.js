// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.prototype.jumpTo = function (url) {
  // window.location.href = url
  mui.alert("App正常维护，请到网页版操作版操作http://adv.lzttkf.com")
}
Vue.prototype.goBack = function () {
  window.history.back()
}
Vue.prototype.showLoading = function () {
  let ele1 = document.getElementById('loader')
  let ele2 = document.getElementById('cover')
  ele1.style.display = 'inline-block'
  ele2.style.display = 'block'
}
Vue.prototype.hideLoading = function () {
  let ele1 = document.getElementById('loader')
  let ele2 = document.getElementById('cover')
  ele1.style.display = 'none'
  ele2.style.display = 'none'
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
Vue.prototype.showInput = function () {
  let ele1 = document.getElementById('info')
  let ele2 = document.getElementById('pageInput')
  ele1.style.display = 'none'
  ele2.style.display = 'inline-block'
  ele2.focus()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
