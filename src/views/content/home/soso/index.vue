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
            <div class="ui-header-title">搜索</div>
        </div>
        <div class="ui-mode-content flex1 flex-col" ref="scroll">
					<div class=" ui-header-item  header-item flex-row ">
						<div class="ui-header-soso flex-row flex1 align-center-row" >
								<em class="ui-header-search-icon"  @touchstart.stop @click="handleSearch"></em>
								<input type="text" v-model="key" placeholder="搜索" @keyup.enter="searchEnterFun">
								<img src="../../../../assets/images/icon_delete.png" v-if="key" @click="cancelSearch" />
						</div>
						<div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="cancelSearch">
							取消
						</div>
					</div>
          <template v-if="hasCont">
						<div class="flex1 flex-col sosoCont">
							<div v-if="getSosoCont">
								<div class="sosoItem" @click="handleChangeItem(item)" v-for="(item,i) in contList">
									<div>
										<p class="font7 bold"><span class="red">{{item.goods_name}}</span>{{item.goods_name_describe}}</p>
										<p class="gray">{{item.goods_info_remark_029}}</p>
									</div>
								</div>
							</div>
							<div v-else class="nososoCont">
								<p class="font7">搜不到“{{key}}”</p>
								<p class="gray">请尝试搜索小区其他名称</p>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="flex1 nocont flex-col align-center-row">
							<img class="icon-house" src="../../../../assets/images/icon_house.png" />
							<span class="gray font7">暂无内容</span>
						</div>
						
					</template>
				</div>
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';

export default {
    data(){
        return {
            contList:[],
						key:'',
						hasCont:'',
						getSosoCont:true,
						key:''
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
    ],
    created(){
			
    },
		computed: {
			getSosoCont(){
				if(this.contList&&this.contList.length>0){
					return true
				}else{
					return false
				}
			}
		},
    mounted(){
			this.init()
    },
    methods:{
        /*
         * 初始化
         */
        init(){
					if(this.$route.query.key){
						this.key=this.$route.query.key
						this.handleSearch()
					}
						//this.handleLoad();
			
           
        },
				/*
				 * APP和H5使用特殊账号模拟登录 H5即非APP&非微信&非小程序,默认即H5
				 */
				handleMockLogin(){
						return new Promise((resolve,reject)=>{
								if(!this.isLogin){
										this.$http.post({
												name:'login',
												data:{
														invoke_method:'login_by_password',
														type_4_api_command:1,
														user_phone:'x-teamer',
														password_user:'tian123'
												},
												loading:{
														enabled:false
												}
										}).then(({result,response})=>{
												resolve({result,response});
										}).catch(({msg})=>{
												reject({msg});
										});
								}else{
										resolve();
								};
						});
				},
        /*
         * 初始化加载数据
         */
        handleSearch(){
            /* this.showLoading(); */
					this.$http.get({
							name:'test.detail',
							loading:{
									enabled:true
							}
					}).then(({result,response})=>{
						this.hasCont=true
						this.contList=[];
						this.getSosoCont=false
						if(result.public_goods_list&&result.public_goods_list.length){
							var len = result.public_goods_list.length
							for(let i=0;i<len;i++){
								if(result.public_goods_list[i].goods_name.indexOf(this.key)!=-1){
									this.getSosoCont=true
									this.contList.push(result.public_goods_list[i])
								}
							}
						}
						console.log(this.contList)
						this.showContent();
				})
        },
				/*
				 * 监听搜索键
				 */
				searchEnterFun:function(e){
						var keyCode = window.event? e.keyCode:e.which;
						console.log('回车搜索',keyCode,e);
						if(keyCode == 13 && this.key){
							//this.contList=[];
							this.handleSearch()
						}
				},
				/*
				 * 取消搜索
				 */
				cancelSearch:function(e){
						this.key=''
						console.log(this.key)
				},
				
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.handleLoad();
        },
    },
    components:{
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
	.ui-header-item{
		border: solid 1px #F0F0F0;
	}
	.ui-header-soso{
		width: 16rem;
		background: #fff;
		vertical-align: middle;
		em{
			margin-right: 0.5rem;
			width: 0.8rem;
			height: 2rem;
			vertical-align: middle;
			background-size: 100% auto !important;
		}
		input{
			border: none;
			background: transparent;
			width: 14rem;
			font-size: 0.7rem;
		}
		img{
			width: 0.7rem;
			height: 0.7rem;
		}
	}
	.ui-header-arraw{
		font-size: 0.7rem;
		color: #212121;
		}
	.gray{
		font-size: 0.6rem;
		color: #C0C3C9;
	}
	.sosoItem{
		padding:  0.85rem 0.85rem 0.85rem 2rem;
		border-bottom: solid 1px #F0F0F0;
		line-height: 1.4rem;
		background: url(../../../../assets/images/soso_location.png) 0.85rem 1.1rem no-repeat;
		background-size: 0.7rem auto;
	}
	.nocont{
		margin-top:6.4rem;
		text-align: center;
		line-height: 1;
	}
	.icon-house{
		width: 6rem;
	}
	.nososoCont{
		padding: 0.85rem;
		line-height: 1.4rem;
	}
	.sosoCont{
		overflow-y: scroll;
	}
</style>
