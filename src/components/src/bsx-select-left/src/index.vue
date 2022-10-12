<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
     <transition name="app_select" v-on:after-leave="afterLeave">
        <div class="app_select-master" v-if="visible" @touchstart.prevent>
            <div class="app_select-container" @click.stop>
                <!-- <div class="flex-row align-stretch app_select-head">
                    <span class="cancel" @touchstart.stop @click="handleCancel">取消</span>
                    <p class="flex1">{{title}}</p>
                    <span class="sure" @touchstart.stop @click="handleSure">确认</span>
                </div> -->
				<div class="app_select-head">
				    <p class="flex1">{{title}}</p>
				</div>
                <div class="app_select-body flex-row align-stretch">
                    <template v-if="getList&&getList.length">
                        <item class="flex1"
                            ref="item"
                            :class="{m:i!=0}"
                            :key="i"
                            :list="item"
                            :value="getVal[i]"
                            v-for="(item,i) in getList">
                        </item>
                    </template>
                    <div v-else class="flex1 align-center flex-row app_select-null m">没有数据</div>
                </div>
				<!-- <div class="app_select-bottom" @touchstart.stop @click="handleSure" >
					<div>确定选择</div>
				</div> -->
            </div>
        </div>
     </transition>
</template>

<script>
import config from '../config';
import item from './item';
import {
    isArray
} from '@/utils/tool';

export default {
    name:'bsx-select-left',
    data() {
        return {
            visible:false
        }
    },
    props:{
        ...config
    },
    computed:{
        getList(){
            if(this.list&&this.list.length){
                if(!isArray(this.list[0])){
                    return [this.list];
                }else{
                    return this.list.filter(item=>{
                        return isArray(item);
                    });
                };
            };
        },
        getVal(){
            return isArray(this.value)?this.value:[this.value];
        }
    },
    mounted(){
        
    },
    methods:{
        handleSure(){
            this.close();
            let items=this.$refs.item,res=[];
            items.forEach(item=>{
                let info=item.getSelectedValue();
                res.push(info||null);
            });
            if(!isArray(this.list[0])){
                res=res[0];
            };
            if(this.__sure){
                this.__sure(res);
            }else{
                this.$emit('bsx-select-sure',res);
            };
        },
        handleCancel(){
            this.close();
            if(this.__cancel){
                this.__cancel();
            }else{
                this.$emit('bsx-select-cancel');
            };
        },
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
                this.$emit('bsx-select-close');
            };
        }
    },
    components:{
        item
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less">

</style>
