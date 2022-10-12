/*
 * 列表混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
import {
    on,
    off
} from '@/utils/dom';

export default {
    data() {
        return {
            list:[],
            pageSize:10,
            currentPage:0,
            isScrolling:false,
            isLoadEnded:false
        }
    },
    created() {

    },
    computed:{
        getListScrollWarp(){
           // return this.$refs.scroll;
					 return this.$parent.$refs.scroll;
        }
    },
    created(){
			console.log(this.$parent.$refs.scroll)
    },
    mounted(){
        on(this.getListScrollWarp,'scroll',this.handleScroll);
    },
    methods:{
        /*
         * 滚动事件
         */
        handleScroll(event){
            if(!this.isLoadEnded&&this.list&&this.list.length){
                this.$nextTick(()=>{
                    if((this.getListScrollWarp.scrollHeight<=this.getListScrollWarp.scrollTop+this.getListScrollWarp.clientHeight+30)&&!this.isScrolling){
                        this.isScrolling=true;
                        this.getListInfo({
                            flag:false,
                            page:this.currentPage+1,
                            callback:this.resetScroll
                        });
                    };
                });
            };
        },
        /*
         * 重置滚动事件
         */
        resetScroll(){
            this.clear();
            this.isScrolling=false;
            this.scroll_timer=setTimeout(()=>{
                on(this.getListScrollWarp,'scroll',this.handleScroll);
            },500);
        },
        /*
         * 清除计时
         */
        clear(){
            this.scroll_timer&&clearTimeout(this.scroll_timer);
            off(this.getListScrollWarp,'scroll',this.handleScroll);
        }
    },
    beforeDestroy(){
        this.clear();
    }
}
