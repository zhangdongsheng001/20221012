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
            <div class="ui-header-title">详情</div>
        </div>
        <div class="ui-mode-content flex1 mar-bottom-20" id="container" ref="scroll">
            <template v-if="pageStatus">
                <div class="banner" v-if="public_goods_img_list&&public_goods_img_list.length">
                    <mt-swipe
												v-if="showImg==1"
												ref="swipe"
                        :auto="4000"
                        :default-index="0"
                        :prevent="true"
												:show-indicators="false"
												@change="bannerChange">
                        <mt-swipe-item
                            :key="`banner-${i}`"
                            v-for="(item,i) in public_goods_img_list">
                            <img class="app-image auto" @mousedown.prevent v-lazy="item.image_url">
                        </mt-swipe-item>
                    </mt-swipe>
										<div v-else class="banner-video">
											<img v-lazy="public_goods_video.image_url"/>
											<div class="index-cat-play">
												<img src="../../../../assets/images/test/play_icon.png"  width="100%" height="100%" alt="">
											</div>
										</div>
										<div class="flex-row align-between-row banner-tip">
											<div>
												<span class="mar-right-10" :class="{current:showImg==1}"  @click="changeImgShow(1)" @touchstart.stop>图片</span>
												<span  :class="{current:showImg==2}" v-if="public_goods_video"  @click="changeImgShow(2)" @touchstart.stop>视频</span>
											</div>
											<div v-if="showImg==1"><span>{{bannerIndex}}/{{bannerLength}}</span></div>
										</div>
                </div>
								<div class="detail-cont">
									<div class="t1">
										<div class="m1">
											<span v-for="(item,i) in detailInfo.liang_dian">{{dictionary.fangYuanLiangDian[item]}}</span>
										</div>
										<div class="m2 flex-row align-between-row" v-if="itemType==1||itemType==2||itemType==3">
											<div>
												<div class="red font7"><span>{{detailInfo.goods_price}}</span>元/{{detailInfo.sales_describe}}</div>
											</div>
											<div>
												<span class="gray font5">更新时间：{{detailInfo.time_update}}</span>
											</div>
										</div>
									</div>
									<div class="t2">
										<h3 class="font10"><i>{{dictionary.goods_type_obj[detailInfo.goods_type]}}</i>{{detailInfo.goods_name}}{{detailInfo.goods_name_describe}}</h3>
									</div>
									<div class="t3 font6 flex-row align-between-row" v-if="itemType==1||itemType==2||itemType==3">
										<div>
											<p class="red">{{detailInfo.goods_info_remark_001}}</p>
											<p class="gray">朝向</p>
										</div>
										<div class="flex1">
											<p class="red">{{detailInfo.goods_info_remark_002}}</p>
											<p class="gray">面积</p>
										</div>
										<div>
											<p class="red">{{detailInfo.goods_info_remark_003}}</p>
											<p class="gray">楼层</p>
										</div>
									</div>
									<div class="t3 font6 flex-row align-between-row" v-else-if="itemType==4||itemType==5">
										<div>
											<p class="red"><span>{{detailInfo.goods_price}}</span>万</p>
											<p class="gray">售价</p>
										</div>
										<div>
											<p class="red">{{detailInfo.goods_info_remark_020}}</p>
											<p class="gray">单价</p>
										</div>
										<div class="flex1">
											<p class="red">{{detailInfo.goods_info_remark_002}}</p>
											<p class="gray">面积</p>
										</div>
									</div>
									<div class="t3 font6 flex-row align-between-row" v-else-if="itemType==6">
										<div>
											<p class="red"><span>{{detailInfo.goods_price}}</span>万/{{detailInfo.sales_describe}}</p>
											<p class="gray">租金</p>
										</div>
										<div>
											<p class="red">{{detailInfo.goods_info_remark_020}}</p>
											<p class="gray">单价</p>
										</div>
										<div class="flex1">
											<p class="red">{{detailInfo.goods_info_remark_002}}</p>
											<p class="gray">面积</p>
										</div>
									</div>
									<div class="t4">
										<div class="item-title">房源信息</div>
										<div class="flex-row align-between-row flex-wrap m1" v-if="itemType==1||itemType==2||itemType==3">
											<div>
												<i>户型</i>
												<span>{{detailInfo.goods_info_remark_004}}</span>
											</div>
											<div>
												<i>付款方式</i>
												<span>{{detailInfo.goods_info_remark_009}}</span>
											</div>
											<div>
												<i>栋号</i>
												<span>{{detailInfo.goods_info_remark_005}}</span>
											</div>
											<div>
												<i>房屋用途</i>
												<span>{{detailInfo.goods_info_remark_010}}</span>
											</div>
											<div>
												<i>室号</i>
												<span>{{detailInfo.goods_info_remark_006}}</span>
											</div>
											<div>
												<i>装修类型</i>
												<span>{{detailInfo.goods_info_remark_011}}</span>
											</div>
											<div>
												<i>电梯/楼梯</i>
												<span>{{detailInfo.goods_info_remark_007}}</span>
											</div>
											<div>
												<i>入住时间</i>
												<span>{{detailInfo.goods_info_remark_012}}</span>
											</div>
											<div v-if="itemType==1">
												<i>卧室类型</i>
												<span>{{detailInfo.goods_info_remark_008}}</span>
											</div>
											<div>
												<i>房源编号</i>
												<span>{{detailInfo.goods_info_remark_013}}</span>
											</div>
										</div>
										<div class="flex-row align-between-row flex-wrap m1" v-else-if="itemType==4||itemType==5">
											<div>
												<i>户型</i>
												<span>{{detailInfo.goods_info_remark_004}}</span>
											</div>
											<div>
												<i>朝向</i>
												<span>{{detailInfo.goods_info_remark_001}}</span>
											</div>
											<div>
												<i>楼层</i>
												<span>{{detailInfo.goods_info_remark_003}}</span>
											</div>
											<div>
												<i>权属</i>
												<span>{{detailInfo.goods_info_remark_022}}</span>
											</div>
											<div>
												<i>结构</i>
												<span>{{detailInfo.goods_info_remark_023}}</span>
											</div>
											<div>
												<i>电梯/楼梯</i>
												<span>{{detailInfo.goods_info_remark_007}}</span>
											</div>
											<div>
												<i>装修类型</i>
												<span>{{detailInfo.goods_info_remark_011}}</span>
											</div>
											<div>
												<i>房屋用途</i>
												<span>{{detailInfo.goods_info_remark_010}}</span>
											</div>
											<div>
												<i>建筑年代</i>
												<span>{{detailInfo.goods_info_remark_018}}</span>
											</div>
											<div v-if="itemType==4">
												<i>开盘时间</i>
												<span>{{detailInfo.goods_info_remark_026}}</span>
											</div>
											<div v-else>
												<i>挂牌时间</i>
												<span>{{detailInfo.goods_info_remark_019}}</span>
											</div>
											<div>
												<i>产权年限</i>
												<span>{{detailInfo.goods_info_remark_024}}</span>
											</div>
											<div v-if="itemType==4">
												<i>交房时间</i>
												<span>{{detailInfo.goods_info_remark_025}}</span>
											</div>
											<div>
												<i>更新时间</i>
												<span>{{detailInfo.time_update}}</span>
											</div>
											<div v-if="itemType==4">
												<i>佣金</i>
												<span>{{detailInfo.goods_info_remark_027}}</span>
											</div>
											<div>
												<i>房源编号</i>
												<span>{{detailInfo.goods_info_remark_013}}</span>
											</div>
											<div></div>
											<div>
												<i>小区名称</i>
												<span>{{detailInfo.goods_info_remark_017}}</span>
											</div>
										</div>
										<div class="flex-row align-between-row flex-wrap m1" v-else-if="itemType==6">
											<div>
												<i>室号</i>
												<span>{{detailInfo.goods_info_remark_006}}</span>
											</div>
											<div>
												<i>朝向</i>
												<span>{{detailInfo.goods_info_remark_001}}</span>
											</div>
											<div>
												<i>楼层</i>
												<span>{{detailInfo.goods_info_remark_003}}</span>
											</div>
											<div>
												<i>电梯/楼梯</i>
												<span>{{detailInfo.goods_info_remark_007}}</span>
											</div>
											<div>
												<i>装修类型</i>
												<span>{{detailInfo.goods_info_remark_011}}</span>
											</div>
											<div>
												<i>房屋用途</i>
												<span>{{detailInfo.goods_info_remark_010}}</span>
											</div>
											<div>
												<i>建筑年代</i>
												<span>{{detailInfo.goods_info_remark_018}}</span>
											</div>
											<div>
												<i>挂牌时间</i>
												<span>{{detailInfo.goods_info_remark_019}}</span>
											</div>
											<div>
												<i>房源编号</i>
												<span>{{detailInfo.goods_info_remark_013}}</span>
											</div>
											<div>
												<i>更新时间</i>
												<span>{{detailInfo.time_update}}</span>
											</div>
											<div>
												<i>物业名称</i>
												<span>{{detailInfo.goods_info_remark_017}}</span>
											</div>
										</div>
										<div class="m2 flex-row">
												<i>房屋配置</i>
												<div>
													<span v-for="(item,i) in detailInfo.peizhi">{{dictionary.fangYuanTool[item]}}</span>
												</div>
										</div>
										<div class="m3 flex-row" v-if="itemType==6" >
												<i class="mt-flex-shrink">所在区域</i>
												<span>{{detailInfo.goods_info_remark_029}}</span>
										</div>
										<div class="m3 flex-row">
												<i class="mt-flex-shrink">详细地址</i>
												<span>{{detailInfo.goods_info_remark_015}}</span>
										</div>
										<div class="m3 flex-row">
												<i class="mt-flex-shrink">房源描述</i>
												<span>{{detailInfo.goods_info_remark_016}}</span>
										</div>
									</div>
									<div class="t5" v-if="!source">
										<div class="item-title">地图</div>
										<div>
											<div class="m1">
												<img src="../../../../assets/images/test/detail_address.png"  width="100%" height="100%" alt="">
											</div>
											<div class="m2">
												<p>{{detailInfo.goods_name}}</p>
												<span class="gray">{{detailInfo.goods_info_remark_015}}</span>
											</div>
										</div>
									</div>
								</div>
            </template>
        </div>
        <template v-if="pageStatus&&!source">
            <div class="bottom flex-row  align-between-row detail-bottom">
                <span class="reset" >发送照片</span>
								<span class="sure flex1" @click="handleShowMobile()">看房电话</span>
            </div>
        </template>
				<template v-else-if="pageStatus&&source">
				    <div class="bottom flex-row  align-between-row detail-bottom">
								<span class="sure flex1" @click="handleExamine()">审核</span>
				    </div>
				</template>
				<transition name="app_dialog">
						<div class="mt-master-container" @touchstart.prevent v-if="showDialog">
								<div class="mt-master-content mt-bottom-showDialog" v-if="showDialogMobile">
									<div class="mt-bottom-showDialog-close" @touchstart.stop @click="handleMobileClose()">
										<img src="../../../../assets/images/icon_delete.png" />
									</div>
									<div class="mt-bottom-showDialog-body txt-c">
										<div class="mt-bottom-showDialog-pic">
											<img src="../../../../assets/images/pic.png" />
										</div>
										<div>
											<span class="gray">即将使用该号码呼出</span>
											<p class="font12 bold">{{detailInfo.goods_info_remark_028}}</p>
											<div @touchstart.stop @click="handleChangeDialog(1)"><span class="red">这不是本机号码？去修改</span><img class="changeMobile" src="../../../../assets/images/icon_more2.png" /></div>
										</div>
									</div>
									<div class="flex-row  align-between-row mt-bottom-showDialog-bottom" v-if="itemType==1||itemType==2||itemType==3">
										<div class="m1" @touchstart.stop @click="handleChangeDialog(2)">
											<img src="../../../../assets/images/icon_wechat.png"/>
											<p>微信联系</p>
										</div>
										<div class="sure flex1" @touchstart.stop @click="handleMobileSubmit()">
											<img src="../../../../assets/images/icon_phone.png"/>
											<span>立即拨打</span>
										</div>
									</div>
									<div class="flex-row  align-between-row mt-bottom-showDialog-bottom" v-else>
										<div class="m2">
											<img src="../../../../assets/images/icon_phone1.png"/>
											<span>备用电话</span>
										</div>
										<div class="sure flex1" @touchstart.stop @click="handleMobileSubmit()">
											<img src="../../../../assets/images/icon_phone.png"/>
											<span>常用电话</span>
										</div>
									</div>
								</div>
								<div class="mt-master-content mt-bottom-showDialog" v-else-if="showDialogChangeMobile">
									<div class="mt-bottom-showDialog-close" @touchstart.stop @click="handleMobileClose()">
										<img src="../../../../assets/images/icon_delete.png" />
									</div>
									<div class="mt-bottom-showDialog-body txt-c">
										<p class="font9">用本机呼出</p>
										<div class="mt-bottom-showDialog-input">
											<input type="text" v-model="newMobile" placeholder="请输入本机号码" >
										</div>
									</div>
									<div class="flex-row  align-between-row mt-bottom-showDialog-bottom" v-if="itemType==1||itemType==2||itemType==3">
										<div class="m1"  @touchstart.stop @click="handleChangeDialog(2)">
											<img src="../../../../assets/images/icon_wechat.png"/>
											<p>微信联系</p>
										</div>
										<div class="sure flex1" @touchstart.stop @click="handleMobileSubmit()">
											<img src="../../../../assets/images/icon_phone.png"/>
											<span>立即拨打</span>
										</div>
									</div>
									<div class="flex-row  align-between-row mt-bottom-showDialog-bottom" v-else>
										<div class="m2">
											<img src="../../../../assets/images/icon_phone1.png"/>
											<span>备用电话</span>
										</div>
										<div class="sure flex1" @touchstart.stop @click="handleMobileSubmit()">
											<img src="../../../../assets/images/icon_phone.png"/>
											<span>常用电话</span>
										</div>
									</div>
								</div>
								<div class="mt-master-content mt-bottom-showDialog" v-else-if="showDialogWeChat">
									<div class="mt-bottom-showDialog-close"  @touchstart.stop @click="handleMobileClose()">
										<img src="../../../../assets/images/icon_delete.png" />
									</div>
									<div class="mt-bottom-showDialog-body txt-c">
										<p class="font9">微信联系</p>
										<div class="mar-top-20 mar-bottom-20">
											<div><span class="font12 bold">13758090965</span><span class="red mar-left-10">复制</span></div>
											<span class="gray">添加微信号,随时在线咨询</span>
										</div>
									</div>
									<div class=" mt-bottom-showDialog-bottom">
										<div class="sure SureWeChat" @touchstart.stop @click="handleMobileSubmit()">
											<span>知道了</span>
										</div>
									</div>
								</div>
						</div>
						<div class="mt-master-container flex-col align-center" @touchstart.prevent v-else-if="showDialogBack">
							<div class="mt-master-content mt-back-showDialog">
								<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
									<img src="../../../../assets/images/icon_delete.png" />
								</div>
								<div>
									<p class="font9 mt-back-showDialog-title">意见反馈</p>
									<div class="mt-back-showDialog-body">
										<span>请选择您遇到的问题类型，可多选。</span>
										<div class="flex-row mt-back-select align-between-row">
											<span :class="{current:backType.includes(i)}"  v-for="(item,i) in dictionary.backType" @touchstart.stop @click="selectBackType(item,i)">{{item}}</span>
										</div>
										<div class="mt-back-showDialog-box">
											<textarea rows="3" ref="textStr" laceholder="还说点什么吧......"  @keyup="changeTextStr($event,j)" maxlength="100"></textarea>
											<div class="num">
												<span>{{textStrlength}}</span>/<span>100</span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex-row  align-between-row mt-back-showDialog-bottom">
									<div class="reset" @touchstart.stop @click="handleBackClose()">
										<span>先不反馈</span>
									</div>
									<div class="sure flex1" @touchstart.stop @click="handleBackSubmit()">
										<span>提交反馈</span>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-master-container flex-col align-center" @touchstart.prevent v-else-if="showDialogExamine">
							<div class="mt-master-content mt-back-showDialog">
								<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
									<img src="../../../../assets/images/icon_delete.png" />
								</div>
								<div>
									<p class="font9 mt-back-showDialog-title">审核房源 </p>
									<div class="mt-back-showDialog-body">
										<span>审核是否通过</span>
										<div class="mt-back-showDialog-box " :class="{current:ExamineType==1}" >
											<label class="flex-row align-center-row align-between-row" @touchstart.stop>
												<div class="flex1">
													<p class="font8 bold">是</p>
												</div>
												<input class="mt-back-showDialog-input" :value="1" name="user_type"   type="radio" v-bind="$attrs" :checked="isChecked" v-on="getExamineTypeListeners" />
												<span class="select"></span>
											</label>
										</div>
										<div class="mt-back-showDialog-box " :class="{current:ExamineType==2}" >
											<label class="flex-row align-center-row align-between-row" @touchstart.stop>
												<div class="flex1">
													<p class="font8 bold">否</p>
												</div>
												<input class="mt-back-showDialog-input" :value="2" name="user_type"   type="radio" v-bind="$attrs" :checked="isChecked" v-on="getExamineTypeListeners" />
												<span class="select"></span>
											</label>
										</div>
										<div class="mt-back-showDialog-box">
											<textarea rows="3" ref="textStr" laceholder="请填写原因......" @touchstart.stop  @keyup="changeExamineStr($event,j)" maxlength="100"></textarea>
											<div class="num">
												<span>{{ExamineStrlength}}</span>/<span>100</span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex-row  align-between-row mt-back-showDialog-bottom">
									<div class="sure flex1" @touchstart.stop @click="handleExamineSubmit()">
										<span>提交</span>
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
//import mixinCart from '../../mixins/cart';
//import mixinShare from '../../mixins/share';
//import shoppingCart from '../../public/shopping-cart';

import banner1 from '../../../../assets/images/test/detail_bg1.png';
import banner2 from '../../../../assets/images/test/detail_bg2.png';
import banner3 from '../../../../assets/images/test/detail_bg3.png';


export default {
    data(){
        return {
            public_agent_info:{},
            public_user_info:{},
            public_goods_order_record:{},
            detailInfo:{},
            public_goods_img_list:[{image_url:banner1},{image_url:banner2},{image_url:banner3}],
						public_goods_video:{image_url:banner1,video_url:''},
						bannerLength:'',
						bannerIndex:1,
            foodTips:[],
            public_goods_order_detail_list:[],
            showable:true,
            order_number:0,
						appDownload:false,
						pageStatus:false,
						showImg:1,
						showDialogMobile:false,
						showDialog:false,
						showDialogChangeMobile:false,
						newMobile:'',
						showDialogWeChat:false,
						showDialogBack:false,
						showDialogExamine:false,
						backType:[],
						textStrlength:0,
						textStr:'',
						ExamineStrlength:0,
						itemType:1,
						source:'',
						ExamineType:1,
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        //mixinCart,
        //mixinShare
    ],
    computed:{
        getGoodMainImage(){
            return this.formatImgUrl(this.detailInfo.goods_main_image);
        },
				getExamineTypeListeners(){
				    return {
				        ...this.$listeners,
				        input:event=>{
				            if(!this.disabled&&!this.isChecked){
											this.ExamineType=event.target.value
				            };
				        }
				    };
				},
				isChecked(){
				    return `${this.value}`==this.ExamineType;
				},
    },
    /* watch:{
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    }, */
    created(){
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
    mounted(){
		//this.photoArr=[photo1,photo2,photo3,photo4]
		this.init()
		this.bannerLength=this.public_goods_img_list.length
    },
    methods:{
        /*
         * 初始化
         */
        init(){
            if(!this.$route.query.id){
                return this.showMessage('进入非法').then(()=>{
                    this.handleHistory();
                });
            };
						if(this.$route.query.source){
							this.source=this.$route.query.source
						}
			this.handleLoad();
			
           
        },
		/*
		 * APP和H5使用特殊账号模拟登录 H5即非APP&非微信&非小程序,默认即H5
		 */
		handleMockLogin(){
		    return new Promise((resolve,reject)=>{
		        if(!this.isLogin){
		            this.$http.post({
		                name:'login',
		                data:{
		                    invoke_method:'login_by_password',
		                    type_4_api_command:1,
		                    user_phone:'x-teamer',
		                    password_user:'tian123'
		                },
		                loading:{
		                    enabled:false
		                }
		            }).then(({result,response})=>{
		                resolve({result,response});
		            }).catch(({msg})=>{
		                reject({msg});
		            });
		        }else{
		            resolve();
		        };
		    });
		},
        /*
         * 立即购买
         */
        handleSubmit(event,flag){
			return this.showToast('预约成功，请等待工作人员与您联系');
            this.$http.post({
                name:'food.detail.submit',
                data:{
                    invoke_method:'details_4_order',
    				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
                },
                loading:{
                    enabled:true
                }
            }).then(({result,response})=>{
                let orderDetail=this.public_goods_order_record.list_order_details,
                    url;
                if(orderDetail){
                    orderDetail=orderDetail[0]||{};
                };
            }).catch(({msg})=>{
                this.showMessage(msg);
            });
        },
        /*
         * 初始化加载数据
         */
        handleLoad(){
            /* this.showLoading(); */
					this.$http.get({
							name:'test.detail',
							loading:{
									enabled:true
							}
				}).then(({result,response})=>{
						console.log(result.public_goods_list)
						if(result.public_goods_list&&result.public_goods_list.length){
							var len = result.public_goods_list.length
							for(let i=0;i<len;i++){
								if(this.$route.query.id==result.public_goods_list[i].id_public_goods_info){
									let liangdian=[]
									if(result.public_goods_list[i].liang_dian){
										liangdian=result.public_goods_list[i].liang_dian.split(',')
									}
									result.public_goods_list[i].liang_dian=liangdian
									let peizhi=[]
									if(result.public_goods_list[i].goods_info_remark_014){
										peizhi=result.public_goods_list[i].goods_info_remark_014.split(',')
									}
									result.public_goods_list[i].peizhi=peizhi
									this.detailInfo=result.public_goods_list[i]
									this.itemType=this.detailInfo.goods_type
									break 
								}
							}
							this.pageStatus=true
							this.showContent();
							console.log(this.detailInfo)
						}
				})
            /* this.getShopInfo().then(({result,response})=>{
                this.getPageInfo({
                    name:'food.detail',
                    param:{
                        invoke_method:'show_goods_info',
        				id_public_goods_info:this.$route.query.id,
        				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
                    }
                }).then(({result,response})=>{
                    this.detailInfo=(result.public_goods_list&&result.public_goods_list[0])||{};
                    this.public_goods_img_list=(result.public_goods_img_list||[]).filter(item=>{
                        return item.image_type!=1;
                    });
                    this.order_number=result.order_number;
                    if(this.detailInfo.goods_selections){
                        this.foodTips=this.detailInfo.goods_selections.split(';').map(item=>{
                            return {
                                flag:false,
                                text:item
                            };
                        });
                    };
                    if(this.isMiniProgram){
    					this.$wx.miniProgram.postMessage({
    					    data:{
    					        title:this.detailInfo.goods_name
    					    }
    					});
    				};
                });
            }).catch(({msg})=>{
                this.showResult(msg,true);
            }); */
        },
        /*
         * 获取门店信息
         */
        getShopInfo(){
            return new Promise((resolve,reject)=>{
                this.$http.post({
                    name:'common.shop.info',
                    data:{
                        invoke_method:'user_and_shop_info'
                    },
                    loading:{
                        enabled:false
                    }
                }).then(({result,response})=>{
                    this.public_agent_info=result.public_agent_info||{};
                    this.public_user_info=result.public_user_info||{};
                    this.public_goods_order_record=result.public_goods_order_record||{};
                    this.setState({
                        key:'public_agent_info',
                        value:this.public_agent_info
                    });
                    this.setState({
                        key:'public_user_info',
                        value:this.public_user_info
                    });
                    resolve({result,response});
                }).catch(({msg})=>{
                    reject({msg});
                });
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.handleLoad();
        },
		/*
		 * 点击查看大图
		 */
		showPic(cont){
			console.log(cont)
			this.showBigpic({
			    content:photo1,//正式环境换成cont
			})
			
		},
		/*
		 * 点击banner图索引
		 */
		bannerChange(){
			this.bannerIndex = this.$refs.swipe.index + 1
		},
		/*
		 * 点击切换banner视频和图片
		 */
		changeImgShow(i){
			this.showImg=i
		},
		
		/*
		 * 点击显示弹窗
		 */
		handleShowMobile(){
			this.showDialogMobile=true
			this.showDialog=true
			this.showDialogChangeMobile=false
			this.showDialogWeChat=false
		},
		/*
		 * 点击切换弹窗
		 */
		handleChangeDialog(i){
			if(i==1){
				this.showDialogMobile=false
				this.showDialogChangeMobile=true
				this.showDialogWeChat=false
			}else if(i==2){
				this.showDialogMobile=false
				this.showDialogChangeMobile=false
				this.showDialogWeChat=true
			}
		},
		
		/*
		 * 点击关闭弹窗
		 */
		handleMobileClose(){
			this.showDialogMobile=false
			this.showDialog=false
			this.showDialogChangeMobile=false
			this.showDialogWeChat=false
			this.showDialogExamine=false
		},
		/*
		 * 点击显示反馈弹窗
		 */
		handleMobileSubmit(){
			this.handleMobileClose()
			this.showDialogBack=true
		},
		/*
		 * 点击关闭反馈弹窗
		 */
		handleBackClose(){
			this.showDialogBack=false
		},
		/*
		 * 点击提交反馈
		 */
		handleBackSubmit(){
			this.showDialogBack=false
		},
		/*
		 * 选择反馈类型
		 */
		selectBackType(item,i){
				console.log(item)
				console.log(i)
				if(this.backType.length>0){
					if (this.backType.indexOf(i) == -1) {
						this.backType.push(i)
					}else{
						console.log(this.backType)
						this.backType.splice(this.backType.indexOf(i), 1)
					}
				}else{
					this.backType.push(i)
				}
		},
		/*
		 * 审核弹窗
		 */
		handleExamine(item,i){
			this.handleMobileClose()
			this.showDialogExamine=true
		},
		/*
		 * 提交审核
		 */
		handleExamineSubmit(){
			this.showDialogExamine=false
		},
		
		/*
		 * 获取输入字数
		 */
		changeTextStr(e,n){
			this.textStr=e.target.value
			this.textStrlength=e.target.value.length
		},
		/*
		 * 获取输入字数
		 */
		changeExamineStr(e,n){
			this.ExamineStr=e.target.value
			this.ExamineStrlength=e.target.value.length
		}
		
		
		
		
    },
    components:{
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
	.banner{
		position:relative;
		height:16rem;
		background-color:#ececec;
		.banner-video{
			height: 16rem;
			img{
				width: 100%;
				height: 100%;
			}
			div{
				width:2.5rem ;
				height: 2.5rem;
				position: absolute;
				top:50%;
				left:50%;
				margin-left:-1.25rem;
				margin-top:-1.25rem;
			}
		}
		.banner-tip{
			position: absolute;
			left: 0;
			right: 0;
			height: 1.2rem;
			bottom:1.1rem;
			padding: 0 0.85rem;
			span{
				display: inline-block;
				width: 2.4rem;
				height: 1.2rem;
				line-height: 1.2rem;
				background-color: #000;
				color: #fff;
				text-align: center;
				border: solid 1px #fff;
				border-radius: 0.6rem;
				opacity: 0.8;
				font-size: 0.6rem;
				vertical-align: top;
			}
			.current{
				background-color: #F0F0F0;
				color: #212121;
			}
		}
	}
	.detail-cont{
		padding: 0.85rem;
	}
	.t1{
		.m1{
			line-height: 1;
			margin-bottom:0.3rem ;
			span{
				margin-right: 0.3rem;
				display: inline-block;
				padding:0  0.5rem;
				line-height: 1.1rem;
				//height: 1rem;
				border-radius: 0.5rem;
				color: #fff;
				font-size: 0.5rem;
				background-color: #4EC5C4;
			}
			span:nth-child(even){
				background-color: @base-active-color;
			}
		}
		.m2{
			.red span{
				font-size: 1.2rem;
				font-weight: bold;
			}
		}
	}
	.t3{
		margin: 0.8rem;
		div{
			width:33.3% ;
			text-align: center;
			.red{
				font-size: 0.9rem;
				font-weight: bold;
			}
		}
	}
	.item-title{
		font-size: 0.8rem;
		color: @base-active-color;
		font-weight: bold;
		//line-height: 1;
	}
	.t4{
		background-color: #FAFAFA;
		border-radius: 0.9rem;
		//background-color: #ccc;
		padding: 0.5rem;
		.m1{
			div{
				width: 50%;
			}
			span{
				font-size: 0.7rem;
				font-weight: bold;
				color: #212121;
			}
		}
		.m2{
			span{
				margin-right: 0.3rem;
				margin-bottom:0.3rem;
				padding: 0 0.5rem;
				display: inline-block;
				height: 1.2rem;
				line-height: 1.2rem;
				color: #212121;
				text-align: center;
				border: solid 1px #E3E3E3;
				border-radius: 0.6rem;
				font-size: 0.6rem;
			}
		}
		.m3{
			padding-top: 0.6rem;
			margin-top:0.6rem;
			border-top: solid 1px #F0F0F0;
			line-height: 1.2rem;
			span{
				font-size: 0.7rem;
				color: #212121;
			}
		}
		i{
			display: inline-block;
			width: 3.5rem;
			font-size: 0.6rem;
			color: #9698A5;
		}
	}
	.t5{
		margin-top:2rem;
		padding: 0.7rem 0;
		background: #FFFFFF;
		box-shadow: 0px 2px 0.4rem 0px rgba(234, 234, 234, 0.5);
		border-radius: 0.6rem;
		.item-title{
			margin-left: 0.85rem;
		}
		.m1{
			margin:0.5rem 0 0.8rem 
		}
		.m2{
			font-size: 0.7rem;
			line-height: 1.4rem;
			margin-left: 0.85rem;
			p{
				font-weight: bold;
			}
		}
	}
	
	.detail-bottom{
		padding:0.5rem 0.85rem;
		background:#fff;
		border-top:solid 1px #E3E3E3;
		span{
			height: 2.4rem;
			line-height: 2.4rem;
			border-radius: 1.2rem;
			text-align: center;
			font-size: 0.8rem;
			border:solid 1px @base-active-color;
			color: @base-active-color;
		}
		.sure{
			background: linear-gradient(-90deg, #FD3C5C 0%, #F86E85 100%);
			color: #fff;
		}
		.reset{
			width: 6.1rem;
			margin-right: 1rem;
			border:solid 1px @base-active-color;
			color:@base-active-color;
		}
	}
	.mt-master-container{
		position: fixed;
		top:0;
		left:50%;
		width:100%;
		max-width:20rem;
		bottom:0;
		z-index:999;
		transform:translateX(-50%);
		 background-color:rgba(0,0,0,0.3);
	}
	.mt-bottom-showDialog{
			position: absolute;
			bottom:0;
			left: 0;
			right: 0;
			background: #fff;
			z-index: 99;
			padding: 1.28rem 0.85rem 0.5rem;
			border-radius: 0.9rem 0.9rem 0 0;
			.mt-bottom-showDialog-close{
				position: absolute;
				right: 0.85rem;
				top:1.28rem;
				width:1.28rem ;
				height: 1.28rem;
				img{
					vertical-align: top;
					width: 100%;
					height: 100%;
				}
			}
			.mt-bottom-showDialog-body{
				line-height: 1.6rem;
			}
			.mt-bottom-showDialog-pic{
				height: 6.67rem;
				text-align: center;
				img{
					height: 100%;
				}
			}
			.changeMobile{
				margin-left: 0.5rem;
				width: 0.6rem;
			}
			.mt-bottom-showDialog-input{
				margin:2rem auto;
				padding: 0 0.5rem;
				width: 14rem;
				border: solid 1px #E3E3E3;
				background-color: #F9F9F9;
				border-radius: 0.4rem;
				input{
					height: 2.3rem;
					line-height: 2.3rem;
					border: none;
					background-color: transparent;
					font-size: 0.9rem;
				}
			}
			.mt-bottom-showDialog-bottom{
				margin-top:0.85rem;
				.m1{
					width: 4rem;
					margin-right: 0.85rem;
					text-align: center;
					line-height: 1.2rem;
					img{
						width: 1.4rem;
					}
				}
				.m2{
					width: 7rem;
					height: 2.4rem;
					line-height: 2.4rem;
					border-radius: 1.2rem;
					text-align: center;
					font-size: 0.8rem;
					margin-right: 0.85rem;
					border:solid 1px @base-active-color;
					color: @base-active-color;
					img{
						width: 1rem;
						margin-right: 0.8rem;
					}
				}
				.sure{
					height: 2.4rem;
					line-height: 2.4rem;
					border-radius: 1.2rem;
					text-align: center;
					font-size: 0.8rem;
					background: linear-gradient(-90deg, #FD3C5C 0%, #F86E85 100%);
					color: #fff;
					img{
						width: 1rem;
						margin-right: 0.8rem;
					}
				}
			}
			.SureWeChat{
				margin: 0 auto;
				width: 13rem;
			}
			
	}
	.mt-back-showDialog{
		background-color: #fff;
		width: 16rem;
		border-radius: 0.9rem;
		position: relative;
		.mt-back-showDialog-title{
			background-color: #F9F9F9;
			height: 2.5rem;
			line-height: 2.5rem;
			padding:0 0.85rem;
			border-radius: 0.9rem 0.9rem 0 0 ;
		}
		.mt-bottom-back-close{
			position: absolute;
			right: 0.85rem;
			top:0.65rem;
			width:1.28rem ;
			height: 1.28rem;
			img{
				vertical-align: top;
				width: 100%;
				height: 100%;
			}
		}
		.mt-back-showDialog-body{
			padding: 0.85rem 0.85rem 0;
			.mt-back-select{
				text-align: center;
				//margin-top:0.85rem;
				span{
					margin: 0.2rem 0;
					display: inline-block;
					width: 4.2rem;
					height: 1.8rem;
					line-height: 1.8rem;
					border-radius: 0.9rem;
					background-color: #F9F9F9;
				}
				.current{
					background-color: #FFF1F3;
					color: @base-active-color;
				}
			}
			.mt-back-showDialog-box{
				position: relative;
				margin:1rem auto;
				padding: 0.5rem;
				width: 14rem;
				border: solid 1px #E3E3E3;
				background-color: #F9F9F9;
				border-radius: 0.4rem;
				textarea{
					width: 13rem;
					line-height: 1.4rem;
					border: none;
					background-color: transparent;
					font-size: 0.4rem;
				}
				.num{
					position: absolute;
					bottom:0.5rem;
					right:0.5rem;
					line-height: 1.4rem;
				}
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
				border-color: @base-active-color;
				.select{
					border-color: transparent;
					background:url(../../../../assets/images/mySelect.png)  no-repeat center center;
					background-size: 100% auto;
				}
			}
		}
		
		.mt-back-showDialog-bottom{
			padding: 0rem 0.85rem 0.85rem ;
			div{
				height: 2rem;
				line-height: 2rem;
				border-radius: 1.5rem;
				text-align: center;
				font-size: 0.8rem;
			}
			.sure{
				background: linear-gradient(-90deg, #FD3C5C 0%, #F86E85 100%);
				color: #fff;
			}
			.reset{
				width: 4.5rem;
				margin-right: 0.85rem;
				border:solid 1px #E3E3E3;
				color:#212121;
			}
		}
	}
</style>
