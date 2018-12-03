<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">任务信息</div>
        </div>
        <div class="empty"></div>
        <div class="contain">
            <div class="task-details">
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="left">清洁品牌——净态</td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 0px" id="content">
                                <span>中国氧系清洁领导品牌——净态·懒人神器，开启清洁新时代</span><br>
                                <span>去霉渍、衣服发黄、厨房用具油污垢等等</span><br>
                                <span>懒人的最爱，让你摆脱清洁厨房卫生的烦恼</span><br>
                                <span>欢迎咨询了解</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding: 0px 16px">
                                    <img style="width: 100%" src="/static/img/personal/qrCode.png">
                                </div>
                                <div>
                                    <img style="width: 100%" src="/static/img/personal/qrCode.png">
                                </div>
                            </td>
                        </tr>

                        <tr id="mode-1">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="upload-image-body">
                                    <input type="file" name="img" value="">
                                    <div class="common-s-button" id="upload-button">上传图片</div>
                                </div>
                            </td>
                        </tr>

                        <tr id="mode-2" style="display: none">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="fileList" class="uploader-list"></div>
                                <input value="上传图片" style="width: 80px;height:30px;text-align: center">
                                <input type="file" id="image" name="image" value="" style="width:0;height:0;overflow:hidden;margin-top:-9999px;">
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="tips" style="font-size: 16px;padding: 4px;color: indianred;display: none">上传图片成功</div>
                                <div data-mode="2" id="mode-change-button">切换上传模式</div>
                            </td>
                        </tr>

                        <tr>
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div>
                                    <div class="common-theme-button" id="submit-button">提交任务</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="text" name="name" value="1" style="display: none">
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'TasksHistoryDetails',
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

#upload-image-body {
    background: none;
    position: relative;
}
#upload-image-body input {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    opacity: 0;
    left: 0;
}

#upload-image-body input {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    opacity: 0;
    left: 0;
}
.common-s-button {
    text-align: center;
    padding: 7px;
    font-size: 14px;
    color: white;
    background: #4C9CD6;
    margin: 4px;
    width: 64px;
}

</style>