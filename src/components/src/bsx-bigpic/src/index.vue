<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
     <transition name="app_bigpic" v-on:after-leave="afterLeave">
        <div class="app_bigpic-master" v-if="visible" @touchstart.prevent>
            <div class="app_bigpic-container flex-row align-center" ref="content">
				<span @touchstart.stop @click="close">×</span>
				 <img :src="content" /> 
            </div>
        </div>
     </transition>
</template>

<script>
export default {
    name:'bsx-bigpic',
    data() {
        return {
            visible:false
        }
    },
    props:{
        /*
    	 * 内容
    	 */
    	content:String,

    	/*
    	 * 确认文字
    	 */
    	sureText:String,

    	/*
    	 * 取消文字
    	 */
    	cancelText:String,

    	/*
    	 * 是否关闭按钮-点击确认自动关闭
    	 */
    	autoClose:Boolean
    },
    computed:{
        getContentEl(){
            return this.$refs.content;
        }
    },
    mounted(){

    },
    methods:{
        show(){
            this.visible=true;
        },
        handleCancel(){
            this.close();
            if(this.__cancel){
                this.__cancel({
                    node:this.getContentEl,
                    close:this.close
                });
            }else{
                this.$emit('bsx-bigpic-cancel',{
                    node:this.getContentEl,
                    close:this.close
                });
            };
        },
        handleSure(){
            this.autoClose&&this.close();
            if(this.__sure){
                this.__sure({
                    node:this.getContentEl,
                    close:this.close
                });
            }else{
                this.$emit('bsx-bigpic-sure',{
                    node:this.getContentEl,
                    close:this.close
                });
            };
        },
        close(){
            this.visible=false;
        },
        afterLeave(){
            if(this.__remove){
                this.__remove();
            }else{
                this.$emit('bsx-bigpic-close');
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
