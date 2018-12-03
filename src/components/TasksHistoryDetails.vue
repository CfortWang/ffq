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
                            <td align="left">{{taskTitle}}</td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 0px" id="content">{{taskDesc}}</td>
                        </tr>
                        <tr>
                            <td>
                                <div v-for="item in taskImage" v-bind:key="item.index">
                                    <img style="width: 100%" v-bind:src="item">
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
                        <tr v-if="taskStatus == 1 || taskStatus == 2">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="tips" style="font-size: 16px;padding: 4px;color: indianred;text-align: center;"></div>
                            </td>
                        </tr>

                        <tr v-if="taskStatus == 0">
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
			taskID: '',
            taskTitle: '',
            taskDesc: '',
            taskStatus: '',
            taskImage: []
		}
	},
	created: function () {
        this.taskID = this.$route.query.id
        axios({ // 获取任务详情
            method: 'GET',
            url: process.env.api_url + '/task/detail',
            params: {
                id: this.taskID
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let task = response.data.data.task
            this.taskTitle = task.title
            this.taskDesc = task.content
            this.taskImage = task.image
            this.taskStatus = response.data.data.status
            if (this.taskStatus == 1) {
                document.getElementById('tips').innerText = "已完成"
            } else if (this.taskStatus == 2) {
                document.getElementById('tips').innerText = "审核被拒"
            }
        }).catch((ex) => {
            this.showMsg(ex.response.data.message)
        })
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
.common-theme-button {
    text-align: center;
    padding: 7px;
    font-size: 16px;
    color: white;
    background: #4C9CD6;
}
</style>