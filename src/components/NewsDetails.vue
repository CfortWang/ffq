<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">新闻详情</div>
        </div>
        <div class="empty"></div>
        
        <div id="center-contents" class="user-center-desk">
            <div class="user-center-desk border-top-ddd" style="background:#fff;text-align:left;padding:10px;">
                <div class="title" style="font-size:16px;">{{newsTitle}}</div>
                <div class="title" style="font-size:12px;margin-top:10px;color:#aaa;">{{newsCreateTime}}</div>
                <div class="title" style="font-size:16px;margin-top:10px;line-height:24px;">
                    <p>公告</p>
                    <p>尊敬的发发圈会员们大家好：</p>
                    <p>{{newsContent}}</p>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        </div>

  	</div>
</template>

<script>
import {request} from '../utils/httpAxios.js'
export default {
	name: 'NewsDetails',
  	data () {
		return {
            newsID: '',
            newsTitle: '',
            newsContent: '',
            newsCreateTime: ''
		}
	},
	created: function () {
        this.newsID = this.$route.query.id
        request({ // 获取消息详情
            method: 'GET',
            url: process.env.api_url + '/home/newsDetail',
            params: {
                id: this.newsID
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let responseData = response.data.data
            this.newsTitle = responseData.title
            this.newsCreateTime = responseData.created_at
            this.newsContent = responseData.content
        }).catch((ex) => {
            console.log(ex)
        })
	},
	methods: {

	}
}
</script>

<style scoped>

</style>