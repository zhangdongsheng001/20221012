<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
 <template>
     <label :for="getId" class="app_checkbox flex-row align-center"
         @touchstart.stop
         :class="{'is-checked':isChecked||indeterminate,disabled:disabled}">
         <div class="app_checkbox-icon">
             <transition name="app_checkbox">
                 <div class="app_checkbox-inner flex-row align-center"
                     :class="{'has-checked':isChecked&&!indeterminate}"
                     v-if="isChecked||indeterminate">
                     <i v-if="indeterminate" class="indeterminate"></i>
                     <i v-else class="icon iconfont iconchenggong2"></i>
                 </div>
             </transition>
             <input class="app_checkbox-input" :id="getId" type="checkbox" ref="checkbox" v-bind="$attrs" :checked="isChecked" v-on="getListeners">
         </div>
         <span class="app_checkbox-label" v-if="$slots.default">
             <slot></slot>
         </span>
     </label>
 </template>

<script>
import config from './config';
import {
    createRandomUid
} from '@/utils/tool';

export default {
    name:'bsx-checkbox',
    inheritAttrs:false,
    data(){
        return {

        };
    },
    props:{
        ...config
    },
    computed:{
        getListeners(){
            return {
                ...this.$listeners,
                input:event=>{
                    if(!this.disabled){
                        this.$emit('input',event.target.checked);
                    };
                }
            };
        },
        isChecked(){
            return `${this.value}`=='true';
        },
        getId(){
            return `${createRandomUid()}-${new Date().getTime()}-checkbox`;
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        reset(){
            this.$refs.checkbox.checked=this.value;
        }
    },
    beforeDestroy(){

    }
};
</script>

<style lang="less">

</style>
