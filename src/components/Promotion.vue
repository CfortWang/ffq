<template>
	<div class="content">

		<div class="contain">
			<qrcode :tag="img" :value="qrCodeUrl" :options="{ size: 120 }"></qrcode>
			<canvas id="myCanvas" width="400vw" height="564vw" v-if="!qrImg"></canvas>
			<img v-bind:src="qrImg" alt="" data-preview-src="" data-preview-group="1" v-else>
			<div class="desc" v-if="qrImg">长按保存二维码</div>
		</div>
		<!-- <p class="save-img" v-on:click="save()">保存二维码</p> -->
		
		<!-- 底部 -->
		<div class="footer">
			<div class="homepage"  v-on:click="jumpTo('/')">
				<div class="footer-icon">
					<img src="/static/img/index/index-cur.png" alt="">
				</div>
				<div class="footer-text footer-active">首页</div>
			</div>
			<div class="task"  v-on:click="jumpTo('/tasks')">
				<div class="footer-icon">
					<img src="/static/img/index/tasks.png" alt="">
				</div>
				<div class="footer-text">任务中心</div>
			</div>
			<div class="personal"  v-on:click="jumpTo('/personal')">
				<div class="footer-icon">
					<img src="/static/img/index/center.png" alt="">
				</div>
				<div class="footer-text">个人中心</div>
			</div>
		</div>
  	</div>
</template>

<script>
import QRcode from '@xkeshi/vue-qrcode'
import vueCookie from 'vue-cookie'

mui.init({
    gestureConfig: {
        longtap: true
    }
})

mui.previewImage()

mui.plusReady(function() {
    document.addEventListener('longtap', function(e) {
        var target = e.target
        savePic(target)
    })
})
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
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Promotion',
	components: {
		qrcode : QRcode
	},
  	data () {
		return {
			nickname: '',
			recommendCode: '',
			qrCodeUrl: '',
			imageUrl: '',
			qrImg: '',
			formData: '',
			showDesc: false
		}
	},
	created: function () {
		this.qrImg = vueCookie.get("qrImg")
		if (this.qrImg == '' || this.qrImg == null) {
			if (vueCookie.get('nickname')) {
				this.recommendCode = vueCookie.get('userID')
				this.nickname = vueCookie.get('nickname') + '邀您加入'
				this.qrCodeUrl = "https://fafa.gxwhkj.cn/register?recommendCode=" + this.recommendCode
			} else {
				request({ // 获取个人信息
					method: 'GET',
					url: process.env.api_url + '/user/info',
					withCredentials: true,
					headers: {"lang": 'zh'}
				}).then((response) => {
					let responseData = response.data.data
					this.nickname = responseData.name
					// let recommendCode = responseData.recommend_code
					this.recommendCode = responseData.id
					this.qrCodeUrl = "https://fafa.gxwhkj.cn/register?recommendCode=" + this.recommendCode
				}).catch((ex) => {
					this.$router.push({name: 'Login'})
				})
			}
		}

	},
	mounted () {
		if (!this.qrImg) {
			let canvas1 = document.getElementsByTagName('canvas')[0]
			let canvas2 = document.getElementById('myCanvas')
			let cas1 = canvas1.getContext('2d')
			let cas2 = canvas2.getContext('2d')
			
			let img1 = new Image()
			let img2 = new Image()
			img1.src = canvas1.toDataURL('jpg')
			img2.src = '../../static/img/personal/qrCode.jpg'
			var that = this
			img2.onload = function(){
				cas2.drawImage(img2, 0, 0, 400, 564)
				cas2.font = '8px Georgia'
				cas2.textAlign = 'center'
				cas2.fillText(that.nickname, 200, 210);
				cas2.drawImage(img1, 142, 226, 120, 120)
			}

			

			// setTimeout(() => {
			// 	this.qrImg = canvas2.toDataURL('image/jpeg', 0.3)
			// 	// console.log(this.qrImg)
			// }, 2000);

			var dataURLtoBlob = function(dataurl) {
				var arr = dataurl.split(',')
				var mime = arr[0].match(/:(.*?);/)[1]
				var bstr = atob(arr[1])
				var n = bstr.length
				var u8arr = new Uint8Array(n)
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {type:mime});
			}
			setTimeout(() => {
				var imgUrl = canvas2.toDataURL('image/jpeg', 1)
				var blob = dataURLtoBlob(imgUrl);
				this.formData = new FormData()
				this.formData.append('smfile', blob, "image.png")
				this.formData.append('ssl', true)
				let config = {
					headers:{'Content-Type':'multipart/form-data'}
				}
				this.showLoading()
				axios.post('https://sm.ms/api/upload',this.formData,config).then(response => {
					this.hideLoading()
					if (response.data.code == 'success') {
						this.qrImg = response.data.data.url
						vueCookie.set("qrImg", this.qrImg, { expires: '1Y' })
					} else {
						this.showMsg(response.data.msg)
					}
				}).catch(ex => {
					this.hideLoading()
					console.log(ex)
				})
			}, 1000);
		}

	},
	methods: {
		
	}
}
</script>

<style scoped>
.contain{
	/* width: 100vw;
	height: 141vw; */
	padding: 0px;
	/* background: url('/static/img/personal/qrCode.jpg') no-repeat center;
	background-size: 100% 100%; */
	text-align: center;
	border-top: 1px solid #eee;
}
.share-text{
	font-size: 14px;
	margin-top: 49vw;
}
.save-img{
	position: absolute;
	left: 21px;
	top: 24px;
	color: #fff;
	background: #4C9CD6;
	padding: 8px 16px;
	border-radius: 5px;
}
.save-img img{
	width: 40px;
}
canvas{
	display: none;
}
canvas#myCanvas{
	display: block;
	width: 100vw;
	height: 141vw;
}
.contain img{
	width: 100%;
}
.desc{
	font-size: 16px;
	margin-top: 10px;
	text-align: center;
}
</style>
