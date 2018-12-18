<template>
	<div class="content">
        <div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">公司简介</div>
        </div>
        <div class="empty"></div>
        <div class="user-center-desk border-top-ddd" style="background:#fff;text-align:left;padding:10px;" v-html="company">
            
        </div>
  	</div>
</template>

<script>
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Introduction',
  	data () {
		return {
			company: ''
		}
	},
	created: function () {
		this.showLoading()
        request({ // 获取协议数据
			method: 'GET',
			url: process.env.api_url + '/home/protocol'
		}).then((response) => {
            this.hideLoading()
            let responseData = response.data.data
			this.company = responseData.company
		}).catch((ex) => {
            this.hideLoading()
			console.log(ex)
		})
	},
	methods: {
		
	}
}
</script>

<style scoped>
p img {
    width: 100%;
    height: auto;
}
</style>
