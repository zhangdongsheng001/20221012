<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="m-container flex-col" id="app" ref="app">
        <template v-if="loaded">
            <router-view/>
        </template>
        <div class="mt-vspromp-content flex-col align-center" v-show="visible" :style="getStyle" ref="vspromp">
            <div class="mt-vspromp-icon flex1">
                <span></span>
            </div>
            <p class="mt-vspromp-text">为了更好的体验，请将手机/平板竖过来</p>
        </div>
    </div>
</template>

<script>
import {
    on,
    off
} from '@/utils/dom';
import mixinShare from './content/mixins/share';

export default {
    name:'app',
    data(){
        return {
            visible:false,
            loaded:false
        };
    },
    mixins:[
        mixinShare
    ],
    computed:{
        getStyle(){
            return {
                zIndex:+new Date
            };
        }
    },
    created(){
        this.handleOrientationChange();
    },
    mounted(){
        document.addEventListener('touchmove',this.handleTouchMove,{
            passive:false
        });
        document.addEventListener('touchstart',this.handleTouchStart,{
            passive:false
        });
        on(window,'orientationchange',this.handleOrientationChange);
    },
    methods:{
        /*
         * 获取促销字典
         */
        getPromotionDir(){
            return new Promise((resolve,reject)=>{
                if(!this.dictionary.promotion_type){
                    this.$http.post({
                        name:'common.promotion',
                        data:{
                            invoke_method:'public_page_4m_load_enum',
                            enum_key:'type_promotion'
                        },
                        login:{
                            redirect:false
                        },
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        if(result.page_content&&result.page_content.length){
                            let promotion_type={},promotion_url={};
                            result.page_content.forEach(item=>{
                                promotion_type[item.enum_key]=item.enum_value1;
                                promotion_url[item.enum_key]=item.enum_value2;
                            });
                            this.setDictionary({
                                key:'promotion_type',
                                value:promotion_type
                            });
                            this.setDictionary({
                                key:'promotion_url',
                                value:promotion_url
                            });
                            resolve();
                        };
                    }).catch(({msg,status})=>{
                        if(status==999201){
                            resolve();
                        }else{
                            this._loading&&this._loading.close();
                            this.$$message({
                                content:msg,
                                buttonText:'重新加载',
                                sure:(node,close)=>{
                                    this.handleOrientationChange();
                                }
                            });
                        };
                    });
                }else{
                    resolve();
                };
            });
        },
        /*
         * touchmove 事件
         */
        handleTouchMove(evt){
            if(!evt._isScroller){
               // evt.preventDefault();
            };
        },
        /*
         * touchstart 事件
         */
        handleTouchStart(evt){
            if(evt.touches.length>1){
                event.preventDefault();
            };
        },
        /*
         * 横屏事件
         */
        handleOrientationChange(){
            if(window.orientation==180||window.orientation==0){
                this.visible=false;
            }else if(window.orientation==90||window.orientation==-90){
                this.visible=true;
            };
            if(!this.visible&&!this.loaded){
                this.loaded=true;
                if(this.$route.meta.auth&&!this.isLogin){
                    this._loading=this.$$loading({
                        masterBackground:'rgba(0,0,0,0)',
                        showText:false
                    });
                };
                this.refresh(()=>{
                    this._loading&&this._loading.close();
                });
            };
        },
        /*
         * 刷新
         */
        refresh(fn){
            if(this.isLogin){
                this.getPromotionDir().then(()=>{
                    this.setState({
                        key:'resource_loaded',
                        value:true
                    });
                    fn&&fn();
                });
            }else{
                fn&&fn();
            };
        }
    },
    components:{

    },
    beforeDestroy(){
        document.removeEventListener('touchmove',this.handleTouchMove,{
            passive:false
        });
        document.removeEventListener('touchstart',this.handleTouchStart,{
            passive:false
        });
        off(window,'orientationchange',this.handleOrientationChange);
        this._loading&&this._loading.close();
    }
}
</script>

<style lang="less" scoped>
.m-container{
    position:absolute;
    top:0;
    bottom:0;
    cursor:default;
    left:50%;
    transform: translateX(-50%);
    width:100%;
	max-width:768px;
    overflow:hidden;
    .mt-vspromp-content{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:10;
        background-color:#32373b;
        padding:0.5rem;
        .mt-vspromp-icon{
            position:relative;
            width:100%;
            span{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                background-size:25% auto;
                background-position:center center;
                background-repeat:no-repeat;
                background-image:url(~@/assets/images/base/rotate.png);
                animation: vspromps-ani 1.5s ease infinite alternate;
            }
        }
        .mt-vspromp-text{
            margin-top:0.5rem;
            text-align:center;
            color:#ffd40a;
            font-size:0.8rem;
            line-height:2rem;
        }
    }
}
@keyframes vspromps-ani{
	0% {
        transform:rotate(-90deg);
    }
	30% {
        transform:rotate(-90deg);
    }
	70%{
        transform:rotate(0deg);
    }
	100% {
        transform:rotate(0deg);
    }
}
</style>
