<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-container flex1 flex-col">
        <div class="ui-mode-content flex1">
            <div class="ui-mode-box" :style="{display:index==0?'block':'none'}">
                <inner-home v-if="menu[0].flag"></inner-home>
            </div>
            <div class="ui-mode-box" :style="{display:index==1?'block':'none'}">
                <inner-my ref="my" v-if="menu[1].flag"></inner-my>
            </div>
            <!-- <div class="ui-mode-box" :style="{display:index==2?'block':'none'}">
                <inner-book v-if="menu[2].flag"></inner-book>
            </div>
            <div class="ui-mode-box" :style="{display:index==3?'block':'none'}">
                <inner-my v-if="menu[3].flag"></inner-my>
            </div>
            <div class="ui-mode-box" :style="{display:index==4?'block':'none'}">
                <inner-share v-if="menu[4].flag"></inner-share>
            </div> -->
        </div>
        <div class="ui-nav-item flex-row align-stretch">
            <div class="button flex1 flex-col align-center"
                :key="i"
                v-for="(item,i) in menu"
                :class="{active:index==i}"
                @click="handleChangeTab(i)">
                <em :class="`m${i+1}`"></em>
				<img src="{index==i?item.icon_active:item.icon}"
                <span>{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import innerHome from './home/index';
/* import innerCategory from './category/index';
import innerBook from './book/index'; */
import innerMy from './my/index';
/* import innerShare from './share/index';
import mixinShare from './mixins/share'; */
import {
    goLogin
} from '@/utils/tool';

export default {
    data(){
        return {
            index:null,
            menu:[
                {
                    flag:false,
                    title:'首页',
                    login:false,
                },
                {
                    flag:false,
                    title:'我的',
                    //login:true,
					login:false,
                }
            ]
        };
    },
   /* mixins:[
        mixinShare
    ], */
    computed:{
        getRedirectKey(){
            return {
                home:0,
                my:1
            };
        },
        getIndex(){
            let index=this.getRedirectKey[this.$route.query.redirect];
            if(index==undefined){
                index=0;
            };
            return index;
        }
    },
    watch:{
        getIndex(){
            this.handleChangeTab(this.getIndex);
        }
    },
    created(){
        this.handleChangeTab(this.getIndex);
        //this.showMessage(window.navigator.userAgent);
    },
    mounted(){

    },
    methods:{
        /*
         *  tab切换
         */
        handleChangeTab(i){
            if(i!=this.index){
                this.index=i;
                if(!this.menu[this.index].flag){
                    this.menu[this.index].flag=!this.menu[this.index].flag;
                };
                //this.initBridgeShare();
                this.goRedirect();
            };
        },
        /*
         * 跳转redirect
         */
        goRedirect(){
            let redirect={};
            Object.keys(this.getRedirectKey).forEach(key=>{
                redirect[this.getRedirectKey[key]]=key;
            });
            if(!(this.$route.query.redirect&&this.$route.query.redirect==redirect[this.index])){
                let query={
                    redirect:redirect[this.index]
                };
                if(this.index==2){
                    query.index=0;
                }else if(this.index==1){
                    this.isLogin&&this.$refs.category&&this.$refs.category.goRedirect();
                };
                this.$router.push({
                    path:'/front_page_index',
                    query:query
                });
            };
            this.$nextTick(()=>{
                if(this.menu[this.index].login&&!this.isLogin){
                    goLogin(this.$route);
                };
            });
        }
    },
    components:{
        innerHome,
        innerMy
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>

</style>
