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
                <input type="text" name="nickname" id="nickname" v-model="name" placeholder="您的称呼"/>
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
                <div class="verification-btn" v-on:click="getVerificationCode">发送验证码</div>
            </div>
            <div class="user-protocol" v-on:click="changeStatus">
                <img class="selected" src="/static/img/index/selected.png" v-if="isAgree" alt="">
                <img class="unselect" src="/static/img/index/unselect.png" v-else alt="">
                <span>《用户协议》</span>
            </div>
            <div class="reg-btn-box" v-on:click="doRigster">
                <div class="reg-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn clearfix">
                    <div class="find-pwd">忘记密码?</div>
                    <div class="login">已有账号，前往登录</div>
                </div>
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
            isAgree: false
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
                    type: 'register'
                }
            }).then((response) => {
                let responseMessage = response.data.message
                console.log(response)
            }).catch((ex) => {
                console.log(ex)
            })
        },
        changeStatus: function () {
            this.isAgree = !this.isAgree
        },
        doRigster: function () {
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
.selected{
    /* display: none; */
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

.bottom-box{
    
}

.find-pwd{
    float: left;
}
.login{
    float: right;
}
</style>