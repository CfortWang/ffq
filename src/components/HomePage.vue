<template>
	<div class="content">
		<!-- 轮播 -->
    	<swiper :options="swiperOption">
			<swiper-slide class="swiper-div" v-for="item in banner" v-bind:key="item.index">
				<img v-bind:src="item.image" alt="" v-on:click="jumpTo(item.link)">
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>

		<!-- 滚动文字 -->
		<div class="marquee">
			<marquee v-on:click="jumpTo(newsLink)">{{news}}</marquee>
		</div>

		<!-- 菜单 -->
		<div class="menu">
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="jumpTo('/addTasks')">
					<div class="option-icon">
						<img src="/static/img/index/release.png" alt="">
					</div>
					<p class="option-name">发布任务</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/addHistory')">
					<div class="option-icon">
						<img src="/static/img/index/record.png" alt="">
					</div>
					<p class="option-name">发布记录</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/promotion')">
					<div class="option-icon">
						<img src="/static/img/index/share.png" alt="">
					</div>
					<p class="option-name">推广二维码</p>
				</div>
			</div>
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="jumpTo('/joinVip')">
					<div class="option-icon">
						<img src="/static/img/index/vip.png" alt="">
					</div>
					<p class="option-name">加入会员</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/help')">
					<div class="option-icon">
						<img src="/static/img/index/help.png" alt="">
					</div>
					<p class="option-name">用户帮助</p>
				</div>
				<div class="menu-option" v-on:click="showMsg('即将上线，敬请期待。')">
					<div class="option-icon">
						<img src="/static/img/index/shop.png" alt="">
					</div>
					<p class="option-name">购物商场</p>
				</div>
			</div>
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="showMsg('即将上线，敬请期待。')">
					<div class="option-icon">
						<img src="/static/img/index/shop-service.png" alt="">
					</div>
					<p class="option-name">商家服务</p>
				</div>
				<div class="menu-option" v-on:click="showMsg('即将上线，敬请期待。')">
					<div class="option-icon">
						<img src="/static/img/index/daili.png" alt="">
					</div>
					<p class="option-name">代理专区</p>
				</div>
				<div class="menu-option" v-on:click="showMsg('即将上线，敬请期待。')">
					<div class="option-icon">
						<img src="/static/img/index/city.png" alt="">
					</div>
					<p class="option-name">城市服务</p>
				</div>
			</div>
		</div>

		<div class="notice-box" v-show="noticeSwitch">
			<div class="close-button" v-on:click="closeNotice($event)">
				<img src="/static/img/index/close.png" alt="">
			</div>
			<div class="notice-title">系统公告</div>
			<div class="notice-content" id="notice-content" align="left" v-html="noticeText"></div>
		</div>

		<!-- 底部 -->
		<div class="footer">
			<div class="homepage"  v-on:click="jumpTo('/')">
				<div class="footer-icon">
					<img src="/static/img/index/index-cur.png" alt="">
				</div>
				<div class="footer-text footer-active">首页</div>
			</div>
			<div class="task"  v-on:click="jumpTo('/tasks')">
				<div class="footer-icon">
					<img src="/static/img/index/tasks.png" alt="">
				</div>
				<div class="footer-text">任务中心</div>
			</div>
			<div class="personal"  v-on:click="jumpTo('/personal')">
				<div class="footer-icon">
					<img src="/static/img/index/center.png" alt="">
				</div>
				<div class="footer-text">个人中心</div>
			</div>
		</div>
  	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {request} from '../utils/httpAxios.js'
import vueCookie from 'vue-cookie'
export default {
	name: 'HomePage',
  	components: {
		swiper,
		swiperSlide
	},
  	data () {
		return {
			swiperOption: {
				autoplay: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				centeredSlides: true,
				loop: true
			},
			banner: '',
			news:'',
			newsLink: '',
			noticeSwitch: false,
			noticeText: ''
		}
	},
	created: function () {
		request({ // 获取首页数据
			method: 'GET',
			url: process.env.api_url + '/home'
		}).then((response) => {
			let responseData = response.data.data
			console.log(responseData)
			this.banner = responseData.banner
			this.news = responseData.news.content
			this.newsLink = responseData.news.url
			if (responseData.is_model_close === 0) {
				this.noticeSwitch = true
			}
			this.noticeText = responseData.model_text
		}).catch((ex) => {
			console.log(ex)
		})
		// request({
		// 	method: "get",
		// 	url: process.env.api_url + '/home'
		// }).then(function (response) {
		// 	console.log(response)
		// }).catch(function (ex) {
		// 	console.log(ex)
		// })
	},
	methods: {
		closeNotice: function (e) {
			e.currentTarget.parentElement.style.display = 'none'
		}
	}
}
</script>

<style scoped>
.swiper-div img{
	width: 100%;
}
.swiper-pagination-bullet{
	width: 8px;
	height: 8px;
	background: RGBA(0, 0, 0, 1);
	border-radius: 50%;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    width: 16px;
    background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
    border-radius:8px;
		outline: none;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    width: 100%;
}
.marquee{
	padding: 5px 0px;
	margin-bottom: 10px;
	background: #ffffff;
}
.menu{
	background: #ffffff;
	padding: 10px 0px;
	margin-bottom: 60px;
}
.menu p{
	margin: 0px;
	padding: 0px;
}
.menu-option-box{
	display: flex;
	justify-content: space-around;
}
.menu-option{
	width: 32%;
	border: 1px solid #efefef;
	padding: 30px 0px;
	font-size: 0.8rem;
	margin-bottom: 3px;
}

.menu-option img{
	width: 28%;
}

.notice-box {
    position: fixed;
    left: 5%;
    top: 10%;
    width: 90%;
    height: 70%;
    z-index: 1000;
    border-radius: 16px;
    background-color: #4C9CD6;
    overflow: scroll;
	/* display: none; */
}

.notice-box .close-button {
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    top: 0;
    margin-top: 0px;
    margin-right: 0px;
    cursor: pointer;
}

.notice-box .notice-title{
	padding-top: 16px;
	font-size: 32px;
	color: white
}

.notice-box .notice-content{
	/* margin-top: 20px; */
    padding: 16px;
    color: white;
    font-size: 14px;
	text-align: left;
}


</style>
