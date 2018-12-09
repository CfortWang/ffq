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
                            <td style="border-bottom: 0px" id="content" v-html="taskDesc"></td>
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

                        <tr id="mode-1" v-if="!taskStatus">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="upload-image-body">
                                    <a href="javascript:;" id="upload-btn" class="file">上传图片
                                        <input type="file" class="" id="" name="file" v-on:change="selectImage($event)">
                                    </a>
                                    <!-- <div class="upload-desc">仅能上传一张图片，点击图片可删除</div> -->
                                </div>
                            </td>
                        </tr>

                        <tr v-show="taskStatus">
                            <td align="left" style="border: 1px solid #eee;padding: 8px;">
                                <div id="tips" v-html="taskInfo" style="font-size: 16px;padding: 4px;color: indianred;text-align: center;"></div>
                            </td>
                        </tr>

                        <tr v-if="!taskStatus">
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
            element: '',
            taskInfo: ''
		}
	},
	created: function () {
        this.taskID = this.$route.query.id
        this.showLoading()
        axios({ // 获取任务详情
            method: 'GET',
            url: process.env.api_url + '/task/detail',
            params: {
                id: this.taskID
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.hideLoading()
            let task = response.data.data.task
            this.taskTitle = task.title
            this.taskDesc = task.content
            this.taskImage = task.images
            this.taskStatus = parseInt(response.data.data.status)
            if (this.taskStatus == 1) {
                this.taskInfo = "已完成"
            } else if (this.taskStatus == 2) {
                this.taskInfo = "审核被拒"
            } else if (this.taskStatus == 3) {
                this.taskInfo = "审核中"
            }
        }).catch((ex) => {
            this.hideLoading()
            console.log(ex)
            // this.showMsg(ex.response.data.message)
            con
        })
	},
	methods: {
        uploadIamge: function (event) {
            let file = event.target.files[0]
            this.fileData = new FormData()
            this.fileData.append('file', file)
            this.element = event.currentTarget
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            }
            axios.post(process.env.api_url + '/upload/image',this.fileData,config).then(response => {
                if (response.data.code == 200) {
                    let imageUrl = response.data.data.url
                    this.imageArr.push(imageUrl)
                    this.showMsg("图片上传成功！")
                    // this.element.parentElement.style.display = 'none'
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
            // document.getElementById('upload-btn').style.display= 'block'
        },
        uploadTask: function () {
            if (this.imageArr == '' || this.imageArr == null) {
                this.showMsg("请上传图片！")
                return false
            }
            // this.fileData.append('id', this.taskID)
            // axios.post(process.env.api_url + '/task/done', this.fileData, config).then(response => {
            //     if (response.data.code == 200) {
            //         this.showMsg("任务提交成功！")
            //         window.location.href = window.location.href
            //         return false
            //     } else {
            //         let responseMessage = response.data.message
            //         this.showMsg(responseMessage)
            //         return false
            //     }
            // }).catch(ex => {
            //     this.showMsg(ex.response.data.message)
            // })
            this.showLoading()
            axios({ // 提交任务
                method: 'POST',
                url: process.env.api_url + '/task/done',
                params: {
                    id: this.taskID
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.hideLoading()
                if (response.data.code == 200) {
                    this.showMsg("任务提交成功！")
                    setTimeout(() => {
                        window.location.href = window.location.href
                    }, 1000);
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch((ex) => {
                this.hideLoading()
                console.log(ex)
                this.showMsg(ex.response.data.message)
            })
        },
        selectImage: function (file) {
            if (!file.target.files || !file.target.files[0]) {
                return false;
            }
            var reader = new FileReader();
            var that = this
            console.log(this.element.parentElement)
            reader.onload = function (evt) {
                let imageUrl = evt.target.result;
                that.imageArr.push(imageUrl)
                that.showMsg("图片上传成功！")
            }
            reader.readAsDataURL(file.target.files[0]);
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
    margin-right: 3px;
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
    margin: 0 auto;
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