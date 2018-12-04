<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">发布任务</div>
        </div>
        <div class="empty"></div>

        <!-- <form action="/"></form> -->
        <div class="top-box">
            <div class="textarea-box">
                <div class="textarea-title">标题：</div>
                <div class="textarea">
                    <textarea name="" id="" cols="" rows="" placeholder="请输入任务标题"></textarea>
                </div>
            </div>
            <div class="textarea-box">
                <div class="textarea-title">内容：</div>
                <div class="textarea">
                    <textarea name="" id="" cols="" rows="" placeholder="请输入任务内容"></textarea>
                </div>
            </div>
            <div class="image-box">
                <div class="image-title">图片：</div>
                <div class="image">
                    <div class="image-div" v-for="(item, index) in imageArr" v-bind:key="index" :data-index="index" v-on:click="deleteImage">
                        <img v-bind:src="item" alt="">
                    </div>
                </div>
                <a href="javascript:;" class="file">请上传图片
                    <input type="file" class="" id="" name="file" v-on:change="uploadIamge($event)">
                </a>
                <div class="upload-desc">点击图片可删除</div>
            </div>
        </div>

        <div class="bottom-box">
            <div class="ad-price"><span>今日广告单价：￥</span><span>2</span></div>
            <div class="price-desc">本价格根据平台会员活跃指数动态调价</div>
            <div class="line"></div>
            <div class="task-info-box">
                <div class="task-count">
                    <div class="task-count-title">任务数量：</div>
                    <div class="task-amount">
                        <input type="number" placeholder="最低为2000">
                    </div>
                </div>
                <div class="task-count">
                    <div class="task-count-title">广告总价：</div>
                    <div class="total-amount clearfix">
                        0
                    </div>
                </div>
            </div>
            <div class="publish-btn">发布任务</div>
            <div class="publish-desc">注：发布需求超过1000的客户请直接联系客服，查 询广告发布套餐价</div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'AddTasks',
  	data () {
		return {
            fileData: '',
            imageArr: [],
            newImageArr: []
		}
	},
	created: function () {

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
            this.newImageArr = []
            let index = self.getAttribute('data-index')
            for (let i = 0, j = 0; i < this.imageArr.length; i++, j++) {
                if (i != index) {
                    this.newImageArr[j] = this.imageArr[i]
                }
            }
            console.log(this.imageArr)
            console.log(this.newImageArr)
        }
	}
}
</script>

<style scoped>
.top-box, .bottom-box{
    background: #fff;
    padding: 15px;
}
.top-box{
    margin-bottom: 10px;
}
.textarea-title, .image-title{
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
}
.textarea{
    width: 100%;
    height: 143px;
    margin-bottom: 14px;
}
.textarea textarea{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgba(248,248,248,1);
    border: 1px solid rgba(221,221,221,1);
    outline: none;
    font-size: 16px;
    padding: 10px 12px;
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
    font-size: 14px;
    color: #666;
    margin: 5px 0px 20px;
    text-align: center;
}

.ad-price{
    font-size: 18px;
    text-align: left;
}
.price-desc{
    font-size: 14px;
    color: #666;
    text-align: left;
    margin-top: 3px;
}
.line{
    height: 1px;
    background: #DDD;
    margin: 10px 0px;
}

.task-info-box{
    background: rgba(248,248,248,1);
    border: 1px solid rgba(221,221,221,1);
    margin-bottom: 20px;
}
.task-count{
    text-align: justify;
}
.task-count:first-child{
    border-bottom: 1px solid rgba(221,221,221,1);
}
.task-count > div{
    display: inline-block;
    font-size: 18px;
}
.task-count-title{
    text-align: left;
    padding: 15px 10px;
}
.total-amount{
    float: right;
    color: #666;
    margin: 15px 17px 0px 0px;
}

.publish-btn{
    height: 48px;
    line-height: 48px;
    color: #ffffff;
    font-weight: 300;
    background: #4C9CD6;
}
.publish-desc{
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    color: #666;
    margin-top: 5px;
}

.bottom-box input{
    /* box-sizing: border-box; */
	/* width: 100%; */
    height: 25px;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    text-align: right;
    background: rgba(248,248,248,1);
}
#verificationCode{
    width: 50%;
}
.verification-btn{
    display: inline-block;
    width: 48%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background: #4C9CD6;
    font-size: 16px;
    color: #fff;
    border-radius: 4px;
}

.reg-btn-box{
    margin-bottom: 20px;
}
.reg-btn{
    padding:12px;
    background: #4C9CD6;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.login{
    float: left;
}


</style>