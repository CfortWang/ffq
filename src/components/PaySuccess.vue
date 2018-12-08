<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="jumpTo('/addHistory')">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">支付结果</div>
        </div>
        <div class="empty"></div>
        <div class="congratulate">恭喜您，支付订单成功！</div>
  	</div>
</template>

<script>
export default {
	name: 'PaySuccess',
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
.congratulate{
    font-size: 20px;
    color: #000;
    text-align: center;
    padding: 20px;
}
</style>