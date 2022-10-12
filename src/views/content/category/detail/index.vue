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
            <div class="ui-header-title">商品详情</div>
            <template v-if="isAPP">
                <div class="ui-header-arraw next2 flex-row align-center" @touchstart.stop @click="handleHome">
                    <i class="iconfont icon iconi-home"></i>
                </div>
                <div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleShare">
                    <i class="iconfont icon iconiconfontzhizuobiaozhun20"></i>
                </div>
            </template>
            <div class="ui-header-arraw next flex-row align-center" v-else @touchstart.stop @click="handleHome">
                <i class="iconfont icon iconi-home"></i>
            </div>
        </div>
        <div class="ui-mode-content bgGray flex1" id="container" ref="scroll">
            <template v-if="pageStatus">
                <div class="banner" v-if="public_goods_img_list&&public_goods_img_list.length">
                    <mt-swipe
                        :auto="4000"
                        :default-index="0"
                        :prevent="true">
                        <mt-swipe-item
                            :key="`banner-${i}`"
                            v-for="(item,i) in public_goods_img_list">
                            <img class="app-image auto" @mousedown.prevent v-lazy="formatImgUrl(item.image_url)">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="t1 mar-bottom-5">
                    <div class="c1 flex-row">
                        <span class="m1 flex1">{{(detailInfo.child_name||detailInfo.type_name)|formatText}}/{{detailInfo.goods_name|formatText}}</span>
                        <span class="m2">{{detailInfo.sales_describe|formatText}}</span>
                    </div>
                    <div class="c2 flex-row align-center">
                        <div class="flex1 flex-col">
                            <span class="m1 red"><i>&yen;</i>{{detailInfo.price_4_shop_retail|formatText}}<em>{{getUnit}}</em></span>
                            <span class="m2">价格：<i>&yen;</i>{{detailInfo.other_market_price|formatText}}<em>{{getUnit}}</em></span>
                        </div>
                        <span class="address">产地：上海</span>
                    </div>
                </div>
                <div class="box mar-bottom-5" v-if="foodTips&&foodTips.length">
                    <p class="title">商品型号</p>
                    <div class="inner flex-row flex-wrap">
                        <span class="tip" @click="handleChangeTip(item,i)" :class="{active:item.flag}" v-if="item.text" :key="i" v-for="(item,i) in foodTips">{{item.text}}</span>
                    </div>
                </div>
                <div class="item flex-row align-stretch align-between-row mar-bottom-5">
                    <span class="label">存储方式</span>
                    <div class="flex-row align-center">
                        <span class="tip">{{dictionary.goods_storetype[detailInfo.goods_storetype]||'-'}}</span>
                    </div>
                </div>
                <div class="item flex-row align-stretch align-between-row mar-bottom-5">
                    <span class="label">品牌</span>
                    <div class="flex-row align-center">
                        <span class="text">{{detailInfo.brand_name|formatText}}</span>
                        <span class="area" v-if="detailInfo.type_of_4_kinds==1">{{detailInfo.area||'产地直供'}}</span>
                    </div>
                </div>
                <div class="box mar-bottom-5">
                    <p class="title">评价</p>
                    <div class="inner flex-row align-center pad-bottom-5" @click="handleEvaluate">
                        <div class="flex1 flex-col">
                            <span class="num k">{{detailInfo.comment_star|setDecimalBit(1)}}</span>
                            <span class="star flex-row align-center-row">
                                <i class="fill iconfont"
                                    :class="[`iconstar-${type}`]"
                                    :key="`star-${i}`"
                                    v-for="(type,i) in formatStar(detailInfo.comment_star)">
                                </i>
                            </span>
                        </div>
                        <div class="flex1 flex-col">
                            <span class="num">{{detailInfo.comment_num|formatText}}</span>
                            <span class="num">评论</span>
                        </div>
                        <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                    </div>
                </div>
                <div class="box mar-bottom-5">
                    <p class="title flex-row align-stretch" @click="handleToggle">
                        <span class="flex1">查看商品介绍</span>
                        <span class="icon flex-row align-center">
                            <i class="arrow iconfont m1 iconxiajiantou" v-if="showable"></i>
                            <i class="arrow iconfont iconjiantou-you-cuxiantiao" v-else></i>
                        </span>
                    </p>
                    <div class="inner" v-show="showable">
                        <div class="img" v-if="detailInfo.goods_dec_pic">
                            <img class="app-image auto auto-height" v-lazy.container="formatImgUrl(detailInfo.goods_dec_pic)">
                        </div>
                        <p>{{detailInfo.goods_dec||'无'}}</p>
                    </div>
                </div>
            </template>
        </div>
        <template v-if="pageStatus">
            <div class="bottom flex-row align-stretch">
                <div class="info flex1">
                    <div class="mt-number-item flex-row align-stretch">
                    	<a href="javascript:" :class="{disabled:order_number==0}" @click="handleIndeterminateMinus">－</a>
                        <div class="number flex1">
                            <input type="tel" ref="input" @input="handleInput" :value="order_number"/>
                        </div>
                        <a href="javascript:" ref="plus" @click="handleIndeterminatePlus">＋</a>
                    </div>
                </div>
                <span class="submit" @click="handleSubmit($event,true)">立即购买</span>
            </div>
            <shopping-cart ref="cart" :cart-num="getShoppingCartNum" @click.native="handleSubmit($event)"></shopping-cart>
            <transition name="m_cart">
                <div class="m_add_item flex-row align-center" ref="addCart" :style="getShoppingStyle" v-show="isShopping">
                    <img :src="getGoodMainImage">
                </div>
            </transition>
        </template>
		<!-- 下载 -->
		<template v-if="appDownload">
			<div class="mt-download-container" id="download-container-wrapper">
				<div class="mt-download-content mt-flex mt-flex-between">
					<div class="img-wrapper">
						<img src="../../../../assets/images/logo.png"
							width="100%" height="100%" alt="">
					</div>
					<div class="center mt-flex-inner">
						<p class="param">精邻兔</p>
					</div>
					<a id="wx-download-target" href="" class="btn">下载</a>
				</div>
			</div>
		</template>
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import mixinCart from '../../mixins/cart';
import mixinShare from '../../mixins/share';
import shoppingCart from '../../public/shopping-cart';

export default {
    data(){
        return {
            public_agent_info:{},
            public_user_info:{},
            public_goods_order_record:{},
            detailInfo:{},
            public_goods_img_list:[],
            foodTips:[],
            public_goods_order_detail_list:[],
            showable:true,
            order_number:0,
			appDownload:false
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinCart,
        mixinShare
    ],
    computed:{
        getUnit(){
            return this.public_agent_info.open_score_pay==2?'积分':'元';
        },
        getGoodMainImage(){
            return this.formatImgUrl(this.detailInfo.goods_main_image);
        },
        getShoppingCartNum(){
            let n=0;
            this.public_goods_order_detail_list.forEach(item=>{
                n+=item.order_number;
            });
            return n;
        },
        getCheckedTip(){
            let res=this.foodTips.filter(item=>{
                return item.flag;
            });
            if(res.length){
                return res[0].text;
            };
        }
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
		this.showMessage(window.location.href)
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
		}
			
    },
    mounted(){
		this.init()
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
         * 输入框修改数量
         */
        handleInput(e){
            let target=e.target,value=target.value;
            if(this.foodTips.length&&!this.getCheckedTip){
                target.value=this.order_number;
                return this.showMessage('请选择商品型号!');
            };
            if(/^[0-9]\d*$/.test(value)){
                this.$http.post({
                    name:'common.shopping.modify.input',
                    data:{
                        invoke_method:'num_change_order_details',
						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
						order_detail_change_data:`${this.$route.query.id}-_-${value}-_-${this.getCheckedTip}`
                    },
                    loading:{
                        enabled:true
                    }
                }).then(({result,response})=>{
                    //console.log('handleShoppingModify.input',result)
                    this.order_number=parseInt(value);
                    this.public_goods_order_record=result.public_goods_order_record||this.public_goods_order_record;
                    this.isShopping=true;
                    this.startAnimate(this.$refs.input).then(()=>{
                        this.isShopping=false;
                        this.public_goods_order_detail_list=result.public_goods_order_detail_list||this.public_goods_order_detail_list;
                    });
                }).catch(({msg})=>{
                    target.value=this.order_number;
                    this.showMessage(msg);
                });
            }else{
                target.value=this.order_number;
                if(!target.__validator){
                    target.__validator=true;
                    this.showMessage('请输入数字!').then(()=>{
                        delete target.__validator;
                    });
                };
            };
        },
        /*
         * 减少数量
         */
        handleIndeterminateMinus(){
            if(this.order_number){
                if(this.foodTips.length&&!this.getCheckedTip){
                    return this.showMessage('请选择商品型号!');
                };
                this.handleShoppingModify(2).then(result=>{
                    this.public_goods_order_detail_list=result.public_goods_order_detail_list||this.public_goods_order_detail_list;
                    this.order_number--;
                });
            };
        },
        /*
         * 增加数量
         */
        handleIndeterminatePlus(){
            if(this.foodTips.length&&!this.getCheckedTip){
                return this.showMessage('请选择商品型号!');
            };
            this.handleShoppingModify(1).then(result=>{
                this.order_number++;
                this.isShopping=true;
                this.startAnimate(this.$refs.plus).then(()=>{
                    this.isShopping=false;
                    this.public_goods_order_detail_list=result.public_goods_order_detail_list||this.public_goods_order_detail_list;
                });
            });
        },
        /*
         * 修改数量
         */
        handleShoppingModify(type){
            return new Promise((resolve,reject)=>{
                this.$http.post({
                    name:'common.shopping.modify.step',
                    data:{
                        invoke_method:'step_change_order_details',
        				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
        				id_public_goods_info:this.$route.query.id,
        				opt_type:type,
        				detail_remark:this.getCheckedTip
                    },
                    loading:{
                        enabled:true
                    }
                }).then(({result,response})=>{
                    //console.log(`handleShoppingModify.button.${type}`,result)
                    this.public_goods_order_record=result.public_goods_order_record||this.public_goods_order_record;
                    resolve(result);
                }).catch(({msg})=>{
                    this.showMessage(msg);
                });
            });
        },
        /*
         * 立即购买
         */
        handleSubmit(event,flag){
            if(flag&&this.order_number<=0){
                return this.showMessage('请先输入数量！');
            };
            if(!this.getShoppingCartNum){
                return this.showMessage('您的购物车还没有商品喔！');
            };
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
                // if(orderDetail.type_4_kinds==1){
                //     url='4022_shoping_cart.html';
                // }else{
                //     url='4022_shoping_cart_4_service.html';
                // };
                // this.showMessage(`跳转到<br/>${url}`);
                this.$router.push({
                    path:'/category/shopping',
                    query:{
                        id:this.public_goods_order_record.id_public_goods_order_record
                    }
                });
            }).catch(({msg})=>{
                this.showMessage(msg);
            });
        },
        /*
         * 去评价
         */
        handleEvaluate(){
            this.$http.post({
                name:'common.evaluate',
                data:{
                    invoke_method:'details_4_order',
    				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
                },
                loading:{
                    enabled:true
                }
            }).then(({result,response})=>{
                this.showMessage(`跳转到<br/>40211_food_comment.html?id=${this.$route.query.id}`);
                // this.$router.push({
                //     path:'/category/evaluate',
                //     query:{
                //         id:this.$route.query.id
                //     }
                // });
            }).catch(({msg})=>{
                this.showMessage(msg);
            });
        },
        /*
         * 切换标签
         */
        handleChangeTip(item,index){
            if(!item.flag){
                this.foodTips=this.foodTips.map((item,i)=>{
                    item.flag=i==index;
                    return item;
                });
            };
        },
        /*
         * 切换显示详情
         */
        handleToggle(){
            this.showable=!this.showable;
        },
        /*
         * 初始化加载数据
         */
        handleLoad(){
            this.showLoading();
            this.getShopInfo().then(({result,response})=>{
                this.getPageInfo({
                    name:'food.detail',
                    param:{
                        invoke_method:'show_goods_info',
        				id_public_goods_info:this.$route.query.id,
        				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
                    }
                }).then(({result,response})=>{
                    //console.log('food.detail',result)
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
                    /* this.initBridgeShare({
                        title:`${this.$store.state.global.public_user_info.nick_name}邀请您体验[${this.detailInfo.goods_name}]`,
                        desc:`${this.$store.state.global.public_user_info.nick_name}邀请您体验[${this.detailInfo.goods_name}]`,
                        key:'id_public_goods_info',
                        value:this.detailInfo.id_public_goods_info,
                        imgUrl:this.detailInfo.goods_main_image?this.getGoodMainImage:null,
						new_page:'front_page_index.html#/category/detail?id='+this.detailInfo.id_public_goods_info,
                    }); */
                });
                this.getShoppingInfo();
            }).catch(({msg})=>{
                this.showResult(msg,true);
            });
        },
        /*
         * 获取购物车中商品数量
         */
        getShoppingInfo(){
            this.$http.post({
                name:'common.shopping',
                data:{
                    invoke_method:'details_4_order',
    				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
                },
                loading:{
                    enabled:false
                }
            }).then(({result,response})=>{
                //console.log('getShoppingInfo',result);
                this.public_goods_order_detail_list=result.public_goods_order_detail_list||[];
            }).catch(({msg})=>{

            });
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
                    //console.log('this.public_goods_order_record',this.public_goods_order_record)
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
        }
    },
    components:{
        shoppingCart
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
}
.t1{
    background-color:#fff;
    padding:0.3rem 0.5rem;
    .c1{
        line-height:0.9rem;
        font-size:0.7rem;
        padding:0.3rem 0;
        .m1{
            margin-right:0.5rem;
        }
        .m2{
            color:#9b9b9b;
            font-size:0.6rem;
        }
    }
    .c2{
        margin-top:0.3rem;
        i{
            font-family:Verdana;
            font-size:0.6rem;
        }
        em{
            font-size:0.6rem;
            font-style:normal;
        }
        .m1{
            font-size:1rem;
            line-height:1rem;
        }
        .m2{
            text-decoration:line-through;
            font-size:0.6rem;
            color:#9b9b9b;
            line-height:0.8rem;
        }
        .address{
            color:#9b9b9b;
            font-size:0.7rem;
        }
    }
}
.item{
    font-size:0.7rem;
    line-height:2.6rem;
    padding:0 0.5rem;
    background-color:#fff;
    span{
        &.label{
            margin-right:0.5rem;
            color:#9b9b9b;
        }
        &.text{
            color:#585E6A;
        }
        &.area{
            background:@base-color;
            border:solid 1px @base-color;
            color:#fff;
            padding:0.3rem 0.5rem;
            border-radius:0.2rem;
            line-height:0.6rem;
            font-size:0.6rem;
            margin-left:0.3rem;
        }
        &.tip{
            background:#fff;
            border:solid 1px @base-color;
            color:@base-color;
            padding:0.3rem 0.5rem;
            border-radius:0.2rem;
            line-height:0.6rem;
            font-size:0.6rem;
        }
    }
}
.box{
    background-color:#fff;
    padding:0 0.5rem 0.2rem;
    .title{
        span{
            color:#9b9b9b;
            font-size:0.7rem;
            &.icon{
                i{
                    font-size:0.8rem;
                    &.m1{
                        font-size:0.6rem;
                        padding:0 0.2rem;
                        font-weight:bold;
                    }
                }
            }
        }
    }
    .inner{
        line-height:1.4rem;
        .tip{
            background:#ccc;
            border:solid 1px #ccc;
            color:#333;
            padding:0.4rem 0.5rem;
            border-radius:0.2rem;
            line-height:0.6rem;
            font-size:0.7rem;
            margin:0 0.3rem 0.3rem 0;
            &.active{
                background:@base-color;
                color:#fff;
                border-color:@base-color;
            }
        }
        p{
             font-size:0.7rem;
             line-height:1.2rem;
             text-align:justify;
             text-justify:inter-ideograph;
             padding-bottom:0.5rem;
             color:#333;
        }
        .num{
            font-size:0.7rem;
            color:#9b9b9b;
            line-height:1.2rem;
            &.k{
                margin-left:0.05rem;
            }
        }
        .star{
            width:3rem;
            height:1.2rem;
            background-size:100% auto;
            background-position:left center;
            background-repeat:no-repeat;
            i{
                font-size:0.6rem;
                margin-right:0.1rem;
                &.fill{
                    color:@base-color;
                }
                &.half{
                    color:@base-color;
                }
                &.empty{
                    color:#9b9b9b;
                }
            }
        }
        .icon{
            font-size:0.8rem;
            color:#9b9b9b;
        }
        .img{
             height:20rem;
             background:#f9f9f9;
             overflow:hidden;
             position:relative;
             margin-bottom:0.5rem;
             &.has-loaded{
         		height:auto;
         	}
        }
    }
}
.bottom{
    padding:0.5rem;
    background:#fff;
    box-shadow:0 0 0.3rem #ddd;
    z-index:10;
    position:relative;
    .info{
        .mt-number-item{
            width:9rem;
            a{
                width:2.2rem;
                text-align:center;
                color:@base-color;
                font-weight:bold;
                font-size:1rem;
                line-height:2.2rem;
                background:#f5f5f5;
                &:active{
                    background:@base-color;
                    color:#fff;
                }
                &.disabled,&.disabled:active{
                    opacity:0.6;
                    color:@base-color;
                    background:#f5f5f5;
                    cursor:default;
                }
            }
            .number{
                margin:0 0.1rem;
                input{
                    border:none;
                    height:2.2rem;
                    padding:0.5rem 0;
                    line-height:1.2rem;
                    width:100%;
                    text-align:center;
                    background:#f5f5f5;
                    color:#333;
                    font-size:0.8rem;
                }
            }
        }
    }
    .submit{
        position:relative;
        padding:0 1rem;
        background:@base-color;
        color:#fff;
        border-radius:0.2rem;
        height:2.2rem;
        line-height:2.2rem;
        font-size:0.8rem;
        cursor:pointer;
        text-align:center;
        &:active{
            background:@base-active-color;
        }
        &.disabled,&.disabled:active{
            background:#999;
            cursor:default;
        }
    }
}
</style>
