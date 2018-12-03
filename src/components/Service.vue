<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">联系客服</div>
        </div>
        <div class="empty"></div>
        
        <div id="contents" style="background-color: white">
        <img style="width: 100%" src="/static/img/personal/service.jpg">
        <table class="service-grid-table" cellpadding="0" cellspacing="0">
            <tbody><tr>
                <td class="blue" v-on:click="jumpTo('/service_zh')">
                    <div><img src="/static/img/personal/wx.png"></div>
                    <p class="title">综合客服</p>
                    <p class="text">&nbsp;</p>
                    <p class="text">&nbsp;</p>
                </td>
                <td class="green" v-on:click="jumpTo('/service_gg')">
                    <div><img src="/static/img/personal/logo.png"></div>
                    <p class="title">广告投放客服</p>
                    <p class="text">&nbsp;</p>
                    <p class="text">&nbsp;</p>
                </td>
            </tr>
            <tr>
                <td class="green"  v-on:click="jumpTo('http://fafaquan.mikecrm.com/YWNlmBb')">
                    <div><img src="/static/img/personal/jy.png"></div>
                    <p class="title">投诉建议</p>
                    <p class="text">&nbsp;</p>
                    <p class="text">&nbsp;</p>
                </td>
                <td class="blue">
                    <div><img src="/static/img/personal/sj.png"></div>
                    <p class="title">工作时间</p>
                    <p class="text">上午　09：00 - 12：00</p>
                    <p class="text">下午　14：00 - 18：00</p>
                </td>
            </tr>
        </tbody></table>
    </div>
        
  	</div>
</template>

<script>
export default {
	name: 'Service',
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
.service-grid-table {
    width: 100%;
    background-color: white;
    color: white;
    margin-top: 10px;
}
.service-grid-table tr .blue {
    background-color: #4C9CD6;
    margin-right: 8px;
}
.service-grid-table tr td {
    width: 40%;
}
.service-grid-table tr td {
    border: 0px solid white;
    padding: 20px 0px;
    font-size: 0.8rem;
}
.service-grid-table tr td img {
    width: 50%;
    padding-bottom: 0px;
}
.service-grid-table tr .title {
    font-size: 20px;
    padding: 4px;
}
.service-grid-table tr .green {
    background-color: #29cbce;
}

</style>