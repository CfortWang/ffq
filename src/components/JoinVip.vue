<template>
	<div class="content">
        <div id="center-contents">
            <div class="head">
                <div id="header" style="height: 0px !important;">
                    <div class="header">
                        <div class="left-btn" v-on:click="goBack()">
                            <img src="/static/img/index/go-back.png" alt="">
                        </div>
                        <div class="header-title">开通会员</div>
                    </div>
                </div>
                <div class="empty"></div>
                <img src="/static/img/personal/avatar.png" class="user-avatar">
                <div class="user-nickname" style="padding-top: 6px">{{nickname}}</div>
                <div class="user-desc">
                    <span v-if="userLevelID == 1">已开通普通会员</span>
                    <span v-else-if="userLevelID == 2">已开通中级会员</span>
                    <span v-else-if="userLevelID == 3">已开通高级会员</span>
                    <span v-else>尚未开通会员</span>
                </div>
                <div style="overflow: hidden;text-decoration: line-through;margin: 0px 8px "></div>
            </div>
            <div class="vip-list selected" v-on:click="chooseLevel" data-level="1">
                <div class="desc">会员</div>
                <div class="price">￥98</div>
            </div>
            <div class="vip-list" v-on:click="chooseLevel" data-level="2">
                <div class="desc">中级会员</div>
                <div class="price">￥368</div>
            </div>
            <div class="vip-list" v-on:click="chooseLevel" data-level="3">
                <div class="desc">高级会员</div>
                <div class="price">￥988</div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- <div align="left" style="padding: 0px 24px;font-size: 16px;margin-top: 10px">支付方式</div>
        <div style="text-align: left;margin: 4px 20px;border: 1px solid #EEE;font-size: 16px;">
            <div style="padding: 8px 0px;">
                <label for="pay-method1" class="label-radio">
                    <input type="radio" checked hidden id="pay-method1" name="payment" value="WEIXINPAY">
                    <label for="pay-method1" class="pay-method"></label>
                    <span>微信支付</span>
                    <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="/static/img/personal/wxpay.png">
                </label>
            </div>
            <div style="padding: 8px 0px;border-top: 1px solid #EEE;">
                <label for="pay-method2" class="label-radio">
                    <input type="radio" hidden id="pay-method2" name="payment" value="ALIPAY">
                    <label for="pay-method2" class="pay-method"></label>
                    <span>支付宝支付</span>
                    <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="/static/img/personal/alipay.png">
                </label>
            </div>
        </div> -->

        <div class="protocol" style="font-size: 13px;color:#111;text-align:left;margin-bottom:10px;padding-top:1rem;padding-left: 5%;opacity: 0.5 ">
            <span v-on:click="changeStatus">
                <img class="selected-icon" src="/static/img/index/selected.png" v-if="isAgree" alt="">
                <img class="unselect-icon" src="/static/img/index/unselect.png" v-else alt="">
            </span>
            <span>开通即表示您同意<span style="color:#111;font-weight:700;" v-on:click="jumpTo('/userProtocol')">《用户协议》</span></span>
        </div>
        <div style="font-size: 13px;text-align: left;padding: 8px 16px">加入会员（或中级会员）可领取会员任务大厅（或中级任务大厅）的任务，同时可投放广告,也可以领取自己发布的广告。</div>
        <div style="padding: 8px">
            <div class="common-theme-button" v-on:click="joinVip">立即开通</div>
        </div>
  	</div>
</template>

<script>
import vueCookie from 'vue-cookie'
export default {
	name: 'JoinVip',
  	data () {
		return {
            nickname: '',
            userLevelID: '',
            isAgree: true,
            payID: '',
            payType: 'user'
		}
	},
	created: function () {
        // 缓存获取用户等级与用户昵称
        if (vueCookie.get('userLevelID')) {
            this.userLevelID = vueCookie.get('userLevelID')
            this.nickname = vueCookie.get('nickname')
        } else {
            // 接口获取用户等级与用户昵称
            axios({ // 获取个人信息
                method: 'GET',
                url: process.env.api_url + '/user/info',
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                let responseData = response.data.data
                this.nickname = responseData.name
                this.userLevelID = responseData.user_level_id
            }).catch((ex) => {
                this.$route.push({name: 'Login'})
            })
        }
	},
	methods: {
		changeStatus: function () {
            this.isAgree = !this.isAgree
        },
        chooseLevel: function (e) {
            document.getElementsByClassName('selected')[0].classList.remove("selected")
            e.currentTarget.classList.add("selected")
        },
        joinVip: function () {
            var vipLevel = document.getElementsByClassName('selected')[0].getAttribute('data-level')
            if (this.userLevelID == 3) {
                this.showMsg("您已开通最高等级会员！")
                return false
            } else if (this.userLevelID == vipLevel) {
                this.showMsg("您已开通该等级会员！")
                return false
            } else if (this.userLevelID > vipLevel) {
                this.showMsg("您已开通更高等级会员！")
                return false
            } else if (!this.isAgree) {
                this.showMsg("请同意用户协议！")
                return false
            } else {
                this.showLoading()
                axios({ // 获取个人信息
                    method: 'POST',
                    url: process.env.api_url + '/user/levelUp',
                    params: {level_id: vipLevel},
                    withCredentials: true,
                    headers: {"lang": 'zh'}
                }).then((response) => {
                    this.hideLoading()
                    console.log(response)
                    if (response.data.code == 200) {
                        this.payID = response.data.data.id
                        this.$router.push({
                            name: 'PayMethod',
                            params: {
                                payID: this.payID,
                                payType: this.payType,
                                payReturnUrl: 'https://fafa.gxwhkj.cn/paySuccess?type=0&level=' + vipLevel
                                // payReturnUrl: 'http://localhost:8080/paySuccess?type=0&level=' + vipLevel
                            }
                        })
                    } else {
                        this.showMsg(response.data.message)
                    }
                }).catch((ex) => {
                    this.hideLoading()
                    console.log(ex)
                })
            }
        }
	}
}
</script>

<style scoped>
.head {
    background: #4C9CD6;
    background-repeat: no-repeat;
    background-size: 100% 220px;
    color: #fff;
    font-weight: 800;
    text-align: center;
    height: 220px;
    overflow: hidden;
    padding-bottom: 10px;
}
#header {
    height: 50px;
    background: #4C9CD6;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
}
.user-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-top: 2px;
    border: 3px solid hsla(0, 0%, 90%, 0.6);
}
.user-nickname {
    padding-top: 1.5rem;
    font-size: 1rem;
    font-family: "新宋体", "tahoma", "arial", "simsun", "sans-serif";
}
.user-desc {
    margin-top: .5rem;
    font-family: "新宋体", "tahoma", "arial", "simsun", "sans-serif";
    font-weight: normal;
    font-size: 12px !important;
}
.vip-list {
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: auto;
    color: white;
    background: -webkit-linear-gradient(0deg, #4C9CD6, #ffd4cf) !important;
    margin-top: 10px;
}
.selected {
    border: 4px solid #ccc;
    color: #fff;
}
.desc {
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
    color: #fff;
    float: left;
    padding-left: 30px;
}
.price {
    font-size: 1.3rem;
    height: 50px;
    line-height: 50px;
    float: right;
    color: #333;
    padding-right: 20px;
}
.common-theme-button {
    text-align: center;
    padding: 7px;
    font-size: 16px;
    color: white;
    background: #4C9CD6;
}
.protocol span{
    vertical-align: bottom;
}
.unselect-icon, .selected-icon{
    width: 16px;
    vertical-align: middle;
}
.label-radio{
    padding-left: 16px;
}
.label-radio span{
    vertical-align: middle;
}
.pay-method{
    height: 16px;
    width: 16px;
    display: inline-block;
    background: url('/static/img/personal/radio-unselect.png') no-repeat center;
    vertical-align: middle;
    margin: 0px;
    margin-bottom: 1px;
}
input[type="radio"]:checked + .pay-method{
    background: url('/static/img/personal/radio-selected.png');
}
</style>
