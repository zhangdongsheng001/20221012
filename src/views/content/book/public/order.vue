<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-box flex-col">
        <div class="mt-tab-title">当前总共产生的有效订单总数为<i>{{totalNum|formatText}}</i>单</div>
        <div class="mt-tab-inner relative flex1">
            <div class="ui-mode-box body" ref="scroll">
                <div class="relative" v-if="list&&list.length">
                    <div class="item flex-row align-stretch href"
                        @click="goDetail(item)"
                        :key="`order-${i}`"
                        v-for="(item,i) in list">
                        <div class="box flex1">
                            <p class="flex-row align-between-row">
                                <span>订单编号：<b>{{item.id_public_goods_order_record|formatText}}</b></span>
                                <span :class="[getColor[item.ship_state]]">{{dictionary.state[item.ship_state]||'-'}}</span>
                            </p>
                            <p class="flex-row align-between-row gray">
                                <span>{{item.time_order|formatText}}</span>
                                <span class="black">合计：<i class="m1">&yen;</i>{{item.all_price_4_shop_retail|formatText}}</span>
                            </p>
                        </div>
                        <span class="flex-row align-end-row align-center">
                            <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
                        </span>
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
    </div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import mixinList from '../../mixins/list';

export default {
    data(){
        return {

        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinList
    ],
    props:{
        totalNum:''
    },
    computed:{
        getColor(){
            return {
                0:'orange',
                1:'orange',
                2:'red',
                3:'orange',
                4:'green',
                5:'orange',
                6:'gray',
                7:'orange'
            };
        }
    },
    watch:{
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        /*
         * 初始化
         */
        init(){
            this.getListInfo({
                flag:true,
                page:0
            });
        },
        /*
         * 获取列表数据
         */
        getListInfo({flag,page,callback}){
            this.getPageInfo({
                flag,
                tip:false,
                name:'book.order',
                param:{
                    invoke_method:'order_list_4_one_user',
                    begin_idx:page*this.pageSize,
                    type_order:1,
                    length_4_list:this.pageSize
                }
            }).then(({result,response})=>{
                //console.log('order',result)
                if(result.public_order_list&&result.public_order_list.length){
                    this.list.push(...result.public_order_list.slice(0,this.pageSize));
                    this.currentPage=page;
                    if(result.public_order_list.length<this.pageSize){
                        this.isLoadEnded=true;
                    }else if((this.currentPage+1)*this.pageSize>=result.result_num){
                        this.isLoadEnded=true;
                    };
                    callback&&callback();
                }else{
                    if(flag){
                        this.showResult('没有查询到相关数据');
                    }else{
                        this.showToast('没有查询到相关数据',false);
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
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.init();
        },
        /*
         * 去详情
         */
        goDetail(item){
            this.$router.push({
                path:'/book/detail',
                query:{
                    id:item.id_public_goods_order_record
                }
            });
        }
    },
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>

</style>
