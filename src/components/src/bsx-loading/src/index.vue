<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <transition name="app_loading" v-on:after-leave="afterLeave">
        <div class="app_loading-container" :class="{m:!!!target}" v-show="visible" :id="id" :style="getContainerStyle">
            <div class="app_loading-content flex-col align-center" :class="{m:showText}" :style="this.getContentStyle">
                <div class="app_loading-warp" :style="this.getWarpStyle">
                    <div class="app_loading-box">
                        <svg viewBox="25 25 50 50" class="app_loading-circular">
                            <circle cx="50" cy="50" r="20" fill="none" :style="getPathStyle" class="app_loading-path"></circle>
                        </svg>
                    </div>
                </div>
                <span class="app_loading-text" v-if="showText">{{text||'加载中'}}</span>
            </div>
        </div>
    </transition>
</template>

<script>
import config from '../config';

export default {
    name:'bsx-loading',
    data() {
        return {
            visible:false,
            removeable:false
        }
    },
    props:{
        ...config,
        /*
    	 * 定位方式
    	 */
    	position:{
     		type:String,
     		default:'absolute'
     	},
        /*
    	 * 唯一标识码
    	 */
    	id:{
     		type:String,
     		default:''
     	}
    },
    computed:{
        getPathStyle(){
            if(this.color){
                return {
                    stroke:this.color
                };
            };
        },
        getContainerStyle(){
            return {
                position:this.position,
                background:this.masterBackground,
                opacity:this.opacity
            };
        },
        getContentStyle(){
            return {
                background:this.boxBackground
            };
        },
        getWarpStyle(){
            return {
                width:`${this.size}px`,
                height:`${this.size}px`
            };
        }
    },
    mounted(){
        if(this.time){
            this.__timer=setTimeout(()=>{
                this.close();
            },this.time);
        };
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
            if(!this.alone){
                this.removeable=true;
                this.hide();
            };
        },
        afterLeave(){
            if(this.removeable){
                this.__timer&&clearTimeout(this.__timer);
                this.remove&&this.remove();
            };
        }
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less">

</style>
