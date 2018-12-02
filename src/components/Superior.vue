<template>
	<div class="content">
		<div class="header">
            <div class="left-btn">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">我的上级</div>
        </div>
        <div class="empty"></div>
        <div class="recommender-id" v-if="isVerification">我的上级：{{recommendCode}}</div>
        <div class="reg-box" v-else>
            <div class="superior-id">
                <input type="number" name="superiorID" id="superiorID" v-model="recommendCode" placeholder="请输入上级ID"/>
            </div>
            <div class="reg-btn-box">
                <div class="reg-btn" v-on:click="setRecommend">提交绑定</div>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'FindPassword',
  	data () {
		return {
            isVerification: '',
			recommendCode: ''
		}
	},
	created: function () {
        let getParams = this.$route.params
        this.isVerification = getParams.isVerification
        this.recommendCode = getParams.recommenderID
        console.log(getParams)
	},
	methods: {
        setRecommend: function () {
            axios({ // 绑定上级
                method: 'POST',
                url: process.env.api_url + '/user/setRecommend',
                params: {
                    amount: this.recommendCode
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                let responseData = response.data.data
                console.log(responseData)
            }).catch((ex) => {
                console.log(ex)
            })
        }
	}
}
</script>

<style scoped>
.recommender-id{
    margin-top: 10px;
}
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
    background: #3492E9;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}
</style>