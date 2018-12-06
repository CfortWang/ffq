<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">任务详情</div>
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
                            <td align="left">请将以下文案及图片发布到您的朋友圈（长按图片可保存图片到手机）</td>
                        </tr>
                        <tr>
                            <td align="left" style="border-bottom: 0px" v-html="taskDesc"></td>
                        </tr>
                        <tr>
                            <td style="border-top: 0px" align="center">
                                <div id="copy-btn" class="common-small-button" v-on:click="copyText">复制</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding: 0px 16px" v-for="item in taskImage" v-bind:key="item.index">
                <div>
                    <img style="width: 100%;height: 100%" v-bind:src="item">
                </div>
            </div>
            <div style="padding: 16px">
                <div class="common-theme-button" id="submit-button"  v-on:click="getTask">立即领取</div>
            </div>
        </div>
        <input id="taskDesc" type="text" v-model="taskDescText" readonly>

  	</div>
</template>

<script>
export default {
	name: 'TasksDetails',
  	data () {
		return {
            taskID: '',
            taskTitle: '',
            taskDesc: '',
            taskDescText: '',
            taskPrice: '',
            taskImage: []
		}
	},
	created: function () {
        this.taskID = this.$route.query.id
        axios({ // 获取任务详情
            method: 'GET',
            url: process.env.api_url + '/task/info',
            params: {
                code_url: this.taskID
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let responseData = response.data.data
            this.taskTitle = responseData.title
            this.taskDesc = responseData.content
            this.taskDescText = this.taskDesc.replace(/<\/?.+?\/?>/g, '')
            this.taskPrice = responseData.price
            this.taskImage = responseData.image
        }).catch((ex) => {
            this.showMsg(ex.response.data.message)
        })
	},
	methods: {
        copyText: function () {
            document.designMode = 'on'
            let b = document.getElementById("taskDesc")
            b.select()
            document.execCommand("copy")
            if (document.execCommand("copy")) {
                this.showMsg("复制成功")
            }
        },
        getTask: function () {
            axios({ // 领取任务
                method: 'POST',
                url: process.env.api_url + '/task/join',
                params: {
                    code_url: this.taskID
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                let responseMessage = response.data.message
                this.showMsg(responseMessage)
            }).catch((ex) => {
                this.showMsg(ex.response.data.message)
            })
        }
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
.common-small-button {
    text-align: center;
    padding: 7px;
    font-size: 16px;
    color: white;
    background: #4C9CD6;
    width: 60px;
}
.common-theme-button {
    text-align: center;
    padding: 7px;
    font-size: 16px;
    color: white;
    background: #4C9CD6;
}
#taskDesc{
    position: absolute;
    z-index: -1;
    top: 0px;
    right: 0px;
}
</style>