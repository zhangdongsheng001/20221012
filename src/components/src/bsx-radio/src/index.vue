<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
 <template>
     <label :for="getId" class="app_radio flex-row align-center"
         @touchstart.stop
         :class="{'is-checked':isChecked,disabled:disabled}">
         <div class="app_radio-icon">
             <transition name="app_radio">
                 <div class="app_radio-inner flex-row align-center"
                     v-if="isChecked">
                     <i class="icon"></i>
                 </div>
             </transition>
             <input class="app_radio-input" :id="getId" type="radio" v-bind="$attrs" :checked="isChecked" v-on="getListeners">
         </div>
         <span class="app_radio-label" v-if="$slots.default">
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
    name:'bsx-radio',
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
                    if(!this.disabled&&!this.isChecked){
                        this.$emit('input',event.target.checked);
                    };
                }
            };
        },
        isChecked(){
            return `${this.value}`=='true';
        },
        getId(){
            return `${createRandomUid()}-${new Date().getTime()}-radio`;
        }
    },
    watch:{

    },
    created(){

    },
    mounted(){

    },
    methods:{

    },
    beforeDestroy(){

    }
};
</script>

<style lang="less">

</style>
