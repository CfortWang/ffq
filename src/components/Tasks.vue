<template>
	<div class="content">
		<!-- 轮播 -->
    	<swiper :options="swiperOption">
			<swiper-slide class="swiper-div" v-for="item in bannerList" v-bind:key="item.index">
				<img v-bind:src="item.image" alt="" v-on:click="jumpTo(item.link)">
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>

        <div class="task-operate">
            <div class="task-submit" v-on:click="jumpTo('/tasksHistory?status=0')">
                <img src="/static/img/tasks/upload.png" alt="">
                <p>提交任务</p>
            </div>
            <div class="task-history" v-on:click="jumpTo('/tasksHistory')">
                <img src="/static/img/tasks/task_list.png" alt="">
                <p>任务记录</p>
            </div>
        </div>

		<!-- 任务菜单 -->
        <div class="task-menu" v-for="item in hallList" v-bind:key="item.index" >
            <div class="task-hall" v-on:click="jumpTo('/tasksHall?type=' + item.user_level)">
                <img src="/static/img/tasks/task4.png" alt="">
                <div class="task-title">{{item.name}}</div>
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
import {request} from '../utils/httpAxios.js'
export default {
	name: 'Tasks',
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
			},
			bannerList: '',
			hallList: []
		}
	},
	created: function () {
		request({ // 获取轮播图
			method: 'GET',
			url: process.env.api_url + '/home'
		}).then((response) => {
			let responseData = response.data.data
			this.bannerList = responseData.banner
		}).catch((ex) => {
			console.log(ex)
		})

		request({ // 获取任务大厅
			method: 'GET',
			url: process.env.api_url + '/task/hallList'
		}).then((response) => {
			this.hallList = response.data.data
			console.log(this.hallList)
		}).catch((ex) => {
			console.log(ex)
		})
		
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
