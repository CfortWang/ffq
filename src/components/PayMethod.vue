<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">支付订单</div>
        </div>
        <div class="empty"></div>
        <div>
            <div class="wechat-pay justified" data-way="wechat" v-on:click="changePay($event)">
                <div class="wechat-icon">
                    <img src="/static/img/personal/wechat-pay.png"/>
                    <span>微信支付</span>
                </div>
                <div class="pay-choose">
                    <img src="/static/img/personal/pay-choose.png"/>
                </div>
            </div>
            <div class="alipay justified" data-way="alipay" v-on:click="changePay($event)">
                <div class="alipay-icon">
                    <img src="/static/img/personal/ali-pay.png"/>
                    <span>支付宝支付</span>
                </div>
                <div class="pay-choose">
                    <img src="/static/img/personal/pay-choose.png"/>
                </div>
            </div>
            <div class="sure-pay-btn" v-on:click="goToPay"><span>确认支付</span></div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'PayMethod',
  	data () {
		return {
            payWay: 'wechat',
            payReturnUrl: '',
            payType: '',
            payID: ''
		}
	},
	created: function () {
        var getParams = this.$route.params
        this.payID = getParams.payID
        this.payType = getParams.payType
        
	},
	methods: {
        changePay: function (e) {
            this.payWay = e.currentTarget.getAttribute('data-way')
            document.getElementsByClassName('pay-choose')[0].style.display = 'none'
            document.getElementsByClassName('pay-choose')[1].style.display = 'none'
            e.currentTarget.children[1].style.display = 'block'
        },
        goToPay: function () {
            this.showLoading()
            if (this.payWay == 'alipay') {
                this.payReturnUrl = 'http://localhost:8080/paySuccess'
                axios({
                    method: 'POST',
                    url: process.env.api_url + '/pay/ali',
                    params: {
                        type: this.payType,
                        id: this.payID,
                        return_url: this.payReturnUrl
                    },
                    withCredentials: true,
                    headers: {'lang': 'zh', 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then((response) => {
                    this.hideLoading()
                    console.log(response)
                    if (response.status == 200) {
                        console.log("===")
                        let div = document.createElement("div")
                        div.innerHTML = response.data
                        document.body.appendChild(div)
                        // document.getElementsByTagName('form')[0].setAttribute("target") = '_blank';
                        console.log(document.getElementsByTagName('form')[0])
                    } else {
                        console.log('error~')
                    }
                }).catch((ex) => {
                    this.hideLoading()
                    console.log(ex)
                })
            }
        }
	}
}
</script>

<style scoped>
.justified{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.wechat-pay, .alipay{
	padding: 15px;
	background: #FFFFFF;
	font-family: "PingFangSC-Regular";
	color: #333333;
}
.wechat-pay{
	box-shadow:0px 0px 0px 0px rgba(221,221,221,1);
	border-bottom: 1px solid #DDDDDD;
}
.alipay{
	box-shadow:0px 0px 0px 0px rgba(221,221,221,1);
}
.wechat-icon, .alipay{
	height: 20px;
}
.wechat-icon img, .alipay-icon img{
	width: 20px;
}
.wechat-icon span, .alipay-icon span{
	font-size: 14px;
	line-height: 20px;
	vertical-align: top;
}
.pay-choose{
	display: none;
	height: 20px;
}
.wechat-pay .pay-choose{
	display: block;
}
.pay-choose img{
	width: 16px;
}
.sure-pay-btn{
	width: 70%;
	margin-left: 15%;
	margin-top: 30px;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
	padding: 10px 0px;
}
.sure-pay-btn span{
	line-height: 25px;
}
</style>