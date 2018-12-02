<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">发布任务详情</div>
        </div>
        <div class="empty"></div>
        
        <div class="contain">
			<div class="task-details">
				<table cellpadding="0" cellspacing="0">
					<tbody>
						<tr>
							<td align="left">mo</td>
						</tr>
						<tr>
							<td align="left">请将以下文案及图片发布到您的朋友圈（长按图片可保存图片到手机）</td>
						</tr>
						<tr>
							<td align="left" style="border-bottom: 0px" id="content">，l</td>
						</tr>
						<tr>
							<td style="border-top: 0px" align="center">
								<div id="copy-btn" class="common-small-button">复制</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div style="padding: 0px 16px">
				<div>
					<img style="width: 100%;height: 100%" src="https://ffq-adv.oss-cn-shenzhen.aliyuncs.com/static/images/goods/2508aeff1344c53ce521cb5025cad3de.jpg">
				</div>
			</div>
			<div style="padding: 16px">
				<div class="common-theme-button" id="submit-button">立即领取</div>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
	name: 'AddHistoryDetails',
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
.contain{
	background: #fff;
}
.task-details {
    padding: 8px 16px;
    margin: 16px;
    border: 1px solid #eee;
}
.task-details table {
    width: 100%;
}
.task-details table tr td {
    padding: 8px 8px;
    border-bottom: 1px solid #eee;
}
.common-theme-button {
    text-align: center;
    padding: 7px;
    font-size: 16px;
    color: white;
    background: #4C9CD6;
}
</style>