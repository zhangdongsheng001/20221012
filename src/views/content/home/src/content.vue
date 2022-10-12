<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
	<div class="mt-list-container mini">
			<div class="mt-index-cont" ref="scroll">
				<div class="flex-row align-between-row mt-index-tab">
					<span @click="showTc(1)">位置<i></i></span>
					<span v-if="getshowZ" @click="showTc(2)">租金<i></i></span>
					<span v-else @click="showTc(3)">售价<i></i></span>
					<span @click="showTc(4)">户型<i></i></span>
					<span @click="showTc(5)">筛选<i></i></span>
				</div>
				<div class="relative" v-if="list&&list.length">
					<template v-if="itemType_id==1">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3><i>{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6 m1"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red">{{item.goods_price}}</span>元/{{item.sales_describe}}
										<span v-if="userType!=3" class="green">佣金{{item.goods_info_remark_027}}</span>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="itemType_id==2">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3><i>{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red">{{item.goods_price}}</span>元/{{item.sales_describe}}
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="itemType_id==3">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3><i>{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red">{{item.goods_price}}</span>元/{{item.sales_describe}}
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="itemType_id==4">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3><i>{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red">{{item.goods_price}}</span>元/{{item.sales_describe}}
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="itemType_id==5">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red mar-right-5">{{item.all_price}}</span><span>{{item.goods_price}}元/{{item.sales_describe}}</span>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template v-else-if="itemType_id==6">
						<div>
							<div class="flex-row align-between-row mt-index-item" v-for="(item,i) in list" @click="goDetail(item)">
								<div class="mt-index-item-left"><img v-lazy="item.goods_main_image" /> </div>
								<div class="flex-col align-between-col mt-index-item-right">
									<div class="flex1">
										<h3><i>{{dictionary.goods_type_obj[item.goods_type]}}</i>{{item.goods_name}}{{item.goods_name_describe}}</h3>
										<div class="font7">
											<span>{{item.goods_info_remark_002}}</span><span>{{item.goods_info_remark_029}}</span>
										</div>
										<div class="font6"><span
												v-for="(index,k) in item.liang_dian">{{dictionary.fangYuanLiangDian[index]}}</span>
										</div>
									</div>
									<div class="mt-index-item-price">
										<span class="red mar-right-5">{{item.goods_price}}<i class="font6">万/月</i></span><span>{{item.day_price}}元/㎡/天</span>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<div v-if="isScrolling" class="flex1 flex-row align-center scrolling-content relative">
					<span class="icon">
						<bsx-loading master-background="rgba(0,0,0,0)" box-background="rgba(0,0,0,0)" :size="35"
							:show-text="false"></bsx-loading>
					</span>
					<span class="text">努力加载中...</span>
				</div>
				<div v-else-if="isLoadEnded" class="flex1 flex-row align-center scrolling-content relative">已经到底啦~~
				</div>
			</div>
			<transition name="app_dialog">
					<div class="mt-master-container" @touchstart.prevent v-if="showDialog">
							<div class="mt-master-content mt-index-showDialog flex-col">
									<div class="flex-row align-between-row mt-index-tab">
										<span :class="{current:tabType_id==1}" @touchstart.stop @click="fshowDialog(1)">位置<i></i></span>
										<span :class="{current:tabType_id==2}" v-if="getshowZ" @touchstart.stop @click="fshowDialog(2)">租金<i></i></span>
										<span :class="{current:tabType_id==3}" v-else @touchstart.stop @click="fshowDialog(3)">售价<i></i></span>
										<span :class="{current:tabType_id==4}" @touchstart.stop @click="fshowDialog(4)">户型<i></i></span>
										<span :class="{current:tabType_id==5}" @touchstart.stop @click="fshowDialog(5)">筛选<i></i></span>
									</div>
									<div class="flex1 mt-index-showDialog-body">
										<template v-if="tabType_id==1">
											<div class="mt-index-showDialog-weizhi flex-row">
												<div class="mt-index-showDialog-tab">
													<div :class="{current:tab==1}" @touchstart.stop @click="showDialogCont(1)">附近</div>
													<div :class="{current:tab==2}" @touchstart.stop @click="showDialogCont(2)">区域</div>
													<div :class="{current:tab==3}" @touchstart.stop @click="showDialogCont(3)">地铁</div>
												</div>
												<div class="mt-index-showDialog-cont flex1">
													<div class="hide" :class="{show:tab==1}">
															<ul>
																<li :class="{red:fuJin==i}"  v-for="(item,i) in dictionary.fuJin"  @touchstart.stop @click="selectNearby(item,i)" >{{item}}</li>
															</ul>
													</div>
													<div class="hide" :class="{show:tab==2}">
														<div class="flex-row">
															<div class="districtW relative">
																<div>
																	<ul>
																		<li :class="{red:district==0}" @touchstart.stop @click="selectDistrict('',0)" >不限</li>
																		<li :class="{red:district==item.value}"  v-for="(item,i) in DistrictList"  @touchstart.stop @click="selectDistrict(item,i)" >{{item.label}}</li>
																	</ul>
																</div>
															</div>
															<div class="flex1  relative">
																<div class="townCont">
																	<ul>
																		<li :class="{red:town.includes(0)}" @touchstart.stop @click="selectTown('',0)" >不限</li>
																		<li class="flex-row align-between-row align-center-row" :class="{red:town.includes(item.value)}"  v-for="(item,i) in townList"  @touchstart.stop @click="selectTown(item,i)" >
																		{{item.label}}
																		<span class="select"  :class="{current:town.includes(item.value)}"></span>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<div class="hide" :class="{show:tab==3}">
														<ul>
															<li :class="{red:diTie==i}"  v-for="(item,i) in dictionary.diTie"  @touchstart.stop @click="selectDitie(item,i)" >{{item}}</li>
														</ul>
													</div>
												</div>
											</div>
										</template>
										<template v-else-if="tabType_id==2">
											<div>
												<div class="showDialog-title">租金</div>
												<div class="flex-row align-center showDialog-shoujia">
													<input type="text" placeholder="最低（万）" :key ="1" v-model="zujin_begin" @touchstart.stop @input="inputChange" />
													<span>至</span>
													<input type="text" placeholder="最高（万）" :key ="2" v-model="zujin_end" @touchstart.stop  @input="inputChange"  />
												</div>
												<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
													<span :class="{current:zujin==item}"  v-for="(item,i) in zujinList" @touchstart.stop @click="selectZujin(item,i)">{{item}}</span>
												</div>
											</div>
										</template>
										<template v-else-if="tabType_id==3">
											<div>
												<div class="showDialog-title">售价</div>
												<div class="flex-row align-center showDialog-shoujia">
													<input type="text" placeholder="最低（万）" :key ="1" v-model="shoujia_begin"  @input="inputChange" />
													<span>至</span>
													<input type="text" placeholder="最高（万）" :key ="2" v-model="shoujia_end"  @input="inputChange"  />
												</div>
												<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
													<span :class="{current:shoujia==item}"  v-for="(item,i) in dictionary.shoujia" @touchstart.stop @click="selectShoujia(item,i)">{{item}}</span>
												</div>
											</div>
										</template>
										<template v-else-if="tabType_id==4">
											<div>
												<div class="showDialog-title" v-if="getshowZ">出租类型</div>
												<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row" v-if="getshowZ">
													<span :class="{current:chuzuType==i}"  v-for="(item,i) in dictionary.chuZuLeiXing" @touchstart.stop @click="selectchuZuLeiXing(item,i)">{{item}}</span>
												</div>
												<div class="showDialog-title">户型</div>
												<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
													<span :class="{current:huXing==i}"  v-for="(item,i) in dictionary.huXing" @touchstart.stop @click="selecthuXing(item,i)">{{item}}</span>
												</div>
											</div>
										</template>
										<template v-else-if="tabType_id==5">
											<div>
												<div class="showDialog-title">房源亮点<span class="tip">（可多选）</span></div>
													<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
														<span :class="{current:liangDianStr.includes(i)}"  v-for="(item,i) in dictionary.fangYuanLiangDian" @touchstart.stop @click="selectLiangDian(item,i)">{{item}}</span>
													</div>
												<div class="showDialog-title">装修</div>
													<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
														<span :class="{current:zhuangXiu==i}"  v-for="(item,i) in dictionary.zhuangXiu" @touchstart.stop @click="selectZhuangXiu(item,i)">{{item}}</span>
													</div>
												<div class="showDialog-title">面积</div>
													<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
														<span :class="{current:mianJi==i}"  v-for="(item,i) in dictionary.mianJi" @touchstart.stop @click="selectMianJi(item,i)">{{item}}</span>
													</div>
												<div class="showDialog-title">朝向</div>
													<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
														<span :class="{current:chaoXiang==i}"  v-for="(item,i) in dictionary.chaoXiang" @touchstart.stop @click="selectChaoXiang(item,i)">{{item}}</span>
													</div>
											</div>
										</template>
									</div>
									<div class="app_dialog-bottom flex-row"  >
										<div class="reset" @touchstart.stop @click="handleReset">重置</div>
										<div class="sure flex1" @touchstart.stop @click="handleSure">确定</div>
									</div>
							</div>
					</div>
			</transition>
	</div>
</template>

<script>
	import mixinCommon from '../../mixins/common';
	import mixinRequest from '../../mixins/request';
	import mixinList from '../../mixins/list';
	import Ocity from '@/assets/data/city';

	export default {
		data() {
			return {
				public_goods_order_detail_list: [],
				isLoaded: false,
				itemType_id:'',
				userType_id:'',
				city_id:'',
				resultList: [],
				list: [],
				tabType_id:1,
				showDialog:false,
				shoujia_begin:'',
				shoujia_end:'',
				shoujia:'不限',
				zujin_begin:'',
				zujin_end:'',
				zujin:'不限',
				zujinList:'',
				chuzuType:'',
				huXing:'',
				liangDian:'',
				liangDianStr:[],
				zhuangXiu:'',
				mianJi:'',
				chaoXiang:'',
				fuJin:'',
				diTie:'',
				tab:1,
				district:'',
				town:[],
				//townList:{},
				DistrictList:{} ,
				cityId:'',
				getshowZ:true
			};
		},
		props: {
			itemType:'',
			userType:'',
			cityId:''
		},
		mixins: [
			mixinCommon,
			mixinRequest,
			mixinList,
			Ocity,
		],
		computed: {
			selectData(){
				let selectObj={
					chuzuType:this.chuzuType,
					huXing:this.huXing,
					shoujia:this.shoujia,
					zujin:this.zujin,
					liangDian:this.liangDian,
					liangDianStr:this.liangDianStr,
					zhuangXiu:this.zhuangXiu,
					mianJi:this.mianJi,
					chaoXiang:this.chaoXiang,
					fuJin:this.fuJin,
					diTie:this.diTie,
					district:this.district,
					town:this.town,
				}
				return selectObj
			},
			getArea(){
				
			},
			DistrictList(){
				for(var i=0;i<Ocity.length;i++){
					console.log(this.city_id)
					if(this.city_id==Ocity[i].value){
						return Ocity[i].children
					}
				}
			},
			townList(){
					if(this.DistrictList){
						if(!this.district){
							let DistrictList=[]
							for(var i=0;i<this.DistrictList.length;i++){
								if(this.DistrictList[i].children&&this.DistrictList[i].children.length>0){
									for(let j=0;j<this.DistrictList[i].children.length;j++){
										DistrictList.push(this.DistrictList[i].children[j])
									}
								}
							}
							return DistrictList
						}else{
							for(var i=0;i<this.DistrictList.length;i++){
								if(this.district==this.DistrictList[i].value){
									return this.DistrictList[i].children
								}
							}
						}
					}
				},
				 /* zujinList(){
					if(this.itemType_id==2){
						console.log(222)
						return this.dictionary.zuJin
					}else if(this.itemType_id==6){
						console.log(333)
						return this.dictionary.shangpuzujin
					}else{
						return this.dictionary.zuJin
					}
				}, */
				/*
				getshowZ(){
					if(this.itemType_id==1||this.itemType_id==2||this.itemType_id==3||this.itemType_id==6){
						return true
					}else{
						return false
					}
				} */
			
		},
		watch: {
			itemType: {
				handler(val) {
					if (val && val != this.itemType_id) {
						this.itemType_id = val;
						 if(this.itemType_id==6){
							this.zujinList=this.dictionary.shangpuzujin
						}else{
							this.zujinList=this.dictionary.zuJin
						}
						if(this.itemType_id==1||this.itemType_id==2||this.itemType_id==3||this.itemType_id==6){
							this.getshowZ=true
						}else{
							this.getshowZ=false
						} 
						this.$nextTick(this.refresh);
					};
				},
				immediate: true,
			},
			userType:{
				handler(val) {
					if (val && val != this.itemType_id) {
						this.userType_id = val;
					};
				},
				immediate: true,
			},
			cityId:{
				handler(val) {
					console.log(Ocity)
					if (val && val != this.city_id) {
						this.city_id=val
						this.$nextTick(this.refresh);
						/* for(var i=0;i<Ocity.length;i++){
							if(this.city_id==Ocity[i].value){
								this.DistrictList= Ocity[i].children
							}
							console.log(this.DistrictList)
						} */
					}
					 for(var i=0;i<Ocity.length;i++){
						if(this.city_id==Ocity[i].value){
							console.log(Ocity[i].children)
							this.DistrictList= Ocity[i].children
						}
						console.log(this.DistrictList)
					} 
				}
			}
			/* id_item_type:{
				handler(val){
				    if(val&&val!=this.current_id_type){
				        this.current_id_type=val;
				        this.$nextTick(this.refresh);
				    };
				},
				immediate:true
			} */
		},
		created() {
		},
		mounted() {},
		methods: {
			/*
			 * 刷新
			 */
			refresh() {
				this.currentPage = 0;
				this.isScrolling = false;
				this.isLoadEnded = false;
				this.list = [];
				this.resultList = [];
				this.tabType_id=1,
				this.resetScroll();
				this.getListInfo({
					flag: true,
					page: 0
				});
				this.chuzuType='';
				this.huXing='';
				this.shoujia='';
				this.zujin='';
				this.liangDian='';
				this.liangDianStr=[];
				this.zhuangXiu='';
				this.mianJi='';
				this.chaoXiang='';
				this.fuJin='';
				this.diTie='';
				this.district='';
				this.town=[];
				this.tab=1
			},
			
			/*
			 * 获取列表数据
			 */
			getListInfo({
				flag,
				page,
				callback
			}) {
				/* if(!this.isLoaded){
				    this.showLoading();
				}; */
				this.$http.get({
					name: 'test.detail',
					loading: {
						enabled: true
					}
				}).then(({
					result,
					response
				}) => {
					if (result.public_goods_list && result.public_goods_list.length > 0) {
						this.resultList = [];
						result.public_goods_list.map((item, index) => {
							if (item.goods_type == this.itemType_id) {
								item.goods_main_image = require('../../../../assets/images/test/' + item.goods_main_image)
								item.liang_dian = item.liang_dian.split(',');
								this.resultList.push(item);
							}
						});
						this.list.push(...this.resultList.slice(0, this.pageSize));
						this.currentPage = page;
						if (this.resultList.length < this.pageSize) {
							this.isLoadEnded = true;
						} else if ((this.currentPage + 1) * this.pageSize >= parseInt(result.result_num)) {
							this.isLoadEnded = true;
						};
						this.showContent();
						callback && callback();
					} else {
						if (flag) {
							this.showResult('没有查询到相关数据');
						} else {
							this.$$toast({
								target: this.$el,
								content: '没有查询到相关数据',
								status: false
							});
						};
						callback && callback();
					};
				}).catch(({
					msg
				}) => {
					if (!flag) {
						this.showToast(msg, false);
					};
					callback && callback();
				});
				console.log(this.DistrictList)
				if(!this.DistrictList||!this.DistrictList.length){
					for(var i=0;i<Ocity.length;i++){
						if(this.cityId==Ocity[i].value){
							this.DistrictList= Ocity[i].children
						}
					}
				}
			},
			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.getListInfo({
					flag: true,
					page: 0
				});
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
			/*
			 * 弹窗
			 */
			showTc(num){
				this.showDialog=true;
				this.tabType_id=num
			},
			fshowDialog(num){
				console.log(2)
				this.tabType_id=num
			},
			
			/*
			 * 切换位置tab
			 */
			showDialogCont(i){
				this.tab=i
			},
			/*
			 * 获取附近
			 */
			selectNearby(item,i){
				console.log(item)
				console.log(i)
				this.fuJin=i
			},
			/*
			 * 获取地铁
			 */
			selectDitie(item,i){
				console.log(item)
				console.log(i)
				this.diTie=i
			},
			/*
			 * 获取区域
			 */
			selectDistrict(item,i){
				this.district=item?item.value:i
			},
			/*
			 * 获取镇
			 */
			selectTown(item,i){
				console.log(i)
				//this.town=item?item.value:i
				let index=item?item.value:i
				if(this.town.length>0){
					if (this.town.indexOf(index) == -1) {
						this.town.push(index)
					}else{
						this.town.splice(this.town.indexOf(index), 1)
					}
				}else{
					this.town.push(index)
				}
				console.log(this.town)
			},
			
			
			/*
			 * 获取售价
			 */
			selectShoujia(item,i){
				console.log(item)
				this.shoujia=item
				console.log(i)
			},
			/*
			 * 获取租金
			 */
			selectZujin(item,i){
				console.log(item)
				this.zujin=item
			},
			/*
			 * 获取出租类型
			 */
			selectchuZuLeiXing(item,i){
				console.log(item)
				console.log(i)
				this.chuzuType=i
			},
			/*
			 * 获取户型
			 */
			selecthuXing(item,i){
				console.log(item)
				console.log(i)
				this.huXing=i
			},
			/*
			 * 获取房源亮点
			 */
			selectLiangDian(item,i){
				console.log(item)
				console.log(i)
				//this.liangDian=i
				if(this.liangDianStr.length>0){
					if (this.liangDianStr.indexOf(i) == -1) {
						this.liangDianStr.push(i)
					}else{
						console.log(this.liangDianStr)
						this.liangDianStr.splice(this.liangDianStr.indexOf(i), 1)
					}
				}else{
					this.liangDianStr.push(i)
				}
			},
			/*
			 * 获取装修
			 */
			selectZhuangXiu(item,i){
				console.log(item)
				console.log(i)
				this.zhuangXiu=i
			},
			/*
			 * 获取面积
			 */
			selectMianJi(item,i){
				console.log(item)
				console.log(i)
				this.mianJi=i
			},
			/*
			 * 获取朝向
			 */
			selectChaoXiang(item,i){
				console.log(item)
				console.log(i)
				this.chaoXiang=i
			},
			
			/*
			 * 重新渲染
			 */
			inputChange(){
				this.$forceUpdate()
			},
			/*
			 * 重置
			 */
			handleReset(){
				if(this.tabType_id==1){
					this.fuJin='';
					this.diTie='';
					this.tab=1;
					this.district='';
					this.town=[];
				}else if(this.tabType_id==2){
					this.zujin="不限";
					this.zujin_begin='';
					this.zujin_end='';
					this.zujinStr="不限";
				}else if(this.tabType_id==3){
					this.shoujia="不限";
					this.shoujia_begin='';
					this.shoujia_end='';
					this.shoujiaStr="不限";
				}else if(this.tabType_id==4){
					this.huXing='';
				}else if(this.tabType_id==5){
					this.liangDian='';
					this.liangDianStr=[];
					this.zhuangXiu='';
					this.mianJi='';
					this.chaoXiang='';
				}
			},
			/*
			 * 确认
			 */
			handleSure(){
				if(this.tabType_id==1){
					
				}else if(this.tabType_id==2){
					if(this.zujin_begin&&this.zujin_end){
						this.zujin=this.zujin_begin+'-'+this.zujin_end
					}
				}else if(this.tabType_id==3){
					if(this.shoujia_begin&&this.shoujia_end){
						this.shoujia=this.shoujia_begin+'-'+this.shoujia_end
					}
				}else if(this.tabType_id==4){
					
				}else if(this.tabType_id==5){
				}
				console.log(this.selectData)
				this.showDialog=false;
			}
		},
		
		components: {},
		beforeDestroy() {
			
		
		}
	}
</script>

<style lang="less" scoped>
	.mt-index-cont {
		padding: 0.85rem;
	}
	.mt-index-tab {
		padding-top: 0.1rem;
		span {
			display: block;
			width: 3.5rem;
			text-align: center;
			line-height: 1.8rem;
			color: #7A7B81;
			background: #F8F9FA;
			border-radius: 0.9rem;
			i {
				margin-left: 0.5rem;
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../../../assets/images/base/icon_more.png) center center no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
		}
		.current {
			color: @base-active-color;
			i {
				background-image: url(../../../../assets/images/base/icon_more_selected.png);
			}
		}
	}

	.mt-index-item {
		margin-top: 1.2rem;

		.mt-index-item-left {
			width: 7.2rem;
			img {
				width: 100%;
				border-radius: 0.9rem;
			}
			img[lazy=loading]{
				width:20%;
				max-width:20px;
				animation:loading-rotate linear .7s infinite;
				position:absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
			}
		}

		.mt-index-item-right {
			width: 10rem;
			h3 {
				margin-bottom: 0.1rem;
				line-height: 1;
				font-size: 0.8rem;
				font-weight: normal;
				color: #222;

				i {
					font-size: 0.8rem;
					font-weight: bold;
					margin-right: 0.5rem;
					font-style: normal;
				}

				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			div {
				line-height: 1.4rem;
				span {
					margin-right: 0.9rem;
					color: #737584;
				}
				.font6 {
					margin-left: 0.2rem;
					line-height: 1.1rem;
					height: 1.1rem;
					overflow: hidden;
					span{
						margin-right: 0.3rem;
						display: inline-block;
						padding: 0 0.3rem;
						height: 1.1rem;
						background: #F8F9FA;
						border-radius: 0.55rem;
					}
					
				}
			}

			.mt-index-item-price {
				line-height: 1;
				color: @base-active-color;
				font-size: 0.6rem;
				.red {
					font-size: 0.8rem;
					font-weight: bold;
					color: @base-active-color;
					margin-right: 0;
				}
				.green{
					margin-left: 0.5rem;
					color: #4EC5C4;
				}
				span{
					color: #212121;
				}
			}
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
		 .mt-index-tab{
			 padding: 0 0.85rem;
		 }
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
		.showDialog-title{
			font-size: 0.8rem;
			font-weight: bold;
			line-height: 3rem;
			.tip{
				color: @base-active-color;
				font-size: 0.6rem;
				font-weight: normal;
			}
		}
		.showDialog-shoujia{
			font-size: 0.8rem;
			margin-bottom:0.85rem;
			line-height: 2rem;
			input{
				border:none;
				border-bottom:solid 1px #F0F0F0;
				width: 6rem;
				font-size: 0.8rem;
				text-align: center;
				line-height: 2rem;
			}
			span{
				margin: 0 0.3rem;
				color: #212121;
			}
		}
		.showDialog-shoujia-select{
			text-align: center;
			//margin-top:0.85rem;
			span{
				margin: 0.2rem 0;
				display: inline-block;
				width: 4.2rem;
				height: 1.8rem;
				line-height: 1.8rem;
				background-color: #F9F9F9;
			}
			.current{
				background-color: #FFF1F3;
				color: @base-active-color;
			}
		}
		
		.mt-index-showDialog-tab{
			width: 4.5rem;
			border-right: solid 1px #F0F0F0;
			div{
				padding-left: 0.85rem;
				
				border-bottom: solid 1px #F0F0F0;
				height: 3rem;
				line-height: 3rem;
				font-size: 0.7rem;
				font-weight: bold;
			}
			.current{
				color: @base-active-color;
			}
			
		}
		.mt-index-showDialog-cont{
			height: 15rem;
			overflow-y: scroll;
			.show{
				display: block;
			}
			li{
				margin-left: 0.85rem;
				border-bottom: solid 1px #F0F0F0;
				height: 3rem;
				line-height: 3rem;
			}
			.red{
				color: @base-active-color;
			}
			.districtW{
				width: 6rem;
				div{
					border-right: solid 1px #F0F0F0;
					position: absolute;
					top:0;
					left: 0;
					right: 0;
					height: 15rem;
					overflow-y: scroll;
				}
			}
			.townCont{
				position: absolute;
				top:0;
				left: 0;
				right: 0;
				height: 15rem;
				overflow-y: scroll;
				.select{
					width:1rem ;
					height: 1rem;
					border:solid 1px #000;
					border-radius: 50%;
				}
				.current{
					background:url(../../../../assets/images/base/icon_selected.png)  no-repeat;
					background-size: 100% 100%;
					border:none;
				}
			}
		}
		
	}
	
	.app_dialog-bottom{
		padding: 0.85rem 0.85rem 0 0.85rem;
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
</style>
