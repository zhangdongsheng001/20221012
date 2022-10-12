<template>
	<div class="content-box bgwhite mt-flex mt-flex-y">
		<!-- 头部 -->
		<div class="ui-header-item gradient">
			<div class="ui-header-arraw prev" @click="handleHistory" @touchstart.stop>
				<i class="iconfont icon iconjiantou-zuo-cuxiantiao"></i>
			</div>
			<div class="ui-header-title">{{title}}</div>
			<div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleHome">
				<i class="iconfont icon iconi-home"></i>
			</div>
		</div>
		<div v-if="getsuccess">
			<div v-if="paysuccess" class="mt-alipay-arrow">
				<div class="pay-success-wrapper">
					<p class="icon"><img :src="paySuccessImg" class="img"></p>
					<p class="text green">支付成功</p>
					<p class="price"><span class="unit">￥</span><span >{{price}}</span></p>
				</div>
				<a @click="toDetails()" class="pay-success-wrapper btn">查看订单</a>
				<div @click="handleHome" class="pay-success-wrapper btn red">回到首页</div>
			</div>
			<div v-else>
				<div class="pay-success-wrapper">
					<p class="icon"><img :src="payFailedImg" class="img"></p>
					<p class="text red">支付失败</p>
					<p class="text mid">订单支付失败，请重新支付</p>
				</div>
				<a @click="toDetails()" class="pay-success-wrapper btn red">重新支付</a>
			</div>
		</div>
	</div>
</template>
<script>
	import payFailedImg from '../../../../assets/images/pay_failed.png'
	import paySuccessImg from '../../../../assets/images/pay_success.png'
	import mixinCommon from '../../mixins/common';
	export default {
		data() {
			return {
				loading: false,
				alipayhtml: '',
				title: '',
				orderId: '',
				price: 0,
				paysuccess: true,
				getsuccess:false,
				payFailedImg,
				paySuccessImg
			}
		},
		created() {
			this.orderId = this.$route.query.id
		},
		mounted() {
			this.test()
		},
		mixins:[
		    mixinCommon
		],
		methods: {
			// 点击跳转详情页
			toDetails: function() {
				this.$router.push({
					path: '/book/detail',
					query: {
						id: this.orderId,
					}
				})
			},
			test: function() {
				this.$http.post({
					name: 'common.shopping',
					data: {
						invoke_method: 'details_4_order',
						id_public_goods_order_record: this.orderId,
						enum_key: 'express_address-_-express_money-_-max_single_goods_sell_count',
						type_4_api_command: 3,
					},
					loading:{
						enabled:false
					}
				}).then(({result,response}) => {
					this.getsuccess=true
					var info = result.public_goods_order_record;
					if (info.ship_state == 1) {
						this.price = Number(info.ship_money) + info.all_price_4_shop_retail;
						//this.$refs.price.innerHTML=this.price
						this.title= '支付成功'
					} else {
						this.paysuccess = false
						this.title = '支付失败'
					}
				})
			},
		},
		components: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.div,
	p,
	h3,
	span {
		margin: 0;
		padding: 0;
	}

	i {
		font-style: normal;
	}

	.home-head {
		display: flex;
		align-items: center;
		padding: 0 0.853rem;
		width: 100%;
		height: 2.933rem;
		box-sizing: border-box;
		background-color: #009FAB;
		color: #fff;
		font-size: 0.9rem;
		text-align: center;
	}

	.hide {
		display: none;
	}

	.mt-alipay-box {
		padding: 1rem .5rem;
	}

	.mt-alipay-submit {
		margin-top: 1rem;
		background: #009FAB;
		text-align: center;
		color: #fff;
		padding: .3rem;
	}

	.pay-success-wrapper {
		border-top: solid 1px #e1e1e1;
		border-bottom: solid 1px #e1e1e1;
		background: #fff;
		text-align: center;
	}

	.pay-success-wrapper .icon {
		padding-top: 1.92rem;
		padding-bottom: 0.83rem;
	}

	.pay-success-wrapper .text {
		line-height: 1;
		padding-bottom: 0.85rem;
		font-size: 0.96rem;
	}

	.pay-success-wrapper .text.mid {
		color: #000;
	}

	.pay-success-wrapper .price {
		line-height: 1;
		padding-bottom: 1.89rem;
		color: #000;
		font-size: 1.12rem;
	}

	.pay-success-wrapper .price .unit {
		font-size: 0.69rem;
	}

	.pay-success-wrapper .icon .img {
		width: 3.07rem;
		height: 3.07rem;
	}

	.pay-success-wrapper.btn {
		display: block;
		font-size: 0.96rem;
		color: #222;
		height: 2.67rem;
		line-height: 2.67rem;
		text-align: center;
	}


	.active {
		display: block;
	}

	.shoppingCart-cont {
		padding-top: 3rem;
		padding-bottom: 3rem;
		position: relative;
		height: 100%;
		overflow: scroll;
	}

	.shoppingCart-address {
		position: relative;
		display: block;
		padding: 0.85rem;
		color: #333;
		line-height: 1.6rem;
		font-size: 0.8rem;
	}

	.shoppingCart-address::after,
	.shoppingCart-more::after {
		content: '\F00A';
		position: absolute;
		top: 50%;
		right: 0.5rem;
		margin-top: -0.3rem;
		font: normal normal normal 14px/1 vant-icon;
	}

	.bgwhite {
		background-color: #fff !important;
	}

	.green {
		color: #3bce63;
	}

	.red {
		color: #f24b42;
	}

	.gray {
		color: #999;
	}

	.font6 {
		font-size: 0.6rem;
	}

	.align-left {
		text-align: left;
	}

	.align-center {
		text-align: center;
	}

	.align-right {
		text-align: right;
	}

	.shoppingCart-more {
		position: relative;
		padding-right: 1.5rem;
	}

	.shoppingCart-title {
		padding: 0.85rem 0 0.5rem 0.85rem;
		font-size: 0.8rem;
	}

	.shoppingCart-list {
		padding: 0 0.85rem;
	}

	.mt-list-item {
		display: flex;
		position: relative;
		margin-top: 1rem;
		min-height: 3rem;
	}

	.box {
		width: 4.5rem;
		flex-shrink: 0;
		position: relative;
	}

	.goods-img {
		width: 100%;
	}

	.list-box {
		flex: 1;
		margin-left: 0.5rem;
		position: relative;
	}

	.list-box h3 {
		font-size: 0.8rem;
		line-height: 1.5;
		margin: 0;
		font-weight: 400;
	}

	.goods-sales-describe {
		font-size: 0.6rem;
		color: #9b9b9b;
		line-height: 1rem;
	}

	.goods-price {
		position: absolute;
		bottom: 0.8rem;
		font-size: 0.8rem;
		line-height: 1.2rem;
		color: #f24b42;
	}

	.goods-price i {
		font-style: normal;
	}

	.change-num-box {
		position: absolute;
		bottom: 0.8rem;
		right: 0;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.change-num {
		width: 2.5rem;
		border-radius: 0.1rem;
		background: #f5f5f5;
		line-height: 1.2rem;
		text-align: center;
		color: #5ac84e;
		height: 1.2rem;
	}

	.change-num .van-cell {
		padding: 0 6px;
	}

	/deep/ .change-num .van-cell .van-field__control {
		background: #f5f5f5;
		color: #5ac84e;
		text-align: center;
	}

	.add-button {
		border-radius: 0.1rem;
		background: #f5f5f5;
		width: 1.4rem;
		line-height: 1.2rem;
		text-align: center;
		color: #5ac84e;
		height: 1.2rem;
		display: block;
	}

	.add-buttonactive {
		background: #ddd;
	}

	.mt-flex-shrink {
		-webkit-box-flex: 0;
		-moz-flex-shrink: 0;
		-webkit-flex-shrink: 0;
		flex-shrink: 0;
	}

	.mt-flex-inner {
		-webkit-box-flex: 1;
		box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}

	.goods-tejia-info {
		font-size: 0.6rem;
		color: #f24b42;
		line-height: 1rem;
	}

	.goods-price span {
		margin-left: 1rem;
	}

	.sales {
		position: absolute;
		right: 0;
		top: -0.2rem;
		width: 1.8rem;
		height: 2.16rem;
	}

	.shoppingCart-item-title {
		font-weight: 400;
		font-size: 0.7rem;
		padding: 16px 16px 8px;
		color: #969799;
		font-size: 14px;
		line-height: 16px;
	}

	.shoppingCart-message {
		padding: 0.85rem;
	}

	.shoppingCart-message h3 {
		font-size: 0.8rem;
		line-height: 2.6rem;
		font-weight: 400;
	}

	.shoppingCart-textarea {
		border-bottom: solid 1px #ccc;
	}

	.shoppingCart-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		box-shadow: 0 0 0.3rem #ddd;
		padding: 0.3rem 0.85rem;
	}

	/deep/ .van-button--normal {
		font-size: 0.8rem;
	}


	.van-stepper__input {
		color: #009FAA;
	}

	/deep/ .van-stepper--round .van-stepper__plus,
	/deep/ .van-stepper--round .van-stepper__minus {
		color: #7ed321;
		background: #f5f5f5;
		border: solid 1px #7ed321;
		border-radius: 0;
	}
</style>
