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
		<div class="ui-mode-content flex1 flex-col"  ref="scroll">
			<div class="tab flex-row">
				<div class="flex1" @click="handleChangeTab('all')" @touchstart.stop>
					<span :class="{current:index=='all'}">全部</span>
				</div>
				<div class="flex1" @click="handleChangeTab(114)" @touchstart.stop>
					<span :class="{current:index==114}">已通过</span>
				</div>
				<div class="flex1" @click="handleChangeTab(113)" @touchstart.stop>
					<span :class="{current:index==113}">审核中</span>
				</div>
				<div class="flex1" @click="handleChangeTab(8)" @touchstart.stop>
					<span :class="{current:index==8}">失败</span>
				</div>
			</div>
			<div class="tab-cont flex1 relative" >
				<div v-if="list.length>0" class="tab-list">
					<div class="box" v-for="(item,i) in list">
						<div class="flex-row align-between-row t1"  >
							<div>
								<div class="red" @click="showHT(item)">查看合同</div>
								<div>订单编号 <span>{{item.id_public_goods_order_record}}</span></div>
							</div>
							<div class="gray txt-r">
								<div>{{dictionary.state[item.ship_state]}}</div>
								<div>创建时间<span>{{item.time_order}}</span></div>
							</div>
						</div>	
						<div class="flex-row align-between-row t2"  >
							<div class="flex1 bold">{{item.goods_name}}{{item.goods_info_remark_005}}</div>
							<div>
								<div class="gray">提成 </div>
								<div class="red bold">{{item.append_order_remark_007}}元</div>
							</div>
						</div>	
						<div class="flex-row align-between-row flex-wrap t3"  >
							<div><span>租金:</span>{{item.append_order_remark_005}}元</div>
							<div><span>收佣比例:</span>{{item.append_order_remark_003}}%</div>
							<div><span>佣金:</span>{{item.append_order_remark_006}}元</div>
							<div><span>提成比例:</span>{{item.append_order_remark_002}}</div>
							<div><span>昵称:</span>{{item.append_order_remark_008}}</div>
							<div><span>等级:</span>{{item.append_order_remark_009==1?'黄金':'钻石'}}</div>
						</div>
						<div v-if="item.ship_state==114" class="t4" @touchstart.stop @click="handleShowDialog(item)">
							<span>打款明细</span>
						</div>
						<div v-else-if="$route.query.title" class="t4" @click="goCreatOrder(item)">
							<span>编辑</span>
						</div>
					</div>
				</div>
				<div v-else class="noList">
					<img  src="../../../../../assets/images/null.png"/>
					<span class="font7 gray">暂无订单～</span>
				</div>
			</div>
			<div v-if="$route.query.title" class="tab-bottom"  @click="goCreatOrder()">
				<span class="sure">创建订单</span>
			</div>
			<transition name="app_dialog">
					<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialog">
						<div class="mt-master-content mt-back-showDialog" >
							<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
								<img src="../../../../../assets/images/icon_delete.png" />
							</div>
							<div>
								<p class="font9 mt-back-showDialog-title bold">打款明细</p>
								<div class="mt-back-showDialog-body pad-bottom-10">
									<p>打款时间：{{indexItem.append_order_remark_010}}</p>
									<p>支付方式：微信支付</p>
									<p>打款金额：{{indexItem.goods_price}}元</p>
								</div>
							</div>
						</div>
					</div>
			</transition>
			<transition name="app_dialog">
					<div class="mt-master-container flex-col align-center" @touchstart.prevent v-if="showDialogHT">
						<div class="mt-master-content mt-back-showDialog" >
							<div class="mt-bottom-back-close showHTClose"  @touchstart.stop @click="handleBackClose()">
								<img src="../../../../../assets/images/icon_delete.png" />
							</div>
							<div class="showHTBox">
								<img src="../../../../../assets/images/hetong.png" />
							</div>
						</div>
					</div>
			</transition>
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
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				index:'all',
				title:'推广订单',
				showDialog:false,
				indexItem:{},
				indexItemHT:'',
				showDialogHT:false
			}
		},
		mixins: [
			mixinCommon,
			mixinRequest,
		],
		computed: {
			list:function(){
				if(this.index=='all'){
					return this.list1
				}else if(this.index=='114'){
					return this.list2
				}else if(this.index=='113'){
					return this.list3
				}else if(this.index=='8'){
					return this.list4
				}
			}
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
				if(this.$route.query.userId){
				    this.userId=this.$route.query.userId
				};
				if(this.$route.query.title){
				    this.title=this.$route.query.title
				};
				
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
					this.list1=result.public_order_list
					this.list=result.public_order_list
					if(result.public_order_list&&result.public_order_list.length){
						var len = result.public_order_list.length
						for(let i=0;i<len;i++){
							if(result.public_order_list[i].ship_state==114){
								this.list2.push(result.public_order_list[i])
							}else if(result.public_order_list[i].ship_state==113){
								this.list3.push(result.public_order_list[i])
							}else  if(result.public_order_list[i].ship_state==8){
								this.list4.push(result.public_order_list[i])
							}
						}
					}
					this.pageStatus = true
					this.showContent();
					console.log(this.list)
				})
			},
			

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
			/*
			 * 修改内容
			 */
			handleChangeTab(i){
				this.index=i
			},
			/*
			 * 打款明细
			 */
			handleShowDialog(item){
				this.showDialog=true
				this.indexItem=item
			},
			/*
			 * 查看合同
			 */
			showHT(item){
				this.showDialogHT=true
				this.indexItemHT=item.append_order_remark_011
			},
			/*
			 * 点击关闭反馈弹窗
			 */
			handleBackClose(){
				this.showDialog=false
				this.showDialogHT=false
				this.indexItem={}
				this.indexItemHT=''
			},
			/*
			 * 去创建订单
			 */
			goCreatOrder(item){
				this.$router.push({
					path: '/my/promotion/creatOrder',
					query: {
						orderId:item?item.id_public_goods_order_record:''
					}
				});
			}
			
			
		},
		components: {},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.ui-mode-container{
		background-color: #F8F9FA;
	}
	.tab{
		height: 2.4rem;
		line-height: 2.4rem;
		border-bottom: solid 1px #EEEEEE;
		background-color: #fff;
		text-align: center;
		font-size: 0.7rem;
		span{
			display: inline-block;
			height: 2.4rem;
			line-height: 2.4rem;
			border-bottom: solid 0.1rem transparent;
			color: #7A7B81;
		}
		.current{
			border-bottom: solid 0.1rem @base-active-color;
			color: @base-active-color;
			font-weight: bold;
		}
	}
	.box{
		background-color: #fff;
		padding: 0 0.85rem 0.85rem;
		margin-top:0.5rem;
		line-height: 1.4rem;
		.t1{
			padding: 0.5rem 0;
			border-bottom: solid 1px #F0F0F0;
		}
		.t2{
			padding: 0.5rem 0;
		}
		.t3{
			padding: 0.5rem 0;
			background: #F9F9F9;
			border-radius: 0.4rem;
			div{
				width: 50%;
				padding-left: 10%;
				span{
					margin-right: 1rem;
				}
			}
			div:nth-child(even){
			 span{
				display: inline-block;
					width: 2.8rem;
				}
			}
		}
	}
	.t4{
		margin-top:0.85rem;
		text-align: right;
		span{
			display: inline-block;
			padding:  0 0.85rem;
			height: 1.5rem;
			line-height: 1.5rem;
			border-radius:0.7rem ;
			border: solid 1px #212121;
		}
	}
	.mt-back-showDialog-body{
		line-height: 1.6rem;
	}
	.showHTBox{
		img{
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
	}
	.showHTClose{
			right: -0.65rem !important;
			top:-0.65rem !important;
	}
	.tab-bottom{
		margin: 0.85rem;
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
	.tab-list{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
	}
	
</style>
