<template>
  <div class="content-box bgwhite mt-flex mt-flex-y">
	<div class="ui-header-item gradient">
		<div class="ui-header-arraw prev" @click="handleHistory" @touchstart.stop>
			<i class="iconfont icon iconjiantou-zuo-cuxiantiao"></i>
		</div>
		<div class="ui-header-title">订单详情</div>
		<div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleHome">
			<i class="iconfont icon iconi-home"></i>
		</div>
	</div>

    <div v-if="isWeixin" class="mt-alipay-arrow" id="alipay-arrow">
        <p>请在浏览器内打开进行支付</p>
        <img src="res/images/browser_arrow.png">
    </div>
    <div v-else class="ui-mode-content mt-flex-inner mt-flex mt-flex-y bgGray pad-5" >
        <div class="mt-flex-inner mt-alipay-content">
            <div class="mt-alipay-box">
                <p>订单号：<span>{{orderId}}</span></p>
                <p>应支付金额：<span><i class="red">{{price}}</i> 元</span></p>
                <div class="mt-alipay-submit" @click="alipay()">h5支付</div>
                <!-- <div id="alipay-target" @click="alipay()"></div> -->
            </div>
        </div>
        <!-- <div class="mt-alipay-logo"></div> -->
    </div>
  </div>
</template>
<script>
  import mixinCommon from '../../mixins/common';
export default {
  data() {
    return {
    	loading:false,
        orderId:this.$route.query.orderId,
      price:this.$route.query.price,
    }
  },
  mixins:[
      mixinCommon,
  ],
  created() {
  },
  mounted() {
    this.test()
    setInterval(this.test, 3000);
  },
  methods: {
    test:function(){
      var that = this
	  this.$http.post({
	      name:'common.shopping',
	      data:{
	          invoke_method:'details_4_order',
	  		id_public_goods_order_record:this.orderId
	      },
	      loading:{
	          enabled:false
	      }
	  }).then(({result,response})=>{
		  if(result.public_goods_order_record.ship_state==0||result.public_goods_order_record.ship_state==1||result.public_goods_order_record.ship_state==3||result.public_goods_order_record.ship_state==4){
			  that.$router.push({
				  path: '/book',
			  })
			}
	  }).catch(({msg})=>{
	  
	  });
    },
    alipay:function(e) {
    	var that = this;
    	if (!that.isWeixin) {
			this.$http.post({
			    name:'common.shopping.pay.weichat',
			    data:{
			        invoke_method:'js_api_pay',
					id_public_goods_order_record:that.orderId,
					type_4_api_command:2
			    },
			    loading:{
			        enabled:false
			    }
			}).then(({result,response})=>{
    			window.location = result.mweb_url
    		})
    	}else{
			this.showMessage(`微信环境下不能使用h5支付，请在浏览器中打开此页面`);
			return false;
    	}

    },

  },
 components: {
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div,p,h3,span{margin: 0;padding: 0;}
  i{font-style: normal;}
.home-head {display: flex;align-items: center;padding: 0 0.853rem;width: 100%;height: 2.933rem;box-sizing: border-box;background-color: #009FAB;color: #fff;font-size: 0.9rem; text-align: center;}
.hide{display: none;}
.mt-alipay-box{padding: 1rem .5rem;}
.mt-alipay-submit{margin-top:1rem; background:#009FAB ; text-align: center; color: #fff; padding: .3rem;}


.active{display: block;}
.shoppingCart-cont{ padding-top:3rem; padding-bottom:3rem; position: relative; height: 100%;overflow: scroll;}
.shoppingCart-address{position: relative; display: block; padding: 0.85rem; color: #333;line-height: 1.6rem; font-size: 0.8rem;}
.shoppingCart-address::after,.shoppingCart-more::after{content: '\F00A'; position: absolute; top:50%;right:0.5rem;margin-top:-0.3rem; font: normal normal normal 14px/1 vant-icon;}
.bgwhite{ background-color:#fff !important;}
.green{color: #3bce63;}
.red{color: #f24b42;}
.gray{color: #999;}
.font6{font-size: 0.6rem;}
.align-left{ text-align:left;}
.align-center{ text-align:center;}
.align-right{ text-align:right;}
.shoppingCart-more{position: relative; padding-right: 1.5rem;}
.shoppingCart-title{padding: 0.85rem 0 0.5rem 0.85rem; font-size: 0.8rem;}
.shoppingCart-list{padding:0 0.85rem;}
.mt-list-item{display: flex; position: relative; margin-top:1rem; min-height: 3rem;}
.box{width: 4.5rem;flex-shrink:0;position: relative;}
.goods-img{width: 100%;}
.list-box{flex:1; margin-left: 0.5rem; position: relative;}
.list-box h3{font-size: 0.8rem; line-height: 1.5; margin: 0; font-weight: 400;}
.goods-sales-describe{font-size: 0.6rem;color: #9b9b9b;line-height: 1rem;}
.goods-price{position: absolute; bottom:0.8rem; font-size: 0.8rem;line-height: 1.2rem; color: #f24b42; }
.goods-price i{font-style: normal;}
.change-num-box{position:absolute; bottom:0.8rem; right:0; font-size:0.8rem;font-weight: bold;}
.change-num{width: 2.5rem; border-radius:0.1rem; background:#f5f5f5; line-height:1.2rem; text-align:center; color:#5ac84e; height:1.2rem; }
.change-num .van-cell{padding: 0 6px;}
/deep/ .change-num .van-cell .van-field__control{ background:#f5f5f5;color:#5ac84e; text-align: center;}
.add-button{border-radius:0.1rem; background:#f5f5f5; width:1.4rem; line-height:1.2rem; text-align:center; color:#5ac84e; height:1.2rem; display:block;}
.add-buttonactive{ background:#ddd;}
.mt-flex-shrink{-webkit-box-flex: 0;-moz-flex-shrink: 0;-webkit-flex-shrink:0;flex-shrink:0;}
.mt-flex-inner{ -webkit-box-flex:1;box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.goods-tejia-info{font-size: 0.6rem;color:#f24b42 ; line-height: 1rem;}
.goods-price span{margin-left: 1rem;}
.sales{position: absolute;right: 0;top:-0.2rem;width:1.8rem;height: 2.16rem;}
.shoppingCart-item-title{font-weight: 400;font-size: 0.7rem;    padding: 16px 16px 8px;color: #969799;font-size: 14px;line-height: 16px;}
.shoppingCart-message{padding: 0.85rem;}
.shoppingCart-message h3{font-size: 0.8rem;line-height: 2.6rem;font-weight: 400;}
.shoppingCart-textarea{border-bottom: solid 1px #ccc;}
.shoppingCart-bottom{position: fixed; bottom:0; left:0;right:0 ;background:#fff;box-shadow: 0 0 0.3rem #ddd; padding:0.3rem 0.85rem;}
/deep/ .van-button--normal{font-size: 0.8rem;}


.van-stepper__input {
  color: #009FAA;
}

/deep/ .van-stepper--round .van-stepper__plus,/deep/ .van-stepper--round .van-stepper__minus{
  color: #7ed321;
  background: #f5f5f5;
  border:solid 1px #7ed321;
  border-radius: 0;
}
</style>
