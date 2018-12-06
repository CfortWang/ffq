<template>
  <div id="app">
    <router-view/>
    <div id="msg">
        <div class="msg-title">系统提示</div>
        <div class="msg-contents"></div>
        <div class="msg-buttons">
            <div class="ok-btn" id="msg-ok-btn" v-on:click="closeMsg">确认</div>
        </div>
    </div>
    <div id="cover" level="1"></div>
    <div id="loader" class="loader loader-3">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
        noData: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
	background: #eeeeee;
}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td, a {
  outline: 0;
  zoom: 1;
  margin: 0;
  padding: 0;
  list-style: none;
}
a{
  text-decoration: none;
  color: #006485;
  cursor: pointer;
}
input{
  border: none;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color:#999999;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color:#999999;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color:#999999;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#999999;
}
input:focus{
  outline: none;
}
.clearfix:after{
  content: "";
  display: block;
  clear: both;
}





.content{
	background: #eeeeee;
}
.header{
    height: 50px;
    background: #4C9CD6;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
}
.empty{
    height: 50px;
}
.left-btn{
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 9999;
}
.left-btn img{
    width: 20px;
}
.header-title {
    font-family: '黑体';
    color: white;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    margin: 0 auto;
    margin-top: -15px;
}
.contain{
    padding: 10px;
    font-size: 14px;
    text-align: left;
    line-height: 22px;
    color:#666;
}
.footer{
	position: fixed;
	bottom: 0%;
	left: 0%;
	right: 0%;
	width: 100%;
	height: 60px;
	line-height: 60px;
	z-index: 100;
	border-top: 1px solid #dddddd;
	background-color: #ffffff;
    font-size: 0px;
}
.footer > div{
	width: 33%;
	display: inline-block;
	/* font-size: 0px; */
}
.footer > div .footer-icon{
	height: 35px;
}
.footer > div .footer-text{
	height: 25px;
	line-height: 25px;
	font-size: 14px;
}
.footer-active{
	color: #4C9CD6;
}
.footer img{
	width: 28px;
	margin-top: 10px;
}

#cover {
    width: 100vw; 
    height: 100vh;
    display: none;
    position: fixed;
    z-index: 9999;
    background: #000;
    opacity: .7;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
#msg, #regMsg{
    border-radius: 6px;
    z-index: 10000;
    width: 86%;
    top: 40%;
    left: 7%;
    background: #fff;
    overflow: hidden;
    position: fixed;
    display: none;
}
.msg-title {
    background: #eee;
    height: 46px;
    line-height: 46px;
    padding-left: 15px;
    text-align: left;
    color: #222;
    font-size: 18px;
    font-weight: bold;
}
.msg-contents, .reg-msg-contents{
    border-top: 1px solid #eee;
    text-align: left;
    padding: 20px 15px;
    font-size: 14px;
    color: #666;
}
.msg-buttons {
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 16px;
    background: #4C9CD6;
    color: #fff;
}

.loader {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    z-index: 10000;
    display: none;
}
.loader-3 .dot {
    width: 10px;
    height: 10px;
    background: #4C9CD6;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 5px);
}
.loader-3 .dot1 {
    left: 0px;
    -webkit-animation: dot-jump 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    animation: dot-jump 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}
.loader-3 .dot2 {
    left: 20px;
    -webkit-animation: dot-jump 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    animation: dot-jump 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}
.loader-3 .dot3 {
    left: 40px;
    -webkit-animation: dot-jump 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    animation: dot-jump 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
}

@-webkit-keyframes dot-jump {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    100% {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
    }
}

@keyframes dot-jump {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    100% {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
    }
}

.addresses-not-found {
    padding-top: 40px;
    font-size: 14px;
    text-align: center;
}
.addresses-not-found .text {
    margin-top: 20px;
}
</style>
