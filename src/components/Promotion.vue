<template>
	<div class="content">

		<div class="contain">
			<!-- <div class="share-text">
				<span>{{nickname}}邀您加入</span>
			</div> -->
			<qrcode :tag="img" :value="qrCodeUrl" :options="{ size: 120 }"></qrcode>
			<canvas id="myCanvas" width="400vw" height="564vw"></canvas>
		</div>
		<!-- <a class="save-img" v-on:click="save($event)" download="二维码.jpg">保存二维码</a> -->
		
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

//图片下载操作,指定图片类型
function download(type) {
	var canvas = document.getElementsByTagName('canvas')[0]
	var imgdata = canvas.toDataURL(type);
	var img = new Image()
	img.src = imgdata
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);
	//将mime-type改为image/octet-stream,强制让浏览器下载
	var fixtype = function (type) {
		type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
		var r = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	}
	// imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
	//将图片保存到本地
	var dataURLtoBlob = function(dataurl) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type:mime});
	}
	var saveFile = function (data, filename) {
		var link = document.createElement('a');
		var strDataURI = data.substr(22, data.length);
		var blob = dataURLtoBlob(data);
		var objurl = URL.createObjectURL(blob);
		link.href = objurl;
		link.download = filename;
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		link.dispatchEvent(event);
	}
	var filename = 'qrcode' + '.' + type;
	saveFile(imgdata, filename);
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}


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
			imageUrl: ''
		}
	},
	created: function () {
		if (vueCookie.get('nickname')) {
            this.recommendCode = vueCookie.get('userID')
			this.nickname = vueCookie.get('nickname') + 'hasdhashd邀您加入'
			this.qrCodeUrl = "https://fafa.gxwhkj.cn/register?recommendCode" + this.recommendCode
        } else {
			axios({ // 获取个人信息
				method: 'GET',
				url: process.env.api_url + '/user/info',
				withCredentials: true,
				headers: {"lang": 'zh'}
			}).then((response) => {
				let responseData = response.data.data
				this.nickname = responseData.name
				// let recommendCode = responseData.recommend_code
				this.recommendCode = responseData.id
				this.qrCodeUrl = "https://fafa.gxwhkj.cn/register?recommendCode" + this.recommendCode
			}).catch((ex) => {
				this.$route.push({name: 'Login'})
			})
		}

	},
	mounted () {
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
			cas2.font = '14px Georgia'
			cas2.textAlign = 'center'
			cas2.fillText(that.nickname, 200, 210);
			cas2.drawImage(img1, 142, 226, 120, 120)
		}

		var img =  convertCanvasToImage(canvas2)
		var arr = img.src.split(',')
		var mime = arr[0].match(/:(.*?);/)[1]
		var bstr =  atob(arr[1])
		var n = bstr.length
		var u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		var blob = new Blob([u8arr],{type:mime})
	},
	methods: {
		save: function (e) {
			// download('png')
			let canvas2 = document.getElementById('myCanvas')
			var img =  convertCanvasToImage(canvas2)
        	e.target.href = img.src
		}
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
	display: inline-block;
	width: 100vw;
	height: 141vw;
}
</style>
