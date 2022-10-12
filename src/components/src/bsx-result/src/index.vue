<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <transition name="app_result" v-on:after-leave="afterLeave">
        <div class="app_result-container flex-col align-center" v-show="visible">
            <div class="relative flex-col align-center">
                <i class="iconfont iconxiaoxihezi-kong app_result-icon"></i>
                <p class="app_result-info flex-col">
                    <span class="app_result-text">{{msg}}</span>
                    <span class="app_result-button" @click.stop="handleRefresh" v-if="buttonable">点击重新刷新</span>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
import config from '../config';

export default {
    name:'bsx-result',
    data() {
        return {
            visible:false,
            removeable:false
        }
    },
    props:{
        ...config
    },
    mounted(){
        if(!this.target){
            this.show();
        };
    },
    methods:{
        show(){
            this.visible=true;
        },
        hide(){
            this.visible=false;
        },
        close(){
            this.removeable=true;
            this.hide();
        },
        handleRefresh(){
            this.hide();
            if(this.refresh){
                this.refresh();
            }else{
                this.$emit('bsx-result-refresh');
            };
        },
        afterLeave(){
            if(this.removeable){
                this.remove&&this.remove();
            };
        }
    }
}
</script>

<style lang="less">

</style>
