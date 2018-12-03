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
                <input type="password" name="password" id="password" v-model="password" placeholder="请输入4-12位新密码"/>
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
                    <div class="login" v-on:click="jumpTo('/login')">返回登录</div>
                </div>
            </div>
        </div>
        <div id="regMsg">
            <div class="msg-title">系统提示</div>
            <div class="reg-msg-contents">密码重置成功！</div>
            <div class="msg-buttons">
                <div class="ok-btn" id="msg-ok-btn" v-on:click="goToLogin">前往登录</div>
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
        showRegMsg: function () {
            let ele1 = document.getElementById('regMsg')
            let ele2 = document.getElementById('cover')
            ele1.style.display = 'block'
            ele2.style.display = 'block'
        },
        goToLogin: function () {
            let ele1 = document.getElementById('regMsg')
            let ele2 = document.getElementById('cover')
            ele1.style.display = 'none'
            ele2.style.display = 'none'
            this.$router.push({name: 'Login', params:{phoneNumber: this.phoneNumber}})
        },
        getVerificationCode: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            axios({ // 获取验证码
                method: 'POST',
                url: process.env.api_url + '/login/msg',
                params: {
                    phoneNumber: this.phoneNumber,
                    type: 'reset_password'
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    this.showMsg("验证码发送成功！")
                    return false
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch((ex) => {
                console.log(ex)
            })
        },
        findPasswoed: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            if (this.password == '' || this.password == null) {
                this.showMsg("请输入4-12位新密码！")
                return false
            }
            if (this.repeatPassword == '' || this.repeatPassword == null) {
                this.showMsg("请确认密码！")
                return false
            }
            if (this.password != this.repeatPassword) {
                this.showMsg("两次输入密码不一致！")
                return false
            }
            if (this.verificationCode == '' || this.verificationCode == null) {
                this.showMsg("请输入验证码！")
                return false
            }
            if (this.verificationCode.length != 4) {
                this.showMsg("验证码应为4位数字！")
                return false
            }
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
                if (response.data.code == 200) {
                    this.showRegMsg()
                    return false
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                    return false
                }
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
    background: #4C9CD6;
    font-size: 16px;
    color: #fff;
    border-radius: 4px;
}

.reg-btn-box{
    margin-bottom: 20px;
}
.reg-btn{
    padding: 8px 12px;
    background: #4C9CD6;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}
</style>