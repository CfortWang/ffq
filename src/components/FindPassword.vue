<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">找回密码</div>
        </div>
        <div class="empty"></div>
        <div class="reg-box">
            <div class="phone-num">
                <input type="number" name="phoneNum" id="phoneNum" v-model="phoneNumber" placeholder="手机号码"/>
            </div>
            <div class="password">
                <input type="password" name="password" id="password" v-model="password" placeholder="请输入8-12位新密码"/>
            </div>
            <div class="re-password">
                <input type="password" name="rePassword" id="rePassword" v-model="repeatPassword" placeholder="确认新密码"/>
            </div>
            <div class="verification-code">
                <input type="text" name="verificationCode" id="verificationCode" v-model="verificationCode" placeholder="验证码"/>
                <div class="verification-btn" v-on:click="getVerificationCode">发送验证码</div>
            </div>
            <div class="reg-btn-box" v-on:click="findPasswoed">
                <div class="reg-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn clearfix">
                    <div class="login">返回登录</div>
                </div>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'FindPassword',
  	data () {
		return {
            phoneNumber: '',
            password: '',
            repeatPassword: '',
            verificationCode: ''
		}
	},
	created: function () {

	},
	methods: {
        getVerificationCode: function () {
            axios({ // 获取验证码
                method: 'POST',
                url: process.env.api_url + '/login/msg',
                params: {
                    phoneNumber: this.phoneNumber,
                    type: 'reset_password'
                }
            }).then((response) => {
                let responseMessage = response.data.message
                console.log(response)
            }).catch((ex) => {
                console.log(ex)
            })
        },
        findPasswoed: function () {
            axios({ // 注册
                method: 'POST',
                url: process.env.api_url + '/login/reset',
                params: {
                    phoneNumber: this.phoneNumber,
                    password: this.password,
                    repeatPassword: this.repeatPassword,
                    code: this.verificationCode
                }
            }).then((response) => {
                let responseMessage = response.data.message
                console.log(response)
            }).catch((ex) => {
                console.log(ex)
            })
        }
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
    padding: 8px 12px;
    background: #f67969;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}
</style>