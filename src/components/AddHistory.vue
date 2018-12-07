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

        <div id="page" v-if="addList.length">
            <div class="page">
                <a class="pre" v-on:click="getAddList(pageNumber - 1, 'down')" hidefocus="true"><span>&lt;</span></a>
                <a class="info" id="info" hidefocus="true" v-on:click="showInput">{{pageNumber - 0 + 1}}/{{allPages}}</a>
                <input type="number" id="pageInput" v-model="inputNumber" v-on:blur="inputBlur">
                <a class="next" v-on:click="getAddList(pageNumber + 1, 'up')" hidefocus="true"><span>&gt;</span></a>
            </div>
        </div>
        
        <div class="addresses-not-found" v-else>
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
            inputNumber: 1,
            pageSize: 10,
            allPages: '',
            addList: []
		}
	},
	created: function () {
        this.showLoading()
        axios({ // 获取任务数据
            method: 'GET',
            url: process.env.api_url + '/task/ownlist',
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.hideLoading()
            this.addList = response.data.data.data
            this.allPages = Math.ceil(response.data.data.count / this.pageSize)
        }).catch((ex) => {
            this.hideLoading()
            this.showMsg(ex.response.data.message)
            console.log(ex)
        })
	},
	methods: {
        getAddList: function (pageNumber, kind) {
            if (this.pageNumber == 0 && kind == 'down') {
                this.showMsg("当前已是第一页！")
                return false
            } 
            if (this.pageNumber == this.allPages - 1 && kind == 'up') {
                this.showMsg("当前已是最后一页！")
                return false
            }
            this.pageNumber = pageNumber
            this.showLoading()
            axios({ // 获取任务数据
                method: 'GET',
                url: process.env.api_url + '/task/ownlist',
                params: {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                this.addList = response.data.data.data
            }).catch((ex) => {
                this.hideLoading()
                this.showMsg(ex.response.data.message)
                console.log(ex)
            })
        },
        inputBlur: function () {
            if (this.inputNumber < 1) {
                this.showMsg("请输入大于0的页数！")
                return false
            }
            if (this.inputNumber > this.allPages) {
                this.showMsg("跳转页数不得超过最大页数")
                return false
            }
            this.showLoading()
            this.pageNumber = this.inputNumber - 1
            document.getElementById('info').style.display = 'inline-block'
            document.getElementById('pageInput').style.display = 'none'
            axios({ // 获取任务数据
                method: 'GET',
                url: process.env.api_url + '/task/ownlist',
                params: {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                this.addList = response.data.data.data
            }).catch((ex) => {
                this.hideLoading()
                this.showMsg(ex.response.data.message)
                console.log(ex)
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