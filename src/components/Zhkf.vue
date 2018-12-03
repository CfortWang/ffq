<template>
	<div class="content">
		<div class="header">
            <div class="left-btn" v-on:click="goBack()">
                <img src="/static/img/index/go-back.png" alt="">
            </div>
            <div class="header-title">综合客服</div>
        </div>
        <div class="empty"></div>
        <div class="contain">
            <img src="/static/img/personal/zhkf.jpg" alt="">
        </div>
  	</div>
</template>

<script>
export default {
	name: 'Zhkf',
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
.contain{
    background: #fff;
    height: calc(100vh - 50px);
    padding: 0;
}
.contain img{
    width: 100%;
}
</style>