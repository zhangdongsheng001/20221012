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
			<div class="ui-header-title">我的房源</div>
		</div>
		<div class="ui-mode-content flex1 flex-col"  ref="scroll" v-if="pageStatus">
			<div class="my-house-header flex-row align-center-row align-between-row">
				<div class="my-house-header-select gray mar-right-15" :class="{red:showStateDialog}" @touchstart.stop
					@click="handleStateSelect(state)" v-if="userType==1||userType==2">
					<span class="flex1" >{{stateStr}}</span><i  class="iconfont icon iconln_sanjiaoxia" :class="{iconln_sanjiaoshang:showStateDialog}"></i>
				</div>
				<div class="my-house-header-select gray" :class="{red:showDialog}" @touchstart.stop
					@click="handleVillageSelect(village)" >
					<span class="flex1" >{{village}}</span><i  class="iconfont icon iconln_sanjiaoxia" :class="{iconln_sanjiaoshang:showDialog}"></i>
				</div>
				<div class="my-house-soso flex-row" v-if="userType==4">
						<em class="ui-header-search-icon"  @touchstart.stop @click="handleSearch"></em>
						<input type="text" v-model="sosoCont" placeholder="搜索" @keyup.enter="searchEnterFun">
				</div>
			</div>
			<div class="tab flex-row">
				<div class="flex1" ><span class="red">({{villageList.length}}) </span>间房展示中</div>
				<div><span class="red" @touchstart.stop @click="handleRefresh">一键刷新</span></div>
			</div>
			<div class="tab-cont flex1">
				<div v-if="villageList.length>0" class="tab-scroll">
					<div class="box" v-for="(item,i) in villageList">
						<div class="flex-row align-between-row t1"  >
							<div class="m2">
								<div class="g1"  @touchstart.stop @click="goDetail(item)">
									<img  v-lazy="item.goods_main_image"/>
									<span v-if="item.ship_state!=112">{{dictionary.state[item.ship_state]}}</span>
								</div>
								<span class="gray">更新 {{item.time_update}}</span>
							</div>
							<div class="flex1 flex-col align-between-col m3" >
								<div>
									<div class="g1"><i v-if="item.goods_type==1||item.goods_type==2||item.goods_type==3">{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}</div>
									<div class="flex-row">
										<div class="flex1">
											<div class="red" v-if="item.goods_type==1||item.goods_type==2||item.goods_type==3||item.goods_type==4">
												<span class=" bold font8" >{{item.goods_price}}</span>/{{item.sales_describe}}
											</div>
											<div v-else-if="item.goods_type==5">
												<span class="red bold font8" >{{item.all_price}}</span><span>{{item.goods_price}}{{item.sales_describe}}</span>
											</div>
											<div v-else-if="item.goods_type==6">
												<span class="red bold font8" >{{item.goods_price}}<i class="font6">万/月</i></span><span>{{item.day_price}}元/㎡/天</span>
											</div>
										</div>
										<div class="txt-r red" v-if="item.ship_state==8"  @click="handleFail(item)"> <i class="iconfont icon icongantanhao-yuankuang"></i><span>失败原因</span></div>
									</div>
								</div>
								<div class="g2">
									<span class="index" v-if="item.ship_state==113&&userType==4" @click="handleExamine(item)">审核</span>
									<span @click="handleDel(item)">删除</span>
									<span v-if="item.ship_state==112" @click="handleOff(item)">下架</span>
									<span v-if="item.ship_state==5" @click="handleOn(item)">上架</span>
									<span v-if="item.ship_state!=4" @click="goCreatHouse(item.goods_type,item)">编辑</span>
									<span v-if="item.ship_state==112" @click="handleRefresh(item)">刷新</span>
								</div>
							</div>
						</div>	
					</div>
				</div>
				<div v-else class="noList">
					<img  src="../../../../assets/images/icon_house.png"/>
					<span class="font7 gray">暂无内容</span>
				</div>
			</div>
			<div class="bottom-sumit-btn">
				<span class="sure" @click="handleSelectHouse">发布房源</span>
			</div>
		</div>
		<transition name="app_dialog">
			<div class="mt-master-container" @touchstart.prevent v-if="showDialog">
				<div class="mt-master-content mt-index-showDialog">
					<div class="mt-index-showDialog-body">
						<div class="flex1  relative">
							<div class="townCont">
								<ul>
									<li class="flex-row align-between-row align-center-row" :class="{red:village==item.value}"  v-for="(item,i) in villageSelect"  @touchstart.stop @click="selectVillage(item)" >
									{{item.label}}
									<span   :class="{select:village==item.value}"></span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-master-container" @touchstart.prevent v-if="showStateDialog">
				<div class="mt-master-content mt-index-showDialog">
					<div class="mt-index-showDialog-body">
						<div class="flex1  relative">
							<div class="townCont">
								<ul>
									<li class="flex-row align-between-row align-center-row" :class="{red:state==''}"    @touchstart.stop @click="selectState('','')" >
									全部状态
									<span   :class="{select:state==''}"></span>
									</li>
									<li class="flex-row align-between-row align-center-row" :class="{red:state==i}"  v-for="(item,i) in dictionary.goods_type_obj"  @touchstart.stop @click="selectState(item,i)" >
									{{item}}
									<span   :class="{select:state==i}"></span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<inner-selectType ref="HouseType"  :showHouseDialog.sync="showHouseDialog"  v-if="showHouseDialog"  @changeHouseType="changeHouseTypeF"></inner-selectType>
	</div>
</template>

<script>
	import mixinCommon from '../../mixins/common';
	import mixinRequest from '../../mixins/request';
	import {
		getDateInfo,
		prefixNumber
	} from '@/utils/tool';
	import innerSelectType from './src/selectType';



	export default {
		data() {
			return {
				village:'全部小区',
				list:[],
				pageStatus:false,
				showDialog:false,
				showStateDialog:false,
				stateStr:'全部状态',
				state:'',
				sosoCont:'',
				userType:'',
				villageSelect:[
					{
						"value": "全部小区",
						"label": "全部",
					}, {
						"value": "湖畔天下",
						"label": "湖畔天下"
					}, {
						"value": "建中小区",
						"label": "建中小区",
					}, {
						"value": "华谊逸品澜湾",
						"label": "华谊逸品澜湾",
					}, {
						"value": "海派青城",
						"label": "海派青城",
					}
				],
				showHouseDialog:false,
				
			}
				
		},
		mixins: [
			mixinCommon,
			mixinRequest,
		],
		computed: {
			/* stateSelect:function(){
				let listStr=[]
				var len =this.dictionary.state.length
				console.log(len)
				for(let i=0;i<len;i++){
					listStr[i].label=this.dictionary.state[i].split(':')[1]
					listStr[i].value=this.dictionary.state[i].split(':')[0]
				}
				console.log(listStr)
				return listStr
			}, */
			villageList:function(){
				var listStr=[]
				if(this.village=='全部小区'&&this.stateStr=='全部状态'){
					listStr=this.list
				}else if(this.list&&this.list.length){
					var len = this.list.length
					for(let i=0;i<len;i++){
						if(this.village!='全部小区'){
							if(this.list[i].goods_info_remark_017==this.village){
								listStr.push(this.list[i])
							}
						}else if(this.stateStr!='全部状态'){
							if(this.list[i].goods_type==this.state){
								listStr.push(this.list[i])
							}
						}
						
					}
				}
				return listStr
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
						this.userType=this.$route.query.userType
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
					result.public_order_list.map((item, index) => {
						item.goods_main_image = require('@/assets/images/test/' + item.goods_main_image)
					})
					this.villageList=result.public_order_list
					this.list=result.public_order_list
					this.pageStatus = true
					this.showContent();
				})
			},

			/*
			 * 一键刷新
			 */
			handleRefresh(item) {
				if(!item){
						this.init();
				}else{
					
				}
			
			},
			/*
			 * 删除
			 */
			handleDel(item) {
				this.$$confirm({
						content:'您确定要删除房源吗？',
						sure:(node,close)=>{
							console.log('确定删除')
								/*let loading=this.$$loading();
								 this.$http.post({
								}).then(({result,response})=>{
								}).catch(({msg})=>{
										loading.close();
										this.showMessage(msg);
								}); */
						}
				});
			},
			/*
			 * 下架
			 */
			handleOff(item) {
				this.$$confirm({
						content:'您确定要下架房源吗？',
						sure:(node,close)=>{
							console.log('确定下架')
								/*let loading=this.$$loading();
								 this.$http.post({
								}).then(({result,response})=>{
								}).catch(({msg})=>{
										loading.close();
										this.showMessage(msg);
								}); */
						}
				});
			},
			/*
			 * 上架
			 */
			handleOn(item) {
				this.$$confirm({
						content:'您确定要上架房源吗？',
						sure:(node,close)=>{
							console.log('确定上架')
								/*let loading=this.$$loading();
								 this.$http.post({
								}).then(({result,response})=>{
								}).catch(({msg})=>{
										loading.close();
										this.showMessage(msg);
								}); */
						}
				});
			},
			/*
			 * 审核
			 */
			handleExamine(item) {
				this.$router.push({
					path: '/home/detail',
					query: {
						id: item.id_public_goods_info,
						source:'1',
					}
				});
			},
			/*
			 * 查看失败原因
			 */
			handleFail(item) {
				this.$$confirm({
						title:'失败原因',
				    content:'发布都房源信息鉴定为虚假信息，请修正再重新发布。',
				    sureText:'知道了',
				});
			},
			
			
			/*
			 * 选择小区
			 */
			handleVillageSelect(){
				if(this.showDialog==true){
					this.showDialog=false
				}else{
					this.showDialog=true
					this.showStateDialog=false
				}
			},
			selectVillage(item){
				this.village=item.value
				this.showDialog=false
				this.state=''
				this.stateStr= '全部状态'
			},
			/*
			 * 选择状态
			 */
			handleStateSelect(){
				if(this.showStateDialog==true){
					this.showStateDialog=false
				}else{
					this.showStateDialog=true
					this.showDialog=false
				}
			},
			selectState(item,i){
				this.state=i
				if(i){
					this.stateStr= this.dictionary.goods_type_obj[i]
				}else{
					this.stateStr= '全部状态'
				}
				this.showStateDialog=false
				this.village='全部小区'
			},
			/*
			 * 监听搜索键
			 */
			searchEnterFun:function(e){
					// 使用 which 和 keyCode 属性来解决兼容问题
					var keyCode = window.event? e.keyCode:e.which;
					//var val = e.target.value;
					console.log('回车搜索',keyCode,e);
					if(keyCode == 13 && val){
						this.handleSearch()
					}
			},
			/*
			 * 去搜索
			 */
			handleSearch() {
				console.log(1)
				
			},
			/*
			 * 去发布房源
			 */
			handleSelectHouse() {
				console.log(this.showHouseDialog)
				this.showHouseDialog=true
				console.log(this.showHouseDialog)
			},
			goCreatHouse(type,item) {
				if(item){
					this.$router.push({
						path: '/my/house/creatHouse',
						query: {
							goodId: item.id_public_goods_info,
							userType:this.userType
						}
					});
				}else{
					this.$router.push({
						path: '/my/house/creatHouse',
						query: {
							userId: this.userId,
							type:type,
							userType:this.userType
						}
					});
				}
			},
			changeHouseTypeF(res){
				console.log(1)
				this.showHouseDialog=false
				this.goCreatHouse(res.NewHouseType)
			},
			
			/*
			 * 去详情
			 */
			goDetail(item) {
				this.$router.push({
					path: '/home/detail',
					query: {
						id: item.id_public_goods_info
					}
				});
			},
			
			
			
		},
		components: {innerSelectType},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.gray{
		color: #7A7B81;
	}
	.red{
		color:@base-active-color;
	}
	/* .ui-mode-container{
		background-color: #F8F9FA;
	} */
	.my-house-header{
		padding: 0 0.85rem;
		background-color: #fff;
		height: 2.5rem;
		line-height: 2.5rem;
		span{
			font-weight: bold;
			display: inline-block;
			width: 2.7rem;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			vertical-align: middle;
		}
		i{
			margin-left: 0.5rem;
			font-size: 0.5rem;
		}
	}
	.my-house-soso{
		width: 8rem;
		height: 1.7rem;
		line-height: 1.7rem;
		border-radius: 0.85rem;
		background-color: #F8F9FA;
		font-size: 0.7rem;
		vertical-align: middle;
		padding: 0 0.5rem;
		em{
			margin-right: 0.5rem;
			width: 0.8rem;
			height:1.7rem;
			vertical-align: middle;
			background-size: 100% auto !important;
		}
		input{
			border: none;
			background: transparent;
			width: 6rem;
			font-size: 0.7rem;
		}
	}
	.tab{
		height: 2rem;
		line-height: 2rem;
		padding: 0 0.85rem;
		background-color: #F9F9F9;
		font-size: 0.6rem;
		span{
			font-size: 0.7rem;
			font-weight: bold;
		}
	}
	.tab-cont{
		position: relative;
		.tab-scroll{
			position: absolute;
			top:0;
			bottom:0;
			left: 0;
			right: 0;
			overflow-y: auto;
		}
	}
	.t1{
		padding: 0.85rem;
		border-bottom: solid 1px #F0F0F0;
		.m2{
			width: 6.1rem;
			margin-right: 0.5rem;
			flex-shrink: 0;
			img{
				width: 100%;
				border-radius: 0.6rem;
			}
			.g1{
				position: relative;
				span{
					position: absolute;
					bottom: 0;
					right: 0;
					width: 2.4rem;
					height: 1rem;
					line-height: 1rem;
					background: #212121;
					opacity: 0.7;
					border-radius: 0.6rem 0px 0.6rem 0px;
					text-align: center;
					color: #fff;
					font-size: 0.6rem;
					
				}
			}
		}
		.m3{
			.g1{
				width: 11.5rem;
				line-height: 1;
				font-size: 0.7rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				i{
					margin-right: 0.3rem;
				}
			}
			.g2{
				text-align: right;
				span{
					margin-left: 0.64rem;
					display: inline-block;
					width: 2.4rem;
					height: 1.28rem;
					line-height: 1.28rem;
					border: solid 1px #212121;
					border-radius: 0.64rem;
					text-align: center;
				}
				span:nth-child(1){
					margin-left: 0;
				}
				.index{
					color:@base-active-color;
					border-color: @base-active-color;
				}
			}
		}
	}
	
	.mt-master-container{
		top:4.8rem;
	}
	.mt-index-showDialog{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 99;
		padding: 0.85rem 0;
	}
	.mt-index-showDialog-body{
		//min-height: 15rem;
		border-top:solid 1px #F0F0F0;
		padding: 0 0.85rem;
		li{
			line-height: 2.7rem;
			border-bottom: #F0F0F0;
		}
		.select{
				width:1rem ;
				height: 1rem;
				display: inline-block;
				width: 0.5rem;
				background:url(../../../../assets/images/select.png)  no-repeat center center;
				background-size: 100% auto;
		}
	}
	.txt-r{
		vertical-align: middle;
		i{
			vertical-align: middle;
		}
	}
	
	
</style>
