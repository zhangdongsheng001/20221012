<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
     <transition name="app_sheet" v-on:after-leave="afterLeave">
        <div class="app_sheet-master" v-if="visible" @touchstart.prevent>
            <div class="app_sheet-container" @click.stop>
                <div class="app_sheet-item flex-col">
                    <span v-for="(item,i) in actions" :key="i" @touchstart.stop @click="handleAction(item)">{{item.title}}</span>
                </div>
                <div class="app_sheet-item flex-col mar-top-5">
                    <span class="cancel" @touchstart.stop @click="close">取消</span>
                </div>
            </div>
        </div>
     </transition>
</template>

<script>
import config from '../config';

export default {
    name:'bsx-sheet',
    data() {
        return {
            visible:false
        }
    },
    props:{
        ...config
    },
    computed:{

    },
    mounted(){

    },
    methods:{
        show(){
            this.visible=true;
        },
        handleAction(item){
            this.close();
            item.action&&item.action();
        },
        close(){
            this.visible=false;
        },
        afterLeave(){
            if(this.__remove){
                this.__remove();
            }else{
                this.$emit('bsx-sheet-close');
            };
        }
    },
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less">

</style>
