<template>
	<div class="content">
		<div class="header">
            <div class="header-title">注册会员</div>
        </div>
        <div class="empty"></div>
        <div class="reg-box">
            <div class="phone-num">
                <input type="number" name="phoneNum" id="phoneNum" v-model="phoneNumber" placeholder="手机号码"/>
            </div>
            <!-- <div class="graphic-code">
                <input type="text" name="graphicCode" id="graphicCode" value="" placeholder="图形码"/>
            </div> -->
            <div class="nickname">
                <input type="text" name="nickname" id="nickname" v-model="name" placeholder="用户名"/>
            </div>
            <div class="password">
                <input type="password" name="password" id="password" v-model="password" placeholder="登录密码"/>
            </div>
            <div class="re-password">
                <input type="password" name="rePassword" id="rePassword" v-model="repreatPassword" placeholder="确认密码"/>
            </div>
            <div class="recommend">
                <input type="text" name="recommend" id="recommend" v-model="recommendCode" placeholder="推荐人ID"/>
            </div>
            <div class="verification-code">
                <input type="text" name="verificationCode" id="verificationCode" v-model="verificationCode" placeholder="验证码"/>
                <button class="verification-btn" v-on:click="getVerificationCode">发送验证码</button>
            </div>
            <div class="user-protocol">
                <span v-on:click="changeStatus">
                    <img class="selected" src="/static/img/index/selected.png" v-if="isAgree" alt="">
                    <img class="unselect" src="/static/img/index/unselect.png" v-else alt="">
                </span>
                <span  v-on:click="jumpTo('/userProtocol')">《用户协议》</span>
            </div>
            <div class="reg-btn-box" v-on:click="doRigster">
                <div class="reg-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn clearfix">
                    <div class="find-pwd" v-on:click="jumpTo('/findPassword')">忘记密码?</div>
                    <div class="login" v-on:click="jumpTo('/login')">已有账号，前往登录</div>
                </div>
            </div>
        </div>
        <div id="regMsg">
            <div class="msg-title">系统提示</div>
            <div class="reg-msg-contents">注册成功！</div>
            <div class="msg-buttons">
                <div class="ok-btn" id="msg-ok-btn" v-on:click="goToLogin">前往登录</div>
            </div>
        </div> 
  	</div>
</template>

<script>
export default {
	name: 'Register',
  	data () {
		return {
            name: '',
            phoneNumber: '',
            password: '',
            repreatPassword: '',
            recommendCode: '',
            verificationCode: '',
            isAgree: false,
            countDown: '',
            clearTimer: ''
		}
	},
	created: function () {
        this.recommendCode = this.$route.query.recommendCode
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
        timer: function (event) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var leftDate = minutes + ':' + seconds + '后重新获取'
            document.getElementsByClassName('verification-btn')[0].innerHTML = leftDate
		},
        getVerificationCode: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            this.countDown = 60
            axios({ // 获取验证码
                method: 'POST',
                url: process.env.api_url + '/login/msg',
                params: {
                    phoneNumber: this.phoneNumber,
                    type: 'register'
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    this.showMsg("验证码发送成功！")
                    document.getElementsByClassName('verification-btn')[0].style.backgroundColor = 'grey'
                    document.getElementsByClassName('verification-btn')[0].disabled = true
                    var timeLeft = this.countDown
                    this.timer(this.countDown)
                    var that = this;
                    (function (timeLeft) {
                        that.clearTimer = setInterval(() => {
                            that.timer(that.countDown)
                            that.countDown--
                            if (that.countDown < 0) {
                                document.getElementsByClassName('verification-btn')[0].style.backgroundColor = '#4C9CD6'
                                document.getElementsByClassName('verification-btn')[0].disabled = false
                                document.getElementsByClassName('verification-btn')[0].innerHTML = '重新获取'
                                clearInterval(that.clearTimer)
                            }
                        }, 1000)
                    })(timeLeft)
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch((ex) => {
                console.log(ex)
            })
        },
        changeStatus: function () {
            this.isAgree = !this.isAgree
        },
        doRigster: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            if (this.name == '' || this.name == null) {
                this.showMsg("请输入用户名！")
                return false
            }
            if (this.password == '' || this.password == null) {
                this.showMsg("请输入密码！")
                return false
            }
            if (this.repreatPassword == '' || this.repreatPassword == null) {
                this.showMsg("请确认密码！")
                return false
            }
            if (this.password != this.repreatPassword) {
                this.showMsg("两次输入密码不一致！")
                return false
            }
            if (this.recommendCode) {
                console.log("1")
                if (this.recommendCode.length != 6) {
                    this.showMsg("推荐码应为6位数字！")
                    return false
                }
            }
            if (this.verificationCode == '' || this.verificationCode == null) {
                this.showMsg("请输入验证码！")
                return false
            }
            if (this.verificationCode.length != 4) {
                this.showMsg("验证码应为4位数字！")
                return false
            }
            if (!this.isAgree) {
                this.showMsg("请仔细阅读并同意用户协议！")
                return false
            }
            axios({ // 注册
                method: 'POST',
                url: process.env.api_url + '/login/create',
                params: {
                    name: this.name,
                    phoneNumber: this.phoneNumber,
                    password: this.password,
                    repreatPassword: this.repreatPassword,
                    recommendCode: this.recommendCode,
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
    border: none;
}
.reg-box > .user-protocol{
    text-align: left;
    font-size: 14px;
    height: 20px;
    padding-top: 10px;
}
.user-protocol span{
    vertical-align: middle;
}
.unselect, .selected{
    width: 16px;
    vertical-align: middle;
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

.bottom-box{
    
}

.find-pwd{
    float: left;
}
.login{
    float: right;
}
</style>