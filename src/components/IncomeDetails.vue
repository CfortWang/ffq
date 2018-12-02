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

        <div id="page">
            <div class="page">
                <a class="pre" v-on:click="getAmountList(pageSize, pageNumber-1)"><span>&lt;</span></a><a class="info" hidefocus="true">{{pageNumber+1}}/{{allPage}}</a><a class="next" v-on:click="getAmountList(pageSize, pageNumber+1)"><span>&gt;</span></a>
            </div>
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
            amountList: '',
            allPage: '',
            pageSize: 10,
            pageNumber: 0
		}
	},
	created: function () {
        this.getAmountList(this.pageSize, this.pageNumber)
	},
	methods: {
        getAmountList: function (pageSize, nowPage) {
            axios({ // 获取收支明细
                method: 'GET',
                url: process.env.api_url + '/user/accountList',
                params: {
                    pageSize: pageSize,
                    pageNumber: nowPage
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                let responseData = response.data.data
                console.log(responseData)
                this.amountList = responseData.data
                this.allPage = Math.ceil(responseData.all / this.pageSize)
            }).catch((ex) => {
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
</style>