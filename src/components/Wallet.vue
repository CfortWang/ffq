<template>
	<div class="content">
		<!-- 资产 -->
    	<div class="my-assets">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="wallet">
                <p class="wallet-title">我的总资产</p>
                <p class="wallet-amount">{{totalAmount}}</p>
            </div>
        </div>
        <div class="details" v-on:click="jumpTo('incomeDetails')">收支明细</div>
        <div class="withdraw" v-on:click="jumpTo('withdraw')">我要提现</div>

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
	name: 'Wallet',
  	data () {
		return {
			totalAmount: ''
		}
	},
	created: function () {
        axios({ // 获取总资产
            method: 'GET',
            url: process.env.api_url + '/user/account',
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let responseData = response.data.data
            this.totalAmount = responseData.total_amount
        }).catch((ex) => {
            console.log(ex)
        })
	},
	methods: {

	}
}
</script>

<style scoped>
.my-assets{
    /* height: 95px; */
    padding: 40px 0;
    background: -webkit-linear-gradient(180deg,#4C9CD6,#2d9cec);
}
.wallet{
    padding-bottom: 20px;
}
.wallet-title{
    font-size: 13px;
    color: #ffffff;
    font-weight: 300;
}
.wallet-amount{
    font-size: 38px;
    font-weight: bold;
    color: #ffffff;
    padding-top: 10px;
    line-height: 50px;
}
.details, .withdraw{
    background: #ffffff;
    font-size: 16px;
    text-align: left;
    padding: 15px 10px;
}
.details{
    margin-bottom: 7px;
}
</style>
