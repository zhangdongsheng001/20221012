<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="mt-shoping-box flex-col align-center">
        <i class="iconfont icongouwuche icon"></i>
        <span>{{getVal}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return {

        };
    },
    props:{
        cartNum:Number
    },
    mixins:[

    ],
    computed:{
        getVal(){
            if(this.cartNum){
                return this.cartNum>99?'99+':`${this.cartNum}`;
            };
            return this.formatText(this.cartNum);
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
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>

</style>
