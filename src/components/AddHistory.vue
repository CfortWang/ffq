<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">发布记录</div>
        </div>
        <div class="empty"></div>
        
        <div class="task-list" v-for="item in addList" v-bind:key="item.index">
            <div class="task" v-on:click="jumpTo('/addHistoryDetails?id=' + item.code_url)">
                <span class="name">{{item.title}}</span>
                <span class="status"></span>
                <span class="price">￥{{item.price}}</span>
                <span class="type">
                    <span v-if="item.user_level == 0">普通</span>
                    <span v-else-if="item.user_level == 1">会员</span>
                    <span v-else-if="item.user_level == 2">中级</span>
                    <span v-else>高级</span>
                </span>
                <img class="arrow" src="/static/img/personal/gray-right-arrow.png" img="">
            </div>
        </div>
        
        <div class="addresses-not-found" v-if="!addList.length">
            <div class="image">
                <img src="/static/img/personal/wind.png" style="width:128px;">
            </div>
            <div class="text">暂无数据...</div>
        </div>

  	</div>
</template>

<script>
export default {
	name: 'AddHistory',
  	data () {
		return {
            pageNumber: 0,
            pageSize: 10,
            addList: []
		}
	},
	created: function () {
        this.getAddList(this.pageSize, this.pageNumber)
	},
	methods: {
        getAddList: function (pageSize, pageNumber) {
            axios({ // 获取任务数据
                method: 'GET',
                url: process.env.api_url + '/task/ownlist',
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.addList = response.data.data
            }).catch((ex) => {
                this.showMsg(ex.response.data.message)
            })
        }
	}
}
</script>

<style scoped>
.task-list .task {
    background-color: white;
    height: 60px;
    margin-top: 4px;
    width: 100%;
    position: relative;
}
.task-list .task .name {
    font-size: 14px;
    position: absolute;
    top: 8px;
    left: 16px;
}
.task-list .task .status {
    font-size: 14px;
    position: absolute;
    bottom: 8px;
    left: 16px;
    color: #666;
}
.task-list .task .price {
    font-size: 16px;
    position: absolute;
    top: 8px;
    right: 36px;
    color: red;
}
.task-list .task .type {
    font-size: 14px;
    position: absolute;
    bottom: 8px;
    right: 36px;
    color: #666;
}
.task-list .task .arrow {
    position: absolute;
    bottom: 24px;
    right: 14px;
    width: 8px;
}
</style>