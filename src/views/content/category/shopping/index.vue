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
            <div class="ui-header-title">购物车</div>
            <div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleHome">
                <i class="iconfont icon iconi-home"></i>
            </div>
        </div>
        <div class="ui-mode-content bgGray flex1" id="container" ref="scroll">
            <template v-if="pageStatus">
                <div class="address-item flex-row align-center mar-bottom-5">
                    <div class="flex1" @click="handleChangeAddress">
                        <template v-if="user_addr_list&&user_addr_list.length">
                            <p class="m1">{{getUserAddrInfo.receive_name|formatText}} {{getUserAddrInfo.phone_user}}</p>
                            <p class="m2">{{getUserAddrInfo.shop_province}}{{getUserAddrInfo.shop_country}}{{getUserAddrInfo.shop_city}}{{getUserAddrInfo.addr_desc}}</p>
                        </template>
                        <p v-else class="m1">添加地址信息</p>
                    </div>
                    <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                </div>
                <div class="mt-order-info">
                    <div class="mt-order-title flex-row" :class="{'align-between-row':!(isAPP||isWeixin||isMiniProgram)}">
                        <span>商品清单<i class="sub">(共{{getTotalGoodsNum}}件)</i></span>
                        <span class="flex1 flex-row align-center" v-if="isAPP||isWeixin||isMiniProgram" @click="handleScan">
                            <em class="saoma iconfont iconsaoma1"></em>
                        </span>
                        <span class="m2 flex-row align-center" @click="goCategory">继续选择<i class="icon iconfont iconjiantou-you-cuxiantiao"></i></span>
                    </div>
                    <div class="mt-order-main" v-if="public_goods_order_detail_list&&public_goods_order_detail_list.length">
                        <div class="item"
                            :key="`food-${item.id_public_goods_info}-${i}`"
                            v-for="(item,i) in public_goods_order_detail_list">
                            <div class="box" @click="goDetail(item)">
                                <img class="app-image auto" @mousedown.prevent v-lazy.container="formatImgUrl(item.goods_main_image)">
                                <span class="promotion" v-if="dictionary.promotion_type[item.type_promotion]">
                                    <img class="app-image" @mousedown.prevent v-lazy.container="formatImgUrl(dictionary.promotion_url[item.type_promotion])">
                                </span>
                            </div>
                            <div class="main flex-col">
                                <div class="flex1">
                                    <h3>{{item.goods_name|formatText}}<template v-if="item.detail_remark">({{item.detail_remark|formatText}})</template></h3>
                                </div>
                                <div class="bottoms flex-row">
                                    <span class="flex1 red"><i class="yuan">&yen;</i>{{item.price_4_shop_retail|formatText}}</span>
                                    <div class="mt-number-item flex-row align-stretch" @click.stop>
                                    	<a href="javascript:" :class="{disabled:item.order_number==0}" @click.stop="handleIndeterminateMinus($event,item,i)">－</a>
                                        <div class="number flex1 flex-row align-center">
                                            <input type="tel" :value="item.order_number" @input="handleInput($event,item,i)"/>
                                        </div>
                                        <a href="javascript:" @click.stop="handleIndeterminatePlus($event,item,i)">＋</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-item-info mar-top-5" v-if="!getType4Kinds">
                    <div class="item ms flex-row align-center" @click="handleShipmentSelect">
                        <div class="label flex1">配送方式</div>
                        <span class="value">{{dictionary.type_of_shipment[type_of_shipment]||'请设置配送方式'}}</span>
                        <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                    </div>
                    <div class="item ms flex-row align-center" @click="handleTimeSelect" v-if="public_agent_info.open_time_require_select!='2'&&type_of_shipment==2">
                        <div class="label flex1">收货时间</div>
                        <span class="value">{{getTimeRequireItem?getTimeRequireItem.title:'请设置时间'}}</span>
                        <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                    </div>
                </div>
                <p class="mt-item-title">费用明细</p>
                <div class="mt-item-info">
                    <div class="item flex-row align-center">
                        <div class="label flex1">商品总额</div>
                        <span class="value red"><i class="yuan">&yen;</i>{{getTotalGoodsNumPrice|setDecimalBit(2)}}</span>
                    </div>
                    <div class="item flex-row align-center">
                        <div class="label flex1">配送费</div>
                        <span class="value red"><i class="yuan">&yen;</i>{{getMoney4Send|formatText}}</span>
                    </div>
                </div>
                <p class="mt-item-title">支付明细</p>
                <div class="mt-item-info mar-bottom-5">
                    <div class="item ms flex-row align-center"
                        v-if="form.coupon.flag"
                        @click="handleQuickCountChange('coupon',1)">
                        <div class="label flex1">优惠券</div>
                        <span class="value flex-row align-center">
                            <i class="mar-right-5">本次优惠{{getPayByQuan|formatText}}{{getUnit}}</i>
                            <bsx-checkbox
                                ref="coupon"
                                v-model="form.coupon.value"
                                @click.native.stop
                                :disabled="form.coupon.disabled"
                                @input="handleCouponChange">
                            </bsx-checkbox>
                        </span>
                        <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.score.flag"
                        @click="handleQuickCountChange('score')">
                        <div class="label flex1">积分余额{{detailInfo.score_price_left|formatText}}{{getUnit}}</div>
                        <span class="m2 flex-row align-center">
                            <span class="mar-right-5 flex-col">
                                <i class="c1">本次抵扣{{getScorePriceLeft|setDecimalBit(2)}}{{getUnit}}</i>
                                <em class="c2" @click.stop="handleViewRule">查看积分规则</em>
                            </span>
                            <bsx-checkbox
                                v-model="form.score.value"
                                @click.native.stop
                                :disabled="form.score.disabled"
                                @input="handleCheckboxChange($event,'score')">
                            </bsx-checkbox>
                        </span>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.balance.flag"
                        @click="handleQuickCountChange('balance')">
                        <div class="label flex1">账户余额{{detailInfo.consume_price_left|formatText}}{{getUnit}}</div>
                        <span class="m2 flex-row align-center">
                            <i class="mar-right-5">本次使用{{getConsumePriceLeft|setDecimalBit(2)}}{{getUnit}}</i>
                            <bsx-checkbox
                                v-model="form.balance.value"
                                @click.native.stop
                                :disabled="form.balance.disabled"
                                @input="handleCheckboxChange($event,'balance')">
                            </bsx-checkbox>
                        </span>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.payType.cash.flag"
                        @click="handleQuickPayTypeChange('cash')">
                        <div class="label flex1">现金支付</div>
                        <span class="m2">
                            <bsx-radio
                                v-model="form.payType.cash.value"
                                :disabled="form.payType.cash.disabled"
                                @click.native.stop
                                @input="handlePayTypeChange($event,'cash')">
                            </bsx-radio>
                        </span>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.payType.weichat.flag"
                        @click="handleQuickPayTypeChange('weichat')">
                        <div class="label flex1">微信支付</div>
                        <span class="m2">
                            <bsx-radio
                                v-model="form.payType.weichat.value"
                                :disabled="form.payType.weichat.disabled"
                                @click.native.stop
                                @input="handlePayTypeChange($event,'weichat')">
                            </bsx-radio>
                        </span>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.payType.alipay.flag"
                        @click="handleQuickPayTypeChange('alipay')">
                        <div class="label flex1">支付宝支付</div>
                        <span class="m2">
                            <bsx-radio
                                v-model="form.payType.alipay.value"
                                :disabled="form.payType.alipay.disabled"
                                @click.native.stop
                                @input="handlePayTypeChange($event,'alipay')">
                            </bsx-radio>
                        </span>
                    </div>
                    <div class="item ms flex-row align-center"
                        v-if="form.payType.h5.flag"
                        @click="handleQuickPayTypeChange('h5')">
                        <div class="label flex1">h5支付</div>
                        <span class="m2">
                            <bsx-radio
                                v-model="form.payType.h5.value"
                                :disabled="form.payType.h5.disabled"
                                @click.native.stop
                                @input="handlePayTypeChange($event,'h5')">
                            </bsx-radio>
                        </span>
                    </div>
                </div>
                <div class="box mar-bottom-5">
                    <p class="title">留言</p>
                    <div class="inner">
                        <textarea placeholder="请输入订单留言" v-model="order_remark" col="2"></textarea>
                    </div>
                </div>
            </template>
        </div>
        <div class="bottom flex-row align-stretch" v-if="pageStatus">
            <div class="info flex1 flex-row align-center-row">应付金额<span class="red"><i>&yen;</i>{{getConsumePriceSurplus|setDecimalBit(2)}}</span>{{getUnit}}</div>
            <span class="submit" :class="{disabled:getSubmitFlag}" @click="handleSubmit">确认支付</span>
        </div>
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import mixinShare from '../../mixins/share';
import {
    getDateInfo,
    prefixNumber
} from '@/utils/tool';

export default {
    data(){
        return {
            detailInfo:{},
            public_goods_order_record:{},
            public_agent_info:{},
            public_goods_order_detail_list:[],
            user_addr_list:[],
            time_require:'',
            type_of_shipment:'',
            ways_of_payment:[],
            form:{
                coupon:{
                    flag:false,
                    value:false,
                    disabled:false
                },
                score:{
                    flag:false,
                    value:false,
                    disabled:false
                },
                balance:{
                    flag:false,
                    value:false,
                    disabled:false
                },
                payType:{
                    cash:{
                        flag:false,
                        value:false,
                        disabled:false,
                        type:1
                    },
                    weichat:{
                        flag:false,
                        value:false,
                        disabled:false,
                        type:4
                    },
                    alipay:{
                        flag:false,
                        value:false,
                        disabled:false,
                        type:3
                    },
                    h5:{
                        flag:false,
                        value:false,
                        disabled:false,
                        type:5
                    }
                }
            },
            order_remark:''
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinShare
    ],
    computed:{
        /*
         * 获取收货时间列表
         */
        getSendTime(){
            if(this.detailInfo.list_4_send_time_conf&&this.detailInfo.list_4_send_time_conf.length){
                return this.detailInfo.list_4_send_time_conf.map(item=>{
                    let now=getDateInfo(),
                        tomorrow=new Date(`${prefixNumber(now.year)}-${prefixNumber(now.month)}-${prefixNumber(now.day+item.type_4_send-1)} ${item.start_time_str}`);
                    return {
                        title:item.type_description,
                        code:this.formatDate(tomorrow,'YYYY-MM-DD hh:mm:ss')
                    };
                });
            };
            return [];
        },
        /*
         * 获取配送方式列表
         */
        getTypeOfShipment(){
            return Object.keys(this.dictionary.type_of_shipment).map(key=>{
                return {
                    title:this.dictionary.type_of_shipment[key],
                    code:key
                };
            });
        },
        /*
         * 获取当前选择收货时间
         */
        getTimeRequireItem(){
            let o={};
            this.getSendTime.forEach(item=>{
                o[item.code]=item;
            });
            return o[this.time_require]||'';
        },
        /*
         * 获取计量单位
         */
        getUnit(){
            return this.public_agent_info.open_score_pay==2?'积分':'元';
        },
        /*
         * 获取是否虚拟产品 1-实体商品 2-虚拟商品 3-服务类别 4-支付类别
         */
        getType4Kinds(){
            if(this.public_goods_order_detail_list&&this.public_goods_order_detail_list.length){
                return this.public_goods_order_detail_list[0].type_4_kinds!=1;
            };
            return false;
        },
        /*
         * 获取商品全部数量
         */
        getTotalGoodsNum(){
            let n=0;
            this.public_goods_order_detail_list.forEach(item=>{
                n+=item.order_number;
            });
            return n;
        },
        /*
         * 获取商品总价
         */
        getTotalGoodsNumPrice(){
            let m=0;
            this.public_goods_order_detail_list.forEach(item=>{
                if(item.tejia_max_count>0){
                    let sn=Math.max(0,Math.min(item.tejia_max_count,item.order_number));
                    m+=sn*item.tejia_retail_price+(item.order_number-sn)*item.price_4_shop_retail;
                }else{
                    m+=item.price_4_shop_retail*item.order_number;
                };
            });
            return m;
        },
        /*
         * 获取配送费
         */
        getMoney4Send(){
            if(this.public_goods_order_detail_list.length){
                if(this.getTotalGoodsNumPrice>=this.public_agent_info.money_4_free_send||this.getType4Kinds||this.type_of_shipment!=2){
                    return 0;
                };
                return this.public_agent_info.money_4_send;
            };
        },
        /*
         * 获取优惠券可以抵扣金额
         */
        getPayByQuan(){
            return this.form.coupon.flag&&this.form.coupon.value?this.public_goods_order_record.pay_by_quan:0;
        },
        /*
         * 获取应支付总金额(总价-配送费-优惠券)
         */
        getTotalPriceLeft(){
            return this.getTotalGoodsNumPrice+this.getMoney4Send-this.getPayByQuan;
        },
        /*
         * 获取积分可以抵扣金额
         */
        getScorePriceLeft(){
            if(this.form.score.flag&&this.form.score.value&&this.detailInfo.score_price_left>0){
                return Math.max(0,Math.min(this.detailInfo.score_price_left,this.getTotalPriceLeft));
            };
            return 0;
        },
        /*
         * 获取余额可以抵扣金额
         */
        getConsumePriceLeft(){
            if(this.form.balance.flag&&this.form.balance.value&&this.detailInfo.consume_price_left>0){
                return Math.max(0,Math.min(this.detailInfo.consume_price_left,this.getTotalPriceLeft-this.getScorePriceLeft));
            };
            return 0;
        },
        /*
         * 获取最终应支付金额
         */
        getConsumePriceSurplus(){
            return this.getTotalPriceLeft-this.getScorePriceLeft-this.getConsumePriceLeft;
        },
        /*
         * 获取提交按钮状态
         */
        getSubmitFlag(){
            return !!!(this.user_addr_list&&this.user_addr_list.length&&this.getTotalGoodsNum>0);
        },
        /*
         * 获取地址列表MAP
         */
        getUserAddrMap(){
            let o={};
            this.user_addr_list.forEach(item=>{
                o[item.id_public_user_address]=item;
            });
            return o;
        },
        /*
         * 获取当前页面地址信息
         */
        getUserAddrInfo(){
            let id_public_user_address=this.public_goods_order_record.id_public_user_address;
            if(!id_public_user_address&&this.user_addr_list.length){
                id_public_user_address=this.user_addr_list[0].id_public_user_address;
            };
            return this.getUserAddrMap[id_public_user_address];
        }
    },
    watch:{
        /*
    	 * 监听表单
    	 */
        form:{
            handler(val){
                this.getWaysOfPayment();
            },
            deep:true,
            immediate:true
        },
        /*
         * 监听最终应支付金额
         */
        getConsumePriceSurplus(val){
            if(val>0){
                Object.keys(this.form.payType).forEach(key=>{
                    if(this.form.payType[key].flag){
                        this.form.payType[key].value=this.ways_of_payment[0]==this.form.payType[key].type;
                        this.form.payType[key].disabled=false;
                    };
                });
            }else{
                Object.keys(this.form.payType).forEach(key=>{
                    if(this.form.payType[key].flag){
                        this.form.payType[key].value=false;
                        this.form.payType[key].disabled=true;
                    };
                });
            };
        },
        /*
         * 监听基础资源是否加载完成
         */
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    },
    created(){
        // if(window.location.href.indexOf("?#")==-1){
        //     window.location.href=window.location.href.replace('#','?#');
        // }else{
            this.initPayType();
            //this.initShoppingShare();
        //};
    },
    mounted(){

    },
    methods:{
        /*
         * 初始化分享
         */
        initShoppingShare(){
            this.$http.post({
                name:'common.share',
                data:{
                    invoke_method:'weichat_config',
                    page_url:window.location.href
                },
                loading:{
                    enabled:false
                }
            }).then(({result,response})=>{
                this.initBridgeShare(null,result);
            }).catch(({msg,status})=>{

            });
        },
        /*
         * 初始化
         */
        init(){
            if(!this.$route.query.id){
                return this.showMessage('进入非法！').then(()=>{
                    this.handleHistory();
                });
            };
            this.handleLoad();
        },
        /*
         * 初始化加载数据
         */
        handleLoad(){
            this.getPageInfo({
                name:'common.shopping',
                param:{
                    invoke_method:'details_4_order',
    				id_public_goods_order_record:this.$route.query.id
                }
            }).then(({result,response})=>{
                //console.log('shopping',result);
                this.detailInfo=result||{};
                if(!this.detailInfo.public_goods_order_record){
                    this.showResult('内部错误,请重试!',true);
                }else if(!(this.detailInfo.public_goods_order_detail_list&&this.detailInfo.public_goods_order_detail_list.length)){
                    this.showResult('您的购物车里没有商品!');
                }else{
                    if(!(this.detailInfo.list_4_send_time_conf&&this.detailInfo.list_4_send_time_conf.length)){
                        this.showMessage('没有时间可以选择,请后端配置!')
                    };
                    this.public_goods_order_record=this.detailInfo.public_goods_order_record||{};
                    this.public_agent_info=this.detailInfo.public_agent_info||{};
                    this.public_goods_order_detail_list=this.detailInfo.public_goods_order_detail_list||[];
                    this.user_addr_list=this.detailInfo.user_addr_list||[];
                    this.time_require=this.public_goods_order_record.time_require_str;
                    this.type_of_shipment=this.public_goods_order_record.type_of_shipment;
                    //this.form.coupon.disabled=this.public_goods_order_record.pay_by_quan==undefined||this.public_goods_order_record.pay_by_quan<=0;
                    this.form.score.disabled=this.detailInfo.score_price_left==undefined||this.detailInfo.score_price_left<=0;
                    this.form.balance.disabled=this.detailInfo.consume_price_left==undefined||this.detailInfo.consume_price_left<=0;
                    this.initWaysOfPayment();
                    this.initFormType();
                };
            });
        },
        /*
         * 确认支付-提交
         */
        handleSubmit(){
            if(this.getSubmitFlag){
                return;
            };
            if(!(this.user_addr_list&&this.user_addr_list.length)){
                return this.showMessage('请先补充收货地址！').then(()=>{
                    this.showMessage(`跳转到<br/>40411_address_add.html`);
                });
            };
            if(!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.getUserAddrInfo.phone_user)){
                return this.showMessage('收货地址手机号码格式错误！');
            };
            if(!this.getType4Kinds){
                if(this.type_of_shipment==''){
                    return this.showMessage('请先选择配送方式！').then(()=>{
                        this.handleShipmentSelect();
                    });
                };
                if(this.type_of_shipment==2&&this.public_agent_info.open_time_require_select!='2'){
                    if(!this.getTimeRequireItem){
                        return this.showMessage('请先选择收货时间！').then(()=>{
                            this.handleTimeSelect();
                        });
                    };
                    if(new Date().getTime()>=new Date(this.getTimeRequireItem.code)){
                        return this.showMessage('当前收货时间已超时，请重新选择！').then(()=>{
                            this.handleTimeSelect();
                        });
                    };
                };
            };
            if(this.public_agent_info.open_score_pay!=2&&this.getConsumePriceSurplus>0){
                let flag=Object.keys(this.form.payType).some(key=>{
                    return this.form.payType[key].flag&&this.form.payType[key].value;
                });
                if(!flag){
                    return this.showMessage('请选择支付方式!');
                };
            };
            this.paying=this.$$loading({
                text:'支付中'
            });
            this.handlePaySend().then(()=>{
                this.handlePayFocus();
            });
        },
        /*
         * 支付跳转
         */
        handlePayFocus(){
            let pay_type=this.ways_of_payment[0];
			if(pay_type){
				this.$router.push({
				     path:'/category/alipay',
				     query:{
				         price:this.getConsumePriceSurplus,
				         orderId:this.public_goods_order_record.id_public_goods_order_record
				     }
				});
			}
			return false
            if(this.isWeixin&&pay_type==3){
                /* let url=['4022_shoping_cart_alipay.html',Qs.stringify({
                    price:this.getConsumePriceSurplus,
                    id:this.public_goods_order_record.id_public_goods_order_record
                })].join('?');
                this.paying&&this.paying.close();
                this.showMessage(`微信支付-跳转到<br/>${url}`); */
                this.$router.push({
                     path:'/alipay',
                     query:{
                         price:this.getConsumePriceSurplus,
                         orderId:this.public_goods_order_record.id_public_goods_order_record
                     }
                });
            }else if(pay_type==5){
                /* let url=['4022_shoping_cart_h5pay.html',Qs.stringify({
                    price:this.getConsumePriceSurplus,
                    id:this.public_goods_order_record.id_public_goods_order_record
                })].join('?');
                this.paying&&this.paying.close();
                this.showMessage(`h5支付-跳转到<br/>${url}`); */
				console.log('hhh')
                this.$router.push({
                     path:'/category/hpay',
                     query:{
                         price:this.getConsumePriceSurplus,
                         orderId:this.public_goods_order_record.id_public_goods_order_record
                     }
                });
            }else{
                let param={
    				1:{
                        handler:'handleCashPayOrder',
    					name:'cash',
    					data:{
    						invoke_method:'user_pay_4_order_no_third_party',
    						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
    					}
    				},
    				3:{
    					handler:'handleAlipayPayOrder',
    					name:'alipay',
    					data:{
    						invoke_method:'js_api_pay',
    						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
    						alipay_show_type:2
    					}
    				},
    				4:{
    					handler:'handleWeichatPayOrder',
    					name:'weichat',
    					data:{
    						invoke_method:'js_api_pay',
    						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record
    					}
    				},
    				5:{
    					handler:'handleH5PayOrder',
    					name:'h5',
    					data:{
    						invoke_method:'js_api_pay',
    						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
    						type_4_api_command:2,
    					}
    				}
    			}[pay_type];
                if(param){
                    this.$http.post({
                        name:`common.shopping.pay.${param.name}`,
                        data:param.data,
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        //console.log('handlePayFocus',result);
                        this.paying&&this.paying.close();
                        this[param.handler](result);
                    }).catch(({msg})=>{
                        this.paying&&this.paying.close();
                        this.showMessage(msg);
                    });
                }else{
                    this.paying&&this.paying.close();
                    this.showMessage(`支付类型参数错误，刷新页面试试看！`).then(()=>{
                        this.handleRefresh();
                    });
                };
            };
        },
        /*
         * h5支付-钩子
         */
        handleH5PayOrder(data){
            window.location=data.mweb_url;
        },
        /*
         * 微信支付-钩子
         */
        handleWeichatPayOrder(data){
            WeixinJSBridge.invoke('getBrandWCPayRequest',{
				appId:data.appId,
				timeStamp:data.timeStamp,
				nonceStr:data.nonceStr,
				package:data.packages,
				signType:'MD5',
				paySign:data.paySign
			},res=>{
				if(res.err_msg=='get_brand_wcpay_request:ok'){
					this.handleCashPayOrder();
				}else{
                    this.showMessage(`支付失败或取消，请重试！${err_msg}`);
				};
			});
        },
        /*
         * 支付宝支付-钩子
         */
        handleAlipayPayOrder(data){
            let el=document.createElement('div');
            el.innerHTML=data.requestText;
            el.style.display='none';
            this.$el.appendChild(el);
            let oldScript=el.getElementsByTagName('script')[0],
                newScript=document.createElement('script');
            el.removeChild(oldScript);
            newScript.type='text/javascript';
            newScript.innerHTML=oldScript.innerHTML;
            el.appendChild(newScript);
        },
        /*
         * 现金支付-钩子
         */
        handleCashPayOrder(){
            this.showMessage(`支付成功，点击确定进入我的订单！`).then(()=>{
                this.$router.push({
                    path:'/front_page_index',
                    query:{
                        redirect:'book',
                        index:0
                    }
                });
            });
            return;
            this.$http.post({
                name:'common.shop.info',
                data:{
                    invoke_method:'user_and_shop_info'
                },
                loading:{
                    enabled:true,
                    text:'支付中'
                }
            }).then(({result,response})=>{
                //console.log('handleCashPayOrder',result);
                this.showMessage(`支付成功，点击确定进入我的订单！`).then(()=>{
                    this.$router.push({
                        path:'/front_page_index',
                        query:{
                            redirect:'book',
                            index:0
                        }
                    });
                });
            }).catch(({msg})=>{
                this.showMessage(`支付成功，点击确定进入我的订单！`).then(()=>{
                    this.$router.push({
                        path:'/front_page_index',
                        query:{
                            redirect:'book',
                            index:0
                        }
                    });
                });
            });
		},
        /*
         * 去支付
         */
        handlePaySend(){
            return new Promise((resolve,reject)=>{
                this.getWaysOfPayment(()=>{
                    let ways_of_payment=parseInt(this.ways_of_payment.join('')),
                        param={
                            invoke_method:'pre_submit_4_order',
                            id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
                            id_public_user_address:this.getUserAddrInfo.id_public_user_address,
                            time_require:this.time_require_str,
                            ways_of_payment,
                            order_remark:this.order_remark,
                            type_of_shipment:this.type_of_shipment
                        };
                    if(this.form.coupon.flag&&this.form.coupon.value){
                        param.id_public_score_record=this.public_goods_order_record.append_key_4_order_discount||'';
                    };
                    this.$http.post({
                        name:'common.shopping.pay',
                        data:param,
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        //console.log('handlePay',result)
                        if(this.isMiniProgram){
                            this.paying&&this.paying.close();
                            let url=['/pages/pay/pay',Qs.stringify({
                                payType:ways_of_payment,
                                id:this.public_goods_order_record.id_public_goods_order_record
                            })].join('?');
        					this.$wx.miniProgram.redirectTo({url});
                        }else{
                            resolve();
                        };
                    }).catch(({msg})=>{
                        this.paying&&this.paying.close();
                        this.showMessage(msg);
                    });
                });
            });
        },
        /*
         * 获取最新支付方式
         */
        getWaysOfPayment(fn){
            let ways_of_payment='1111'.split(''),
                old_ways_of_payment=this.ways_of_payment.join('');
            if(this.form.balance.flag&&!this.form.balance.disabled&&this.form.balance.value){
                ways_of_payment[1]=2;
            };
            if(this.form.score.flag&&!this.form.score.disabled&&this.form.score.value){
                ways_of_payment[2]=2;
            };
            if(this.form.coupon.flag&&!this.form.coupon.disabled&&this.form.coupon.value){
                ways_of_payment[3]=2;
            };
            Object.keys(this.form.payType).forEach(key=>{
                if(this.form.payType[key].value){
                    ways_of_payment[0]=this.form.payType[key].type;
                };
            });
            ways_of_payment=ways_of_payment.join('');
            if(old_ways_of_payment&&ways_of_payment!=old_ways_of_payment){
                this.handleShoppingInfo({
                    type_of_shipment:this.type_of_shipment,
                    time_require:this.time_require,
                    ways_of_payment:parseInt(ways_of_payment)
                }).then(({ways_of_payment})=>{
                    this.ways_of_payment=`${ways_of_payment}`.split('');
                    fn&&fn();
                });
            }else{
                fn&&fn();
            };
        },
        /*
         * 初始化支付方式 支付方式-格式为四位数
         *
         * 第一位数表示现金支付(2表示线下现金、3表示支付宝，4表示微信，5表示h5)、
         * 第二位数表示余额支付(2表示使用)、
         * 第三位数表示积分支付（2表示使用）、
         * 第四位数表示优惠券支付（2表示使用）
         * 1121表示只用积分，
         * 2222，表示线下、余额、积分、优惠券同时使用。
         * 3211表示支付宝、余额同时使用
         */
        initWaysOfPayment(){
            if(this.public_goods_order_record.ways_of_payment){
                this.ways_of_payment=`${this.public_goods_order_record.ways_of_payment}`.split('');
                this.form.score.value=this.ways_of_payment[2]=='2';
                this.form.balance.value=this.ways_of_payment[1]=='2';
                this.form.coupon.value=this.ways_of_payment[3]=='2';
                Object.keys(this.form.payType).forEach(key=>{
                    this.form.payType[key].value=this.ways_of_payment[0]==this.form.payType[key].type;
                });
                //this.form.coupon.value=this.form.coupon.disabled?false:this.form.coupon.value;
                this.form.coupon.value=this.public_goods_order_record.pay_by_quan>0;
                this.form.balance.value=this.form.balance.disabled?false:this.form.balance.value;
                this.form.score.value=this.form.score.disabled?false:this.form.score.value;
            };
        },
        /*
         * 初始化表单
         *
         * @open_score_pay
         * 是否打开积分支付开关
         * 1-允许积分支付和其他支付并存  2-只允许积分支付  3-不允许积分支付
         */
        initFormType(){
            if(this.public_agent_info.open_score_pay==2){
                this.form.score.flag=true;
                this.form.coupon.flag=false;
                this.form.coupon.value=false;
                this.form.coupon.disabled=true;
                this.form.balance.flag=false;
                this.form.balance.value=false;
                this.form.balance.disabled=true;
                Object.keys(this.form.payType).forEach(key=>{
                    this.form.payType[key].flag=false;
                    this.form.payType[key].value=false;
                    this.form.payType[key].disabled=true;
                });
            }else if(this.public_agent_info.open_score_pay==3){
                this.form.balance.flag=true;
                this.form.coupon.flag=true;
                this.form.score.flag=false;
                this.form.score.value=false;
                this.form.score.disabled=true;
            }else if(this.public_agent_info.open_score_pay=='1'){
                this.form.balance.flag=true;
                this.form.coupon.flag=true;
                this.form.score.flag=true;
            };
        },
        /*
         * 修改购物车信息
         */
        handleShoppingInfo({type_of_shipment,time_require,ways_of_payment}){
            return new Promise((resolve,reject)=>{
                this.$http.post({
                    name:'common.shopping.info',
                    data:{
                        invoke_method:'pre_submit_4_order',
        				id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
        				id_public_user_address:this.getUserAddrInfo.id_public_user_address,
        				time_require,
        				ways_of_payment,
        				order_remark:this.order_remark,
        				type_of_shipment
                    },
                    loading:{
                        enabled:true
                    }
                }).then(({result,response})=>{
                    //console.log('handleShoppingInfo',result)
                    resolve({type_of_shipment,time_require,ways_of_payment});
                }).catch(({msg})=>{
                    this.showMessage(`${msg}错误代码[096726]`);
                });
            });
        },
        /*
         * 选择地址
         */
        handleChangeAddress(){
            let url;
            if(this.user_addr_list&&this.user_addr_list.length){
                if(!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.getUserAddrInfo.phone_user)){
                    url=['40411_address_add.html',Qs.stringify({
                        target:'add_select',
                        id_public_user_address:this.getUserAddrInfo.id_public_user_address
                    })].join('?');
                }else{
                    url='000_select_addr_4_order.html';
                };
            }else{
                url='000_select_addr_4_order.html';
            };
            this.showMessage(`选择地址-跳转到<br/>${url}`);
        },
        /*
         * 输入框修改数量
         */
        handleInput(e,item,index){
            let target=e.target,value=target.value;
            if(/^[0-9]\d*$/.test(value)){
                this.$http.post({
                    name:'common.shopping.modify.input',
                    data:{
                        invoke_method:'num_change_order_details',
                        seller_id:item.id_public_agent_info,
						id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
						order_detail_change_data:`${item.id_public_goods_info}-_-${value}`
                    },
                    loading:{
                        enabled:true
                    }
                }).then(({result,response})=>{
                    //console.log('handleShoppingModify.input',result)
                    this.public_goods_order_record=result.public_goods_order_record||this.public_goods_order_record;
                    this.public_goods_order_detail_list[index].order_number=result.public_goods_order_detail_list[index].order_number;
                }).catch(({msg})=>{
                    target.value=item.order_number;
                    this.showMessage(msg);
                });
            }else{
                target.value=item.order_number;
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
        handleIndeterminateMinus($event,item,index){
            if(item.order_number){
                this.handleShoppingModify(2,item,index);
            };
        },
        /*
         * 增加数量
         */
        handleIndeterminatePlus($event,item,index){
            this.handleShoppingModify(1,item,index);
        },
        /*
         * 修改数量
         */
        handleShoppingModify(type,item,index){
            this.$http.post({
                name:'common.shopping.modify.step',
                data:{
                    invoke_method:'step_change_order_details',
                    id_public_goods_order_record:this.public_goods_order_record.id_public_goods_order_record,
                    id_public_goods_info:item.id_public_goods_info,
                    opt_type:type,
                    seller_id:item.id_public_agent_info
                },
                loading:{
                    enabled:true
                }
            }).then(({result,response})=>{
                // console.log(`handleShoppingModify.button.${type}`,result)
                this.public_goods_order_record=result.public_goods_order_record||this.public_goods_order_record;
                this.public_goods_order_detail_list[index].order_number=result.public_goods_order_detail_list[index].order_number;
                resolve(result);
            }).catch(({msg})=>{
                this.showMessage(msg);
            });
        },
        /*
         * 优惠券/积分/余额 切换选中  放大点击区域切换
         */
        handleQuickCountChange(type,flag){
            let check=this.form[type];
            if(!check.disabled){
                check.value=!check.value;
                if(flag){
                    this.handleCouponChange(check.value);
                };
            };
        },
        /*
         * 优惠券切换选中
         */
        handleCouponChange(flag){
            if(flag){
                this.form.coupon.value=!flag;
                this.$refs.coupon.reset();
                this.showMessage(`查看优惠券列表-跳转到<br/>4050_border_coupon.html?id=${this.$route.query.id}`);
            }else{
                if(this.public_goods_order_record.append_key_4_order_discount){
                    this.$http.post({
                        name:'common.order.quan.delete',
                        data:{
                            invoke_method:'delete_quan_of_order',
        					id_public_goods_order_record:this.$route.query.id
                        },
                        loading:{
                            enabled:true
                        }
                    }).then(({result,response})=>{
                        //console.log(`delete_quan_of_order`,result);
                        this.public_goods_order_record.pay_by_quan=0;
                    }).catch(({msg})=>{
                        this.showMessage(msg).then(()=>{
                            this.form.coupon.value=!flag;
                        });
                    });
                };
            };
        },
        /*
         * 复选框切换
         */
        handleCheckboxChange(flag,key){
            this.form[key].value=flag;
        },
        /*
         * 支付方式切换-放大点击区域切换
         */
        handleQuickPayTypeChange(type){
            let payType=this.form.payType[type];
            if(!payType.disabled&&!payType.value){
                this.handlePayTypeChange(!payType.value,type);
            };
        },
        /*
         * 支付方式切换
         */
        handlePayTypeChange(flag,type){
            Object.keys(this.form.payType).forEach(key=>{
                this.form.payType[key].value=key==type;
            });
        },
        /*
         * 选择配送方式
         */
        handleShipmentSelect(){
            this.$$select({
                title:'请选择配送方式',
                value:this.type_of_shipment,
                list:this.getTypeOfShipment,
                sure:data=>{
                    this.handleShoppingInfo({
                        type_of_shipment:data.code,
                        time_require:this.time_require,
                        ways_of_payment:parseInt(this.ways_of_payment.join(''))
                    }).then(({type_of_shipment})=>{
                        this.type_of_shipment=type_of_shipment;
                    });
                }
            });
        },
        /*
         * 选择收货时间
         */
        handleTimeSelect(){
            this.$$select({
                title:'请选择收货时间',
                value:this.time_require,
                list:this.getSendTime,
                sure:data=>{
                    this.handleShoppingInfo({
                        type_of_shipment:this.type_of_shipment,
                        time_require:data.code,
                        ways_of_payment:parseInt(this.ways_of_payment.join(''))
                    }).then(({time_require})=>{
                        this.time_require=time_require;
                    });
                }
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.detailInfo={};
            this.public_goods_order_record={};
            this.public_agent_info={};
            this.public_goods_order_detail_list=[];
            this.user_addr_list=[];
            this.time_require='';
            this.type_of_shipment='';
            this.ways_of_payment=[];
            this.order_remark='';
            Object.keys(this.form).forEach(key=>{
                if(key!='payType'){
                    this.form[key].flag=false;
                    this.form[key].value=false;
                    this.form[key].disabled=false;
                }else{
                    Object.keys(this.form[key]).forEach(type=>{
                        this.form[key][type].flag=false;
                        this.form[key][type].value=false;
                        this.form[key][type].disabled=false;
                    });
                };
            });
            this.initPayType();
            this.handleLoad();
        },
        /*
         * 查看积分规则
         */
        handleViewRule(){
            this.showMessage(`查看积分规则-跳转到<br/>积分规则.html`);
        },
        /*
         * 继续选购
         */
        goCategory(){
            this.$router.push({
                path:'/front_page_index',
                query:{
                    redirect:'category'
                }
            });
        },
        /*
         * 去详情
         */
        goDetail(item){
            let url;
            if(!this.getType4Kinds){
                url='4021_food_detail.html';
            }else{
                url='4021_food_detail_4_service.html';
            };
            //this.showMessage(`查看商品详情-跳转到<br/>${url}`);
            this.$router.push({
                path:'/category/detail',
                query:{
                    id:item.id_public_goods_info
                }
            });
        },
        /*
         * 初始化支付方式
         */
        initPayType(){
            if(this.isAPP){
                this.form.payType.alipay.flag=true;
                this.form.payType.h5.flag=true;
            }else if(this.isMiniProgram){
                this.form.payType.weichat.flag=true;
            }else if(this.isWeixin){
                this.form.payType.weichat.flag=true;
                this.form.payType.alipay.flag=true;
                this.form.payType.h5.flag=true;
            }else{
                this.form.payType.alipay.flag=true;
                this.form.payType.h5.flag=true;
            };
        }
    },
    components:{

    },
    beforeDestroy(){
        this.paying&&this.paying.close();
    }
}
</script>

<style lang="less" scoped>
.address-item{
    padding:0.5rem;
    background-color:#fff;
    p{
        font-size:0.8rem;
        line-height:1.2rem;
        padding:0.2rem 0;
        &.m2{
            color:#9b9b9b;
        }
    }
    .icon{
        color:#888;
        font-size:0.8rem;
        margin-left:0.5rem;
        width:0.6rem;
        text-align:right;
    }
    &:active{
        background:#f8f8f8;
    }
}
.mt-order-info{
    position:relative;
    background:#fff;
    .mt-order-title{
        position:relative;
        line-height:2.6rem;
        font-size:0.8rem;
        padding:0 0.5rem;
        i.sub{
            font-size:0.7rem;
            color:#9b9b9b;
        }
        .saoma{
            font-size:1.2rem;
            color:@base-color;
            font-weight:bold;
        }
        .m2{
            font-size:0.8rem;
            color:@base-color;
            i{
                color:@base-color;
                font-size:0.8rem;
                margin-left:0.1rem;
                width:0.6rem;
                text-align:right;
            }
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
        .bottoms{
            height:1.4rem;
            line-height:2rem;
            i.yuan{
                font-size:0.6rem;
                font-family:Verdana;
            }
            .mt-number-item{
                width:4.9rem;
                height:1.4rem;
                a{
                    width:1.4rem;
                    text-align:center;
                    color:@base-color;
                    font-weight:bold;
                    font-size:0.8rem;
                    line-height:1.4rem;
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
                        height:1.4rem;
                        padding:0.2rem 0;
                        line-height:1rem;
                        width:100%;
                        text-align:center;
                        background:#f5f5f5;
                        color:#333;
                        font-size:0.8rem;
                    }
                }
            }
        }
    }
}
.mt-item-info{
    background-color:#fff;
    .item{
        position:relative;
        padding:0 0.5rem;
        line-height:2.6rem;
        font-size:0.7rem;
        border-bottom:solid 1px #f8f8f8;
        .label{
        }
        .value{
            margin-right:0.1rem;
            .yuan{
                font-size:0.6rem;
                font-family:Verdana;
            }
        }
        .m2{
            margin-right:0.7rem;
            .c1{
                font-size:0.6rem;
                text-align:right;
                line-height:0.8rem;
            }
            .c2{
                font-size:0.6rem;
                color:#9b9b9b;
                text-align:right;
                line-height:0.8rem;
                font-style:normal;
            }
        }
        .icon{
            color:#888;
            font-size:0.8rem;
            width:0.6rem;
            text-align:right;
        }
        &:last-child{
            border-top:none;
        }
        &.ms{
            &:active{
                background:#f8f8f8;
            }
        }
    }
}
.mt-item-title{
    color:#9b9b9b;
    font-size:0.7rem;
    line-height:2rem;
    padding:0 0.5rem;
}
.bottom{
    padding:0.5rem;
    background:#fff;
    box-shadow:0 0 0.3rem #ddd;
    z-index:10;
    position:relative;
    .info{
        color:#9b9b9b;
        font-size:0.8rem;
        span{
            font-size:1rem;
            margin:0 0.3rem;
            i{
                font-size:0.6rem;
                font-family:Verdana;
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
            opacity:0.7;
            background:@base-color;
            cursor:default;
        }
    }
}
.box{
    background-color:#fff;
    padding:0 0.5rem;
    .title{
        font-size:0.8rem;
        line-height:2.6rem;
    }
    .inner{
        textarea{
            border:none;
            border-bottom:solid 1px #d8d8d8;
            font-size:0.7rem;
            padding:0 0 0.5rem;
            line-height:1.2rem;
            width:100%;
            height:1.7rem;
            overflow:hidden;
            &:focus{
                border-color:@base-color;
            }
        }
    }
}
</style>
