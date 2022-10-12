/*
 * 请求混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {
    data() {
        return {
            pageStatus:false
        }
    },
    computed:{

    },
    created(){

    },
    mounted(){
        if(this.$refs.scroll){
            this._loading=this.initLoading();
            this._result=this.initResult();
        };
    },
    methods:{
        /*
         * 初始化获取数据
         */
        getPageInfo({flag=true,loading,tip=true,type='post',name,param}){
            return new Promise((resolve,reject)=>{
                if(flag){
                    if(loading){
                        this._loading&&this._loading.setStyle(loading);
                    };
                    this.showLoading();
                };
                this.$http[type]({
                    name:name,
                    data:param||{},
                    loading:{
                        enabled:false,
                        ...loading
                    }
                }).then(({result,response})=>{
                    if(flag){
                        this.showContent();
                    };
                    resolve({result,response});
                }).catch(({msg})=>{
                    if(flag){
                        this.showResult(msg,true);
                    }else{
                        tip&&this.showMessage(msg);
                    };
                    reject();
                });
            });
        },
        /*
         * 创建loading
         */
        initLoading(){
            return this.$$loading({
                masterBackground:'rgba(0,0,0,0)',
                alone:true,
                target:this.$refs.scroll
            }).hide();
        },
        /*
         * 创建result
         */
        initResult(){
            return this.$$result({
                target:this.$refs.scroll,
                refreshCallBack:()=>{
                    this.handleRefresh&&this.handleRefresh();
                }
            }).hide();
        },
        /*
         * 显示loading
         */
        showLoading(){
            this._loading&&this._loading.show();
            this._result&&this._result.hide();
            this.pageStatus=false;
        },
        /*
         * 显示result
         */
        showResult(msg,flag){
            this._loading&&this._loading.hide();
            this._result&&this._result.set(msg,flag).show();
            this.pageStatus=false;
        },
        /*
         * 显示内容
         */
        showContent(){
            this._loading&&this._loading.hide();
            this._result&&this._result.hide();
            this.pageStatus=true;
        }
    },
    beforeDestroy(){

    }
}
