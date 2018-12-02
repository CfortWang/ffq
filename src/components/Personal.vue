<template>
	<div class="content">
		<!-- 用户信息 -->
    	<div class="user-info-box">
			<div class="user-avatar">
				<img src="/static/img/personol/avatar.png" alt="">
			</div>
			<div class="reg-info">
				<div class="nickname">{{nickname}}</div>
				<div class="reg-time">注册时间：{{registerTime}}</div>
			</div>
			<div class="user-info clearfix">
				<ul class="user-info-div">
                    <li class="user-id">{{userID}}</li>
                    <li class="user-info-title">会员编号</li>
                </ul>
				<div class="user-info-border"></div>
				<ul class="user-info-div">
                    <li class="user-level">{{userLevel}}</li>
                    <li class="user-info-title">会员等级</li>
                </ul>
				<div class="user-info-border"></div>
				<ul class="user-info-div">
                    <li class="user-spread">{{recommendCount}}</li>
                    <li class="user-info-title">推广人数</li>
                </ul>
			</div>
		</div>

		<!-- 菜单1 -->
		<div class="middle-menu">
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="jumpTo('/wallet')">
					<div class="option-icon">
						<img src="/static/img/personal/wallet.png" alt="">
					</div>
					<p class="option-name">账户钱包</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/task.png" alt="">
					</div>
					<p class="option-name">任务记录</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/vip.png" alt="">
					</div>
					<p class="option-name">加入会员</p>
				</div>
			</div>
		</div>

		<!-- 菜单2 -->
		<div class="bottom-menu">
			<div class="menu-option-box">
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/subusers.png" alt="">
					</div>
					<p class="option-name">团队人数</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/brokerage.png" alt="">
					</div>
					<p class="option-name">收益统计</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/service.png" alt="">
					</div>
					<p class="option-name">联系客服</p>
				</div>
				<div class="menu-option" v-on:click="jumpPage">
					<div class="option-icon">
						<img src="/static/img/personal/superior.png" alt="">
					</div>
					<p class="option-name">我的上级</p>
				</div>
			</div>
			<div class="menu-option-box">
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/cellphone.png" alt="">
					</div>
					<p class="option-name">手机认证</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/share.png" alt="">
					</div>
					<p class="option-name">分享推广</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/news.png" alt="">
					</div>
					<p class="option-name">新闻中心</p>
				</div>
				<div class="menu-option">
					<div class="option-icon">
						<img src="/static/img/personal/introduction.png" alt="">
					</div>
					<p class="option-name">公司简介</p>
				</div>
			</div>
		</div>

		<!-- 退出登录 -->
		<div class="log-out">
			<div class="log-out-btn" v-on:click="logOut">退出登录</div>
		</div>

		<!-- 底部 -->
		<div class="footer">
			<div class="homepage" v-on:click="jumpTo('/')">
				<div class="footer-icon">
					<img src="/static/img/index/index.png" alt="">
				</div>
				<div class="footer-text">首页</div>
			</div>
			<div class="task"  v-on:click="jumpTo('/tasks')">
				<div class="footer-icon">
					<img src="/static/img/index/tasks.png" alt="">
				</div>
				<div class="footer-text">任务中心</div>
			</div>
			<div class="personal" v-on:click="jumpTo('/personal')">
				<div class="footer-icon">
					<img src="/static/img/index/center-cur.png" alt="">
				</div>
				<div class="footer-text footer-active">个人中心</div>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
	name: 'HomePage',
  	data () {
		return {
			nickname: '',
			registerTime: '',
			userID: '',
			userLevel: '',
			recommendCount: '',
			totalAmount: '',
			isVerification: '',
			recommenderID: ''
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
			console.log(responseData)
			this.nickname = responseData.name
			this.registerTime = responseData.created_at
			this.userID = responseData.recommend_code
			this.userLevel = responseData.user_level_name
			this.recommendCount = responseData.recommend_count
			this.totalAmount = responseData.total_amount
			this.isVerification = responseData.is_phone_verification
			this.recommenderID = responseData.recommender_id
		}).catch((ex) => {
			console.log(ex.response.data.message)
			this.$router.push({name: 'Login'})
		})
	},
	methods: {
		logOut: function () {
			axios({ // 退出登录
				method: 'POST',
				url: process.env.api_url + '/login/logout',
				withCredentials: true,
				headers: {"lang": 'zh'}
			}).then((response) => {
				if (response.data.code == 200) {
					this.$router.push({name: 'Login'})
				}
			}).catch((ex) => {
				console.log(ex)
			})
		},
		jumpPage: function () {
			this.$router.push({name: 'Superior', params: {isVerification: this.isVerification, recommenderID: this.recommenderID}})
		}
	}
}
</script>

<style scoped>
.user-info-box{
	background: -webkit-linear-gradient(270deg,#f67969,#fffffe);
	margin-bottom: 10px;
}
.user-avatar{
	padding-top: 40px;
	text-align: center;
}
.user-avatar img{
	width: 80px;
	height: 80px;
	border-radius: 50%;
	box-shadow: 0 0 40px #efefef;
}
.reg-info{
	padding: 6px 0px 12px;
	text-align: center;
}
.nickname{
	font-size: 16px;
    color: #333;
    font-weight: bold;
}
.reg-time{
    font-size: 12px;
    color: #666;
}
.user-info{
	padding-bottom: 8px;
}
.user-info-div{
	width: 33%;
    height: 65px;
    float: left;
    color: #333;
}
.user-id, .user-level, .user-spread{
	height: 50%;
    font-family: "微软雅黑", "tahoma", "arial", "simsun", "sans-serif";
    font-size: 15px;
    line-height: 45px;
	color: orangered;
}
.user-level{
	color: #000;
}
.user-info-title{
	height: 50%;
    font-family: "宋体", "tahoma", "arial", "simsun", "sans-serif";
    font-size: 12px;
    font-weight: normal;
    line-height: 25px;
    color: #666;
}
.user-info-border{
	border-left: 1px solid #666;
    float: left;
    width: 0.1%;
    height: 20px;
    margin-top: 22.5px;
}

.middle-menu{
	background: #ffffff;
	margin: 10px 0px;
}
.bottom-menu{
	background: #ffffff;
}
.menu-option-box{
	display: flex;
	justify-content: space-between;
}
.middle-menu .menu-option{
	width: 33%;
	border: 1px solid #efefef;
	padding: 30px 0px;
	font-size: 0.8rem;
}
.bottom-menu .menu-option{
	width: 25%;
	border: 1px solid #efefef;
	padding: 25px 0px;
	font-size: 0.8rem;
}
.bottom-menu .menu-option-box:first-child{
	margin-bottom: 3px;
}
.middle-menu .menu-option img{
	width: 20%;
}
.bottom-menu .menu-option img{
	width: 30%;
}
.log-out{
	margin: 10px 0px 80px;
}
.log-out-btn{
	width: 80%;
	text-align: center;
	font-size: 16px;
	color: #ffffff;
	border-radius: 4px;
	background: #f67969;
	padding: 8px;
	margin: 0 auto;
}
</style>
