<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-container ui-mode-box flex-col">
        <div class="ui-header-item gradient">
            <div class="ui-header-title">欢迎来到{{public_agent_info.agent_name|formatText}}</div>
        </div>
        <div class="ui-mode-content bgGray flex1" ref="scroll">
            <template v-if="pageStatus">
                <div class="pad-top-10">
                    <div class="gradient mt-logo-item">
                        <img class="app-image auto" @mousedown.prevent v-lazy="formatImgUrl(public_user_info.weichat_img)">
                    </div>
                </div>
                <div class="mt-share-item">
                    <p class="tip">{{public_user_info.nick_name|formatText}}邀请您关注，关注后将享受到平台的福利</p>
                    <p class="info">{{public_agent_info.agent_name|formatText}}<span>{{public_agent_info.agent_tel|formatText}}</span></p>
                    <p class="address"><i class="iconfont iconpin"></i>{{public_agent_info.agent_province|formatText}}{{public_agent_info.agent_city|formatText}}{{public_agent_info.agent_country|formatText}}{{public_agent_info.agent_addr|formatText}}</p>
                    <div class="code">
                        <img class="app-image auto" @mousedown.prevent v-lazy="getCodeUrl">
                    </div>
                    <p class="bottom">请注意截图分享到朋友圈，或者面对面直接让朋友扫码</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import mixinCommon from '../mixins/common';
import mixinRequest from '../mixins/request';
import mixinShare from '../mixins/share';
import {baseUrl, TIME_OUT} from '../../../http/const';

export default {
    data(){
        return {
            public_agent_info:{},
            public_user_info:{}
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        mixinShare
    ],
    computed:{
        getCodeUrl(){
            let content_param_str=Qs.stringify({
                //jump_type:22,
				jump_type:701,
                id_public_user_info:this.public_user_info.id_public_user_info,
                place_code:'wxfx_0001',
                id_public_agent_info:this.public_agent_info.id_public_agent_info,
				new_page:'front_page_index.html',
            });
            let url_param=Qs.stringify({
                invoke_method:'public_page_4m_qr_img',
                qr_size:300,
                bar_img_content:`${window.location.href.replace(window.location.hash,'')}#/middle?${content_param_str}`
            });
			console.log(baseUrl)
			console.log(`${baseUrl}`)
            //return `${process.env.VUE_APP_HOST}/mgr_image_code.png?${url_param}`;
           // return `${window.location.origin}/wholefarm_demo_project_005/mgr_image_code.png?${url_param}`;
		   return `${baseUrl}mgr_image_code.png?${url_param}`;
        }
    },
    watch:{
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    },
    created(){

    },
    mounted(){
        //this.initBridgeShare();
    },
    methods:{
        /*
         * 初始化
         */
        init(){
            this.getPageInfo({
                name:'share',
                param:{
                    invoke_method:'user_and_shop_info'
                }
            }).then(({result,response})=>{
                //console.log('share',result)
                this.public_agent_info=result.public_agent_info||{};
                this.public_user_info=result.public_user_info||{};
                document.title=this.public_agent_info.application_name;
                this.setState({
                    key:'public_agent_info',
                    value:this.public_agent_info
                });
                this.setState({
                    key:'public_user_info',
                    value:this.public_user_info
                });
            });
        },
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.init();
        }
    },
    components:{

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
.ui-mode-content{
    .mt-logo-item{
        position:relative;
        width:4.5rem;
        height:4.5rem;
        border-radius:50%;
        border: 1px solid #ddd;
        box-shadow: 0 0 6px #ddd;
        margin:0 auto;
        overflow:hidden;
    }
    .mt-share-item{
        position:relative;
        padding:0 1rem 1rem;
        .code{
            background:#fff;
            position:relative;
            width:12rem;
            height:12rem;
            margin:0 auto 1rem;
        }
        p{
            &.tip{
                text-align:center;
                border-bottom:solid 1px #ddd;
                line-height:1.2rem;
                padding:1rem 0;
                color:#333;
                font-size:0.7rem;
                margin-bottom:0.5rem;
            }
            &.info{
                text-align:center;
                color:@base-color;
                position:relative;
                line-height:2rem;
                font-size:0.8rem;
                margin:0 1rem;
            }
            &.address{
                line-height:1.4rem;
                padding:0.3rem 0;
                position:relative;
                color:#a1a1a1;
                font-size:0.8rem;
                text-align:center;
                margin-bottom:1rem;
                i{
                    color:@base-color;
                    margin-right:0.3rem;
                    font-size:0.8rem;
                }
            }
            &.bottom{
                font-size:0.7rem;
                text-align:center;
                color:#666;
                line-height:2rem;
            }
        }
    }
}
</style>
