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
            <div class="ui-header-title">订单详情</div>
            <div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleHome">
                <i class="iconfont icon iconi-home"></i>
            </div>
        </div>
        <div class="ui-mode-content bgGray flex1" id="container" ref="scroll">
            <template v-if="pageStatus">
                <div class="mt-order-head">
                	<p><span class="mar-right-10">{{public_goods_order_record.receive_name|formatText}}</span>{{public_goods_order_record.phone_user|formatText}}</p>
                    <p class="gray">{{public_goods_order_record.receive_place|formatText}}</p>
                </div>
                <div class="mt-order-info">
                	<div class="mt-order-title flex-row" @click="handleEvaluate">
                        <span class="flex1">商品清单<i>(共30件)</i></span>
                        <i>评价</i>
                    </div>
                    <div class="mt-order-main" v-if="public_goods_order_detail_list.length">
                        <div class="item"
                            @click="goDetail(item)"
                            :key="i"
                            v-for="(item,i) in public_goods_order_detail_list">
                            <div class="box">
                                <img class="app-image auto" @mousedown.prevent v-lazy.container="formatImgUrl(item.goods_main_image)">
                                <span class="promotion" v-if="dictionary.promotion_type[item.type_promotion]">
                                    <img class="app-image" @mousedown.prevent v-lazy.container="formatImgUrl(dictionary.promotion_url[item.type_promotion])">
                                </span>
                            </div>
                            <div class="main flex-col">
                                <div class="flex1">
                                    <h3>{{item.goods_name|formatText}}<template v-if="item.detail_remark">({{item.detail_remark|formatText}})</template></h3>
                                </div>
                                <p class="flex-row">
                                    <span class="flex1 red"><i>&yen;</i>{{item.price_4_shop_retail|formatText}}</span>
                                    <em>×{{item.order_number|formatText}}</em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-order-item">
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">订单编号</span>
                        <span>{{public_goods_order_record.id_public_goods_order_record|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">订单状态</span>
                        <span>{{dictionary.state[public_goods_order_record.ship_state]||'-'}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">下单时间</span>
                        <span>{{public_goods_order_record.time_order|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">配送方式</span>
                        <span>{{dictionary.type_of_shipment[public_goods_order_record.type_of_shipment]||'-'}}</span>
                    </div>
                    <div class="item flex-row align-stretch" v-if="public_goods_order_record.type_of_shipment==2">
                        <span class="flex1 label">送货时间</span>
                        <span>{{public_goods_order_record.time_require|formatText}}</span>
                    </div>
                </div>
                <div class="mt-order-item mini">
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">订单总额</span>
                        <span class="red"><i>&yen;</i>{{(public_goods_order_record.ship_money+public_goods_order_record.all_price_4_shop_retail)|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">商品总额</span>
                        <span class="red"><i>&yen;</i>{{public_goods_order_record.all_price_4_shop_retail|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">配送费</span>
                        <span class="red"><i>&yen;</i>{{public_goods_order_record.ship_money|formatText}}</span>
                    </div>
                </div>
                <div class="mt-order-item mini">
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">账户余额抵扣</span>
                        <span><i>&yen;</i>{{public_goods_order_record.pay_by_left_money|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">积分抵扣</span>
                        <span><i>&yen;</i>{{public_goods_order_record.pay_by_score|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">优惠券抵扣</span>
                        <span><i>&yen;</i>{{public_goods_order_record.pay_by_quan|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">特价优惠</span>
                        <span><i>&yen;</i>{{public_goods_order_record.append_money_4_order|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">{{getWaysOfPayment}}</span>
                        <span><i>&yen;</i>{{public_goods_order_record.pay_by_online|formatText}}</span>
                    </div>
                    <div class="item flex-row align-stretch">
                        <span class="flex1 label">线下支付</span>
                        <span><i>&yen;</i>{{public_goods_order_record.pay_by_offline|formatText}}</span>
                    </div>
                </div>
                <div class="mt-order-info">
                	<div class="mt-order-title">留言</div>
                    <div class="mt-order-main">
                    	<p class="txt gray">{{public_goods_order_record.order_remark||'无'}}</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="mt-order-button flex-row" v-if="public_goods_order_record.ship_state==14">
            <span class="gradient flex1" @click="handlePay">立即支付</span>
        </div>
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import mixinShare from '../../mixins/share';

export default {
    data(){
        return {
            public_agent_info:{},
            public_user_info:{},
            public_goods_order_record:{},
            public_goods_order_detail_list:[]
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinShare
    ],
    computed:{
        getWaysOfPayment(){
            return {
                3:'支付宝支付',
                4:'微信支付'
            }[this.public_goods_order_record.ways_of_payment]||'第三方支付';
        }
    },
    watch:{

    },
    created(){

    },
    mounted(){
        if(!this.$route.query.id){
            return this.showMessage('进入非法').then(()=>{
                this.handleHistory();
            });
        };
        this.init();
        //this.initBridgeShare();
    },
    methods:{
        /*
         * 去详情
         */
        goDetail(item){
            this.$router.push({
                path:'/category/detail',
                query:{
                    id:item.id_public_goods_info
                }
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
    				id_public_goods_order_record:this.$route.query.id
                },
                loading:{
                    enabled:true
                }
            }).then(({result,response})=>{
                this.showMessage(`跳转到<br/>40311_order_comment.html?id=${this.$route.query.id}`);
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
         * 单击立即支付按钮
         */
        handlePay(){
            if(this.public_goods_order_record.seller_id==this.public_agent_info.id_public_agent_info){
                //let url=this.public_goods_order_record.type_4_kinds=='1'?'4022_shoping_cart.html':'4022_shoping_cart_4_service.html';
                //this.showMessage(`跳转到<br/>${url}`);
                this.$router.push({
                    path:'/category/shopping',
                    query:{
                        id:this.$route.query.id
                    }
                });
            }else{
                this.showConfirm({
                    content:'非本门店订单，必须切换到订单所在门店才能进行操作，确定要切换吗？',
                    sure:(node,close)=>{
                        let loading=this.$$loading();
                        this.$http.post({
                            name:'common.shop.switch',
                            data:{
                                invoke_method:'public_page_4a_login_jump',
        						jump_type:999,
        			            id_public_agent_info:this.public_goods_order_record.seller_id,
        			            type_4_api_command:2
                            },
                            loading:{
                                enabled:false
                            }
                        }).then(({result,response})=>{
                            this.getShopInfo().then(({result,response})=>{
                                loading.close();
                                this.showMessage('切换成功！请再次点击支付按钮');
                            }).catch(({msg})=>{
                                loading.close();
                                this.showMessage(msg);
                            });
                        }).catch(({msg})=>{
                            loading.close();
                            this.showMessage(msg);
                        });
                    }
                });
            };
        },
        /*
         * 初始化
         */
        init(){
            this.showLoading();
            this.getShopInfo().then(({result,response})=>{
                this.getPageInfo({
                    name:'book.order.detail',
                    param:{
                        invoke_method:'details_4_order',
                        id_public_goods_order_record:this.$route.query.id
                    }
                }).then(({result,response})=>{
                    //console.log('order.detail',result)
                    this.public_goods_order_record=result.public_goods_order_record||{};
                    this.public_goods_order_detail_list=result.public_goods_order_detail_list||[];
                });
            }).catch(({msg})=>{
                this.showResult(msg,true);
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.init();
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
        }
    },
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
.mt-order-head{
    padding:0.5rem;
    background:#fff;
    margin-bottom:0.5rem;
    position: relative;
    p{
        line-height:1.6rem;
        font-size:0.8rem;
    }
}
.mt-order-item{
    position:relative;
    background:#fff;
    margin-bottom:0.5rem;
    padding:0 0.5rem;
    .item{
        position:relative;
        font-size:0.7rem;
        min-height:2.6rem;
        line-height:2.6rem;
        border-top:solid 1px #f8f8f8;
        &:first-child{
            border-top:none;
        }
        .label{

        }
        i{
            font-size:0.6rem;
            font-family:Verdana;
        }
    }
    &.mini{
        padding:0.3rem 0.5rem;
        .item{
            border:none;
            min-height:2.2rem;
            line-height:2.2rem;
        }
    }
}
.mt-order-info{
    position:relative;
    background:#fff;
    margin-bottom:0.5rem;
    .mt-order-title{
        position:relative;
        line-height:2.6rem;
        font-size:0.8rem;
        padding:0 0.5rem;
        i{
            font-size:0.7rem;
            color:#9b9b9b;
        }
    }
    .mt-order-main{
        padding:0 0.5rem;
        .item{
             position:relative;
             padding:0.5rem 0;
             border-top:solid 1px #f8f8f8;
            .box{
                 width:4.5rem;
                 height:3.4rem;
                 background:#f9f9f9;
                 overflow:hidden;
                 position:relative;
                 overflow:hidden;
                 .promotion{
                     position:absolute;
                     width:1.5rem;
                     height:1.95rem;
                     overflow:hidden;
                     right:0;
                     top:-0.2rem;
                 }
            }
            .main{
                position:absolute;
                top:0.5rem;
                bottom:0.5rem;
                left:5rem;
                right:0;
                h3{
                    font-size:0.8rem;
                    font-weight:normal;
                    line-height:1.2rem;
                    overflow:hidden;
                }
                p{
                    font-size:0.8rem;
                    line-height:1rem;
                    i{
                        font-size:0.6rem;
                        font-family:Verdana;
                    }
                    em{
                        font-size:0.6rem;
                        font-style:normal;
                    }
                }
            }
        }
        p{
            &.txt{
                padding:0 0 0.5rem 0;
                line-height:1.2rem;
                font-size:0.7rem;
            }
        }
    }
}
.mt-order-button{
    position:relative;
    background:#fff;
    padding:0.5rem;
    box-shadow:0 0 0.3rem #ddd;
    z-index:10;
    span{
        text-align: center;
        padding: 0.1rem 0;
        font-size:0.7rem;
        color: #fff;
        &:active{
            background:@base-active-color !important;
        }
    }
}
</style>
