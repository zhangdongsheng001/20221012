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
			<div class="ui-header-title">申请成为推广员</div>
		</div>
		<div class="ui-mode-content flex1"  ref="scroll">
			<div class="banner">
				<img src="../../../../../assets/images/promotion_banner.png"/>
			</div>
			<div class="apply-body">
				<div class="apply-tip font9 bold">欢迎加入<span class="red">某某某平台</span>，填写申请信息</div>
				<div>
					<div class="apply-input-box">
						<label>邀请人</label>
						<input type="text" v-model="Invitees" disabled="disabled"  >
					</div>
					<div class="apply-input-box">
						<label>姓名</label>
						<input type="text" v-model="nickName" placeholder="请填写真实姓名，用于结算"  @touchstart.stop>
					</div>
					<div class="apply-input-box">
						<label>手机号</label>
						<input type="text" v-model="mobile" placeholder="请填写手机号，方便联系"  @touchstart.stop >
					</div>
					<div class="sure">申请成为推广员</div>
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
				Invitees:'傻傻',
				nickName:'',
				mobile:''
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
			},

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.banner{
		height: 10rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.apply-body{
		padding: 0.85rem 0.85rem 2.8rem;
	}
	.apply-tip{
		margin-bottom: 0.85rem;
	}
	.apply-input-box{
		margin-bottom: 0.85rem;
		padding:0 0.85rem;
		border:solid 1px #F0F0F0;
		background-color: #F9F9F9;
		border-radius: 0.4rem;
		height: 2.4rem;
		line-height: 2.4rem;
	}
	label{
		display: inline-block;
		width: 3.5rem;
		font-size: 0.8rem;
	}
	input{
		width:12rem ;
		border:none;
		background-color: transparent;
		font-weight: bold;
		font-size: 0.8rem;
		color: @base-active-color;
	}
	.sure{
		margin-top:1.5rem;
		height: 2.4rem;
		line-height: 2.4rem;
		border-radius: 1.2rem;
		text-align: center;
		font-size: 0.8rem;
	}
</style>
