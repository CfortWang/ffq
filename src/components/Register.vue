<template>
	<div class="content">
		<div class="header">
            <div class="header-title">注册会员</div>
        </div>
        <div class="empty"></div>
        <div class="reg-box">
            <div class="phone-num">
                <input type="number" name="phoneNum" id="phoneNum" v-model="phoneNumber" placeholder="手机号码"/>
            </div>
            <div class="image-code">
                <input type="text" name="imageCode" id="imageCode" v-model="imageCode" placeholder="图形码"/>
                <div id="imgCode"></div>
            </div>
            <div class="nickname">
                <input type="text" name="nickname" id="nickname" v-model="name" placeholder="用户名"/>
            </div>
            <div class="password">
                <input type="password" name="password" id="password" v-model="password" placeholder="登录密码"/>
            </div>
            <div class="re-password">
                <input type="password" name="rePassword" id="rePassword" v-model="repreatPassword" placeholder="确认密码"/>
            </div>
            <div class="recommend">
                <input type="text" name="recommend" id="recommend" v-model="recommendCode" placeholder="推荐人ID"/>
            </div>
            <div class="verification-code">
                <input type="text" name="verificationCode" id="verificationCode" v-model="verificationCode" placeholder="验证码"/>
                <button class="verification-btn" v-on:click="getVerificationCode">发送验证码</button>
            </div>
            <div class="user-protocol">
                <span v-on:click="changeStatus">
                    <img class="selected" src="/static/img/index/selected.png" v-if="isAgree" alt="">
                    <img class="unselect" src="/static/img/index/unselect.png" v-else alt="">
                </span>
                <span  v-on:click="jumpTo('/userProtocol')">《用户协议》</span>
            </div>
            <div class="reg-btn-box" v-on:click="doRigster">
                <div class="reg-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn clearfix">
                    <div class="find-pwd" v-on:click="jumpTo('/findPassword')">忘记密码?</div>
                    <div class="login" v-on:click="jumpTo('/login')">已有账号，前往登录</div>
                </div>
            </div>
        </div>
        <div id="regMsg">
            <div class="msg-title">系统提示</div>
            <div class="reg-msg-contents">注册成功！</div>
            <div class="msg-buttons">
                <div class="ok-btn" id="msg-ok-btn" v-on:click="goToLogin">前往登录</div>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'Register',
  	data () {
		return {
            name: '',
            phoneNumber: '',
            imageCode: '',
            getImgCode: '',
            password: '',
            repreatPassword: '',
            recommendCode: '',
            verificationCode: '',
            isAgree: false,
            countDown: '',
            clearTimer: ''
		}
	},
	created: function () {
        this.recommendCode = this.$route.query.recommendCode
    },
    mounted () {
        this.getImgCode = this.getGVerify('imgCode')
    },
	methods: {
        showRegMsg: function () {
            let ele1 = document.getElementById('regMsg')
            let ele2 = document.getElementById('cover')
            ele1.style.display = 'block'
            ele2.style.display = 'block'
        },
        goToLogin: function () {
            let ele1 = document.getElementById('regMsg')
            let ele2 = document.getElementById('cover')
            ele1.style.display = 'none'
            ele2.style.display = 'none'
            this.$router.push({name: 'Login', params:{phoneNumber: this.phoneNumber}})
        },
        timer: function (event) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var leftDate = minutes + ':' + seconds + '后重新获取'
            document.getElementsByClassName('verification-btn')[0].innerHTML = leftDate
		},
        getVerificationCode: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            if (this.imageCode == '' || this.imageCode == null) {
                this.showMsg("请输入图形码！")
                return false
            }
            if (!this.getImgCode.validate(this.imageCode)) {
                this.showMsg("图形码不正确！")
                return false
            }
            this.showLoading()
            this.countDown = 60
            axios({ // 获取验证码
                method: 'POST',
                url: process.env.api_url + '/login/msg',
                params: {
                    phoneNumber: this.phoneNumber,
                    type: 'register'
                },
                timeout: 20000
            }).then((response) => {
                this.hideLoading()
                if (response.data.code == 200) {
                    this.showMsg("验证码发送成功！")
                    document.getElementsByClassName('verification-btn')[0].style.backgroundColor = 'grey'
                    document.getElementsByClassName('verification-btn')[0].disabled = true
                    var timeLeft = this.countDown
                    this.timer(this.countDown)
                    var that = this;
                    (function (timeLeft) {
                        that.clearTimer = setInterval(() => {
                            that.timer(that.countDown)
                            that.countDown--
                            if (that.countDown < 0) {
                                document.getElementsByClassName('verification-btn')[0].style.backgroundColor = '#4C9CD6'
                                document.getElementsByClassName('verification-btn')[0].disabled = false
                                document.getElementsByClassName('verification-btn')[0].innerHTML = '重新获取'
                                clearInterval(that.clearTimer)
                            }
                        }, 1000)
                    })(timeLeft)
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                }
            }).catch((ex) => {
                this.hideLoading()
                console.log(ex)
                var str = ex + ''
                if (str.search('timeout') !== -1) {
                    this.showMsg("验证码发送超时，请重试！")
                }
            })
        },
        changeStatus: function () {
            this.isAgree = !this.isAgree
        },
        doRigster: function () {
            if (this.phoneNumber == '' || this.phoneNumber == null) {
                this.showMsg("请输入手机号码！")
                return false
            }
            if (this.imageCode == '' || this.imageCode == null) {
                this.showMsg("请输入图形码！")
                return false
            }
            if (this.name == '' || this.name == null) {
                this.showMsg("请输入用户名！")
                return false
            }
            if (this.password == '' || this.password == null) {
                this.showMsg("请输入密码！")
                return false
            }
            if (this.repreatPassword == '' || this.repreatPassword == null) {
                this.showMsg("请确认密码！")
                return false
            }
            if (this.password != this.repreatPassword) {
                this.showMsg("两次输入密码不一致！")
                return false
            }
            if (this.recommendCode) {
                if (this.recommendCode.length != 6) {
                    this.showMsg("推荐码应为6位数字！")
                    return false
                }
            }
            if (this.verificationCode == '' || this.verificationCode == null) {
                this.showMsg("请输入验证码！")
                return false
            }
            if (this.verificationCode.length != 4) {
                this.showMsg("验证码应为4位数字！")
                return false
            }
            if (!this.isAgree) {
                this.showMsg("请仔细阅读并同意用户协议！")
                return false
            }
            this.showLoading()
            axios({ // 注册
                method: 'POST',
                url: process.env.api_url + '/login/create',
                params: {
                    name: this.name,
                    phoneNumber: this.phoneNumber,
                    password: this.password,
                    repreatPassword: this.repreatPassword,
                    recommendCode: this.recommendCode,
                    code: this.verificationCode
                }
            }).then((response) => {
                this.hideLoading()
                if (response.data.code == 200) {
                    this.showRegMsg()
                    return false
                } else {
                    let responseMessage = response.data.message
                    this.showMsg(responseMessage)
                    return false
                }
            }).catch((ex) => {
                this.hideLoading()
                console.log(ex)
            })
        },
        getGVerify: function(id) {
            function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
                this.options = { //默认options参数值
                    id: id, //容器Id
                    canvasId: "verifyCanvas", //canvas的ID
                    width: "120", //默认canvas宽度
                    height: "39", //默认canvas高度
                    type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
                    code: ""
                }

                if (Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
                    for (var i in options) { //根据传入的参数，修改默认参数值
                        this.options[i] = options[i];
                    }
                } else {
                    this.options.id = options;
                }

                this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
                this.options.letterArr = getAllLetter();

                this._init();
                this.refresh();
            }

            GVerify.prototype = {
                /**版本号**/
                version: '1.0.0',

                /**初始化方法**/
                _init: function() {
                    var con = document.getElementById(this.options.id);
                    var canvas = document.createElement("canvas");
                    /*this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
                    this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";*/
                    canvas.id = this.options.canvasId;
                    canvas.width = this.options.width
                    // canvas.width = document.body.clientWidth/2 - this.options.width;
                    canvas.height = this.options.height;
                    canvas.style.cursor = "pointer";
                    canvas.innerHTML = "您的浏览器版本不支持canvas";
                    con.appendChild(canvas);
                    var parent = this;
                    canvas.onclick = function() {
                        parent.refresh();
                    }
                },

                /**生成验证码**/
                refresh: function() {
                    this.options.code = '';
                    var canvas = document.getElementById(this.options.canvasId);
                    if (canvas.getContext) {
                        var ctx = canvas.getContext('2d');
                    }
                    ctx.textBaseline = "middle";

                    // this.options.width = document.body.clientWidth/2 - this.options.width;

                    ctx.fillStyle = randomColor(180, 240);
                    ctx.fillRect(0, 0, this.options.width, this.options.height);

                    if (this.options.type == "blend") { //判断验证码类型
                        var txtArr = this.options.numArr.concat(this.options.letterArr);
                    } else if (this.options.type == "number") {
                        var txtArr = this.options.numArr;
                    } else {
                        var txtArr = this.options.letterArr;
                    }

                    for (var i = 1; i <= 4; i++) {
                        var txt = txtArr[randomNum(0, txtArr.length)];
                        this.options.code += txt;
                        ctx.font = '30px SimHei';
                        //ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                        ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                        /* ctx.shadowOffsetX = randomNum(-3, 3);
                        ctx.shadowOffsetY = randomNum(-3, 3);*/
                        ctx.shadowBlur = randomNum(-3, 3);
                        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                        var x = this.options.width / 5 * i;
                        var y = this.options.height / 2;
                        var deg = randomNum(-30, 30);
                        /**设置旋转角度和坐标原点**/
                        ctx.translate(x, y);
                        ctx.rotate(deg * Math.PI / 180);
                        ctx.fillText(txt, 0, 0);
                        /**恢复旋转角度和坐标原点**/
                        ctx.rotate(-deg * Math.PI / 180);
                        ctx.translate(-x, -y);
                    }
                    /**绘制干扰线**/
                    for (var i = 0; i < 4; i++) {
                        ctx.strokeStyle = randomColor(40, 180);
                        ctx.beginPath();
                        ctx.moveTo(randomNum(0, this.options.width / 2), randomNum(0, this.options.height / 2));
                        ctx.lineTo(randomNum(0, this.options.width / 2), randomNum(0, this.options.height));
                        ctx.stroke();
                    }
                    /**绘制干扰点**/
                    for (var i = 0; i < this.options.width / 4; i++) {
                        ctx.fillStyle = randomColor(0, 255);
                        ctx.beginPath();
                        ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                },

                /**验证验证码**/
                validate: function(code) {
                    var verifyCode = code.toLowerCase();
                    var v_code = this.options.code.toLowerCase();
                    if (verifyCode == v_code) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            /**生成字母数组**/
            function getAllLetter() {
                var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
                return letterStr.split(",");
            }
            /**生成一个随机数**/
            function randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            /**生成一个随机色**/
            function randomColor(min, max) {
                var r = randomNum(min, max);
                var g = randomNum(min, max);
                var b = randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            return new GVerify(id);
        }
	}
}
</script>

<style scoped>
.reg-box{
	padding: 15px;
}
.reg-box > div{
    height: 42px;
    margin-bottom: 15px;
}
.reg-box input{
    box-sizing: border-box;
	width: 100%;
	padding: 12px;
	border: 1px solid #DDDDDD;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
}
#verificationCode, #imageCode{
    width: 50%;
}
.verification-btn{
    display: inline-block;
    width: 48%;
    height: 40px;
    line-height: 42px;
    text-align: center;
    background: #4C9CD6;
    font-size: 16px;
    color: #fff;
    border-radius: 4px;
    border: none;
}

#imgCode{
    display: inline-block;
    width: 48%;
    height: 40px;
    vertical-align: middle;
}

.reg-box > .user-protocol{
    text-align: left;
    font-size: 14px;
    height: 20px;
    padding-top: 10px;
}
.user-protocol span{
    vertical-align: middle;
}
.unselect, .selected{
    width: 16px;
    vertical-align: middle;
}

.reg-btn-box{
    margin-bottom: 20px;
}
.reg-btn{
    padding: 8px 12px;
    background: #4C9CD6;
    color: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
}

.bottom-box{
    
}

.find-pwd{
    float: left;
}
.login{
    float: right;
}
</style>