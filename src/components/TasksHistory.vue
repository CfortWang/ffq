<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">任务记录</div>
        </div>
        <div class="empty"></div>
        
        <div class="task-list">
            <div class="task">
                <span class="name">mo</span>
                <span class="status"></span>
                <span class="price">￥2.00</span>
                <span class="type">普通</span>
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
			
		}
	},
	created: function () {

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