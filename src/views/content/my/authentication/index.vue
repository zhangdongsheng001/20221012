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
			<div class="ui-header-title">身份认证</div>
		</div>
		<div class="ui-mode-content flex1  font7" id="container" ref="scroll">
			<template v-if="pageStatus">
				<div class="tip red"><i class="iconfont icon icongantanhao-xianxingyuankuang"></i>身份认证成功后，如需修改身份，请联系平台客服！</div>
				<div class="box">
					<div class="title">真实姓名</div>
					<div>
						<div class="t1">
							<input type="text" v-model="detailInfo.user_remark_010" placeholder="请填写真实姓名" >
						</div>
						<div>
							<div class="b1">
								<div v-if="detailInfo.user_remark_008" class="m1">
									<img  v-lazy="detailInfo.user_remark_008" />
									<span class="reupload "  @click.stop="upload()">重新上传</span>
								</div>
								<div v-else class="m2 flex-col align-center">
									<span>上传正面照片</span>
								</div>
							</div>
							<div>
								<p class="font8">身份证正面照片</p>
								<span class="gray">注：确保内容清晰可见，照片大小不超过10M</span>
							</div>
						</div>
						<div>
							<div class="b1">
								<div v-if="detailInfo.user_remark_009" class="m1">
									<img v-lazy="detailInfo.user_remark_009" />
									<span class="reupload "  @click.stop="upload()">重新上传</span>
								</div>
								<div v-else class="m2 m3 flex-col align-center">
									<span>上传反面照片</span>
								</div>
							</div>
							<div>
								<p class="font8">身份证反面照片</p>
								<span class="gray">注：确保内容清晰可见，照片大小不超过10M</span>
							</div>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="title">上传资料</div>
					<div>
						<div class="font6 gray">至少选一种类型资料上传（名片/网络端口/近三天朋友圈截图）</div>
						<div>
							<div class="upload-img" v-for="(item,i) in detailInfo.user_remark_011" >
								<div class="ml">
									<!-- <img :src="item.pic_src" /> -->
									<img v-lazy="item" />
									<span class="reupload" @click.stop="upload()">重新上传</span>
								</div>
							</div>
							<div class="upload-img" >
								<div class="ml flex-col align-center" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
									<span>点击上传</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		<div class="bottom-sumit-btn">
			<span class="sure" @click.stop="submit()" >确定并提交</span>
		</div>
		<transition name="app_dialog">
				<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialog">
					<div class="mt-master-content mt-back-showDialog">
						<div class="mt-back-showDialog-body flex-col align-center">
							<img src="@/assets/images/icon_successed.png" />
							<span>提交成功</span>
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
	export default {
		data() {
			return {
				public_agent_info: {},
				public_user_info: {},
				public_goods_order_record: {},
				detailInfo: {},
				userId:3,
				showDialog:false,
				pageStatus:false
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

		},
		mounted() {
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
								if(this.detailInfo.user_remark_008){
									this.detailInfo.user_remark_008= require('@/assets/images/test/' + this.detailInfo.user_remark_008)
								}
								if(this.detailInfo.user_remark_009){
									this.detailInfo.user_remark_009= require('@/assets/images/test/' + this.detailInfo.user_remark_009)
								}
								if(this.detailInfo.user_remark_011){
									this.detailInfo.user_remark_011=this.detailInfo.user_remark_011.split(',')
									this.detailInfo.user_remark_011.map((item, index) => {
										console.log(item)
											item = require('@/assets/images/test/' + item)
											return item
									});
								}
								
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
			 * 提交
			 */
			submit() {
				if(!this.detailInfo.user_remark_010||this.detailInfo.user_remark_010.length==0){
					return this.showMessage('真实姓名必填!');
				}
				this.showDialog=true
				this.timer=setTimeout(()=>{
				    this.showDialog=false
				},1500);
			},
			
			

		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.ui-mode-content{
		background-color: #F8F9FA;
		line-height: 1.4rem;
	}
	.tip{
		height: 1.8rem;
		line-height: 1.8rem;
		background-color: #FFF1F3;
		padding: 0 0.85rem;
		i{
			margin-right: 0.5rem;
			font-size: 1rem;
			vertical-align: middle;
		}
	}
	.box{
		background-color: #fff;
		padding:0.85rem;
		margin-bottom: 0.5rem;
		.title{
			font-size: 0.8rem;
			font-weight: bold;
		}
		.t1{
			margin-top: 0.5rem;
			height: 2.3rem;
			line-height: 2.3rem;
			background: #F9F9F9;
			border: 1px solid #E3E3E3;
			border-radius: 0.4rem;
			input{
				padding: 0 0.5rem;
				width: 100%;
				background-color: transparent;
				border: none;
				font-size: 0.8rem;
			}
			input::-webkit-input-placeholder{
				color: #DCDEE2;
			}
		}
		.b1{
			margin: 1.28rem 0;
			height: 10.5rem;
			background: #FEFFFF;
			border: 1px solid #F0F0F0;
			border-radius: 0.4rem;
			.m1{
				position: relative;
				height: 10.5rem;
				text-align: center;
				img{
					max-width: 100%;
					max-height: 100%;
					object-fit: contain;
				}
			}
			.m2{
				height: 10.5rem;
				position: relative;
				background: url(../../../../assets/images/authentication_bg2.png);
				background-size: 100% 100%;
				span{
					padding: 0 0.5rem;
					height: 1.6rem;
					line-height: 1.6rem;
					background: #FFF1F3;
					border: 1px solid #FD3C5C;
					border-radius: 0.8rem;
					font-weight: 600;
					color: #FD3C5C;
				}
			}
			.m3{
				background: url(../../../../assets/images/authentication_bg1.png);
				background-size: 100% 100%;
			}
		}
		.upload-img{
			margin: 1.28rem 0;
			height: 10.5rem;
			background: #FEFFFF;
			border: 1px solid #F0F0F0;
			border-radius: 0.4rem;
			.ml{
				height: 10.5rem;
				position: relative;
				img{
					width:100%;
					height: 100%; 
					object-fit: contain;
				}
				em{
					color: #7A7B81 ;
					border-radius: 50%;
					font-size: 2rem;
					transform:rotate(45deg);
					line-height: 2rem;
				}
				span{
					color: #7A7B81 ;
					line-height: 2rem;
				}
				.reupload{
					line-height: 1.6rem;
					color: #fff ;
				}
			}
		}
		.reupload{
			display: block;
			position: absolute;
			top:50%;
			left: 50%;
			margin-top:-0.8rem;
			margin-left:-2.4rem;
			height: 1.6rem;
			line-height: 1.6rem;
			width: 4.8rem;
			background-color: #000;
			border:solid 1px #fff;
			color: #fff ;
			border-radius: 0.8rem;
			font-size: 0.6rem;
			text-align: center;
			opacity: 0.7;
		}
		
	}
	.mt-master-container .mt-back-showDialog{
		width: 6.4rem;
	}
	.mt-back-showDialog-body{
		padding: 1rem !important;
		height: 6.4rem;
		line-height: 1;
		img{
			width: 2.4rem;
			margin-bottom: 0.8rem;
		}
	}
</style>
