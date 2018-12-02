<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">绑定手机号码</div>
        </div>
        <div class="empty"></div>
        <div class="binding-box">
            <div class="phone-num">
                <input type="number" name="phoneNum" id="phoneNum" value="" placeholder="手机号码"/>
            </div>
            <div class="verification-code">
                <input type="text" name="verificationCode" id="verificationCode" value="" placeholder="验证码"/>
                <div class="verification-btn">发送验证码</div>
            </div>
            <div class="binding-btn-box">
                <div class="binding-btn">确认绑定</div>
            </div>
            <div class="protocol">点击确认绑定,即表示您同意<a href="">《发发圈用户协议》</a></div>
        </div>
        
        <div class="re-binding-box">
            <div class="bind-info">
                <div class="bind-title">手机号码</div>
                <div class="bind-phone">12312312312</div>
            </div>
            <div class="bind-desc">您已成功绑定手机号码</div>
        </div>
        <div class="re-binding-btn-box">
            <div class="re-binding-btn">确认绑定</div>
        </div>

        <div class="footer">
			<div class="homepage">
				<div class="footer-icon">
					<img src="/static/img/index/index.png" alt="">
				</div>
				<div class="footer-text">首页</div>
			</div>
			<div class="task">
				<div class="footer-icon">
					<img src="/static/img/index/tasks.png" alt="">
				</div>
				<div class="footer-text">任务中心</div>
			</div>
			<div class="personal">
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
	name: 'Certification',
  	data () {
		return {
			
		}
	},
	created: function () {

	},
	methods: {

	}
}
</script>

<style scoped>
.binding-box{
	padding: 15px;
    display: none;
}
.binding-box > div{
    height: 42px;
    margin-bottom: 15px;
}
.binding-box input{
    box-sizing: border-box;
	width: 100%;
	padding: 12px;
	border: 1px solid #DDDDDD;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
}
#verificationCode{
    width: 50%;
}
.verification-btn{
    display: inline-block;
    width: 48%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background: #f67969;
    font-size: 16px;
    color: #fff;
    border-radius: 4px;
}
.protocol{
    text-align: left;
    font-size: 13px;
}
.protocol a{
    color: red;
}

.binding-btn-box, .re-binding-btn-box{
    margin-bottom: 20px;
}
.binding-btn, .re-binding-btn{
    padding: 8px 12px;
    background: #f67969;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}
.re-binding-btn{
    width: 85%;
    margin-top: 15px;
}
.re-binding-box{
    background: #fff;
    margin-top: 15px;
}
.bind-info div{
    display: inline-block;
}
.bind-title{
    width: 30%;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.bind-phone{
    width: 68%;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}
.bind-desc{
    height: 48px;
    line-height: 48px;
    color: #ccc;
}
</style>