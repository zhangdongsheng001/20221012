<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-box flex-col">
        <div class="mt-tab-title">可用余额<i>{{totalNum|formatText}}</i>元</div>
        <div class="mt-tab-inner relative flex1">
            <div class="ui-mode-box body" ref="scroll">
                <div class="relative" v-if="list&&list.length">
                    <div class="item flex-row align-stretch"
                        :key="`balance-${i}`"
                        v-for="(item,i) in list">
                        <div class="box flex1">
                            <p class="flex-row align-between-row">
                                <span><b>{{dictionary.consume_type[item.consume_type]||'-'}}</b></span>
                                <span :class="[item.consume_price==0?'black':item.consume_price>0?'green':'red']">{{item.consume_remark|formatText}}</span>
                            </p>
                            <p class="flex-row align-between-row gray">
                                <span>{{item.time_consume|formatText}}</span>
                                <span class="black">合计：<i class="m1">&yen;</i>{{item.consume_price|formatText}}</span>
                            </p>
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
                name:'book.balance',
                param:{
                    invoke_method:'money_list_4_one_user',
                    begin_idx:page*this.pageSize,
                    length_4_list:this.pageSize
                }
            }).then(({result,response})=>{
                //console.log('balance',result)
                if(result.public_money_list&&result.public_money_list.length){
                    this.list.push(...result.public_money_list.slice(0,this.pageSize));
                    this.currentPage=page;
                    if(result.public_money_list.length<this.pageSize){
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
