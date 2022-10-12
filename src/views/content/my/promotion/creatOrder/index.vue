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
			<div class="ui-header-title">{{title}}</div>
		</div>
		<div class="ui-mode-content"  ref="scroll">
			<div class="m1">
				<label class="gray bold">客户手机号</label>
				<div class="p1">
					<input type="text" v-model="detail.append_order_remark_001" placeholder="请填写客户手机号" @touchstart.stop />	
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">提成比例</label>
				<div class="p1">
					<input type="text" v-model="detail.append_order_remark_002" placeholder="输入正确手机号将自动生成" @touchstart.stop />	
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">小区名称</label>
				<div class="p1">
					<input type="text" v-model="detail.goods_info_remark_017" placeholder="请填写小区名称" @touchstart.stop />	
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">租金</label>
				<div class="p1 flex-row align-between-row">
					<input type="text" v-model="detail.goods_price" placeholder="请填写租金" @touchstart.stop />	
					<span>元</span>
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">收佣比例</label>
				<div class="p1 flex-row align-between-row">
					<input type="text" v-model="detail.append_order_remark_003" placeholder="请填写佣金比例" @touchstart.stop />	
					<span>%</span>
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">合同编号</label>
				<div class="p1">
					<input type="text" v-model="detail.append_order_remark_004" placeholder="请填写合同编号" @touchstart.stop />	
				</div>
			</div>
			<div class="m1">
				<label class="gray bold">上传合同和收据</label>
				<div class=" upload-img">
					<div class="ml" v-if="detail.append_order_remark_011">
						<!-- <img :src="item.pic_src" /> -->
						<img src="../../../../../assets/images/test/hetong.png" />
						<span @click.stop="upload()">重新上传</span>
					</div>
					<div v-else class="ml" @click.stop="upload()">
						<em class="iconfont icon iconguanbi6"></em>
					</div>
				</div>
			</div>
			<div class="tab-bottom">
				<span class="sure" @click.stop="submit()" >确定并提交</span>
			</div>
		</div>
	</div>
</template>

<script>
	import mixinCommon from '../../../mixins/common';
	import mixinRequest from '../../../mixins/request';
	import {
		getDateInfo,
		prefixNumber
	} from '@/utils/tool';



	export default {
		data() {
			return {
				detail:{
					append_order_remark_001:'',
					append_order_remark_002:'',
					append_order_remark_003:'',
					append_order_remark_004:'',
					append_order_remark_005:'',
					append_order_remark_011:'',
					append_order_remark_017:'',
					goods_price:'',
				},
				orderId:'',
				title:'创建订单',
				showDialog:false,
				indexItem:{}
			}
		},
		mixins: [
			mixinCommon,
			mixinRequest,
		],
		computed: {
		},
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
				if(this.$route.query.orderId){
				    this.orderId=this.$route.query.orderId
						this.title='编辑订单'
				};
				if(this.orderId){
					this.showLoading();
					this.$http.get({
						name: 'test.orderDetail',
						loading: {
							enabled: true
						}
					}).then(({
						result,
						response
					}) => {
						console.log(result)
						if(result.public_order_list&&result.public_order_list.length){
							var len = result.public_order_list.length
							for(let i=0;i<len;i++){
								if(result.public_order_list[i].id_public_goods_order_record==this.orderId){
									this.detail=result.public_order_list[i]
								}
							}
						}
						this.pageStatus = true
						this.showContent();
						console.log(this.list)
					})
				}else{
					this.pageStatus = true
					this.showContent();
				}
				
				
			},

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
			/*
			 * 上传图片
			 */
			upload(){
				
			},
			/*
			 * 提交
			 */
			submit(){
				this.handleHistory()
			}
			
			
			
		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.ui-mode-content{
		padding: 0.85rem;
		font-size: 0.7rem;
		line-height: 1.6rem;
		label{
			font-size: 0.7rem;
		}
		.p1{
			border-bottom: solid 1px #F0F0F0;
			input{
				border: none;
				font-size: 0.8rem;
			}
			input::-webkit-input-placeholder{
				color: #DCDEE2;
			}
		}
		.m1{
			margin-top: 0.3rem;
		}
	}
	.upload-img{
		margin-top: 0.3rem;
		.ml{
			width: 5.6rem;
			height: 4.2rem;
			border: dotted 1px #212121 ;
			position: relative;
			background-color: #F0F0F0;
			img{
				width:100%;
				height: 100%; 
				object-fit: contain;
			}
			em{
				position: absolute;
				top:50%;
				left: 50%;
				margin-top:-1rem;
				margin-left:-0.6rem;
				color: #878787 ;
				border-radius: 50%;
				font-size: 1.2rem;
				transform:rotate(45deg);
				display: inline-block;
				line-height: 2rem;
			}
			span{
				display: block;
				position: absolute;
				top:50%;
				left: 50%;
				margin-top:-0.64rem;
				margin-left:-1.6rem;
				height: 1.28rem;
				line-height: 1.28rem;
				width: 3.2rem;
				background-color: #000;
				color: #fff ;
				border-radius: 0.64rem;
				font-size: 0.6rem;
				text-align: center;
			}
		}
	}
	.tab-bottom{
		margin:1.28rem 0;
		span{
			display: block;
			width: 100%;
			height: 2.4rem;
			line-height: 2.4rem;
			border-radius: 1.2rem;
			font-size: 0.8rem;
			text-align: center;
		}
	}
	
</style>
