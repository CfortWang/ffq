<template>
	<div class="content">
        <div class="header">
            <div class="left-btn">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">新闻中心</div>
        </div>
        <div class="empty"></div>

		<div class="user-center-desk margin-top-10 border-top-ddd">
            <ul class="common-list">
				<li style="line-height:20px;padding:10px 0;">
                    <p class="" style="font-size:16px;">提现问题与奖励活动通知</p>
                    <p style="color:#aaa;font-size:12px;;">2018-11-24 13:26:32</p>
                </li>
            </ul>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'News',
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
.margin-top-10 {
    margin-top: 10px;
}
.border-top-ddd {
    border-top: 1px solid #eee;
}
.common-list {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
}
.common-list li {
    position: relative;
    line-height: 42px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

</style>
