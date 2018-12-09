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
                                <div id="copy-btn" class="common-small-button" v-on:click="copyText(taskDescText)">复制</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding: 0px 16px" v-for="item in taskImage" v-bind:key="item.index">
                <div>
                    <img style="width: 100%;height: 100%" data-preview-src="" data-preview-group="1" v-bind:src="item">
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

function savePic(target) {
    // mui.alert(target.classList.contains('mui-zoom'))
    if(target.tagName == 'IMG' && target.currentSrc.length > 0) { //确保图片链接不为空
        var imgUrl = target.src;
        console.log('图片地址：' + imgUrl);
        var suffix = cutImageSuffix(imgUrl);
        mui.confirm("是否保存此图片", "", ["保存", "取消"], function(event) {
            var index = event.index;
            if(index == 0) {
                /**
                 * 创建下载任务
                 * http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.createDownload
                 */
                var downLoader = plus.downloader.createDownload(imgUrl, {
                    method: 'GET',
                    filename: '_downloads/image' + suffix
                }, function(download, status) {
                    var fileName = download.filename;
                    console.log('文件名:' + fileName);
                    console.log('下载状态：' + status);
                    /**
                     * 保存至本地相册
                     */
                    plus.gallery.save(fileName, function() {
                        /**
                         * 保存后，弹出对话框是否查看；
                         */
                        mui.confirm("打开相册查看", "", ["打开", "取消"], function(event) {
                            var gindex = event.index;
                            if(gindex == 0) {
                                /**
                                 * 选择图片
                                 */
                                plus.gallery.pick(function(file) {
                                    mui.toast("你选择了图片：" + file);
                                }, function(error) {
                                    console.log(JSON.stringify(error));
                                }, {

                                });
                            }
                        });
                    });
                });
                /**
                 * 开始下载任务
                 */
                downLoader.start();
            }
        });
    }
}
// 截取图片后缀用于重命名图片，防止%E5%85%89%E6%98%8E%E8%A1%8C编码的文件不被系统相册识别；
function cutImageSuffix(imageUrl) {
    var index = imageUrl.lastIndexOf('.');
    return imageUrl.substring(index);
}
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

        mui.init({
            gestureConfig: {
                longtap: true
            }
        });

        mui.previewImage();

        mui.plusReady(function() {
            document.addEventListener('longtap', function(e) {
                var target = e.target;
                savePic(target);
            });
        });


        // 阻止选中
        document.body.onselectstart = function () { 
            return false
        }
        document.body.onmousedown = function () { 
            return false
        }
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
        copyText: function (copy) {
            mui.plusReady(function(){
                //判断是安卓还是ios
                if(mui.os.ios){
                    //ios
                    var UIPasteboard = plus.ios.importClass("UIPasteboard");
                    mui.alert('1')
                    var generalPasteboard = UIPasteboard.generalPasteboard();
                    mui.alert('2')
                    //设置/获取文本内容:
                    generalPasteboard.plusCallMethod({
                        setValue:copy,
                        forPasteboardType: "public.utf8-plain-text"
                    });
                    mui.alert('3')
                    generalPasteboard.plusCallMethod({
                        valueForPasteboardType: "public.utf8-plain-text"
                    });
                    mui.toast("已成功复制到剪贴板");
                }else{
                    //安卓
                    var context = plus.android.importClass("android.content.Context");
                    mui.alert('a')
                    var main = plus.android.runtimeMainActivity();
                    mui.alert('b')
                    var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
                    mui.alert('c')
                    plus.android.invoke(clip,"setText",copy);
                    mui.toast("已成功复制到剪贴板");
                }
            });
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
    min-height: calc(100vh - 70px);
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