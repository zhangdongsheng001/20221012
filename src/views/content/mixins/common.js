/*
 * 公共混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
import {
    formatDate,
    goLogin
} from '@/utils/tool';
import {
    LocalStorage
} from '@/utils/storage';

export default {
    data() {
        return {
            scrollEl:[]
        }
    },
    computed:{

    },
    created(){

    },
    mounted(){
        this.handleOverScroll();
        this.$Lazyload.$on('loaded',({el,src})=>{
            if(!/has-loaded/g.test(el.className)){
                el.className=[el.className,'has-loaded'].join(String.fromCharCode(32));
            };
            if(!/has-loaded/g.test(el.parentNode.className)){
                el.parentNode.className=[el.parentNode.className,'has-loaded'].join(String.fromCharCode(32));
            };
        });
    },
    methods:{
        /*
         *  扫码
         */
        handleScan(){
            if(this.isWeixin||this.isMiniProgram){
                if(this.$wx){
                    this.$wx.scanQRCode({
                        needResult:0,
                        desc:'二维码/条形码扫码'
                    });
                }else{
                    this.showMessage('获取签名失败，请刷新页面重试！');
                };
            }else if(this.isAPP){
                this.$native.scan(data=>{
					if(data){
                        this.$http.post({
                            name:'common.scan',
                            data:{
                                invoke_method:'find_goods_info_by_code',
    							code_public_goods_info:data,
    							type_4_api_command:1
                            },
                            loading:{
                                enabled:true
                            }
                        }).then(({result,response})=>{
                            if(result.public_goods_list&&result.public_goods_list.length){
                                this.$router.push({
                                    path:'/category/detail',
                                    query:{
                                        id:result.public_goods_list[0].id_public_goods_info
                                    }
                                });
                            }else{
                                this.showMessage('没有找到该商品！');
                            };
                        }).catch(({msg})=>{
                            this.showMessage(msg);
                        });
					}else{
                        this.showMessage('无法识别！');
                    };
				});
            };
        },
        /*
         *  分享
         */
        handleShare(){
            this.$$sheet({
                actions:[
                    {
                        title:'分享到微信',
                        action:()=>{
                            this._handleNativeShare('weixin');
                        }
                    },
                    {
                        title:'分享到朋友圈',
                        action:()=>{
                            this._handleNativeShare('weixin_wxcircle');
                        }
                    }
                ]
            });
        },
        /*
         *  调用原生分享
         */
        _handleNativeShare(platform){
            var public_agent_info=this.$store.state.global.public_agent_info,
                public_user_info=this.$store.state.global.public_user_info,
                nick_name=public_user_info.nick_name,
                agent_name=public_agent_info.agent_name,
                param_str=Qs.stringify({
                    place_code:'wxfx_0001',
                    //jump_type:51,
					jump_type:701,
                    id_public_agent_info:public_agent_info.id_public_agent_info,
                    id_public_user_info:public_user_info.id_public_user_info,
                    id_public_goods_info:this.detailInfo.id_public_goods_info,
					type_from_login:'101',
					new_page:'front_page_index.html#/category/detail?type_from_login=101&id='+this.detailInfo.id_public_goods_info,
                });
				console.log(param_str)
            let url=window.location.href.replace(window.location.hash,''),
                str=url.split('/').slice(-1)[0],
                imgUrl=url.replace(str,'logo.png');
				/* this.showMessage(`${window.location.href.replace(window.location.hash,'')}#/middle?${param_str}`)
				console.log(`${window.location.href.replace(window.location.hash,'')}#/middle?${param_str}`) */
            this.$native.share({
                shareTitle:`${nick_name}邀请您体验[${this.detailInfo.goods_name}]`,
                shareDesc:`${nick_name}邀请您体验[${this.detailInfo.goods_name}]`,
                shareLink:`${window.location.href.replace(window.location.hash,'')}#/middle?${param_str}`,
                sharePlatform:platform,
                shareIconUrl:this.detailInfo.goods_main_image?this.getGoodMainImage:imgUrl
            },data=>{
                console.log('分享callback',data);
                //this.showToast('分享成功!',true);
            });
        },
        /*
         *  返回首页
         */
        handleHome(){
            this.$router.push({
                path:'/front_page_index',
                query:{
                    redirect:'home'
                }
            });
        },
        /*
         *  搜索
         */
        handleSearch(){
            if(!this.isLogin){
                this.goLogin();
            }else{
                this.showMessage(`搜索-跳转到<br/>406_search.html`);
            };
        },
        /*
         * 去登录
         */
        goLogin(){
            goLogin(this.$route);
        },
        /*
         *  返回上一步
         */
        handleHistory(){
            if(this.isAPP&&this.isAndroid){
                this.$native.appBack();
            }else{
                this.$router.go(-1);
            };
        },
        /*
         *  初始化事件
         */
        handleOverScroll(){
            this.scrollEl=this.getScrollEl().map(el=>{
                this.handleAttachEvent(el);
                return el;
            });
        },
        /*
         * 添加滚动事件
         */
        handleAttachEvent(target){
            if(target){
                target._touchstart=this.handleExecEvent(target,'touchstart',this.handleTouchStart);
                target._touchmove=this.handleExecEvent(target,'touchmove',this.handleTouchMove);
            };
        },
        /*
         * 解除滚动事件
         */
        handleDetachEvent(target){
            if(target){
                if(target._touchstart){
                    target._touchstart();
                    delete target._touchstart;
                };
                if(target._touchmove){
                    target._touchmove();
                    delete target._touchmove;
                };
            };
        },
        /*
         *  触摸事件
         */
        handleTouchStart(e,target){
            let top=target.scrollTop,
                totalScroll=target.scrollHeight,
                currentScroll=top+target.offsetHeight;
            if(top===0){
                target.scrollTop=1;
            }else if(currentScroll===totalScroll){
                target.scrollTop=top-1;
            };
        },
        /*
         *  滑过事件
         */
        handleTouchMove(e,target){
					//console.log(22)
            if(target.offsetHeight<target.scrollHeight){
                e._isScroller=true;
            }else{
                delete e._isScroller;
            };
        },
        /*
         *  绑定/解绑事件
         */
        handleExecEvent(element,type,fn){
            let bound=event=>{
                fn&&fn(event,element);
            };
            if(element.addEventListener){
                element.addEventListener(type,bound,false);
            }else if(element.attachEvent){
                element.attachEvent(`on${type}`,bound);
            }else{
                element[`on${type}`]=fn.apply(this,[arguments,data]);
            };
            return function(){
                if(element.removeEventListener){
                    element.removeEventListener(type,bound,false);
                }else if(element.attachEvent){
                    element.detachEvent(`on${type}`,bound);
                }else{
                    element[`on${type}`]=null;
                };
            };
        },
        /*
         *  获取滚动dom
         */
        getScrollEl(){
            return [
                this.$refs.menu,
                this.$refs.scroll
            ].filter(item=>{
                return !!item;
            });
        },
        /*
         *  格式化图片地址
         */
        formatImgUrl(url){
            if(url){
                let base_url=this.$store.state.global.oss_host_url;
                if(url.indexOf('http://')!=-1||url.indexOf('https://')!=-1){
                    return url;
                }else{
                    if (/^..\//.test(url)){
                        return url.replace(/^../g,base_url);
                    }else{
                        return base_url+url;
                    };
                };
            };
            return url;
        },
        /*
         * 格式化星星
         */
        formatStar(star){
            if(`${star}`.length>1){
                return new Array(5).join(',').split(',').map((item,i)=>{
                    if(i+1<=Math.floor(star)){
                        return 'solid';
                    }else{
                        if(i==Math.floor(star)&&(Math.round(star)-Math.floor(star)==1)){
                            return 'half';
                        }else{
                            return 'hollow';
                        };
                    };
                });
            };
            return new Array(5).join(',').split(',').map((item,i)=>{
                return i+1>star?'hollow':'solid';
            });
        }
    },
    filters:{
        formatDate2(date){
            return date?formatDate(new Date(date),'YYYY-MM-DD'):'-';
        }
    },
    beforeDestroy(){
        this.scrollEl.forEach(el=>{
            this.handleDetachEvent(el);
        });
    }
}
