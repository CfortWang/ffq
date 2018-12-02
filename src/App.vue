<template>
  <div id="app">
    <router-view/>
    <!-- <div id="msg">
        <div class="msg-title">系统提示</div>
        <div class="msg-contents">即将上线，敬请期待。</div>
        <div class="msg-buttons">
            <div class="ok-btn" id="msg-ok-btn">确认</div>
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App'
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
    background: #f67969;
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
}
.footer > div{
	width: 32%;
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
	color: #f67969;
}
.footer img{
	width: 22px;
	margin-top: 10px;
}
</style>
