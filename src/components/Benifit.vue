<template>
	<div class="content">
		<div class="header">
            <div class="left-btn">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">收益统计</div>
        </div>
        <div class="empty"></div>
        
        <div class="user-center-desk">
            <div class="x-scrolling-bar" data-padding="20">
                <div class="center-bar" style="width: 340px;">
                    <div class="x-scrolling-bar-inner" style="width: 360px;">
                        <div class="x-scrolling-bar-inner-fixed" id="type-selector">
                            <li class="current item" data-type="">全部</li>
                            <li class="item" data-type="today">今日</li>
                            <li class="item" data-type="yestoday">昨日</li>
                            <li class="item" data-type="week">本周</li>
                            <li class="item" data-type="month">本月</li>
                            <li class="item" data-type="last-month">上月</li>
                            <li class="item" data-type="custom">自定义</li>
                        </div>
                    </div>
                </div>
            </div>
            <table class="new-address-table custom-table" style="display:none;" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
						<td class="center" colspan="3"><div class="title">起始时间</div></td>
					</tr>
					<tr>
						<td class="center">
							<div class="inner">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">2018 年</label>
									<select name="sd_year">
                                        <option value="2016">2016 年</option>
                                        <option value="2017">2017 年</option>
                                        <option value="2018" selected="">2018 年</option>
									</select>
								</div>
							</div>
						</td>
						<td class="center">
							<div class="inner" style="padding-left:0;">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">12 月</label>
									<select name="sd_month">
                                        <option value="01">01 月</option>
                                        <option value="02">02 月</option>
                                        <option value="03">03 月</option>
                                        <option value="04">04 月</option>
                                        <option value="05">05 月</option>
                                        <option value="06">06 月</option>
                                        <option value="07">07 月</option>
                                        <option value="08">08 月</option>
                                        <option value="09">09 月</option>
                                        <option value="10">10 月</option>
                                        <option value="11">11 月</option>
                                        <option value="12" selected="">12 月</option>
                                    </select>
								</div>
							</div>
						</td>
						<td class="center">
							<div class="inner" style="padding-left:0;">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">02 日</label>
									<select name="sd_day">
                                        <option value="01">01 日</option>
                                        <option value="02" selected="">02 日</option>
                                        <option value="03">03 日</option>
                                        <option value="04">04 日</option>
                                        <option value="05">05 日</option>
                                        <option value="06">06 日</option>
                                        <option value="07">07 日</option>
                                        <option value="08">08 日</option>
                                        <option value="09">09 日</option>
                                        <option value="10">10 日</option>
                                        <option value="11">11 日</option>
                                        <option value="12">12 日</option>
                                        <option value="13">13 日</option>
                                        <option value="14">14 日</option>
                                        <option value="15">15 日</option>
                                        <option value="16">16 日</option>
                                        <option value="17">17 日</option>
                                        <option value="18">18 日</option>
                                        <option value="19">19 日</option>
                                        <option value="20">20 日</option>
                                        <option value="21">21 日</option>
                                        <option value="22">22 日</option>
                                        <option value="23">23 日</option>
                                        <option value="24">24 日</option>
                                        <option value="25">25 日</option>
                                        <option value="26">26 日</option>
                                        <option value="27">27 日</option>
                                        <option value="28">28 日</option>
                                        <option value="29">29 日</option>
                                        <option value="30">30 日</option>
                                        <option value="31">31 日</option>
                                    </select>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="center"><div class="title">结束时间</div></td>
					</tr>
					<tr>
						<td class="center">
							<div class="inner">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">2018 年</label>
									<select name="ed_year">
                                        <option value="2016">2016 年</option>
                                        <option value="2017">2017 年</option>
                                        <option value="2018" selected="">2018 年</option>
                                    </select>
								</div>
							</div>
						</td>
						<td class="center">
							<div class="inner" style="padding-left:0;">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">12 月</label>
									<select name="ed_month">
                                        <option value="01">01 月</option>
                                        <option value="02">02 月</option>
                                        <option value="03">03 月</option>
                                        <option value="04">04 月</option>
                                        <option value="05">05 月</option>
                                        <option value="06">06 月</option>
                                        <option value="07">07 月</option>
                                        <option value="08">08 月</option>
                                        <option value="09">09 月</option>
                                        <option value="10">10 月</option>
                                        <option value="11">11 月</option>
                                        <option value="12" selected="">12 月</option>
									</select>
								</div>
							</div>
						</td>
						<td class="center">
							<div class="inner" style="padding-left:0;">
								<div class="select-wrapper" style="width:100%;padding:0;">
									<label style="padding-left:10px;font-size:14px;">02 日</label>
									<select name="ed_day">
                                        <option value="01">01 日</option>
                                        <option value="02" selected="">02 日</option>
                                        <option value="03">03 日</option>
                                        <option value="04">04 日</option>
                                        <option value="05">05 日</option>
                                        <option value="06">06 日</option>
                                        <option value="07">07 日</option>
                                        <option value="08">08 日</option>
                                        <option value="09">09 日</option>
                                        <option value="10">10 日</option>
                                        <option value="11">11 日</option>
                                        <option value="12">12 日</option>
                                        <option value="13">13 日</option>
                                        <option value="14">14 日</option>
                                        <option value="15">15 日</option>
                                        <option value="16">16 日</option>
                                        <option value="17">17 日</option>
                                        <option value="18">18 日</option>
                                        <option value="19">19 日</option>
                                        <option value="20">20 日</option>
                                        <option value="21">21 日</option>
                                        <option value="22">22 日</option>
                                        <option value="23">23 日</option>
                                        <option value="24">24 日</option>
                                        <option value="25">25 日</option>
                                        <option value="26">26 日</option>
                                        <option value="27">27 日</option>
                                        <option value="28">28 日</option>
                                        <option value="29">29 日</option>
                                        <option value="30">30 日</option>
                                        <option value="31">31 日</option>
                                    </select>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="3" class="center">
							<div class="inner">
								<div class="common-red-button" id="custom-search-button">自定义统计筛选</div>
							</div>
						</td>
					</tr>
				</tbody>
            </table>
            <ul class="common-list clearfix" id="sales-statistics">
                <li class="onlyinfo clearfix" id="sales-details-total">
                    <span class="title">总收益</span>
                    <span class="price" style="color:#ec2d2d;padding-right:30px;"><span id="group-profits-total">71.9</span> </span>
                    <div class="view-more"><img src="http://adv.xcnong.com/templates/images/gray-right-arrow.png"></div>
                    <div class="clear"></div>
                </li>
                <li class="onlyinfo clearfix" id="sales-details-miss" style="display: none;">
                    <span class="title">错失收益</span>
                    <span class="price" style="color:#ec2d2d;padding-right:30px;"><span id="group-profits-miss">0</span> </span>
                    <div class="view-more"><img src="http://adv.xcnong.com/templates/images/gray-right-arrow.png"></div>
                    <div class="clear"></div>
                </li>
            </ul>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'Benifit',
  	data () {
		return {
			
		}
	},
	created: function () {

	},
	methods: {

	}
}
</script>

<style scoped>
.x-scrolling-bar {
    overflow: hidden;
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    background: #fff;
    text-align: left;
}
.x-scrolling-bar .center-bar {
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    padding: 0 10px;
    height: 64px;
    width: 44px;
    position: absolute;
    left: 0;
    top: 0;
}
.x-scrolling-bar .x-scrolling-bar-inner {
    width: 9999px;
    height: 44px;
    line-height: 44px;
}
.x-scrolling-bar li.current {
    background: #eee;
    border-radius: 12px;
}
.x-scrolling-bar li {
    padding: 0 10px;
    float: left;
    height: 24px;
    line-height: 24px;
    margin-top: 10px;
    font-size: 14px;
    color: #444;
}

.new-address-table {
    width: 100%;
    margin-top: 5px;
}
.new-address-table tr td.center .title {
    padding-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    text-align: left;
}
.new-address-table tr td.center .inner {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.select-wrapper {
    border: 1px solid #eee;
    position: relative;
    overflow: hidden;
    background: #fff;
    text-align: left;
    padding: 0 10px 0 0;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    padding-right: 26px;
}
.select-wrapper select {
    top: 0;
    left: 0;
    opacity: 0;
    outline: none;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
}
.common-red-button {
    background: #f67969;
    color: #fff;
    text-align: center;
    font-size: 16px;
    padding: 12px;
    border-radius: 0px;
}

.common-list {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
}
.common-list li {
    position: relative;
    line-height: 42px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
}
.common-list li span.title {
    float: left;
}
.common-list li span.price {
    float: right;
    padding-right: 10px;
    color: red;
}
.common-list li div.view-more {
    position: absolute;
    height: 9px;
    width: 6px;
    right: 10px;
    margin-top: -1px;
}
.common-list li div.view-more img {
    width: 6px;
    height: 9px;
}
.common-list li.onlyinfo:last-child {
    border-bottom: none;
}

</style>