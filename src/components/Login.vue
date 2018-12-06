<template>
	<div class="content">
		<div class="header">
            <div class="header-title">会员登录</div>
        </div>
        <div class="empty"></div>
        <div class="login-box">
            <div class="phone-num-box">
                <input type="number" name="phoneNum" id="phoneNum" v-model="phoneNumber" placeholder="手机号码"/>
            </div>
            <div class="password-box">
                <input type="password" name="password" id="password" v-model="password" placeholder="登录密码"/>
            </div>
            <div class="remember-pwd"  v-on:click="changeStatus">
                <span>
                    <img class="selected" src="/static/img/index/selected.png" v-if="isRemember" alt="">
                    <img class="unselect" src="/static/img/index/unselect.png" v-else alt="">
                </span>
                <span style="font-size:16px;">记住密码</span>
            </div>
            <div class="login-btn-box" v-on:click="doLogin">
                <div class="login-btn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-desc">老用户请选择找回密码进行密码重置后登录。<a href="/userProtocol">用户协议</a></div>
                <div class="dividing-line"></div>
                <div class="bottom-btn clearfix">
                    <div class="find-pwd" v-on:click="jumpTo('/findPassword')">找回密码?</div>
                    <!-- <div class="register" v-on:click="jumpTo('/register')">免费注册</div> -->
                </div>
            </div>
        </div>
  	</div>
</template>

<script>
import vueCookie from 'vue-cookie'
export default {
	name: 'Login',
  	data () {
		return {
            phoneNumber: '',
            password: '',
            isRemember: false
		}
	},
	created: function () {
        if (this.$route.params.phoneNumber) {
            this.phoneNumber = this.$route.params.phoneNumber
        } else {
            this.phoneNumber = vueCookie.get('phoneNumber')
        }
        this.password = vueCookie.get('password')
        if (this.password) {
            this.isRemember = true
        }
	},
	methods: {
        changeStatus: function () {
            this.isRemember = !this.isRemember
        },
        doLogin: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            if (this.password == '' || this.password == null) {
                this.showMsg("请输入密码！")
                return false
            }
            this.showLoading()
            axios({ // 登录
                method: 'POST',
                url: process.env.api_url + '/login',
                params: {
                    phoneNumber: this.phoneNumber,
                    password: this.password
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                if (response.data.code == 200) {
                    if (this.isRemember) {
                        vueCookie.set('password', this.password, 1)
                    } else {
                        vueCookie.set('password', '', 1)
                    }
                    this.$router.push({name: 'Personal'})
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
.login-box{
	padding: 15px 15px 0px;
}
.phone-num-box, .password-box{
    height: 42px;
    margin-bottom: 15px;
}
.login-box input{
    box-sizing: border-box;
	width: 100%;
	padding: 12px;
	border: 1px solid #DDDDDD;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
}
.login-btn-box{
    margin-bottom: 20px;
}
.login-btn{
    padding: 8px 12px;
    background: #4C9CD6;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.remember-pwd{
    text-align: left;
    font-size: 14px;
    height: 20px;
    padding-bottom: 10px;
}
.remember-pwd span{
    vertical-align: top;
}
.unselect, .selected{
    width: 16px;
    vertical-align: top;
}

.bottom-desc{
    font-size: 12px;
    text-align: left;
}

.dividing-line{
    height: 1px;
    border-bottom: 1px solid #dddddd;
    margin: 5px 0px;
}

.find-pwd{
    float: left;
}
.register{
    float: right;
}
</style>