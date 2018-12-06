<template>
	<div class="content">

		<div class="contain">
			<div class="share-text">
				<span>{{nickname}}邀您加入</span>
			</div>
			<qrcode :value="qrCodeUrl" :options="{ size: 120 }"></qrcode>
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
import QRcode from '@xkeshi/vue-qrcode'
export default {
	name: 'Promotion',
	components: {
		qrcode : QRcode
	},
  	data () {
		return {
			nickname: '',
			qrCodeUrl: ''
		}
	},
	created: function () {
		axios({ // 获取个人信息
			method: 'GET',
			url: process.env.api_url + '/user/info',
			withCredentials: true,
			headers: {"lang": 'zh'}
		}).then((response) => {
			let responseData = response.data.data
			this.nickname = responseData.name
			// let recommendCode = responseData.recommend_code
			let recommendCode = responseData.id
			this.qrCodeUrl = "http://fafa.sumsia.com/register?recommendCode" + recommendCode
		}).catch((ex) => {
			this.$route.push({name: 'Login'})
		})
	},
	methods: {
		
	}
}
</script>

<style scoped>
.contain{
	width: 100vw;
	height: 141vw;
	padding: 0px;
	background: url('/static/img/personal/qrCode.jpg') no-repeat center;
	background-size: 100% 100%;
	text-align: center;
	border-top: 1px solid #eee;
}
.share-text{
	font-size: 12px;
	margin-top: 49vw;
}
</style>
