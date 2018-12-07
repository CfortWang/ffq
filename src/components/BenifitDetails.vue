<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">收益详情</div>
        </div>
        <div class="empty"></div>
        
        <div class="user-center-desk">
            <div class="group-sales-statistics">
                <p v-if="type == 1">全部收益</p>
                <p v-else-if="type == 2">今日收益</p>
                <p v-else-if="type == 3">昨日收益</p>
                <p v-else-if="type == 4">本周收益</p>
                <p v-else-if="type == 5">本月收益</p>
                <p v-else-if="type == 6">上月收益</p>
                <p v-else>自定义时段收益  {{startTime}}至{{endTime}}</p>
			</div>
			<div id="subusers-list">
				<table class="" cellpadding="0" cellspacing="0">
					<tbody v-for="item in benifitList" v-bind:key="item.index">
                        <tr>
                            <td class="image" valign="top">
                                <div class="image" style="width:42px;height:42px;">
									<img src="/static/img/personal/avatar.png" style="width:42px;height:42px;">
                                </div>
                            </td>
                            <td class="field" valign="top" style="padding-left:0;">
                                <div class="price">获得{{item.amout}}</div>
                                <div class="infos">
                                    <table cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p class="nickname" style="height:20px;line-height:20px;overflow:hidden;">{{item.name}}</p>
                                                    <p style="height:20px;line-height:20px;overflow:hidden;margin-top:2px;color:#888;">消费{{item.from_user_spend}}、返佣{{item.amout}} </p>
                                                    <p style="height:20px;line-height:20px;overflow:hidden;margin-top:2px;color:#888;">到账时间 {{item.created_at}}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div id="page" v-if="benifitList.length">
            <div class="page"><a class="pre" v-on:click="getBenifitList(pageNumber - 1, 'down')" hidefocus="true"><span>&lt;</span></a><a class="info" hidefocus="true">{{pageNumber + 1}}/{{allPages}}</a><a class="next" v-on:click="getBenifitList(pageNumber + 1, 'up')" hidefocus="true"><span>&gt;</span></a></div>
        </div>
        
        <div class="addresses-not-found" v-else>
            <div class="image">
                <img src="/static/img/personal/wind.png" style="width:128px;">
            </div>
            <div class="text">暂无数据...</div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'BenifitDetails',
  	data () {
		return {
			benifitList: [],
            allPages: '',
            pageSize: 10,
            pageNumber: 0,
            type: '',
            startTime: '',
            endTime: ''
		}
	},
	created: function () {
        var getParams = this.$route.params
        this.type = getParams.type
        this.startTime = getParams.startTime
        this.endTime = getParams.endTime
        axios({
            method: 'GET',
            url: process.env.api_url + '/user/gainList',
            params: {
                start_at: this.startTime,
                end_at: this.endTime,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            },
            withCredentials: true,
            headers: {"lang": 'zh'}
        }).then((response) => {
            let responseData = response.data.data
            this.benifitList = responseData.data
            this.allPages = Math.ceil(responseData.count / this.pageSize)
        }).catch((ex) => {
            console.log(ex)
        })
	},
	methods: {
        getBenifitList: function (pageNumber, kind) {
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
                url: process.env.api_url + '/user/gainList',
                params: {
                    start_at: this.startTime,
                    end_at: this.endTime,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.benifitList = response.data.data.data
            }).catch((ex) => {
                this.showMsg(ex.response.data.message)
            })
        }
	}
}
</script>

<style scoped>
.group-sales-statistics {
    color: #666;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    background: #fff;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
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
}
#subusers-list .image {
    width: 64px;
}
#subusers-list .image img {
    width: 64px;
    height: 64px;
}
#subusers-list table tr td.field {
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 10px;
    padding-left: 5px;
}
#subusers-list table tr td.field .price {
    position: absolute;
    height: 50px;
    line-height: 50px;
    right: 10px;
    top: 50%;
    margin-top: -25px;
    font-size: 16px;
    color: #ec2d2d;
}
#subusers-list .infos {
    float: left;
    text-align: left;
}
#subusers-list .infos .nickname {
    color: #444;
    font-size: 16px;
}
p{
    font-size: 13px;
}
</style>