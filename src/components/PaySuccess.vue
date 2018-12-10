<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-if="type" v-on:click="goBack">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">支付结果</div>
        </div>
        <div class="empty"></div>
        <div class="congratulate">恭喜您，支付订单成功！</div>
  	</div>
</template>

<script>
import vueCookie from 'vue-cookie'
export default {
	name: 'PaySuccess',
  	data () {
		return {
			type: '',
			level: '',
			levelName: ''
		}
	},
	created: function () {
		this.type = this.$route.query.type
		
		this.level = this.$route.query.level
		if (this.level == 1)  {
			this.levelName = '会员'
		} else if (this.level == 2) {
			this.levelName = '中级会员'
		} else if (this.level == 3) {
			this.levelName = '高级会员'
		}

		if (this.type == 1) {
			this.showMsg("任务发布成功！")
		}
		if (this.type == 0) {
			vueCookie.set('userLevelID', this.level, 1)
			vueCookie.set('userLevel', this.levelName, 1)
			this.showMsg("您已成功开通" + this.levelName)
		}
	},
	methods: {
        goBack: function () {
			if (this.type == 1) {
				window.location.href = '/addHistory'
			} else if (this.type == 0) {
				vueCookie.set('userLevelID', this.level, 1)
				vueCookie.set('userLevel', this.levelName, 1)
				window.location.href = '/personal'
			}
		}
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