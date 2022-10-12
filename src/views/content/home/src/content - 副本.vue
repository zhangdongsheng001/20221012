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
				<div class=" mt-flex mt-flex-wrap  mt-flex-between">
					<div class="mt-list-item flex-col"
						:key="`food-${item.id_public_goods_info}-${i}`"
						v-for="(item,i) in list"  @click.stop="goDetail(item)">
						<div class="box">
							<img class="app-image auto"  :src="item.goods_main_image"/>
						</div>
						<div class="flex1 main">
							<div class="flex-row align-center-row mar-b-4">
								<h3 class="goods-title">{{item.goods_name|formatText}}</h3>
								<span class="goods-type">{{dictionary.item_user_type_obj[item.goods_info_remark_001]}}</span>
							</div>
							<p class="gray flex-row align-center-row">
								<span class="mar-right-7">擅长项目</span>
								<span>{{dictionary.item_type_obj[item.id_public_goods_type]}}</span>
							</p>
							<div class="gray">
								<p>空闲时间段</p>
								<div class="free-time">
									<template v-for="(itemtime,j) in item.table_free_time">
										<p v-if="j<2">
											<span class="mr">周{{itemtime.day}}</span>
											<span>{{itemtime.beginTime}} 至 {{itemtime.endTime}}</span>
										</p>
									</template>
								</div>
							</div>
							<div class="flex-row align-center-row mt-flex-between mar-top-5">
								<p>
									<img src="../../../../assets/images/svgIcon/icons8-hotel.svg"  class="svgIcon" />
									<span class="gray font6 ">{{item.score}}</span>
								</p>
								<a href="javascript:;" class="button">查看</a>
							</div>
						</div>
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
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
//import mixinCart from '../../mixins/cart';
import mixinList from '../../mixins/list';
import photo1 from '../../../../assets/images/test/photo_1.png';
import photo2 from '../../../../assets/images/test/photo_2.png';
import photo3 from '../../../../assets/images/test/photo_3.png';
import photo4 from '../../../../assets/images/test/photo_4.png';

export default {
    data(){
        return {
            public_goods_order_detail_list:[],
            currentGoodImage:null,
            current_id:'',
			current_id_type:'',
            isLoaded:false,
			public_goods__list:[],
			photoArr:[],
			resultList:[],
			list:[],
        };
    },
    props:{
        id_public_goods_type:'',
		id_item_type:''
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        //mixinCart,
        mixinList,
    ],
    computed:{
		
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
        },
		id_item_type:{
			handler(val){
			    if(val&&val!=this.current_id_type){
			        this.current_id_type=val;
			        this.$nextTick(this.refresh);
			    };
			},
			immediate:true
		}
    },
    created(){
    },
    mounted(){
		this.photoArr=[photo1,photo2,photo3,photo4]
    },
    methods:{
        /*
         * 刷新
         */
        refresh(){
            this.currentPage=0;
            this.isScrolling=false;
            this.isLoadEnded=false;
            this.list=[];
			this.resultList=[];
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
		    /* if(!this.isLoaded){
		        this.showLoading();
		    }; */
			this.$http.get({
			    name:'test.itemUser',
			    loading:{
			        enabled:true
			    }
			}).then(({result,response})=>{
				console.log(result.public_goods_list)
				if(result.public_goods_list&&result.public_goods_list.length){
					this.resultList=[];
					this.query_id_public_goods_type=this.$route.query.id_public_goods_type?this.$route.query.id_public_goods_type:0
					this.query_id_item_type=this.$route.query.id_item_type?this.$route.query.id_item_type:0
					console.log(this.query_id_public_goods_type)
					console.log(this.query_id_item_type)
						result.public_goods_list.map((item,index)=>{
							if(index>=4){
								index=index%4
							}
							if(item.id_public_goods_type==this.query_id_public_goods_type&&item.goods_info_remark_001==this.query_id_item_type){
								item.goods_main_image=this.photoArr[index];
								this.resultList.push(item)
							}
							//return this.resultList;
						});
				        this.list.push(...this.resultList.slice(0,this.pageSize));
				        this.currentPage=page;
				        if(this.resultList.length<this.pageSize){
				            this.isLoadEnded=true;
				        }else if((this.currentPage+1)*this.pageSize>=parseInt(result.result_num)){
				            this.isLoadEnded=true;
				        };
						this.showContent();
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
		},
		
        /* getListInfo({flag,page,callback}){
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
        }, */
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
                path:'/home/detail',
                query:{
                    id:item.id_public_goods_info
                }
            });
        },
    },
    components:{
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
    &.mini{
        left:4.5rem;
    }
    .body{
        overflow-x:hidden;
        overflow-y:auto;
        padding:0 0 0 0.5rem;
		line-height: 1.1rem;
    }
    .mt-list-item{
         position:relative;
		 background: #fff;
         padding:0.4rem;
		 margin-top:0.5rem;
		 margin-right:0.5rem;
         border:solid 1px #eee;
         width: 7rem;
		 border-radius: 0.4rem;
        .box{
             width:6.1rem;
             height:6.1rem;
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
			 .app-image{
				 width: 100%;
				 border-radius: 0.2rem;
			 }
        }
        .main{
			margin-top:0.4rem;
			.mar-b-4{
				line-height: 1;
				margin-bottom: 0.2rem;
			}
            .goods-title{
                font-size:0.8rem;
                font-weight:normal;
                line-height:1rem;
				width: 4.3rem;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
			.goods-type{
				display: block;
				width: 3rem;
				height:1rem;
				line-height: 1rem;
				border-radius: 0.5rem;
				text-align: center;
				font-size: 0.57rem;
				font-weight: 400;
				color: #fff;
				background-image: linear-gradient(to right,#4887D8, #1F5BA9);
			}
			.mar-right-7{margin-right: 0.7rem;}
			.free-time{
				background-color: #F7F7F7;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				line-height: 1rem;
				min-height: 2rem;
				font-size: 0.6rem;
				.mr{margin-right: 0.4rem;}
			}
			.svgIcon{
				width: 0.85rem;
				margin-right:0.2rem;
			}
			.font6{vertical-align: middle;}
            .button{
                display: inline-block;
                color: @base-color;  
                border: solid 1px @base-color; 
                width: 2.5rem;
                height: 1.4rem;
                line-height: 1.4rem;
                border-radius: 0.7rem;
				text-align: center;
            }
        }
    }
}
</style>
