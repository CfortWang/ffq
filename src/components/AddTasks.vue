<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">发布任务</div>
        </div>
        <div class="empty"></div>
        <div class="reg-box">
            <!-- <div class="phone-num">
                <input type="number" name="phoneNum" id="phoneNum" value="" placeholder="手机号码"/>
            </div>
            <div class="password">
                <input type="password" name="password" id="password" value="" placeholder="请输入8-12位新密码"/>
            </div>
            <div class="re-password">
                <input type="password" name="password" id="password" value="" placeholder="确认新密码"/>
            </div>
            <div class="verification-code">
                <input type="text" name="verificationCode" id="verificationCode" value="" placeholder="验证码"/>
                <div class="verification-btn">发送验证码</div>
            </div>
            <div class="reg-btn-box">
                <div class="reg-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn clearfix">
                    <div class="login">返回登录</div>
                </div>
            </div> -->
        </div>
  	</div>
</template>

<script>
export default {
	name: 'AddTasks',
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
.reg-box{
	padding: 15px;
}
.reg-box > div{
    height: 42px;
    margin-bottom: 15px;
}
.reg-box input{
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

.reg-btn-box{
    margin-bottom: 20px;
}
.reg-btn{
    padding:12px;
    background: #f67969;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}
</style>