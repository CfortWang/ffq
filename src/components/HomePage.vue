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
				<div class="menu-option" v-on:click="jumpTo('/')">
					<div class="option-icon">
						<img src="/static/img/index/licai.png" alt="">
					</div>
					<p class="option-name">金融理财</p>
				</div>
			</div>
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="jumpTo('/')">
					<div class="option-icon">
						<img src="/static/img/index/shop.png" alt="">
					</div>
					<p class="option-name">购物商场</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/')">
					<div class="option-icon">
						<img src="/static/img/index/recharge.png" alt="">
					</div>
					<p class="option-name">充值中心</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/')">
					<div class="option-icon">
						<img src="/static/img/index/city.png" alt="">
					</div>
					<p class="option-name">城市服务</p>
				</div>
			</div>
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
			newsLink: ''
		}
	},
	created: function () {
		axios({ // 获取首页数据
			method: 'GET',
			url: process.env.api_url + '/home'
		}).then((response) => {
			let responseData = response.data.data
			console.log(responseData)
			this.banner = responseData.banner
			this.news = responseData.news.content
			this.newsLink = responseData.news.url
		}).catch((ex) => {
			console.log(ex)
		})
	},
	methods: {
		
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

</style>
