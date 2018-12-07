<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">我的团队</div>
        </div>
        <div class="empty"></div>
        <div id="center-contents" class="user-center-desk">
            <div class="center-order-panel">
                <div class="title">
                    <span>我的团队会员</span>
                </div>
                <div class="box">
                    <table cellpadding="0" cellspacing="0" class="">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="text-icon selected" data-id="allNumber" v-on:click="getKindTeamList('all', $event)">{{allNumber}}</div>
                                    <div class="text">全部团队</div>
                                </td>
                                <td>
                                    <div class="text-icon" data-id="direct" v-on:click="getKindTeamList('direct', $event)">{{direct}}</div>
                                    <div class="text">直接分享</div>
                                </td>
                                <td>
                                    <div class="text-icon" data-id="inDirect" v-on:click="getKindTeamList('indirect', $event)">{{inDirect}}</div>
                                    <div class="text">间接分享</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="search-box">
                <div class="button" id="search-button" v-on:click="searchList(userID, 0, type)"></div>
                <input type="text" class="input" name="q" v-model="userID" placeholder="搜索会员ID">
            </div>

            <div id="subusers-list">
                <table class="" cellpadding="0" cellspacing="0">
                    <tbody v-for="item in teamList" v-bind:key="item.index">
                        <tr>
                            <td class="image" valign="top">
                                <div class="image">
                                    <img src="/static/img/personal/avatar.png">
                                </div>
                            </td>
                            <td class="field" valign="top">
                                <table cellpadding="0" cellspacing="0" style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p class="nickname" style="font-size:14px;">{{item.name}}</p>
                                                <div class="level" style="margin-top:6px;">
                                                    <span style="float:left;color:#aaa;">{{item.user_level_name}}</span>
                                                    <span style="float:right;color:#aaa;">ID:{{item.id}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div id="page">
                <div class="page"><a class="pre" v-on:click="getTeamList(userID, pageNumber - 1, type, 'down')" hidefocus="true"><span>&lt;</span></a><a class="info" hidefocus="true">{{pageNumber + 1}}/{{allPages}}</a><a class="next" v-on:click="getTeamList(userID, pageNumber + 1, type, 'up')" hidefocus="true"><span>&gt;</span></a></div>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'MyTeam',
  	data () {
		return {
            allNumber: '',
            direct: '',
            inDirect: '',
            userID: '',
            pageSize: 10,
            pageNumber: 0,
            type: 'all',
            teamList: [],
            allPages: ''
		}
	},
	created: function () {
        axios({
            method: 'GET',
            url: process.env.api_url + '/user/myTeam',
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let responseData = response.data.data
            this.allNumber = responseData.all
            this.direct = responseData.direct
            this.inDirect = responseData.indirect
            this.allPages = Math.ceil(this.allNumber / this.pageSize)
            console.log(this.allPages)
        }).catch((ex) => {
            console.log(ex)
        })

        axios({
            method: 'GET',
            url: process.env.api_url + '/user/myTeamList',
            params: {
                id: '',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber,
                type: this.type
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            this.teamList = response.data.data.data
        }).catch((ex) => {
            console.log(ex)
        })
        
	},
	methods: {
        searchList: function (id) {
            if (id == '' || id == null) {
                this.showMsg("请输入会员ID！")
                return false
            }
            this.pageNumber = 0
            axios({
                method: 'GET',
                url: process.env.api_url + '/user/myTeamList',
                params: {
                    id: id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                    type: this.type
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.teamList = response.data.data.data
                if (this.teamList.length == 0) {
                    this.allPages = 1
                    this.showMsg("会员ID不存在！")
                    return false
                }
                this.allPages = Math.ceil(this.teamList.length / this.pageSize)
            }).catch((ex) => {
                console.log(ex)
            })
        },
        getKindTeamList: function (type, e) {
            document.getElementsByClassName('selected')[0].classList.remove('selected')
            e.target.classList.add('selected')
            let kind = e.target.getAttribute('data-id')
            this.pageNumber = 0
            this.allPages = Math.ceil(this[kind] / this.pageSize)
            axios({
                method: 'GET',
                url: process.env.api_url + '/user/myTeamList',
                params: {
                    id: '',
                    pageSize: this.pageSize,
                    pageNumber: 0,
                    type: type
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.teamList = response.data.data.data
            }).catch((ex) => {
                console.log(ex)
            })
        },
        getTeamList: function (id, pageNumber, type, kind) {
            if (this.pageNumber == 0 && kind == 'down') {
                this.showMsg("当前已是第一页！")
                return false
            } 
            if (this.pageNumber == this.allPages - 1 && kind == 'up') {
                this.showMsg("当前已是最后一页！")
                return false
            }
            this.pageNumber = pageNumber
            axios({
                method: 'GET',
                url: process.env.api_url + '/user/myTeamList',
                params: {
                    id: id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                    type: type
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.teamList = response.data.data.data
            }).catch((ex) => {
                console.log(ex)
            })
        }
	}
}
</script>

<style scoped>
.user-center-desk .center-order-panel {
    padding: 10px;
    margin-top: 10px;
    background: #fff;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
}
.user-center-desk .center-order-panel .title {
    height: 30px;
    border-bottom: 1px solid #eee;
}
.user-center-desk .center-order-panel .title span {
    font-size: 16px;
    float: left;
}
.user-center-desk .center-order-panel .box {
    padding-top: 10px;
}
.user-center-desk .center-order-panel .box table {
    width: 100%;
}
.user-center-desk .center-order-panel .box table tr td .text-icon {
    display: block;
    width: 80%;
    height: 32px;
    line-height: 32px;
    border-radius: 32px;
    text-align: center;
    background: #fff;
    border: 1px solid #eee;
    color: #888;
    margin: 0 auto;
    font-size: 14px;
}
.user-center-desk .center-order-panel .box table tr td .text {
    font-size: 14px;
    padding: 5px 0;
    text-align: center;
}
.user-center-desk .center-order-panel .box table tr td {
    width: 20%;
    padding-top: 5px;
}
.selected{
    background: #4C9CD6!important;
    color: #fff!important;
}

#center-contents .search-box {
    position: relative;
    background: none;
    border: none;
    border: none;
    margin-bottom: 10px;
    margin-top: 15px;
    padding: 0 10px;
}
#center-contents .search-box div.button {
    z-index: 300;
    height: 40px;
    line-height: 40px;
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0;
    background: url(/static/img/personal/black-search-button.png) no-repeat center center;
    background-size: 20px 20px;
}
#center-contents .search-box input {
    color: #444;
    width: 100%;
    border: 1px solid #eee;
    height: 38px;
    line-height: 38px;
    text-indent: 10px;
}

#subusers-list {
    margin-top: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #fff;
}
#subusers-list table {
    width: 100%;
    text-align: left;
}
#subusers-list table tr td.image {
    padding: 10px;
    width: 1%;
    padding-right: 10px;
    padding-left: 10px;
    width:48px;
    height:48px;
}
#subusers-list img {
    width: 100%;
    border-radius: 50%;
}
#subusers-list table tr td.field {
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 12px;
    padding-left: 5px;
    font-size: 13px;
}

#page {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
}
#page .page a.pre {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #eee;
    color: #888;
    width: 44px;
    height: 44px;
    border-radius: 3px 0 0 5px;
}
#page .page a.info {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    color: #888;
    padding: 0 20px;
    height: 44px;
}
#page .page a.next {
    background: #fff;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #eee;
    color: #888;
    width: 44px;
    height: 44px;
    border-radius: 0 5px 5px 0;
}
</style>