<template>
	<div class="ui-mode-container ui-mode-box flex-col ">
		<div class="ui-mode-content mt-avatar-item flex-row align-center-row">
				<div class="photo-box ">
					<img v-if="hasLogin" class="app-image auto" @mousedown.prevent v-lazy="detailInfo.weichat_img">
					<img v-else class="app-image auto" @mousedown.prevent src="../../../assets/images/my_no_login.png">
				</div>
				<div class="font10 bold" v-if="!hasLogin">点击登录</div>
				<div v-else>
					<div class="font10 bold">迪丽热巴</div>
					<div>
						<span class="font8">13758090965</span>
						<span v-if="detailInfo.user_type" class="user-type-str">{{dictionary.userType[detailInfo.user_type]}}</span>
					</div>
				</div>
		</div>
		<div class="ui-mode-content flex1" ref="scroll">
			<template v-if="pageStatus">
				<div class="mt-user-info">
					<div class="t1 flex-row ">
						<div class="flex1" @click="goHouse">
							<img src="../../../assets/images/icon_my_house.png"/>
							<span class="font7 bold" >我的房源</span>
						</div>
						<div class="flex1" v-if="detailInfo.user_type==3" @click="goPromotion">
							<img src="../../../assets/images/icon_distribution_center.png"/>
							<span class="font7 bold">推广中心</span>
						</div>
						<div class="flex1" v-else-if="detailInfo.user_type==1||detailInfo.user_type==2" @click="handleSelectHouse">
							<img src="../../../assets/images/icon_distribution_center2.png"/>
							<span class="font7 bold">发布房源</span>
						</div>
						<div class="flex1" v-else-if="detailInfo.user_type==4" @click="goOrder">
							<img src="../../../assets/images/icon_distribution_center3.png"/>
							<span class="font7 bold">创建订单</span>
						</div>
					</div>
					<div>
						<div class="item flex-row align-center" @click="handleChangeUserType" v-if="detailInfo.user_type==1||detailInfo.user_type==2||detailInfo.user_type==3">
							<img src="../../../assets/images/icon_Information.png"/>
							<span class="label flex1">身份认证</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</div>
						<div class="item flex-row align-center" v-if="detailInfo.user_type==3||detailInfo.user_type==4" @click="handleSelectHouse">
							<img src="../../../assets/images/icon_Information1.png"/>
							<span class="label flex1">发布房源</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</div>
						<div class="item flex-row align-center" @click="handleBack">
							<img src="../../../assets/images/icon_opinion.png"/>
							<span class="label flex1">意见反馈</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</div>
						<div class="item flex-row align-center" @click="handleFollowWeChat">
							<img src="../../../assets/images/icon_attention.png"/>
							<span class="label flex1">关注公众号</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</div>
						<div class="item flex-row align-center"  @click="handleContact" v-if="detailInfo.user_type==3">
							<img src="../../../assets/images/icon_service.png"/>
							<span class="label flex1">联系客服</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</div>
						<a href="tel:15802531670" class="item flex-row align-center" v-else-if="detailInfo.user_type==1||detailInfo.user_type==2">
							<img src="../../../assets/images/icon_service.png"/>
							<span class="label flex1">联系客服</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao"></i>
						</a>
					</div>
				</div>
			</template>
		</div>
		<transition name="app_dialog">
				<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialog">
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserType">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div>
							<p class="font8 bold mt-back-showDialog-title">选择身份</p>
							<div class="mt-back-showDialog-body">
								<p class="mt-back-showDialog-tip">根据选择为您提供精准服务</p>
								<div class="mt-back-showDialog-box " :class="{current:NewUserType==item.value}" v-if="i<3"  v-for="(item,i) in dictionary.userTypeStr">
									<label class="flex-row align-center-row align-between-row" @touchstart.stop>
										<div class="flex1">
											<p class="font8 bold">{{item.name}}</p>
											<span class="gray font6">{{item.des}}</span>
										</div>
										<input class="mt-back-showDialog-input" :value="item.value" name="user_type"   type="radio" v-bind="$attrs" :checked="isChecked" v-on="getUserTypeListeners" />
										<span class="select"></span>
									</label>
								</div>
							</div>
						</div>
						<div class="mt-back-showDialog-bottom">
							<div class="sure submit" @touchstart.stop @click="handleUserTypeSubmit()">
								<span>确定</span>
							</div>
						</div>
					</div>
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserSure">
						<div class="mt-sure-showDialog">
							<p class="font8 bold mt-sure-showDialog-title">温馨提示</p>
							<div class="mt-back-showDialog-body">
								<p class="font8 bold">您确定要认证为“个人”吗？</p>
								<span class="font7 gray">身份认证后，如需修改身份，请联系客服！</span>
							</div>
						</div>
						<div class="mt-sure-showDialog-bottom flex-row">
							<span class="flex1"  @touchstart.stop @click="handleUserTypeCancel()">取消</span>
							<span class="red flex1"  @touchstart.stop @click="handleUserTypeSure()">确定</span>
						</div>
					</div>
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserSuccess">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div class="mt-sure-showDialog pad-bottom-15">
							<div class="mt-back-showDialog-body flex-col align-center txt-c">
								<img class="mt-success-showDialog-pic" src="../../../assets/images/icon_succeed.png"/>
								<span class="font6 gray">您已认证为“个人”，如需修改身份，请联系客服！</span>
							</div>
						</div>
					</div>
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserExamined">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div class="mt-sure-showDialog pad-bottom-15">
							<div class="mt-back-showDialog-body flex-col align-center txt-c">
								<img class="mt-success-showDialog-pic" src="../../../assets/images/icon_check.png"/>
								<span class="font6 gray">您的身份正在审核中，请请耐心等待～</span>
							</div>
						</div>
					</div>
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserTip">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div class="mt-sure-showDialog pad-bottom-15">
							<div class="mt-back-showDialog-body flex-col align-center txt-c">
								<img class="mt-success-showDialog-pic" src="../../../assets/images/icon_succeed.png"/>
								<span class="font6 gray">您已认证为“经纪人”，如需修改身份，请联系客服！</span>
							</div>
						</div>
					</div>
					<div class="mt-master-content mt-back-showDialog" v-if="showDialogUserErr">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div class="mt-sure-showDialog pad-bottom-15">
							<div class="mt-back-showDialog-body flex-col align-center txt-c">
								<img class="mt-success-showDialog-pic" src="../../../assets/images/icon_er.png"/>
								<span class="font6 gray">您的“经纪人”身份认证失败</span>
							</div>
							<div class="fail-bottom flex-row align-between-row align-center-row">
								<span class="r1" @touchstart.stop @click="handleFail()" >查看原因</span>
								<span class="r2" @touchstart.stop @click="goExamined()">重新认证</span>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-master-container flex-col align-center" @touchstart.prevent v-else-if="showDialogBack">
					<div class="mt-master-content mt-back-showDialog">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div>
							<p class="font8 bold mt-back-showDialog-title">意见反馈</p>
							<div class="mt-back-showDialog-body">
								<div class="mt-back-showDialog-box  mt-back-showDialog-box-width">
									<textarea rows="4" ref="textStr" laceholder="还说点什么吧......" @touchstart.stop  @keyup="changeTextStr($event,j)" maxlength="100"></textarea>
									<div class="num">
										<span>{{textStrlength}}</span>/<span>100</span>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-back-showDialog-bottom">
							<div class="sure submit" @touchstart.stop @click="handleBackSubmit()">
								<span>确定</span>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-master-container flex-col align-center" @touchstart.prevent v-else-if="showDialogFollow">
					<div class="mt-master-content mt-back-showDialog">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div  class="mt-sure-showDialog pad-bottom-15 pad-top-20">
							<p class="font8 bold txt-c">欢迎关注</p>
								<div class="mt-back-showDialog-body flex-col align-center txt-c">
									<img class="mt-follow-showDialog-pic" src="../../../assets/images/wei_chat_pub.png"/>
									<span class="font6 gray">长按识别关注公众号</span>
								</div>
							</div>
					</div>
				</div>
				<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialogContact">
					<div class="mt-master-content mt-back-showDialog">
						<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
							<img src="../../../assets/images/icon_delete.png" />
						</div>
						<div class="mt-contact-showDialog pad-bottom-15 pad-top-20">
							<div class="mt-back-showDialog-box flex-row align-center-row align-between-row">
								<div>
									<img src="../../../assets/images/icon_wechat.png"/>
									<span>Molly13758090964</span>
								</div>
								<button class="m1">复制</button>
							</div>
							<div class="mt-back-showDialog-box flex-row align-center-row align-between-row">
								<div>
									<img src="../../../assets/images/icon_phone2.png"/>
									<span>13511390876</span>
								</div>
								<button class="sure m2">拨号</button>
							</div>
						</div>
					</div>
				</div>
		</transition>
		<inner-selectType ref="HouseType" :userType="userType"  :showHouseDialog.sync="showHouseDialog"  v-if="showHouseDialog"  @changeHouseType="changeHouseTypeF"></inner-selectType>
	</div>
</template>

<script>
	import mixinCommon from '../mixins/common';
	import mixinRequest from '../mixins/request';
	import innerSelectType from './house/src/selectType';
	//import mixinShare from '../mixins/share';

	import photo1 from '../../../assets/images/test/photo_1.png';
	import photo2 from '../../../assets/images/test/photo_2.png';
	import photo3 from '../../../assets/images/test/photo_3.png';
	import photo4 from '../../../assets/images/test/photo_4.png';
	

	export default {
		data() {
			return {
				public_agent_info: {},
				public_user_info: {},
				detailInfo: {},
				hasLogin:true,
				userId:3,
				showDialog:false,
				showDialogUserType:false,
				showDialogUserSuccess:false,
				showDialogUserSure:false,
				NewUserType:'',
				showDialogBack:false,
				textStrlength:0,
				showDialogFollow:false,
				showDialogContact:false,
				showDialogUserExamined:false,
				showHouseDialog:false,
				showDialogUserTip:false,
				showDialogUserErr:false
			};
		},
		mixins: [
			mixinCommon,
			mixinRequest,
			innerSelectType,
			//mixinShare
		],
		computed: {
			getUserTypeListeners(){
			    return {
			        ...this.$listeners,
			        input:event=>{
			            if(!this.disabled&&!this.isChecked){
										this.NewUserType=event.target.value
			            };
			        }
			    };
			},
			isChecked(){
			    return `${this.value}`==this.NewUserType;
			},
		},
		watch: {},
		created() {

		},
		mounted() {
			this.photoArr = [photo1, photo2, photo3, photo4]
			this.init()
			//this.initBridgeShare();
		},
		methods: {
			/*
			 * 初始化
			 */
			/* init(){
			    let public_agent_info=this.$store.state.global.public_agent_info,
			        public_user_info=this.$store.state.global.public_user_info;
			    if(public_agent_info&&public_user_info){
			        this.public_agent_info=public_agent_info;
			        this.public_user_info=public_user_info;
			        document.title=this.public_agent_info.application_name;
			        this.showContent();
			    }else{
			        this.getPageInfo({
			            name:'my',
			            param:{
			                invoke_method:'user_and_shop_info'
			            }
			        }).then(({result,response})=>{
			            //console.log('my',result)
			            this.public_agent_info=result.public_agent_info||{};
			            this.public_user_info=result.public_user_info||{};
			            document.title=this.public_agent_info.application_name;
			            this.setState({
			                key:'public_agent_info',
			                value:this.public_agent_info
			            });
			            this.setState({
			                key:'public_user_info',
			                value:this.public_user_info
			            });
			        });
			    };
			}, */
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
							if(this.userId==result.public_user_list[i].id_public_user_info){
								this.detailInfo=result.public_user_list[i]
								this.detailInfo.weichat_img = this.photoArr[0];
								this.userType=this.detailInfo.user_type
								if(this.userType==1||this.userType==2){
									console.log(this.detailInfo.user_remark_001)
									if(this.detailInfo.user_remark_001==2){
										this.showDialog=true
										this.showDialogUserTip=true
										this.NewUserType=this.userType
									}else if(this.detailInfo.user_remark_001==3){
										this.showDialog=true
										this.showDialogUserErr=true
									}
								}else{
									this.NewUserType=this.userType
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
				this.init();
			},
			/*
			 * 去推广
			 */
			goPromotion() {
				this.$router.push({
					path: '/my/promotion',
					query: {
						userId: this.userId
					}
				});
			},
			/*
			 * 去我的房源
			 */
			goHouse() {
				this.$router.push({
					path: '/my/house',
					query: {
						userId: this.userId,
						userType:this.NewUserType
					}
				});
			},
			
			/*
			 * 身份认证
			 */
			handleChangeUserType() {
				this.showDialog=true
				this.showDialogUserType=true
			},
			/*
			 * 身份认证提交
			 */
			handleUserTypeSubmit() {
				if(this.NewUserType==3){
					this.showDialogUserSure=true
				}else if(this.NewUserType==1||this.NewUserType==2){
					this.showDialogUserExamined=true
				}
				this.showDialogUserType=false
			},
			/*
			 * 关闭
			 */
			handleBackClose() {
				this.showDialog=false
				this.showDialogUserType=false
				this.showDialogUserSure=false
				this.showDialogUserSuccess=false
				this.showDialogBack=false
				this.showDialogFollow=false
				this.showDialogContact=false
				this.showDialogUserExamined=false
				this.showDialogUserTip=false
				this.showDialogUserErr=false
			},
			/*
			 * 取消身份选择
			 */
			handleUserTypeCancel() {
				this.showDialog=false
				this.showDialogUserType=false
				this.showDialogUserSure=false
				this.NewUserType=='';
				
			},
			/*
			 * 确认身份选择
			 */
			handleUserTypeSure() {
				this.showDialogUserType=false
				this.showDialogUserSure=false
				this.showDialogUserSuccess=true
			},
			/*
			 * 意见反馈
			 */
			handleBack() {
				this.showDialogBack=true
			},
			/*
			 * 获取输入字数
			 */
			changeTextStr(e,n){
				this.textStr=e.target.value
				this.textStrlength=e.target.value.length
			},
			/*
			 * 意见反馈提交
			 */
			handleBackSubmit() {
				this.handleBackClose()
			},
			/*
			 * 关注公众号
			 */
			handleFollowWeChat() {
				this.showDialogFollow=true
			},
			/*
			 *联系客服
			 */
			handleContact () {
				this.showDialogContact=true
			},
			/*
			 * 去创建订单
			 */
			goOrder() {
				this.$router.push({
					path: '/my/promotion/order',
					query: {
						userId: this.userId,
						title:'创建订单'
					}
				});
			},
			/*
			 * 去发布房源
			 */
			handleSelectHouse() {
				console.log(this.showHouseDialog)
				this.showHouseDialog=true
				console.log(this.showHouseDialog)
			},
			goCreatHouse(type) {
				this.$router.push({
					path: '/my/house/creatHouse',
					query: {
						userId: this.userId,
						type:type,
						userType:this.userType
					}
				});
			},
			changeHouseTypeF(res){
				console.log(1)
				this.showHouseDialog=false
				this.goCreatHouse(res.NewHouseType)
			},
			/*
			 * 查看认证失败原因
			 */
			handleFail(item) {
				this.$$confirm({
						title:'审核失败原因',
				    content:'身份证照片上传不符合规定，请重新提交认 证申请',
				    sureText:'知道了',
				});
				this.handleBackClose()
			},
			/*
			 * 去认证
			 */
			goExamined() {
				this.$router.push({
					path: '/my/authentication',
					query: {
						userId: this.userId,
					}
				});
			},
			
			
			
			
			
		},
		components: {
			innerSelectType
		},
		beforeDestroy() {

		}
	}
</script>

<style lang="less" scoped>
	.ui-mode-content {
		background: #F8F9FA;
	}

	.mt-avatar-item {
		padding: 0 0.85rem;
		width: 100%;
		height: 6.6rem;
		background: url(../../../assets/images/my_bg.png);
		background-size: 100% 100%;
		line-height: 1.6rem;
		.user-type-str {
			padding: 0 0.3rem;
			margin-left: 0.4rem;
			display: inline-block;
			color: @base-active-color;
			height: 0.9rem;
			line-height: 0.9rem;
			border-radius: 0.45rem;
			border:solid 1px  @base-active-color;
			
			
		}
		.photo-box {
			margin-right: 0.6rem;
			width: 3.2rem;
			height: 3.2rem;
			border: solid 2px #E3E3E3;
			border-radius: 50%;
			overflow: hidden;
			background: #f9f9f9;
			.app-image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.t1{
		margin: 0.85rem;
		padding: 0.85rem 0;
		background-color: #fff;
		border-radius: 0.4rem;
		text-align: center;
		div:nth-child(1){
			border-right: solid 1px #F0F0F0;
		}
		div{
			img{
				width: 3.34rem;
				height: auto;
			}
			span{
				display: block;
				line-height: 1;
				margin-top:0.5rem
			}
		} 
	}
	.item{
		margin:0 0.85rem 0.85rem;
		padding: 0.44rem;
		background-color: #fff;
		font-size: 0.8rem;
		color: #212121;
		border-radius: 0.4rem;
		img{
			margin-right: 0.4rem;
			width: 2rem;
			height: 2rem;
		}
		i{
			
		}
	}
	.mt-back-showDialog-tip{
		line-height: 1rem;
		color: #7A7B81;
	}
	
	.mt-back-showDialog-box{
		padding: 0.85rem 0.6rem !important;
		width: auto !important;
		line-height: 1rem;
		input{
			display: none;
		}
		.select{
			display: inline-block;
			width:1rem ;
			height: 1rem;
			border: solid 1px #7A7B81;
			border-radius: 50%;
			
		}
	}
	.mt-back-showDialog-box.current{
		border-color: @base-active-color !important;
		.select{
			border-color: transparent;
			background:url(../../../assets/images/mySelect.png)  no-repeat center center;
			background-size: 100% auto;
		}
	}
	.mt-back-showDialog{
		width: 18rem;
		.mt-back-showDialog-body{
				height: auto;
		}
	}
	.mt-sure-showDialog{
		line-height: 1.4rem;
		.mt-sure-showDialog-title{
			padding: 0.85rem 0.85rem 0 0.85rem;
		}
	}
	.mt-sure-showDialog-bottom{
		margin-top:1rem;
		border-top:solid 1px #F0F0F0;
		height: 2.5rem;
		line-height:2.5rem ;
		font-size: 0.9rem;
		font-weight: bold;
		text-align: center;
		span:nth-child(1){
			border-right: solid 1px #F0F0F0;
		}
	}
	.mt-success-showDialog-pic{
		width:4.6rem ;
		height: auto;
		margin: 0.85rem auto;
	}
	.mt-back-showDialog-box-width{
		width: auto !important;
		margin-top: 0 !important;
		padding: 0.5rem !important;
	}
	.mt-follow-showDialog-pic{
		width:8rem ;
		height: 8rem;
		margin:0 auto 0.85rem auto;
	}
	.mt-contact-showDialog{
		padding:0 0.85rem;
		.mt-back-showDialog-box{
			margin-top:1rem;
			border: 1px solid #F0F0F0;
			border-radius: 0.4rem;
			img{
				margin-right: 0.5rem;
				width: 1.4rem;
				height: 1.4rem;
			}
			span{
				font-size: 0.8rem;
				font-weight: bold;
				text-align: left;
			}
			.m1{
				padding:  0 0.3rem;
				height: 1.3rem;
				line-height: 1.3rem;
				border:solid 1px @base-active-color;
				color: @base-active-color;
				background: #FFF1F3;
				border-radius: 0.26rem;
				font-size: 0.6rem;
			}
			.m2{
				width: 3.4rem;
				height: 1.7rem;
				border-radius: 0.85rem;
				text-align: center;
				font-size: 0.8rem;
				border:none;
				background: linear-gradient(-90deg, #FD3C5C 0%, #F86E85 100%);
				color: #fff;
			}
		}
	}
	.fail-bottom{
		margin:2rem 2.5rem 0 ;
		.r1{
			font-size: 0.7rem;
		}
		.r2{
			display: inline-block;
			width: 4.7rem;
			height: 2rem;
			line-height: 2rem;
			border: solid 1px @base-active-color;
			border-radius: 1rem;
			color: @base-active-color;
			text-align: center;
		}
	}
	
	
		
</style>
