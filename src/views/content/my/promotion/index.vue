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
			<div class="ui-header-title">推广中心</div>
		</div>
		<div class="ui-mode-content flex1  font7" id="container" ref="scroll">
			<template v-if="pageStatus">
				<div class="box mt-user-info ">
					<div class=" g1 flex-row align-between-row">
						<div class="mar-top-10">
							<span class="font10 bold">{{detailInfo.nick_name}}</span>
							<div class="m1">推荐人<span class="font8">{{detailInfo.user_phone}}</span></div>
							<span v-if="detailInfo.user_type" class="m2">{{dictionary.userType[detailInfo.user_type]}}</span>
						</div>
						<div class="photo-box" @click="goApply">
							<img  class="app-image auto" @mousedown.prevent v-lazy="detailInfo.weichat_img">
						</div>
					</div>
					<div class="g2 flex-row align-between-row txt-c">
						<div class="flex1">
							<span class="gray font6">成功提现金额（元）</span>
							<p class="red font10 bold">2200.50</p>
						</div>
						<div class="flex1">
							<span class="gray font6">审核中佣金（元）</span>
							<p class="red font10 bold">3500.50</p>
						</div>
					</div>
					<div class="g3 flex-row align-between-row">
						<div  @click="goSubordinates">
							<span class="font8 bold">我的下线</span>
							<p><span class="bold font13">5</span> 人</p>
						</div>
						<div @click="goOrder">
							<span class="font8 bold">推广订单</span>
							<p><span class="bold font13">5</span> 个</p>
						</div>
					</div>
					<div class="g4">
						<div class="item flex-row align-center" @click="handleFollowWeChat" v-if="detailInfo.user_type==1||detailInfo.user_type==2||detailInfo.user_type==3">
							<img src="../../../../assets/images/promotion_code.png"/>
							<span class="font8 bold flex1">推广二维码</span>
							<i class="iconfont icon iconln_sanjiaoyou"></i>
						</div>
					</div>
				</div>
			</template>
		</div>
		<transition name="app_dialog">
			<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialogFollow">
				<div class="mt-master-content mt-back-showDialog">
					<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
						<img src="../../../../assets/images/icon_delete.png" />
					</div>
					<div  class="mt-sure-showDialog pad-bottom-20 pad-top-20">
						<div class="mt-back-showDialog-body">
							<div class="txt-c">
								<img class="mt-follow-showDialog-pic" src="../../../../assets/images/promotion_pic.png"/>
							</div>
							<div class="mt-follow-showDialog-code-box flex-row">
								<div class="mt-follow-showDialog-code"><img src="../../../../assets/images/wei_chat_pub.png"/></div>
								<p class="flex1 font8">简介简介简介简介简介 简介简介简介简介简介</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import mixinCommon from '../../mixins/common';
	import mixinRequest from '../../mixins/request';
	import {
		getDateInfo,
		prefixNumber
	} from '@/utils/tool';

	import photo1 from '../../../../assets/images/test/photo_1.png';
	import photo2 from '../../../../assets/images/test/photo_2.png';
	import photo3 from '../../../../assets/images/test/photo_3.png';
	import photo4 from '../../../../assets/images/test/photo_4.png';
	/* import photo from '../../../../assets/images/svgIcon/icons8-edit.svg'; */




	export default {
		data() {
			return {
				public_agent_info: {},
				public_user_info: {},
				public_goods_order_record: {},
				detailInfo: {},
				userId:3,
				showDialogFollow:false,
			}
		},
		mixins: [
			mixinCommon,
			mixinRequest,
			//mixinCart,
			//mixinShare
		],
		computed: {},
		created() {
			/* this.showMessage(window.location.href)
			if(this.$route.query.type_from_login ==101&&!this.isLogin){
				this.appDownload=true
				this.handleMockLogin()
			}
			if (this.isWeixin) {
			    if (!this.isMiniProgram) {
					if(this.$route.query.type_from_login ==101&&!this.isLogin){
						this.appDownload=true
						this.handleMockLogin()
					}
				}
			} */

		},
		mounted() {
			this.photoArr = [photo1, photo2, photo3, photo4]
			this.init()
		},
		methods: {
			/*
			 * 初始化
			 */
			init() {
				 if (!this.$route.query.userId) {
					return this.showMessage('进入非法').then(() => {
						this.handleHistory();
					});
				}else{
					this.userId=this.$route.query.userId
				}; 
				this.handleLoad();
			},
			/*
			 * 初始化加载数据
			 */
			handleLoad() {
				if (this.$route.query.userId) {
					this.userId = this.$route.query.userId
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
					if (result.public_user_list && result.public_user_list.length) {
						var len = result.public_user_list.length
						for (let i = 0; i < len; i++) {
							if (this.userId == result.public_user_list[i].id_public_user_info) {
								this.detailInfo = result.public_user_list[i]
								this.detailInfo.weichat_img = this.photoArr[0];
								this.userType = this.detailInfo.user_type,
									this.NewUserType = this.userType
								break
							}
						}
					}
					this.pageStatus = true
					this.showContent();
					console.log(this.detailInfo)
				})
			},

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
			/*
			 * 推广二维码
			 */
			handleFollowWeChat() {
				this.showDialogFollow=true
			},
			/*
			 * 关闭
			 */
			handleBackClose() {
				this.showDialogFollow=false
			},
			
			/*
			 * 去申请，测试用
			 */
			goApply() {
				this.$router.push({
					path: '/my/promotion/apply',
				});
			},
			/*
			 * 去我的下线
			 */
			goSubordinates() {
				this.$router.push({
					path: '/my/promotion/subordinates',
					query: {
						userId: this.userId
					}
				});
			},
			/*
			 * 去推广订单
			 */
			goOrder() {
				this.$router.push({
					path: '/my/promotion/order',
					query: {
						userId: this.userId
					}
				});
			},
			

		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.ui-mode-content{
		padding: 0.85rem;
	}
	.g1{
		height: 8rem;
		background: url("../../../../assets/images/promotion_bg.png");
		background-size: 100% 100%;
		padding: 0.8rem 1rem;
		line-height: 1.5rem;
		.m1{
			padding-left: 0.9rem;
			background: url("../../../../assets/images/promotion_user_icon.png") left center no-repeat;
			background-size: 0.64rem 0.64rem;
			span{
				margin-left: 0.4rem;
			}
		}
		.m2{
			display: inline-block;
			padding: 0 0.3rem;
			height: 1rem;
			line-height: 1rem;
			border-radius: 0.5rem;
			border: solid 1px @base-active-color;
			color:@base-active-color;
			font-size: 0.6rem;
		}
	}
	.g2{
		margin-top:1rem;
		padding: 1rem 0;
		background: #FFFFFF;
		box-shadow: 0px 0.3rem 1.36rem 0px rgba(189, 189, 189, 0.3);
		border-radius: 0.6rem;
		div:nth-child(1){
			border-right: solid 1px #F0F0F0;
		}
	}
	.g3{
		margin-top:1rem;
		div{
			padding: 1.28rem;
			width: 8.7rem;
			height: 5.3rem;
			background: url("../../../../assets/images/promotion_bg1.png");
			background-size: 100% 100%;
			line-height: 1;
			color: #9E8256;
			p{
				margin-top:0.5rem
			}
		}
		div:nth-child(2){
			color: #4C76A0;
			background: url("../../../../assets/images/promotion_bg2.png");
			background-size: 100% 100%;
		}
	}
	.g4{
		margin-top:1rem;
		padding: 0.5rem 0;
		border-top:solid 1px #F0F0F0;
		border-bottom:solid 1px #F0F0F0;
		line-height: 1.5rem;
		img{
			width: 1.5rem;
			height: 1.5rem;
			margin-right: 0.7rem;
		}
		i{
			color: #7A7B81;
		}
		
	}
	.photo-box{
		width: 3.4rem;
		height: 3.4rem;
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		
	}
	.mt-follow-showDialog-pic{
		width: 10rem;
		height: auto;
	}
	.mt-follow-showDialog-code-box{
		padding: 0 0.9rem 0.5rem;
		margin-top:1.8rem;
		line-height: 1.4rem;
	}
	.mt-follow-showDialog-code{
		width: 4.9rem;
		height: 4.9rem;
		padding: 0.3rem;
		border:solid 4px @base-active-color;
		margin-right: 0.3rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>
