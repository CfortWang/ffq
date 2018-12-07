<template>
	<div class="content">
    	<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">提现申请列表</div>
        </div>
        <div class="empty"></div>

		<div class="user-center-desk clearfix" v-for="item in withdrawList" v-bind:key="item.index">
            <ul class="common-list clearfix">
                <li class="maininfo clearfix" v-on:click="showDetails">
                    <span class="title">
                        <span v-if="item.status">提现成功</span>
                        <span v-else>审核失败</span>
                    </span>
                    <span class="price">{{item.amount}}</span>
                    <div class="view-details common-noswap">
                        <img src="/static/img/personal/gray-down-arrow.png">
                    </div>
                    <span class="viewmore"></span>
                </li>
                <li class="subinfo clearfix">
                    <div class="clearfix">
                        <span class="title">申请时间</span>
                        <span class="info">{{item.created_at}}</span>
                    </div>
                    <div class="clearfix">
                        <span class="title">审核时间</span>
                        <span class="info">{{item.updated_at}}</span>
                    </div>
                    <div class="clearfix" v-if="item.status">
                        <span class="title">提现时间</span>
                        <span class="info">{{item.paid_at}}</span>
                    </div>
                    <div class="clearfix">
                        <span class="title">提现手续费</span>
                        <span class="info">{{item.amount * 0.05}}</span>
                    </div>
                    <div class="clearfix">
                        <span class="title">已提现</span>
                        <span class="info">{{item.cashout_amount}}</span>
                    </div>
                    <div class="clearfix" v-if="!item.status">
                        <span class="title">原因</span>
                        <span class="info">{{item.refuse_reason}}</span>
                    </div>
                </li>
            </ul>
        </div>

        <div id="page" v-if="withdrawList.length">
            <div class="page"><a class="pre" v-on:click="getWithdrawList(pageNumber - 1, 'down')" hidefocus="true"><span>&lt;</span></a><a class="info" hidefocus="true">{{pageNumber + 1}}/{{allPages}}</a><a class="next" v-on:click="getWithdrawList(pageNumber + 1, 'up')" hidefocus="true"><span>&gt;</span></a></div>
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
	name: 'WithdrawList',
  	data () {
		return {
            withdrawList: [],
            allPages: '',
            pageSize: 10,
            pageNumber: 0,
            show: false
		}
	},
	created: function () {
        this.showLoading()
        axios({ // 获取提现记录
            method: 'GET',
            url: process.env.api_url + '/user/cashoutList',
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.hideLoading()
            this.withdrawList = response.data.data.data
            this.allPages = Math.ceil(response.data.data.count / this.pageSize)
        }).catch((ex) => {
            this.hideLoading()
            this.showMsg(ex.response.data.message)
        })
	},
	methods: {
        showDetails: function (event) {
            var el = event.currentTarget.nextElementSibling
            this.show = !this.show
            if (this.show) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        },
        getWithdrawList: function (pageNumber, kind) {
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
            axios({ // 获取任务数据
                method: 'GET',
                url: process.env.api_url + '/user/cashoutList',
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
            })
        }
	}
}
</script>

<style scoped>
.common-list {
    background: #fff;
    /* border-bottom: 1px solid #eee; */
    padding-left: 10px;
}
.common-list li {
    position: relative;
    line-height: 42px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
}
.common-list li span.title {
    float: left;
}

.common-list li span.price {
    float: right;
    padding-right: 32px;
    color: red;
}
.common-list li div.view-details {
    position: absolute;
    height: 6px;
    width: 9px;
    right: 10px;
    margin-top: -2px;
}
.common-list li div.view-details img {
    width: 100%;
    height: 100%;
}
.common-list li.subinfo {
    line-height: 36px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
    color: #888;
    display: none;
}
.common-list li .info {
    float: right;
    padding-right: 15px;
}
</style>
