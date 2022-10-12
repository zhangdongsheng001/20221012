/*
 * 分享混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {
    data() {
        return {

        }
    },
    computed:{
        getAgentInfo(){
            return this.$store.state.global.public_agent_info||{};
        },
        getUserInfo(){
            return this.$store.state.global.public_user_info||{};
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        /*
         * 初始化微信分享
         */
        initShare(data){
            return new Promise((resolve,reject)=>{
                data=data||this.$store.state.global.share_info;
                this.$wx.config({
                    debug:false,
                    appId:data.appId,
                    timestamp:data.timeStamp,
                    nonceStr:data.nonceStr,
                    signature:data.signature,
                    jsApiList:[
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'scanQRCode'
                    ]
                });
                this.$wx.ready(()=>{
                    this.$wx.checkJsApi({
                        jsApiList:[
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'scanQRCode'
                        ],
                        success:res=>{
                            this.setState({
                                key:'is_init_share',
                                value:true
                            });
                            resolve();
                        }
                    });
                });
                this.$wx.error(res=>{
                    this.setState({
                        key:'is_init_share',
                        value:false
                    });
                    reject();
                    //console.log('微信分享初始化失败',res);
                });
            });
        },
        /*
         * 获取分享链接
         */
        getShareUrl(flag,param){
            let content_param_str=Qs.stringify({
                //jump_type:flag?51:99,
				jump_type:701,
                id_public_user_info:this.getUserInfo.id_public_user_info,
                place_code:'wxfx_0001',
                id_public_agent_info:this.getAgentInfo.id_public_agent_info,
				new_page:'front_page_index.html',
                ...param
            });
            return `${window.location.href.replace(window.location.hash,'')}#/middle?${content_param_str}`;
        },
        /*
         * 获取分享参数
         */
        getShareParam(param){
            let url=window.location.href.replace(window.location.hash,''),
                str=url.split('/').slice(-1)[0],
                imgUrl=url.replace(str,'logo.png');
            let obj={
                title:`${this.getUserInfo.nick_name}邀请您体验[${this.getAgentInfo.agent_name}]`,
                desc:`${this.getUserInfo.nick_name}邀请您体验[${this.getAgentInfo.agent_name}]`,
                link:this.getShareUrl(!!param,param&&param.key?{[param.key]:param.value,url:param.url,new_page:param.new_page}:null),
                imgUrl:imgUrl,
                // type:'',
                // dataUrl:''
                ...param
            };
            if(!obj.imgUrl){
                obj.imgUrl=imgUrl;
            };
			/* this.showMessage(obj.title);
			this.showMessage(obj.link); */
			console.log(obj)
            return obj;
        },
        /*
         * 获取分享信息
         */
        getShareAgentUserInfo(){
            return new Promise((resolve,reject)=>{
                if(!this.$store.state.global.public_agent_info){
                    this.$http.post({
                        name:'home',
                        param:{
                            invoke_method:'content_frontpage_4_weichat'
                        },
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        //console.log('getShareAgentUserInfo',result)
                        this.setState({
                            key:'public_agent_info',
                            value:result.public_agent_info
                        });
                        this.setState({
                            key:'public_user_info',
                            value:result.public_user_info
                        });
                        resolve();
                    }).catch(({msg,status})=>{

                    });
                }else{
                    resolve();
                };
            });
        },
        /*
         * 获取分享信息
         */
        getShareInfo(){
            return new Promise((resolve,reject)=>{
                if(!this.$store.state.global.share_info&&(this.isWeixin||this.isMiniProgram)){
                    this.$http.post({
                        name:'common.share',
                        data:{
                            invoke_method:'weichat_config',
        					page_url:window.location.href.replace(window.location.hash,'')
                        },
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        //console.log('getShareInfo',result)
                        this.setState({
                            key:'share_info',
                            value:result
                        });
                        resolve();
                    }).catch(({msg,status})=>{
                        resolve();
                    });
                }else{
                    resolve();
                };
            });
        },
        /*
         * 分享中间初始化
         */
        initBridgeShare(param,data){
            if(this.isWeixin||this.isMiniProgram){
                this.$nextTick(()=>{
                    if(data){
                        this.fetchShareInfo(param,data);
                    }else{
                        this.getShareInfo().then(()=>{
                            this.fetchShareInfo(param);
                        });
                    };
                });
            };
        },
        /*
         * 初始化分享数据
         */
        fetchShareInfo(param,data){
            this.initShare(data).then(()=>{
                this.getShareAgentUserInfo().then(()=>{
                    this.handleMenuShareTimeline(param);
                    this.handleMenuShareAppMessage(param);
                    this.handleMenuShareQQ(param);
                    this.handleMenuShareWeibo(param);
                });
            });
        },
        /*
         * 分享到朋友圈
         */
        handleMenuShareTimeline(param){
            let {title,desc,link,imgUrl}=this.getShareParam(param);
            return new Promise((resolve,reject)=>{
                this.handleFetchShare(()=>{
                    this.$wx.onMenuShareTimeline({
                        title:title,
                        desc:desc,
                        link:link,
                        imgUrl:imgUrl,
                        success:()=>{
                            resolve();
                            // this.showToast('分享成功',true);
                        },
                        cancel:()=>{
                            reject();
                            // this.showToast('分享失败',false);
                        }
                    });
                });
            });
        },
        /*
         * 分享给朋友
         */
        handleMenuShareAppMessage(param){
            let {title,desc,link,imgUrl,type,dataUrl}=this.getShareParam(param);
            return new Promise((resolve,reject)=>{
                this.handleFetchShare(()=>{
                    this.$wx.onMenuShareAppMessage({
                        title:title,
                        desc:desc,
                        link:link,
                        imgUrl:imgUrl,
                        dataUrl:dataUrl,
                        type:type,
                        success:()=>{
                            resolve();
                            // this.showToast('分享成功',true);
                        },
                        cancel:()=>{
                            reject();
                            // this.showToast('分享失败',false);
                        }
                    });
                });
            });
        },
        /*
         * 分享到QQ
         */
        handleMenuShareQQ(param){
            let {title,desc,link,imgUrl}=this.getShareParam(param);
            return new Promise((resolve,reject)=>{
                this.handleFetchShare(()=>{
                    this.$wx.onMenuShareQQ({
                        title:title,
                        desc:desc,
                        link:link,
                        imgUrl:imgUrl,
                        success:()=>{
                            resolve();
                            // this.showToast('分享成功',true);
                        },
                        cancel:()=>{
                            reject();
                            // this.showToast('分享失败',false);
                        }
                    });
                });
            });
        },
        /*
         * 分享到微博
         */
        handleMenuShareWeibo(param){
            let {title,desc,link,imgUrl}=this.getShareParam(param);
            return new Promise((resolve,reject)=>{
                this.handleFetchShare(()=>{
                    this.$wx.onMenuShareWeibo({
                        title:title,
                        desc:desc,
                        link:link,
                        imgUrl:imgUrl,
                        success:()=>{
                            resolve();
                            // this.showToast('分享成功',true);
                        },
                        cancel:()=>{
                            reject();
                            // this.showToast('分享失败',false);
                        }
                    });
                });
            });
        },
        /*
         * 中间转接
         */
        handleFetchShare(fn){
            let is_init_share=this.$store.state.global.is_init_share;
            if(is_init_share){
                fn&&fn();
            }else{
                this.$$message({
                    content:'微信初始化失败',
                    buttonText:'重新加载',
                    sure:(node,close)=>{
                        window.location.reload();
                    }
                });
            };
        }
    },
    beforeDestroy(){

    }
}
