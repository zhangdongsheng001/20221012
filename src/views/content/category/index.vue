<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-container ui-mode-box flex-col">
        <div class="ui-header-item ">
            <div class="ui-header-arraw" >项目选择</div>
            <div class="ui-header-title">
				<a href="javascript:;" :class="{current:item.actived}" :key="i" v-for="(item,i) in dictionary.item_type"  @click="handleChangeMenu(item)" >
					dictionary.item_type[i]
				</a>
			</div>
            <div class="ui-header-arraw next flex-row align-center" @touchstart.stop @click="handleSearch">
				<span>确定</span>
            </div>
        </div>
        <div class="ui-mode-content flex1 flex-col" ref="scroll">
            <template v-if="pageStatus">
                <div class="mt-sub" ref="menu">
                    <ul>
                        <li :class="{current:item.actived}" :key="i" v-for="(item,i) in dictionary.item_user_type">
                            <a href="javascript:;" class="mt-menu-link" @click="handleChangeMenu(item)" :class="{'has-arrow':item.childTypeList&&item.childTypeList.length}">{{item.type_name|formatText}}</a>
                        </li>
                    </ul>
                </div>
                <inner-food ref="foods" :id_public_goods_type="$route.query.id_public_goods_type"></inner-food>
            </template>
        </div>
    </div>
</template>

<script>
import mixinCommon from '../mixins/common';
import mixinRequest from '../mixins/request';
import mixinShare from '../mixins/share';
import innerFood from './src/content';

export default {
    data(){
        return {
            public_goods_type:[]
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinShare
    ],
    computed:{
        getMenuList(){
            return this.public_goods_type.map(item=>{
                let flag=this.$route.query.id_public_goods_type==item.id_public_goods_type;
                if(item.childTypeList&&item.childTypeList.length){
                    item.childTypeList=item.childTypeList.map(child=>{
                        child.actived=this.$route.query.id_public_goods_type==child.id_public_goods_type;
                        if(child.actived){
                            flag=true;
                        };
                        return child;
                    });
                };
                item.actived=flag;
                return item;
            });
        }
    },
    watch:{
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        },
        // '$route.query.id_public_goods_type'(val){
        //     if(val&&this.getMenuList&&this.getMenuList.length){
        //         let name=null;
        //         for(let i=0,flag=true;i<this.getMenuList.length;i++){
        //             if(!flag){
        //                 break;
        //             };
        //             let item=this.getMenuList[i];
        //             if(item.id_public_goods_type==val){
        //                 name=item.type_name;
        //                 flag=false;
        //                 break;
        //             };
        //             if(item.childTypeList&&item.childTypeList.length){
        //                 for(let j=0;j<item.childTypeList.length;j++){
        //                     let child=item.childTypeList[j];
        //                     if(child.id_public_goods_type==val){
        //                         name=child.type_name;
        //                         flag=false;
        //                         break;
        //                     };
        //                 };
        //             };
        //         };
        //         this.initBridgeShare({
        //             title:`${this.$store.state.global.public_user_info.nick_name}邀请您体验[${name}]`,
        //             desc:`${this.$store.state.global.public_user_info.nick_name}邀请您体验[${name}]`,
        //             key:'id_public_goods_type',
        //             value:val
        //         });
        //     };
        // }
    },
    created(){

    },
    mounted(){
        //this.initBridgeShare();
    },
    methods:{
        /*
         * 跳转redirect
         */
        goRedirect(){
            this.$nextTick(()=>{
                if(this.$refs.foods&&this.$refs.foods.current_id!=''){
                    this.handleChangeMenu({
                        id_public_goods_type:this.$refs.foods.current_id
                    });
                };
            });
        },
        /*
         * 切换选中菜单
         */
        handleChangeMenu(item){
            if(!item.actived){
                this.$router.push({
                    path:'/front_page_index',
                    query:{
                        redirect:this.$route.query.redirect,
                        id_public_goods_type:item.id_public_goods_type
                    }
                });
            };
        },
        /*
         * 初始化
         */
        init(){
            this.showLoading();
            this.getShopInfo().then(({result,response})=>{
                this.getPageInfo({
                    name:'category.menu',
                    param:{
                        invoke_method:'class_page_4_weichat_loading',
        				id_public_goods_type:'',
        				length_4_list:1000
                    }
                }).then(({result,response})=>{
                    //console.log('category.menu',result)
                    if(result.public_goods_type&&result.public_goods_type.length){
                        this.public_goods_type=result.public_goods_type;
                        this.$nextTick(()=>{
                            this.handleAttachEvent(this.$refs.menu);
                            if(!this.$route.query.id_public_goods_type){
                                this.handleChangeMenu(this.getMenuList[0]);
                            }else{
                                //this.$refs.foods&&this.$refs.foods.refresh();
                            };
                        });
                    }else{
                        this.showResult('没有查询到相关数据');
                    };
                });
            }).catch(({msg})=>{
                this.showResult(msg,true);
            });
        },
        /*
         * 获取门店信息
         */
        getShopInfo(){
            return new Promise((resolve,reject)=>{
                this.$http.post({
                    name:'common.shop.info',
                    data:{
                        invoke_method:'user_and_shop_info'
                    },
                    loading:{
                        enabled:false
                    }
                }).then(({result,response})=>{
                    this.public_agent_info=result.public_agent_info||{};
                    this.public_user_info=result.public_user_info||{};
                    this.public_goods_order_record=result.public_goods_order_record||{};
                    //console.log('this.public_goods_order_record',this.public_goods_order_record)
                    this.setState({
                        key:'public_agent_info',
                        value:this.public_agent_info
                    });
                    this.setState({
                        key:'public_user_info',
                        value:this.public_user_info
                    });
                    resolve({result,response});
                }).catch(({msg})=>{
                    reject({msg});
                });
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.init();
        }
    },
    components:{
        innerFood
    },
    beforeDestroy(){
        this.handleDetachEvent(this.$refs.menu);
    }
}
</script>

<style lang="less" scoped>
.mt-sub{
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    width:5rem;
    overflow-x:hidden;
    border-right:solid 1px #ddd;
    overflow-y:auto;
    background: #f0f0f0;
    ul{
        li{
            &:last-child{
                border-bottom:none;
            }
            a{
                &.mt-menu-link{
                    color:#666;
                    position:relative;
                    display:block;
                    line-height:2.2rem;
                    font-size:0.8rem;
                    padding:0 0.6rem;
                    background: #f0f0f0;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    overflow:hidden;
                    &.has-arrow{
                        &:after{
                            content: '';
                            width: 0;
                            height: 0;
                            border:0.22rem solid transparent;
                            border-left: 0.22rem solid #525252;
                            position:absolute;
                            top:0.85rem;
                            right:0.2rem;
                            display:block;
                        }
                    }
                }
            }
            ul{
                position:relative;
                background:rgba(249,249,249,.5);
                border-top:solid 1px #f5f5f5;
                li{
                    border-bottom:solid 1px #f5f5f5;
                    background:rgba(249,249,249,.5);
                    a{
                        &.mt-sub-link{
                            display:block;
                            font-size:0.746rem;
                            color:#666;
                            line-height:2rem;
                            position:relative;
                            padding:0 0.3rem 0 0.9rem;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                            overflow:hidden;
                            &.current{
                                color:@base-color;
                                background: #fff;
                            }
                        }
                    }
                }
            }
            &.current{
                a{
                    &.mt-menu-link{
                        color:@base-color;
                        position:relative;
                        &.has-arrow{
                            &:after{
                                content:'';
                                width: 0;
                                height: 0;
                                border:0.22rem solid transparent;
                                border-top: 0.22rem solid #525252;
                                position:absolute;
                                top:0.95rem;
                                right:0.37rem;
                                display:block;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
