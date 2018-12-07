<template>
	<div class="content">
		<!-- 用户信息 -->
    	<div class="user-info-box">
			<div class="user-avatar">
				<img src="/static/img/personal/avatar.png" alt="">
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
				<ul class="user-info-div"  v-on:click="jumpTo('/joinVip')">
                    <li class="user-level">{{userLevel}}</li>
                    <li class="user-info-title">会员等级</li>
                </ul>
				<div class="user-info-border"></div>
				<ul class="user-info-div" v-on:click="jumpTo('/myTeam')">
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
				<div class="menu-option" v-on:click="jumpTo('/tasksHistory')">
					<div class="option-icon">
						<img src="/static/img/personal/task.png" alt="">
					</div>
					<p class="option-name">任务记录</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/joinVip')">
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
				<div class="menu-option" v-on:click="jumpTo('/myTeam')">
					<div class="option-icon">
						<img src="/static/img/personal/subusers.png" alt="">
					</div>
					<p class="option-name">团队人数</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/benifit')">
					<div class="option-icon">
						<img src="/static/img/personal/brokerage.png" alt="">
					</div>
					<p class="option-name">收益统计</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/service')">
					<div class="option-icon">
						<img src="/static/img/personal/service.png" alt="">
					</div>
					<p class="option-name">联系客服</p>
				</div>
				<div class="menu-option"  v-on:click="jumpTo('/superior')">
					<div class="option-icon">
						<img src="/static/img/personal/superior.png" alt="">
					</div>
					<p class="option-name">我的上级</p>
				</div>
			</div>
			<div class="menu-option-box">
				<div class="menu-option" v-on:click="jumpTo('/certification?phoneNum=' + phoneNumber + '&isVerification=' + isVerification)">
					<div class="option-icon">
						<img src="/static/img/personal/cellphone.png" alt="">
					</div>
					<p class="option-name">手机认证</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/promotion')">
					<div class="option-icon">
						<img src="/static/img/personal/share.png" alt="">
					</div>
					<p class="option-name">分享推广</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/news')">
					<div class="option-icon">
						<img src="/static/img/personal/news.png" alt="">
					</div>
					<p class="option-name">新闻中心</p>
				</div>
				<div class="menu-option" v-on:click="jumpTo('/introduction')">
					<div class="option-icon">
						<img src="/static/img/personal/introduction.png" alt="">
					</div>
					<p class="option-name">公司简介</p>
				</div>
			</div>
		</div>

		<!-- 退出登录 -->
		<div class="log-out" v-if="hasLogin">
			<div class="log-out-btn" v-on:click="logOut">退出登录</div>
		</div>
		<div class="log-out" v-else>
			<div class="log-out-btn" v-on:click="jumpTo('/login')">前往登录</div>
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
import vueCookie from 'vue-cookie'

export default {
	name: 'Personal',
  	data () {
		return {
			phoneNumber: '',
			nickname: '',
			registerTime: '',
			userID: '',
			userLevel: '',
			userLevelID: '',
			recommendCount: '',
			totalAmount: '',
			isVerification: '',
			recommenderID: '',
			hasLogin: false
		}
	},
	created: function () {
		//判断缓存中是否有个人信息数据，有直接获取，没有请求接口
		if (vueCookie.get('userID')) {
			// 有缓存显示退出登录按钮
			this.hasLogin = true
			this.nickname = vueCookie.get('nickname')
			this.phoneNumber = vueCookie.get('phoneNumber')
			this.registerTime = vueCookie.get('registerTime')
			this.userID = vueCookie.get('userID')
			this.userLevel = vueCookie.get('userLevel')
			this.userLevelID = vueCookie.get('userLevelID')
			this.recommendCount = vueCookie.get('recommendCount')
			this.totalAmount = vueCookie.get('totalAmount')
			this.isVerification = vueCookie.get('isVerification')
			this.recommenderID = vueCookie.get('recommenderID')
		} else {
			axios({ // 获取个人信息
				method: 'GET',
				url: process.env.api_url + '/user/info',
				withCredentials: true,
				headers: {"lang": 'zh'}
			}).then((response) => {
				let responseData = response.data.data
				if (response.data.code == 200) {
					this.hasLogin = true
				} else {
					this.hasLogin = false
				}
				this.nickname = responseData.name
				this.phoneNumber = responseData.phone_number
				this.registerTime = responseData.created_at
				// this.userID = responseData.recommend_code
				this.userID = responseData.id
				this.userLevel = responseData.user_level_name
				this.userLevelID = responseData.user_level_id
				this.recommendCount = responseData.recommend_count
				this.totalAmount = responseData.total_amount
				this.isVerification = responseData.is_phone_verification
				this.recommenderID = responseData.recommender_id
	
				// 将个人信息存入缓存
				vueCookie.set('nickname', this.nickname, 1)
				vueCookie.set('phoneNumber', this.phoneNumber, 1)
				vueCookie.set('registerTime', this.registerTime, 1)
				vueCookie.set('userID', this.userID, 1)
				vueCookie.set('userLevel', this.userLevel, 1)
				vueCookie.set('userLevelID', this.userLevelID, 1)
				vueCookie.set('recommendCount', this.recommendCount, 1)
				vueCookie.set('totalAmount', this.totalAmount, 1)
				vueCookie.set('isVerification', this.isVerification, 1)
				vueCookie.set('recommenderID', this.recommenderID, 1)
			}).catch((ex) => {
				this.hasLogin = false
				console.log(ex.response.data.message)
				// this.$router.push({name: 'Login'})
			})
		}
	},
	methods: {
		logOut: function () {
			this.showLoading()
			axios({ // 退出登录
				method: 'POST',
				url: process.env.api_url + '/login/logout',
				withCredentials: true,
				headers: {"lang": 'zh'}
			}).then((response) => {
				this.hideLoading()
				if (response.data.code == 200) {
					// 清除缓存
					vueCookie.set('nickname', '', 1)
					vueCookie.set('registerTime', '', 1)
					vueCookie.set('userID', '', 1)
					vueCookie.set('userLevel', '', 1)
					vueCookie.set('userLevelID', '', 1)
					vueCookie.set('recommendCount', '', 1)
					vueCookie.set('totalAmount', '', 1)
					vueCookie.set('isVerification', '', 1)
					vueCookie.set('recommenderID', '', 1)
					this.$router.push({name: 'Login'})
				} else {
					this.showMsg(response.date.message)
				}
			}).catch((ex) => {
				this.hideLoading()
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
	background: -webkit-linear-gradient(270deg,#4C9CD6,#fffffe);
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
	background: #4C9CD6;
	padding: 8px;
	margin: 0 auto;
}
</style>
