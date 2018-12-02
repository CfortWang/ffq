<template>
	<div class="content">
        <div id="center-contents">
            <div class="head">
                <div id="header" style="height: 0px !important;">
                    <div class="header">
                        <div class="left-btn" id="back-btn"><i class="icon-back"></i></div>
                    </div>
                </div>
                <div class="header-title" style="font-size: 18px;padding:15px 0px;">开通会员</div>
                <img src="/static/img/personal/avatar.png" class="user-avatar">
                <div class="user-nickname" style="padding-top: 6px">cfort</div>
                <div class="user-desc">已开通中级会员</div>
                <div style="overflow: hidden;text-decoration: line-through;margin: 0px 8px "></div>
            </div>
            <div class="vip-list" data-index="1">
                <div class="desc">会员</div>
                <div class="price">￥98</div>
            </div>
            <div class="vip-list" data-index="2">
                <div class="desc">中级会员</div>
                <div class="price">￥368</div>
            </div>
            <div class="vip-list" data-index="3">
                <div class="desc">高级会员</div>
                <div class="price">￥988</div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div style="text-align: left;margin: 4px 20px;border: 1px solid #EEE;font-size: 16px;display: none">
            <div style="padding: 8px 0px">
                <input type="radio" checked="" name="payment" value="WEIXINPAY">
                <span>微信支付</span>
                <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="http://adv.xcnong.com/templates/images/wxpay.png">
            </div>
            <div style="padding: 8px 0px;border-top: 1px solid #EEE;display: ">
                <input type="radio" name="payment" value="ALIPAY">
                <span>支付宝支付</span>
                <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="http://adv.xcnong.com/templates/images/alipay.png">
            </div>
        </div>

        <div style="color:#111;text-align:left;margin-bottom:10px;padding-top:1rem;padding-left: 5%;opacity: 0.5 ">
            <input type="checkbox" checked="" name="no">
            开通即表示您同意<strong style="color:#111;">《用户协议》</strong>
        </div>
        <div style="text-align: left;padding: 8px 16px">加入会员（或中级会员）可领取会员任务大厅（或中级任务大厅）的任务，同时可投放广告,也可以领取自己发布的广告。</div>
        <div style="padding: 8px">
            <div class="common-theme-button">立即开通</div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'JoinVip1',
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
    
</style>
