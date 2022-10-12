<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-container ui-mode-box flex-col">
        <div class="ui-header-item gradient">
            <div class="ui-header-title">我的账本</div>
        </div>
        <div class="ui-mode-content flex1 flex-col">
            <div class="mt-tab-item flex-row align-stretch">
                <a href="javascript:;" class="flex1" :class="{active:i==index}" @click="handleChangeTab(i)" :key="i" v-for="(item,i) in menu">{{item.title}}</a>
            </div>
            <div class="mt-tab-content relative flex1">
                <div class="ui-mode-box" :style="{display:index==0?'block':'none'}">
                    <inner-order v-if="menu[0].flag" :total-num="detailInfo.cust_stat_order_num"></inner-order>
                </div>
                <div class="ui-mode-box" :style="{display:index==1?'block':'none'}">
                    <inner-balance v-if="menu[1].flag" :total-num="detailInfo.cust_stat_left_money_num"></inner-balance>
                </div>
                <div class="ui-mode-box" :style="{display:index==2?'block':'none'}">
                    <inner-score v-if="menu[2].flag" :total-num="detailInfo.cust_stat_score_num"></inner-score>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import innerOrder from './public/order';
import innerBalance from './public/balance';
import innerScore from './public/score';
import mixinCommon from '../mixins/common';
import mixinRequest from '../mixins/request';
import mixinShare from '../mixins/share';

export default {
    data(){
        return {
            index:null,
            menu:[
                {
                    flag:false,
                    title:'订单'
                },
                {
                    flag:false,
                    title:'余额'
                },
                {
                    flag:false,
                    title:'积分'
                }
            ],
            detailInfo:{}
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinShare
    ],
    computed:{
        getIndex(){
            return this.$route.query.index||0;
        }
    },
    watch:{
        getIndex(){
            if(this.$route.query.redirect=='book'){
                this.handleChangeTab(this.getIndex);
            };
        },
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    },
    created(){
        let public_agent_info=this.$store.state.global.public_agent_info;
        if(public_agent_info){
            document.title=public_agent_info.application_name;
        };
        this.handleChangeTab(this.getIndex);
    },
    mounted(){
        //this.initBridgeShare();
    },
    methods:{
        /*
         * 初始化
         */
        init(){
            this.getPageInfo({
                flag:false,
                name:'book',
                param:{
                    invoke_method:'statis_4_one_user'
                }
            }).then(({result,response})=>{
                //console.log('book',result)
                this.detailInfo={
                    cust_stat_left_money_num:result.cust_stat_left_money_num,
                    cust_stat_order_num:result.cust_stat_order_num,
                    cust_stat_score_num:result.cust_stat_score_num
                };
            });
        },
        /*
         *  tab切换
         */
        handleChangeTab(i){
            if(i!=this.index){
                this.index=i;
                if(!this.menu[this.index].flag){
                    this.menu[this.index].flag=!this.menu[this.index].flag;
                };
                this.goRedirect();
            };
        },
        /*
         * 跳转redirect
         */
        goRedirect(){
            if(!(this.$route.query.index&&this.$route.query.index==this.index)){
                this.$router.push({
                    path:'/front_page_index',
                    query:{
                        redirect:this.$route.query.redirect,
                        index:this.index
                    }
                });
            };
        }
    },
    components:{
        innerOrder,
        innerBalance,
        innerScore
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
.mt-tab-item{
    padding:0 2rem;
    height:2.6rem;
    line-height:2.6rem;
    position:relative;
    border-bottom:solid 1px #eee;
    a{
        color:#4a4a4a;
        cursor:pointer;
        position:relative;
        text-align:center;
        font-size:0.9rem;
        &.active{
            color:@base-color;
            &:after{
                position:absolute;
                content:'';
                left:0.5rem;
                right:0.5rem;
                bottom:-1px;
                height:0.2rem;
                border-radius:0.3rem;
                background:@base-color;
            }
        }
    }
}
</style>
