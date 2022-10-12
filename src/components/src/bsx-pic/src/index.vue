<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
     <transition name="app_pic" v-on:after-leave="afterLeave">
        <div class="app_confirm-master" v-if="visible" @touchstart.prevent>
            <div class="app_confirm-container" ref="content">
                <div class="app_confirm-text" v-html="content"></div>
				<div>
					<span @touchstart.stop @click="close">+</span>
					<img :src="content" />
				</div>
            </div>
        </div>
     </transition>
</template>

<script>
export default {
    name:'bsx-pic',
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
        close(){
            this.visible=false;
        },
        afterLeave(){
            if(this.__remove){
                this.__remove();
            }else{
                this.$emit('bsx-pic-close');
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
