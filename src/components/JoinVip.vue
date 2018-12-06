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
            <div class="vip-list selected" v-on:click="chooseLevel">
                <div class="desc">会员</div>
                <div class="price">￥98</div>
            </div>
            <div class="vip-list" v-on:click="chooseLevel">
                <div class="desc">中级会员</div>
                <div class="price">￥368</div>
            </div>
            <div class="vip-list" v-on:click="chooseLevel">
                <div class="desc">高级会员</div>
                <div class="price">￥988</div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div style="text-align: left;margin: 4px 20px;border: 1px solid #EEE;font-size: 16px;display: none">
            <div style="padding: 8px 0px">
                <input type="radio" checked="" name="payment" value="WEIXINPAY">
                <span>微信支付</span>
                <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="/static/img/personal/wxpay.png">
            </div>
            <div style="padding: 8px 0px;border-top: 1px solid #EEE;display: ">
                <input type="radio" name="payment" value="ALIPAY">
                <span>支付宝支付</span>
                <img align="right" style="padding-right:16px;width: 24px;line-height: 16px;vertical-align: middle;text-align: right" src="/static/img/personal/alipay.png">
            </div>
        </div>

        <div class="protocol" style="font-size: 13px;color:#111;text-align:left;margin-bottom:10px;padding-top:1rem;padding-left: 5%;opacity: 0.5 ">
            <span v-on:click="changeStatus">
                <img class="selected-icon" src="/static/img/index/selected.png" v-if="isAgree" alt="">
                <img class="unselect-icon" src="/static/img/index/unselect.png" v-else alt="">
            </span>
            <span>开通即表示您同意<span style="color:#111;font-weight:700;" v-on:click="jumpTo('/userProtocol')">《用户协议》</span></span>
        </div>
        <div style="font-size: 13px;text-align: left;padding: 8px 16px">加入会员（或中级会员）可领取会员任务大厅（或中级任务大厅）的任务，同时可投放广告,也可以领取自己发布的广告。</div>
        <div style="padding: 8px">
            <div class="common-theme-button">立即开通</div>
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
            isAgree: true
		}
	},
	created: function () {
        // 缓存获取用户等级与用户昵称
        if (vueCookie.get('userLevelID')) {
            this.userLevel = vueCookie.get('userLevelID')
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
</style>
