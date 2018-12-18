<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">用户帮助</div>
        </div>
        <div class="empty"></div>
        <div class="contain" v-html="help">
            
        </div>
  	</div>
</template>

<script>
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Help',
  	data () {
		return {
			help: ''
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
			this.help = responseData.help
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

</style>