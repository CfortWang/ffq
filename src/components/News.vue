<template>
	<div class="content">
        <div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">新闻中心</div>
        </div>
        <div class="empty"></div>

		<div class="user-center-desk margin-top-10 border-top-ddd">
            <ul class="common-list" v-for="item in newsList" v-bind:key="item.index">
				<li style="line-height:20px;padding:10px 0;" v-on:click="jumpTo('/newsDetails?id=' + item.id)">
                    <p class="" style="font-size:16px;">{{item.title}}</p>
                    <p style="color:#aaa;font-size:12px;;">{{item.created_at}}</p>
                </li>
            </ul>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'News',
  	data () {
		return {
			newsList: '',
            allPage: '',
            pageSize: 10,
            pageNumber: 0
		}
	},
	created: function () {
		axios({ // 获取消息列表
            method: 'GET',
            url: process.env.api_url + '/home/news',
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.newsList = response.data.data
            console.log(this.newsList)
            // this.allPage = Math.ceil(responseData.all / this.pageSize)
        }).catch((ex) => {
            console.log(ex)
        })
	},
	methods: {
		
	}
}
</script>

<style scoped>
.margin-top-10 {
    margin-top: 10px;
}
.border-top-ddd {
    border-top: 1px solid #eee;
}
.common-list {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
}
.common-list li {
    position: relative;
    line-height: 42px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

</style>
