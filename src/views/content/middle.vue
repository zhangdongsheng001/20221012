<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="flex1 flex-row align-center middle-content relative">
        <span class="icon">
            <bsx-loading
                master-background="rgba(0,0,0,0)"
                box-background="rgba(0,0,0,0)"
                color="#9b9b9b"
                :size="35"
                :show-text="false">
            </bsx-loading>
        </span>
        <span>正在进入系统,请稍后...</span>
    </div>
</template>

<script>
import mixinCommon from './mixins/common';
import {
    query
} from '@/utils/tool';

export default {
    data(){
        return {

        };
    },
    mixins:[
        mixinCommon
    ],
    computed:{

    },
    watch:{

    },
    created(){
        if(!this.$route.query.jump_type){
            return this.showMessage('必须传入跳转类型').then(()=>{
                this.handleHistory();
            });
        };
		this.showMessage(window.location.href)
		console.log(window.location.href)
        this.getInfo();
    },
    mounted(){

    },
    methods:{
        getInfo(){
            this.$http.post({
                name:'common.middle',
                data:{
                    invoke_method:'public_page_4a_login_jump',
                    ...this.$route.query
                },
                loading:{
                    enabled:false
                }
            }).then(({result,response})=>{
				/* this.$router.push({
				     path:`/home`,
				     query:{
				
				} */
                //console.log('middle',response)
               // this.showMessage(`请求成功-即将跳转到<br/>${response.url}`);
				window.location.href=response.url;
                // console.log(1111,response.url)
                // console.log(query('redirect_uri',response.url))
                // this.$router.push({
                //     path:`/${response.url}`,
                //     query:{
                //
                //     }
                // });
            }).catch(({msg})=>{
                this.showMessage(msg).then(()=>{
                    this.handleHistory();
                });
            });
        }
    },
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less">
.middle-content{
    color:#9b9b9b;
    font-size:16px;
    line-height:20px;
    .icon{
        width:20px;
        height:20px;
        position:relative;
        margin-right:5px;
    }
}
</style>
