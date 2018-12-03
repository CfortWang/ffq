<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">用户帮助</div>
        </div>
        <div class="empty"></div>
        
        <div class="user-center-desk">
            <div class="group-sales-statistics">
                <p>全部收益</p>
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

            <div id="page">
                <div class="page"><a class="pre" hidefocus="true"><span>&lt;</span></a><a class="info" hidefocus="true">1/1</a><a class="next" hidefocus="true"><span>&gt;</span></a></div>
            </div>			
        </div>

  	</div>
</template>

<script>
export default {
	name: 'BenifitDetails',
  	data () {
		return {
			benifitList: '',
            allPage: '',
            pageSize: 10,
            pageNumber: 0
		}
	},
	created: function () {
        this.getBenifitList('', '', this.pageSize, this.pageNumber)
	},
	methods: {
        getBenifitList: function (start, end, pageSize, nowPage) {
            axios({
                method: 'GET',
                url: process.env.api_url + '/user/gainList',
                params: {
                    start_at: start,
                    end_at: end,
                    pageSize: pageSize,
                    pageNumber: nowPage
                },
                withCredentials: true,
                headers: {"lang": 'zh'}
            }).then((response) => {
                this.benifitList = response.data.data
                // this.allPage = Math.ceil(responseData.all / this.pageSize)
            }).catch((ex) => {
                console.log(ex)
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