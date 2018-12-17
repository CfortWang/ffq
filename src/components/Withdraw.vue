<template>
	<div class="content">
		<!-- 资产 -->
    	<div class="my-assets">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="wallet-amount">
                <p class="wallet-title">可提现余额</p>
                <p class="wallet-amount">{{totalAmount}}</p>
            </div>
        </div>

		<div class="withdraw-table">
            <div class="withdraw-tr">
                <div class="withdraw-label">提现金额</div>
                <div class="withdraw-input">
                    <input type="number" name="amount" v-model="amount" placeholder="请输入提现金额">
                </div>
            </div>
            <div class="withdraw-tr">
                <div class="withdraw-label">提现方式</div>
                <div class="withdraw-input">
                    <select name="type" v-model="payMethod" id="">
                        <option value="">提现方式</option>
                        <option value="alipay">支付宝</option>
                    </select>
                </div>
            </div>
            <div class="withdraw-tr">
                <div class="withdraw-label">真实姓名</div>
                <div class="withdraw-input">
                    <input type="text" name="username" v-model="alipayName" placeholder="请输入真实姓名">
                </div>
            </div>
            <div class="withdraw-tr">
                <div class="withdraw-label">支付宝账号</div>
                <div class="withdraw-input">
                    <input type="text" name="amount" v-model="alipayAccount" placeholder="请输入支付宝帐号">
                </div>
            </div>
            <div class="withdraw-tr">
                <div class="withdraw-label">登录密码</div>
                <div class="withdraw-input">
                    <input type="password" name="amount" v-model="password" placeholder="请输入发发圈登录密码">
                </div>
            </div>
            <div class="withdraw-btn-box">
                <div class="withdraw-btn" v-on:click="cashOut">申请提现</div>
                <div class="withdraw-list" v-on:click="jumpTo('/withdrawList')">提现记录</div>
            </div>
        </div>

        <p class="tips">提示：提现需求提交，系统将会最快速度为您办理，资金会在24小时内转入您的支付宝钱包中。</p>
        <p class="remarks">注：提现服务费每笔5%。</p>

  	</div>
</template>

<script>
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Withdraw',
  	data () {
		return {
            totalAmount: '',
            amount: '',
            payMethod: '',
            alipayName: '',
            alipayAccount: '',
            password: ''
		}
	},
	created: function () {
        request({ // 获取总资产
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
        cashOut: function () {
            if (this.amount == '' || this.amount == null) {
                this.showMsg("请输入提现金额！")
                return false
            }
            if (this.payMethod == '' || this.payMethod == null) {
                this.showMsg("请选择提现方式！")
                return false
            }
            if (this.alipayName == '' || this.alipayName == null) {
                this.showMsg("请输入您的真实姓名！")
                return false
            }
            if (this.alipayAccount == '' || this.alipayAccount == null) {
                this.showMsg("请输入支付宝账号！")
                return false
            }
            if (this.password == '' || this.password == null) {
                this.showMsg("请输入发发圈登录密码！")
                return false
            }
            request({ // 申请提现
                method: 'POST',
                url: process.env.api_url + '/user/cashout',
                params: {
                    amount: this.amount,
                    pay_method: this.payMethod,
                    alipay_name: this.alipayName,
                    alipay_account: this.alipayAccount,
                    pw: this.password
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                if (response.data.code == 200) {
                    this.showMsg("申请提现成功！")
                    return false
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch((ex) => {
                console.log(ex)
            })
        }
	}
}
</script>

<style scoped>
.my-assets{
    height: 95px;
    padding: 40px 0;
    background: -webkit-linear-gradient(180deg,#4C9CD6,#2d9cec);
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
}

.withdraw-table{
    border-bottom: 1px solid #eee;
    background: #fff;
    font-size: 0px;
}
.withdraw-tr{
    height: 58px;
    line-height: 58px;

}
.withdraw-tr > div{
    display: inline-block;
    text-align: left;
    vertical-align: middle;
    box-sizing: border-box;

}
.withdraw-label{
    width: 30%;
    padding-left: 15px;
    font-size: 16px;
}
.withdraw-input{
    width: 70%;
    line-height: 58;
}
.withdraw-input input{
    height: 36px;
    width: 90%;
    font-size: 16px;
    border: 1px solid #EEE;
    padding-left: 10px;
}
.withdraw-input select{
    box-sizing: content-box;
    height: 38px;
    width: 90%;
    font-size: 16px;
    border: 1px solid #EEE;
    padding-left: 10px;
}
select:focus{
    outline: none;
}
.withdraw-btn-box{
    padding: 15px 0px;
}
.withdraw-btn-box > div{
    font-size: 16px;
    width: 45%;
    display: inline-block;
    background: #4C9CD6;
    color: #fff;
    height: 35px;
    line-height: 35px;
}
.withdraw-btn-box > .withdraw-list{
    color: #333;
    border: 1px solid #eeeeee;
    background: #fff;
    margin-left: 3%;
}

.tips, .remarks{
    padding:10px;
    color:#888;
    font-size:16px;
    text-align:left;
}
.remarks{
    padding:2px 10px;
}
</style>
