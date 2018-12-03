<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">任务记录</div>
        </div>
        <div class="empty"></div>
        
        <div class="task-list" v-for="item in taskList" v-bind:key="item.index">
            <div class="task" v-on:click="jumpTo('/tasksHistoryDetails?id=' + item.id)">
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

        <div class="addresses-not-found" v-if="noData">
            <div class="image">
                <img src="/static/img/personal/wind.png" style="width:128px;">
            </div>
            <div class="text">暂无数据...</div>
        </div>

  	</div>
</template>

<script>
export default {
	name: 'TasksHistory',
  	data () {
		return {
            taskStatus: '',
            taskList: '',
            allPage: '',
            pageSize: 10,
            pageNumber: 0,
            noData: false
		}
	},
	created: function () {
        this.taskStatus = this.$route.query.status
        axios({ // 获取任务列表
            method: 'GET',
            url: process.env.api_url + '/task/joinlist',
            params: {
                status: this.taskStatus,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.taskList = response.data.data
            console.log(this.taskList)
            if (this.taskList.length == 0) {
                this.noData = true
            }
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