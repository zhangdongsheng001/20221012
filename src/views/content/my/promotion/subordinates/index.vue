<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
	<div class="ui-mode-container ui-mode-box flex-col">
		<div class="ui-header-item gradient">
			<div class="ui-header-arraw prev" @click="handleHistory" @touchstart.stop>
				<i class="iconfont icon iconjiantou-zuo-cuxiantiao"></i>
			</div>
			<div class="ui-header-title">我的下线</div>
		</div>
		<div class="ui-mode-content flex1"  ref="scroll">
			<div class="tab flex-row">
				<div class="flex1" @click="handleChangeTab(1)" @touchstart.stop>
					<span :class="{current:index==1}">钻石会员（{{list1.length}}）</span>
				</div>
				<div class="flex1" @click="handleChangeTab(2)" @touchstart.stop>
					<span :class="{current:index==2}">金牌会员（{{list2.length}}）</span>
				</div>
			</div>
			<div class="tab-cont" v-if="index==1">
				<div v-if="list1.length>0">
					<div class="flex-row align-between-row t1"  v-for="(item,i) in list1">
						<img  class="m1" @mousedown.prevent v-lazy="item.weichat_img">
						<div class="flex1 ">
							<p class="font7 bold">{{item.nick_name}}</p>
							<span class="font6 gray">成为分销员时间{{item.user_remark_007}}</span>
							<div class="m3">
								<span class="g3" v-if="item.user_remark_003==1">代理</span>
								<span class="g4" v-else>客户</span>
							</div>
						</div>
						<div>
							<div class="bold font8 mar-bottom-10">+{{item.user_remark_006}}</div>
							<div>订单 <span class="bold font8">{{item.user_remark_004}}</span> 个</div>
							<div>成员 <span class="red bold font8">{{item.user_remark_005}}</span> 个</div>
						</div>
					</div>
				</div>
				<div v-else class="t2">
					<img  src="../../../../../assets/images/null.png"/>
					<span class="font7 gray">暂无会员～</span>
				</div>
			</div>
			<div class="tab-cont" v-else>
				<div v-if="list2.length>0">
					<div class="flex-row align-between-row t1"  v-for="(item,i) in list2">
						<img  class="m1" @mousedown.prevent v-lazy="item.weichat_img">
						<div class="flex1 ">
							<p class="font7 bold">{{item.nick_name}}</p>
							<span class="font6 gray">成为分销员时间{{item.user_remark_007}}</span>
							<div class="m3">
								<span class="g3" v-if="item.user_remark_003==1">代理</span>
								<span class="g4" v-else>客户</span>
							</div>
						</div>
						<div>
							<div class="bold font8 mar-bottom-10">+{{item.user_remark_006||'0.00'}}</div>
							<div>订单 <span class="bold font8">{{item.user_remark_004}}</span> 个</div>
						</div>
					</div>
				</div>
				<div v-else class="noList">
					<img  src="../../../../../assets/images/null.png"/>
					<span class="font7 gray">暂无会员～</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixinCommon from '../../../mixins/common';
	import mixinRequest from '../../../mixins/request';
	import {
		getDateInfo,
		prefixNumber
	} from '@/utils/tool';



	export default {
		data() {
			return {
				list1:[],
				list2:[],
				index:1,
			}
		},
		mixins: [
			mixinCommon,
			mixinRequest,
		],
		computed: {},
		created() {
		},
		mounted() {
			this.init()
		},
		methods: {
			/*
			 * 初始化
			 */
			init() {
				if(this.$route.query.userId){
				    this.userId=this.$route.query.userId
				};
				this.showLoading();
				this.$http.get({
					name: 'test.itemUser',
					loading: {
						enabled: true
					}
				}).then(({
					result,
					response
				}) => {
					console.log(result)
					if(result.public_user_list&&result.public_user_list.length){
						var len = result.public_user_list.length
						for(let i=0;i<len;i++){
							if(this.userId==result.public_user_list[i].upline_user_code){
								result.public_user_list[i].weichat_img = require('@/assets/images/test/' + result.public_user_list[i].weichat_img + '')
								if(result.public_user_list[i].user_remark_002==2){
									this.list1.push(result.public_user_list[i])
								}else{
									this.list2.push(result.public_user_list[i])
								}
							}
						}
					}
					this.pageStatus = true
					this.showContent();
					console.log(this.list1)
					console.log(this.list2)
				})
			},

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
			/*
			 * 修改内容
			 */
			handleChangeTab(i){
				this.index=i
			}
		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.ui-mode-container{
		background-color: #F8F9FA;
	}
	.tab{
		height: 2.4rem;
		line-height: 2.4rem;
		border-bottom: solid 1px #EEEEEE;
		background-color: #fff;
		text-align: center;
		font-size: 0.7rem;
		span{
			display: inline-block;
			height: 2.4rem;
			line-height: 2.4rem;
			border-bottom: solid 0.1rem transparent;
			color: #7A7B81;
		}
		.current{
			border-bottom: solid 0.1rem @base-active-color;
			color: @base-active-color;
			font-weight: bold;
		}
	}
	.t1{
		margin-top:0.5rem;
		padding: 0.6rem 0.85rem;
		background-color: #fff;
		line-height: 1.3rem;
	}
	.m1{
		width: 2.6rem;
		height: 2.6rem;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
	.m3{
		span{
		display: inline-block;
		height: 0.85rem;
		line-height: 0.85rem;
		padding: 0 0.2rem;
		border-radius: 0.1rem;
		font-size: 0.6rem;
		}
		.g3{
			border: solid 1px @base-active-color;
			color: @base-active-color;
			background: #FFF1F3;
		}
		.g4{
			border-bottom: solid 1px #F0F0F0;
			color: #7A7B81;
			background: #F0F0F0;
			
		}
	}
</style>
