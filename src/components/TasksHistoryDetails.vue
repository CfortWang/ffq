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

                        <tr>
                            <td v-if="imageArr.length">
                                <div class="image-titl">已上传图片：</div>
                                <div class="image">
                                    <div class="image-div" v-for="(item, index) in imageArr" v-bind:key="index" :data-index="index" v-on:click="deleteImage">
                                        <img v-bind:src="item" alt="">
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr id="mode-1">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="upload-image-body">
                                    <a href="javascript:;" class="file">上传图片
                                        <input type="file" class="" id="" name="file" v-on:change="uploadIamge($event)">
                                    </a>
                                    <div class="upload-desc">点击图片可删除</div>
                                </div>
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
                                    <div class="common-theme-button" id="submit-button" v-on:click="uploadTask">提交任务</div>
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
            fileData: '',
            imageArr: [],
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
        uploadIamge: function (event) {
            let file = event.target.files[0]
            this.fileData = new FormData()
            this.fileData.append('file', file)
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            }
            axios.post('http://47.99.75.151:8080/upload/image',this.fileData,config).then(response => {
                if (response.data.code == 200) {
                    let imageUrl = response.data.data.url
                    this.imageArr.push(imageUrl)
                    this.showMsg("图片上传成功！")
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch(ex => {
                console.log(ex)
            })
        },
        deleteImage: function (e) {
            let self = e.currentTarget
            let parent = self.parentElement
            parent.removeChild(self)
            let index = self.getAttribute('data-index')
            delete this.imageArr[index]
        },
        uploadTask: function () {
            if (this.imageArr == '' || this.imageArr == null) {
                this.showMsg("请上传图片！")
                return false
            }
            axios({ // 提交任务
                method: 'POST',
                url: process.env.api_url + '/task/done',
                params: {
                    id: this.taskID,
                    image: this.imageArr
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                console.log(response)
                if (response.data.code == 200) {
                    this.showMsg("任务提交成功！")
                    window.location.href = window.location.href
                    return false
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                    return false
                }
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

#upload-image-body {
    background: none;
    position: relative;
    text-align: center;
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

.image{
    padding: 10px 0px;
    /* text-align: justify; */
    text-align: center;
}
.image > div{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-right: 15px;
    margin-bottom: 10px;
    border: 1px solid #eee;
}
.image-div img{
    width: 100%;
    height: 100%;
}
.upload-desc{
    font-size: 12px;
    color: #666;
    text-align: center;
}

.file {
    position: relative;
    display: inline-block;
    background: #4C9CD6;
    border-radius: 2px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    text-align: center;
    width: 108px;
    height: 36px;
    line-height: 37px;
    font-size: 16px;
    font-weight: 300;
}
.file input {
    position: absolute;
    font-size: 0px;
    width: 108px;
    height: 36px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    text-decoration: none;
}
</style>