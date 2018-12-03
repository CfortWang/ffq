<template>
	<div class="content">
        <div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">公司简介</div>
        </div>
        <div class="empty"></div>
        <div class="user-center-desk border-top-ddd" style="background:#fff;text-align:left;padding:10px;">
            <div class="title" style="font-size:16px;">公司简介</div>
            <div class="title" style="font-size:12px;margin-top:10px;color:#aaa;">2018-11-22 15:47:28</div>
            <div class="title" style="font-size:16px;margin-top:10px;line-height:24px;">发发圈是广西铭功科技有限公司打造的一个最新互联网共享广告产品；是一个创新的出租朋友圈广告的平台，广告主在发发圈发布广告任务，用户领取任务发布至朋友圈赚取佣金。<br>
                <br>
                <p>发发圈打造一个互利共赢的平台，将闲置的朋友圈产生最大化的价值，为广告主创造效益，给会员创富未来！</p>
                <br>
                <p>同时，发发圈平台拿出巨额资金奖励给推广者，希望能将发发圈快速占领市场，为今后多业务板块的上线做好准备。</p>
                <p><img src="/static/img/personal/introduction1.png" alt=""></p>
                <p>公司关于发发圈平台未来规划如下：</p>
                <br>
                <p>1.0 运营朋友圈分享广告模式</p>
                <br>
                <p>2.0 对接实体店，将线下广告分享至朋友圈</p>
                <br>
                <p>3.0 整合资源，联盟各地广告合作商，打造全国最大的广告推广分享平台</p>
                <br>
                <p>4.0 公司筹备上市</p>
                <p><img src="/static/img/personal/introduction2.png" alt=""></p>
                <p><img src="/static/img/personal/introduction3.png" alt=""></p>
                <p><img src="/static/img/personal/introduction4.png" alt=""></p>
            </div>
        </div>
  	</div>
</template>

<script>
export default {
	name: 'Introduction',
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
p img {
    width: 100%;
    height: auto;
}
</style>
