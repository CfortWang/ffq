<template>
	<div class="content">
		<div class="header">
            <div class="header-title">会员登录</div>
        </div>
        <div class="empty"></div>
        <div class="login-box">
            <div class="phone-num-box">
                <input type="number" name="phoneNum" id="phoneNum" v-model="phoneNumber" placeholder="手机号或用户ID"/>
            </div>
            <div class="password-box">
                <input type="password" name="password" id="password" v-model="password" placeholder="登录密码"/>
            </div>
            <div class="login-btn-box" v-on:click="doLogin">
                <div class="login-btn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-desc">老用户请选择找回密码进行密码重置后登录。<a href="">用户协议</a></div>
                <div class="dividing-line"></div>
                <div class="bottom-btn clearfix">
                    <div class="find-pwd">找回密码?</div>
                    <div class="register">免费注册</div>
                </div>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'Login',
  	data () {
		return {
            phoneNumber: '',
            password: ''
		}
	},
	created: function () {

	},
	methods: {
        doLogin: function () {
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
                let responseMessage = response.data.message
                // console.log(response)
                this.$router.push({name: 'Personal'})
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
    background: #f67969;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
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