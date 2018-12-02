<template>
	<div class="content">
		<!-- 轮播 -->
    	<swiper :options="swiperOption">
			<!-- <swiper-slide class="swiper-div" v-for="item in bannerItems" v-bind:key="item.index">
				<img v-bind:src="item.image" alt="">
			</swiper-slide> -->
      		<swiper-slide class="swiper-div">
				<img src="/static/img/index/Carousel1.jpg" alt="">
			</swiper-slide>
			<swiper-slide class="swiper-div">
				<img src="/static/img/index/Carousel2.jpg" alt="">
			</swiper-slide>
			<swiper-slide class="swiper-div">
				<img src="/static/img/index/Carousel3.jpg" alt="">
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>

        <div class="task-operate">
            <div class="task-submit">
                <img src="/static/img/tasks/upload.png" alt="">
                <p>提交任务</p>
            </div>
            <div class="task-history">
                <img src="/static/img/tasks/task_list.png" alt="">
                <p>任务记录</p>
            </div>
        </div>

		<!-- 任务菜单 -->
        <div class="task-menu">
            <div class="free">
                <img src="/static/img/tasks/task.png" alt="">
                <div class="task-title">自由任务大厅</div>
            </div>
            <div class="member">
                <img src="/static/img/tasks/task.png" alt="">
                <div class="task-title">会员任务大厅</div>
            </div>
            <div class="intermediate">
                <img src="/static/img/tasks/task.png" alt="">
                <div class="task-title">中级任务大厅</div>
            </div>
            <div class="advanced">
                <img src="/static/img/tasks/task.png" alt="">
                <div class="task-title">高级任务大厅</div>
            </div>
        </div>

		<!-- 底部 -->
		<div class="footer">
			<div class="homepage" v-on:click="jumpTo('/')">
				<div class="footer-icon">
					<img src="/static/img/index/index.png" alt="">
				</div>
				<div class="footer-text">首页</div>
			</div>
			<div class="task" v-on:click="jumpTo('/tasks')">
				<div class="footer-icon">
					<img src="/static/img/index/tasks-cur.png" alt="">
				</div>
				<div class="footer-text footer-active">任务中心</div>
			</div>
			<div class="personal" v-on:click="jumpTo('/personal')">
				<div class="footer-icon">
					<img src="/static/img/index/center.png" alt="">
				</div>
				<div class="footer-text">个人中心</div>
			</div>
		</div>
  	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: 'HomePage',
  	components: {
		swiper,
		swiperSlide
	},
  	data () {
		return {
			swiperOption: {
				autoplay: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				centeredSlides: true,
				loop: true
			}
		}
	},
	created: function () {

	},
	methods: {

	}
}
</script>

<style scoped>
.content{
    font-family: "微软雅黑","tahoma","arial","simsun","sans-serif";
}
.swiper-div img{
	width: 100%;
}
.swiper-pagination-bullet{
	width: 8px;
	height: 8px;
	background: RGBA(0, 0, 0, 1);
	border-radius: 50%;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    width: 16px;
    background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
    border-radius:8px;
		outline: none;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    width: 100%;
}

.task-operate{
    margin-top: 7px;
    padding: 16px 0px;
    font-size: 0px;
    background: #ffffff;
}
.task-operate > div{
    display: inline-block;
    width: 50%;
    font-size: 13px;
}
.task-operate img{
    border-radius: 20%;
    width: 22%;
    margin-bottom: 5px;
}

.task-menu{
    background: #eeeeee;
    padding: 0px 2px;
    margin-bottom: 80px;
}
.task-menu > div{
    background: #ffffff;
    margin-top: 10px;
    padding: 26px 30px;
    text-align: left;
}
.task-menu img{
    width: 40px;
    vertical-align: middle;
    margin-right: 12px;
}
.task-title{
    display: inline;
    vertical-align: middle;
}
</style>
