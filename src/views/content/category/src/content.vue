<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="mt-list-container mini">
        <div class="ui-mode-box body" id="container" ref="scroll">
            <div class="relative" v-if="list&&list.length">
                <div class="mt-list-item"
                    :key="`food-${item.id_public_goods_info}-${i}`"
                    v-for="(item,i) in list"
                    @click="goDetail(item)">
                    <div class="box">
                        <img class="app-image auto" @mousedown.prevent v-lazy.container="formatImgUrl(item.goods_main_image)">
                        <span class="promotion" v-if="dictionary.promotion_type[item.type_promotion]">
                            <img class="app-image" @mousedown.prevent v-lazy.container="formatImgUrl(dictionary.promotion_url[item.type_promotion])">
                        </span>
                    </div>
                    <div class="flex-col main">
                        <div class="flex1">
                            <h3>{{item.goods_name|formatText}}</h3>
                            <p class="m1">{{item.sales_describe|formatText}}</p>
                        </div>
                        <p class="m2 flex-row align-center-row">
                            <span class="red"><i class="m">&yen;</i>{{item.price_4_shop_retail|formatText}}<i class="unit">{{getUnit}}</i></span>
                            <span class="old"><i class="m">&yen;</i>{{item.other_market_price|formatText}}<i class="unit">{{getUnit}}</i></span>
                        </p>
                        <p class="discount-info flex-row" v-if="getSpecialFlag(item)">
                            <span class="red flex1">限时特价<i class="m">&yen;</i>{{item.tejia_retail_price|formatText}}{{getUnit}}  限{{item.tejia_max_count|formatText}}份</span>
                        </p>
                        <a href="javascript:;" class="button" @click.stop="handleAddCart($event,item)">＋</a>
                    </div>
                </div>
                <div v-if="isScrolling" class="flex1 flex-row align-center scrolling-content relative">
                    <span class="icon">
                        <bsx-loading master-background="rgba(0,0,0,0)" box-background="rgba(0,0,0,0)" :size="35" :show-text="false"></bsx-loading>
                    </span>
                    <span class="text">努力加载中...</span>
                </div>
                <div v-else-if="isLoadEnded" class="flex1 flex-row align-center scrolling-content relative">已经到底啦~~</div>
            </div>
        </div>
        <shopping-cart ref="cart" :cart-num="getShoppingCartNum" @click.native="goShoppingCart"></shopping-cart>
        <transition name="m_cart">
            <div class="m_add_item flex-row align-center" ref="addCart" :style="getShoppingStyle" v-show="isShopping">
                <img v-if="currentGoodImage" :src="currentGoodImage">
            </div>
        </transition>
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import mixinCart from '../../mixins/cart';
import mixinList from '../../mixins/list';
import shoppingCart from '../../public/shopping-cart';

export default {
    data(){
        return {
            public_goods_order_detail_list:[],
            currentGoodImage:null,
            current_id:'',
            isLoaded:false
        };
    },
    props:{
        id_public_goods_type:''
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinCart,
        mixinList
    ],
    computed:{
        getShoppingCartNum(){
            let n=0;
            this.public_goods_order_detail_list.forEach(item=>{
                n+=item.order_number;
            });
            return n;
        },
        getUnit(){
            return this.$parent.public_agent_info.open_score_pay=='2'?'积分':'元';
        }
    },
    watch:{
        id_public_goods_type:{
            handler(val){
                if(val&&val!=this.current_id){
                    this.current_id=val;
                    this.$nextTick(this.refresh);
                };
            },
            immediate:true
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        /*
         * 进入购物车
         */
        goShoppingCart(){
            if(!this.getShoppingCartNum){
                return this.showMessage('您的购物车还没有商品喔！');
            };
            this.$http.post({
                name:'food.detail.submit',
                data:{
                    invoke_method:'details_4_order',
    				id_public_goods_order_record:this.$parent.public_goods_order_record.id_public_goods_order_record
                },
                loading:{
                    enabled:true
                }
            }).then(({result,response})=>{
                let orderDetail=this.$parent.public_goods_order_record.list_order_details,
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
                        id:this.$parent.public_goods_order_record.id_public_goods_order_record
                    }
                });
            }).catch(({msg})=>{
                this.showMessage(msg);
            });
        },
        /*
         * 加入购物车
         */
        handleAddCart(event,item){
            if(item.goods_selections&&item.goods_selections.length){
                return this.showMessage('请点击商品进入详情页面选择型号！');
            };
            let target=event.target;
            if(!target.__click){
                target.__click=1;
                this.$http.post({
                    name:'common.shopping.modify.step',
                    data:{
                        invoke_method:'step_change_order_details',
                        id_public_goods_order_record:this.$parent.public_goods_order_record.id_public_goods_order_record,
                        id_public_goods_info:item.id_public_goods_info,
                        seller_id:item.seller_id,
                        opt_type:1
                    },
                    loading:{
                        enabled:false
                    }
                }).then(({result,response})=>{
                    //console.log(`handleShoppingModify.button.1`,result)
                    delete target.__click;
                    this.isShopping=true;
                    this.currentGoodImage=this.formatImgUrl(item.goods_main_image);
                    this.startAnimate(target,1).then(()=>{
                        this.isShopping=false;
                        this.currentGoodImage='';
                        this.public_goods_order_detail_list=result.public_goods_order_detail_list||this.public_goods_order_detail_list;
                    });
                }).catch(({msg})=>{
                    delete target.__click;
                    this.showMessage(msg);
                });
            };

        },
        /*
         * 获取是否显示特价
         */
        getSpecialFlag(item){
            if(item.tejia_retail_price>0){
                return item.tejia_time_end&&(new Date(item.tejia_time_end).getTime()>new Date().getTime());
            };
            return false;
        },
        /*
         * 刷新
         */
        refresh(){
            this.currentPage=0;
            this.isScrolling=false;
            this.isLoadEnded=false;
            this.list=[];
            this.resetScroll();
            this.getListInfo({
                flag:true,
                page:0
            });
        },
        /*
         * 获取列表数据
         */
        getListInfo({flag,page,callback}){
            if(!this.isLoaded){
                this.showLoading();
            };
            this.getShoppingInfo().then(()=>{
                this.getPageInfo({
                    flag,
                    tip:false,
                    loading:{
                        size:40,
                        showText:false,
                        alone:true
                    },
                    name:'category.food',
                    param:{
                        invoke_method:'class_page_4_weichat_more_goods',
                        id_public_goods_type:this.current_id,
                        begin_idx:page*this.pageSize,
                        length_4_list:this.pageSize
                    }
                }).then(({result,response})=>{
                    //console.log('category.food',result)
                    if(result.public_goods_list&&result.public_goods_list.length){
                        this.list.push(...result.public_goods_list.slice(0,this.pageSize));
                        this.currentPage=page;
                        if(result.public_goods_list.length<this.pageSize){
                            this.isLoadEnded=true;
                        }else if((this.currentPage+1)*this.pageSize>=parseInt(result.result_num)){
                            this.isLoadEnded=true;
                        };
                        callback&&callback();
                    }else{
                        if(flag){
                            this.showResult('没有查询到相关数据');
                        }else{
                            this.$$toast({
                                target:this.$el,
                                content:'没有查询到相关数据',
                                status:false
                            });
                        };
                        callback&&callback();
                    };
                }).catch(({msg})=>{
                    if(!flag){
                        this.showToast(msg,false);
                    };
                    callback&&callback();
                });
            }).catch(({msg})=>{
                this.showResult(msg,true);
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.getListInfo({
                flag:true,
                page:0
            });
        },
        /*
         * 去详情
         */
        goDetail(item){
            this.$router.push({
                path:'/detail',
                query:{
                    id:item.id_public_goods_info
                }
            });
        },
        /*
         * 获取购物车中商品数量
         */
        getShoppingInfo(){
            return new Promise((resolve,reject)=>{
                if(!this.isLoaded){
                    this.$http.post({
                        name:'common.shopping',
                        data:{
                            invoke_method:'details_4_order',
            				id_public_goods_order_record:this.$parent.public_goods_order_record.id_public_goods_order_record
                        },
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        //console.log('getShoppingInfo',result);
                        this.public_goods_order_detail_list=result.public_goods_order_detail_list||[];
                        this.isLoaded=true;
                        resolve({result,response});
                    }).catch(({msg})=>{
                        reject({msg});
                    });
                }else{
                    resolve();
                };
            });
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
.mt-list-container{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:#f5f5f5;
    &.mini{
        left:5rem;
    }
    .body{
        overflow-x:hidden;
        overflow-y:auto;
        padding:0 0.5rem;
    }
    .mt-list-item{
         position:relative;
         padding:0.5rem 0;
         border-top:solid 1px #eee;
         height:5.2rem;
         &:first-child{
             border-top:none;
         }
        .box{
             width:5.5rem;
             height:4.2rem;
             background:#eee;
             overflow:hidden;
             position:relative;
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
            left:6rem;
            right:0;
            h3{
                font-size:0.8rem;
                font-weight:normal;
                line-height:1rem;
                margin-bottom:0.5rem;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                margin-top:0.15rem;
            }
            p{
                &.m1{
                    font-size:0.6rem;
                    color:#9b9b9b;
                    line-height:0.8rem;
                    position:relative;
                     bottom:0.3rem;
                }
                &.m2{
                    color:#f24b42;
                    font-size:0.8rem;
                    position:relative;
                    bottom:0.1rem;
                    line-height:1rem;
                }
                &.discount-info{
                    color:#f24b42;
                    font-size:0.6rem;
                    line-height:1rem;
                    bottom:0.25rem;
                    position:relative;
                }
                i.m{
                    font-size:0.6rem;
                    font-family:Verdana;
                }
                i.unit{
                    font-size:0.6rem;
                }
                span{
                    &.old{
                        color:#9b9b9b;
                        margin-left:1rem;
                        font-size:0.6rem;
                        text-decoration:line-through;
                    }
                }
            }
            .button{
                position:absolute;
                bottom:0.5rem;
                right:0;
                font-size:0.7rem;
                border-radius:0.1rem;
                background:#eee;
                width:1.2rem;
                line-height:1.2rem;
                text-align:center;
                color:@base-color;
                height:1.2rem;
                display:block;
                &:active{
                    background:#ddd;
                }
            }
        }
    }
}
</style>
