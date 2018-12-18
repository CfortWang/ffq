<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">我的上级</div>
        </div>
        <div class="empty"></div>
        <div class="recommender-id" v-if="hasRecommender">我的上级：{{recommenderID}}</div>
        <div class="reg-box" v-else>
            <div class="superior-id">
                <input type="number" name="superiorID" id="superiorID" v-model="recommenderID" placeholder="请输入上级ID"/>
            </div>
            <div class="reg-btn-box">
                <div class="reg-btn" v-on:click="setRecommend">提交绑定</div>
            </div>
        </div>
  	</div>
</template>

<script>
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Superior',
  	data () {
		return {
            recommenderID: '',
            hasRecommender: false
		}
	},
	created: function () {
        this.recommenderID = this.$route.query.recommenderID
        if (this.recommenderID != 0 && this.recommenderID != '' && this.recommenderID != null) {
            this.hasRecommender = true
        } else {
            this.hasRecommender = false
        }
	},
	methods: {
        setRecommend: function () {
            this.showLoading()
            request({ // 绑定上级
                method: 'POST',
                url: process.env.api_url + '/user/setRecommend',
                params: {
                    amount: this.recommenderID
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                if (response.data.code == 200) {
                    this.showMsg("您已成功绑定上级！")
                    this.hasRecommender = true
                } else {
                    this.showMsg(response.data.message)
                }
            }).catch((ex) => {
                this.hideLoading()
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
    background: #3492E9;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}
</style>