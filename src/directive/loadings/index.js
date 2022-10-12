/*
 * v-loading指令
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';

export default {
    bind:(el,binding)=>{
        if(!el.loading){
            el.loading=new Vue.Components.Loading({
                ...binding.value,
                target:el
            });
            el.loading.init();
        };
    },
    update:(el,binding)=>{
        if(el.loading&&(JSON.stringify(binding.oldValue)!=JSON.stringify(binding.value))){
            el.loading.hide();
        };
    },
    unbind:(el)=>{
        if(el.loading){
            el.loading.close();
            delete el.loading;
        };
    }
};
