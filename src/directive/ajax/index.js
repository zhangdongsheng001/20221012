/*
 * v-ajax指令
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import {
    getObjResult
} from '@/utils/tool';

class Ajax {
    /*
     * 初始化
     */
    constructor(el,method,ops){
        this.method=method;
        this.ops=ops;
        this.el=(ops.loading&&ops.loading.el)||el;
        if(this.ops.loading&&this.ops.loading.enabled){
            this.initLoading();
        };
        this.initSend();
    }
    /*
     * 发送请求
     */
    initSend(){
        this.ops.beforeSend&&this.ops.beforeSend();
        if(!this.ops.stopable){
            if(this.ops.data){
                this.compile(this.ops.data);
            }else{
                Vue.Components.http[this.method]({
                    ...this.ops.request
                }).then(res=>{
                    this.compile(res);
                }).catch(({msg,errorMsg,detailMsg})=>{
                    this.showError(msg||errorMsg||detailMsg,this.ops.error);
                });
            };
        };
    }
    /*
     * 处理结果
     */
    compile(res){
        if(this.ops.key){
            let key=this.ops.key.split('.'),
                data=getObjResult(res,key);
            if(data&&data.length){
                this.showSuccess(res);
            }else{
                this.showError(this.ops.errorMsg||res.msg||res.errorMsg||res.detailMsg||'没有数据',null,false);
                let o={};
                for(let i=key.length-1;i>=0;i--){
                    o[key[i]]=i==key.length-1?[]:JSON.parse(JSON.stringify(o));
                    if(i!=key.length-1){
                        delete o[key[i+1]];
                    };
                };
                this.ops.success&&this.ops.success(o);
            };
        }else{
            this.showSuccess(res);
        };
    }
    /*
     * 展示成功信息
     */
    showSuccess(data){
        this.loading&&this.loading.hide();
        this.result&&this.result.hide();
        this.ops.success&&this.ops.success(data);
    }
    /*
     * 展示错误信息
     */
    showError(msg,fn,flag){
        this.loading&&this.loading.hide();
        this.initResult(msg,flag);
        fn&&fn(msg);
    }
    /*
     * 创建result
     */
    initResult(msg,flag){
        this.ops.result=this.ops.result||{};
        if(!this.ops.result.disabled){
            if(!this.result){
                this.result=new Vue.Components.Result({
                    target:this.el,
                    msg:msg,
                    ...this.ops.result,
                    ...{
                        buttonable:flag==undefined?true:flag
                    },
                    refreshCallBack:()=>{
                        this.initLoading();
                        this.resetSend();
                    }
                }).init();
            }else{
                this.result.set(msg).show();
            };
        };
    }
    /*
     * 重新发送
     */
    resetSend(){
        if(this.ops.loading&&this.ops.loading.enabled){
            this.initLoading();
        };
        this.result&&this.result.hide();
        this.initSend();
    }
    /*
     * 创建loading
     */
    initLoading(){
        if(!this.loading){
            this.loading=new Vue.Components.Loading({
                ...this.ops.loading,
                target:this.el
            }).init();
        }else{
            this.loading.show();
        };
    }
    /*
     * 关闭
     */
    close(){
        this.loading&&this.loading.close();
        this.result&&this.result.close();
    }
    /*
     * 刷新
     */
    refresh(param){
        this.ops=param;
        this.resetSend();
    }
}

export default {
    bind:(el,binding)=>{
        if(!el.ajax){
            el.ajax=new Ajax(el,binding.arg||'post',binding.value);
        };
    },
    update:(el,binding)=>{
        if(el.ajax&&(binding.oldValue!=binding.value)){
            if(binding.modifiers&&binding.modifiers.autoRefresh){
                el.ajax.refresh(binding.value);
            };
        };
    },
    unbind:(el)=>{
        if(el.ajax){
            el.ajax.close();
            delete el.ajax;
        };
    }
};
