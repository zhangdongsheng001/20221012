/*
 * 公共请求
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
// import Vue from 'vue';
// import axios from 'axios';
import {
    LocalStorage
} from '@/utils/storage';
import router from '@/router';
import store from '@/store';
import {
    goLogin,
    extend,
    checkLogin,
	JsonToString,
	StringToJson,
    isString
} from '@/utils/tool';
import api from './api';
import {baseUrl, TIME_OUT} from './const';

class HTTP {
    /*
     * 初始化
     */
    constructor(ops){
        this.ops=extend({},true,{
            url:null,
            data:null,
            name:null,
            login:{
                mini:false,
                redirect:true
            },
            cancel:true,
            loading:{
                enabled:false,
                target:null
            }
        },ops);
        this.ops.url=this.ops.url||api[this.ops.name];
        this.ops.baseUrl=baseUrl;
        this.instance=axios.create({
            baseURL:this.ops.baseUrl,
            timeout:this.ops.timeout||TIME_OUT,
            cancelToken:new axios.CancelToken(c=>{
                Vue.$httpRequestList=Vue.$httpRequestList||[];
                Vue.$httpRequestList.push({
                    flag:this.ops.cancel,
                    route:router.currentRoute,
                    request:c
                });
            }),
            withCredentials:false
        });
        // if(this.ops.data){
        //     this.ops.data={
        //         jsonParam:JsonToString(Object.assign({
        //             t:+new Date
        //         },this.ops.data))
        //     };
        // };
        this.createLoading();
        this.beforeSend();
        this.response();
    }
    /*
     * 请求拦截统一处理
     */
    beforeSend(){
        this.instance.interceptors.request.use(config=>{
            config.data=Object.assign(config.data||{},{
                __t:new Date().getTime()
            });
            if(config.data&&config.method=='post'){
                // Object.keys(config.data).map((item)=>{
                //     config.data[item]=JsonToString(config.data[item]);
                // });
                config.data=Qs.stringify(config.data);
            };
            config.headers={
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept-Language':store.state.global.language
            };
            if(this.ops.auth){
                if(checkLogin()){
                    config.headers.Authorization=store.state.global.token;
                    return config;
                }else{
                    if(this.ops.login.mini){
                        this.refresh=true;
                        return Promise.reject({
                            message:'interrupt'
                        });
                    }else{
                        goLogin(router.currentRoute,router.currentRoute.meta.auth);
                    };
                };
            }else{
                return config;
            };
        }, error => {
            return Promise.reject(error);
        });
    }
    /*
     * 请求结果统一处理
     */
    response() {
        this.instance.interceptors.response.use(response => {
            this.loading&&this.loading.close();
            if (this.ops.url) {
                if (response.status == 200 && response.data) {
                    if (isString(response.data)) {
                        return response.data;
                    }else{
                        if(response.data.status==0){
                            return {
                                result:response.data.returnData,
                                response:response.data
                            };
                        }else if(response.data.status==999201){//token失效
                            if(this.ops.login.redirect){
                                goLogin(router.currentRoute,true);
                            };
                            return Promise.reject(response.data);
                        }else{
                            return Promise.reject(response.data);
                        };
                    };
                } else {
                    if(response.data==''){
                        response.msg='无数据返回!';
                    }else{
                        response.msg = response.message || response.statusText;
                    };
                    return Promise.reject(response);
                };
            } else {
                return Promise.reject({
                    msg: '请求地址不存在!'
                });
            };
        },error=>{
            this.loading&&this.loading.close();
            if(error){
                if(error.message&&error.message=='interrupt'){
                    //error.msg='请求中断';
                }else{
                    if(error.message.includes('timeout')){
                        error.msg=`${this.ops.url}:请求超时`;
                    };
                    if(error.response){
                        error.msg=`${this.ops.url}:${(error.response.data&&error.response.data.msg)||error.response.statusText}`;
                    };
                };
            }else{
                error={
                    msg:`${this.ops.url}:未知错误故障`
                };
            };
            return Promise.reject(error);
        });
    }
    /*
     * 创建loading
     */
    createLoading(){
        if(this.ops.loading.enabled&&!this.loading){
            this.loading=new Vue.Components.Loading({
                target:this.ops.loading.target,
                size:this.ops.loading.size,
                text:this.ops.loading.text
            }).init();
        };
    }
    /*
     * 返回promise
     */
    resolve(method){
        return new Promise((resolve,reject)=>{
            this.send(method,resolve,reject);
        });
    }
    /*
     * 发送请求
     */
    send(method,resolve,reject){
        let time=process.env.NODE_ENV=='development'?500:0;
        this[method]().then(result=>{
            setTimeout(()=>{
                resolve(result);
            },time);
        }).catch(error=>{
            setTimeout(()=>{
                if(this.refresh){
                    delete this.refresh;
                    this.createLoading();
                    Login().then(res=>{
                        this.send(method,resolve,reject);
                    }).catch(error=>{
                        reject(error);
                    });
                }else{
                    reject(error);
                };
            },time);
        });
    }
    /*
     * post提交
     */
    post(){
        return this.instance.post(this.ops.url,this.ops.data);
    }
    /*
     * get提交
     */
    get() {
        return this.instance.get(this.ops.url, {
            params: this.ops.data
        });
    }
    /*
     * put提交
     */
    put() {
        return this.instance.put(this.ops.url, this.ops.data);
    }
    /*
     * delete提交
     */
    delete() {
        return this.instance.delete(this.ops.url, {
            params: this.ops.data
        });
    }
    /*
     * download提交
     */
    download() {
        return this.instance({
            method: 'get',
            url: this.ops.url,
            responseType: 'blob'
        });
    }
};

/*
 * axios请求方法
 */
const http=(()=>{
    let o={};
    'get,post,put,delete,download'.split(',').forEach(key=>{
        o[key]=(ops)=>{
            return new HTTP(ops).resolve(key);
        };
    });
    return o;
})();

Vue.Components=Vue.Components||{};
Vue.Components.http=Vue.prototype.$http=http;

/*
 * axios请求方法
 */
export default http;
