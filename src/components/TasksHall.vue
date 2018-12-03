<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">任务大厅</div>
        </div>
        <div class="empty"></div>
        
        <div class="task-list" v-for="item in tasksList" v-bind:key="item.index">
            <div class="task" v-on:click="jumpTo('/tasksDetails?id=' + item.code_url)" style="border-bottom:4px solid #eee;margin-top: 0px ">
                <span class="name">{{item.title}}</span>
                <span class="status"></span>
                <span class="price">￥{{item.price}}</span>
                <span class="type">{{item.type}}</span>
                <img class="arrow" src="/static/img/personal/gray-right-arrow.png" img="">
            </div>
        </div>
        <div id="page">
            <div class="page"><a class="pre" hidefocus="true"><span>&lt;</span></a><a class="info" hidefocus="true">1/1</a><a class="next" hidefocus="true"><span>&gt;</span></a></div>
        </div>

        <div style="text-align: left;padding: 8px 16px" class="rules">
            <table class="common_table" cellspacing="0" cellpadding="0" style="font-size:12px;">
                <tbody>
                    <tr class="noborder tdtitle">
                        <td>
                            <span>领取规则:</span><br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <span style="font-size:14px;">
                <span>1.每天可领取2条任务发布至朋友圈；</span><br>
                <span>2.发布任务时必须与平台内的文案、图片一致；</span><br>
                <span>3.发布朋友圈不得屏蔽微信好友查看；</span><br>
                <span>4.提交任务上传图片时必须间隔至少2小时。</span>
            </span>
            <p>
                <span><img src="/static/img/tasks/example.jpg" alt=""><br></span> 
            </p>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'TasksHall',
  	data () {
		return {
            type: '',
            pageNumber: 0,
            pageSize: 10,
            tasksList: []
		}
	},
	created: function () {
        this.type = this.$route.query.type
        this.getTasksList(this.type, this.pageSize, this.pageNumber)
	},
	methods: {
        getTasksList: function (type, pageSize, pageNumber) {
            axios({ // 获取任务数据
                method: 'GET',
                url: process.env.api_url + '/task/list',
                params: {
                    type: type,
                    pageSize: pageSize,
                    pageNumber: pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.tasksList = response.data.data
            }).catch((ex) => {
                console.log(ex.response.data.message)
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
#page {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
}
#page .page a.pre {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #eee;
    color: #888;
    width: 44px;
    height: 44px;
    border-radius: 3px 0 0 5px;
}
#page .page a.info {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    color: #888;
    padding: 0 20px;
    height: 44px;
}
#page .page a.next {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #eee;
    color: #888;
    width: 44px;
    height: 44px;
    border-radius: 0 5px 5px 0;
}
p img{
    width: 100%;
}
</style>