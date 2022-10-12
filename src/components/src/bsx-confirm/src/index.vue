<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
     <transition name="app_confirm" v-on:after-leave="afterLeave">
        <div class="app_confirm-master" v-if="visible" @touchstart.prevent>
            <div class="app_confirm-container" ref="content">
								<div class="app_confirm-title">{{title}}</div>
                <div class="app_confirm-text" v-html="content"></div>
                <div class="flex-row app_confirm-bottom">
                    <span class="flex1 app_confirm-button cancel" v-if="cancelText" @touchstart.stop @click="handleCancel">{{cancelText}}</span>
                    <span class="flex1 app_confirm-button sure" @touchstart.stop @click="handleSure">{{sureText}}</span>
                </div>
            </div>
        </div>
     </transition>
</template>

<script>
export default {
    name:'bsx-confirm',
    data() {
        return {
            visible:false
        }
    },
    props:{
			/*
			 * 标题
			 */
			title:String,
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
                this.$emit('bsx-confirm-cancel',{
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
                this.$emit('bsx-confirm-sure',{
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
                this.$emit('bsx-confirm-close');
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
