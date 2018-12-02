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
            <div class="task" v-on:click="jumpTo('/tasksHistoryDetails')">
                <span class="name">{{item.title}}</span>
                <span class="status"></span>
                <span class="price">￥{{item.price}}</span>
                <span class="type">{{item.type}}</span>
                <img class="arrow" src="/static/img/personal/gray-right-arrow.png" img="">
            </div>
        </div>

  	</div>
</template>

<script>
export default {
	name: 'TasksHistory',
  	data () {
		return {
            type: '0',
            taskList: '',
            allPage: '',
            pageSize: 10,
            pageNumber: 0
		}
	},
	created: function () {
        axios({ // 获取任务列表
            method: 'GET',
            url: process.env.api_url + '/task/list',
            params: {
                type: this.type,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.taskList = response.data.data
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