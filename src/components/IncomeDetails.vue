<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">收支明细</div>
        </div>
        <div class="empty"></div>

        <ul class="amount-list" v-for="item in amountList" v-bind:key="item.index">
            <li>
                <span class="title">{{item.from_type}}</span>
                <span class="amount ">余额: {{item.amout}}</span>
                <span class="time">{{item.created_at}}</span>
                <span class="amount-change ">
                    <span v-if="!item.callout_type">+</span>
                    <span v-else>-</span>
                    <span>1</span>
                </span>
            </li>
        </ul>

        <div id="page" v-if="amountList.length">
            <div class="page">
                <a class="pre" v-on:click="getAmountList(pageNumber - 1, 'down')" hidefocus="true"><span>&lt;</span></a>
                <a class="info" id="info" hidefocus="true" v-on:click="showInput">{{pageNumber - 0 + 1}}/{{allPages}}</a>
                <input type="number" id="pageInput" v-model="inputNumber" v-on:blur="inputBlur">
                <a class="next" v-on:click="getAmountList(pageNumber + 1, 'up')" hidefocus="true"><span>&gt;</span></a>
            </div>
        </div>
        
        <div class="addresses-not-found" v-else>
            <div class="image">
                <img src="/static/img/personal/wind.png" style="width:128px;">
            </div>
            <div class="text">暂无数据...</div>
        </div>
        
        <!-- 底部 -->
		<div class="footer">
			<div class="homepage" v-on:click="jumpTo('/')">
				<div class="footer-icon">
					<img src="/static/img/index/index.png" alt="">
				</div>
				<div class="footer-text">首页</div>
			</div>
			<div class="task"  v-on:click="jumpTo('/tasks')">
				<div class="footer-icon">
					<img src="/static/img/index/tasks.png" alt="">
				</div>
				<div class="footer-text">任务中心</div>
			</div>
			<div class="personal" v-on:click="jumpTo('/personal')">
				<div class="footer-icon">
					<img src="/static/img/index/center-cur.png" alt="">
				</div>
				<div class="footer-text footer-active">个人中心</div>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
	name: 'IncomeDetails',
  	data () {
		return {
            amountList: [],
            allPages: '',
            pageSize: 10,
            inputNumber: 1,
            pageNumber: 0
		}
	},
	created: function () {
        this.showLoading()
        axios({ // 获取收支明细
            method: 'GET',
            url: process.env.api_url + '/user/accountList',
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.hideLoading()
            let responseData = response.data.data
            this.amountList = responseData.data
            this.allPages = Math.ceil(responseData.count / this.pageSize)
        }).catch((ex) => {
            this.hideLoading()
            this.showMsg(ex.response.data.message)
            console.log(ex)
        })
	},
	methods: {
        getAmountList: function (pageNumber, kind) {
            if (this.pageNumber == 0 && kind == 'down') {
                this.showMsg("当前已是第一页！")
                return false
            } 
            if (this.pageNumber == this.allPages - 1 && kind == 'up') {
                this.showMsg("当前已是最后一页！")
                return false
            }
            this.showLoading()
            this.pageNumber = pageNumber
            axios({ // 获取收支明细
                method: 'GET',
                url: process.env.api_url + '/user/accountList',
                params: {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                this.amountList = response.data.data.data
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
            axios({ // 获取收支明细
                method: 'GET',
                url: process.env.api_url + '/user/accountList',
                params: {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                this.amountList = response.data.data.data
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
.amount-list {
    background: #fff;
    border-bottom: 1px solid #eee;
}
.amount-list li {
    position: relative;
    height: 60px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
}
.amount-list li span.title {
    width: 55%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 14px;
    color: #222;
}
.amount-list li span.amount {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 12px;
    color: #444;
}
.amount-list li span.time {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
    color: #888;
}
.amount-list li span.amount-change {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #444;
    font-weight: bold;
}
#page {
    margin-bottom: 70px;
}
</style>