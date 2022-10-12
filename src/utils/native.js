/*
 * native操作
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
// import Vue from 'vue';
import {
    browser,
    isFunction
} from './tool';

const Native={};

if(browser.isInstalledApp){
    const apiNameMap={
        share:'appShare',
        scan:'appScan',
        getGPS:'appGetGPS',
        appBack:'appBack',
        weChatSign:'appWeChatSign',
        aLiSign:'appALiSign',
        cookieClear:'appCookieClear',
        exitLogin:'exitLogin',
        idSnsPush:'idSnsPush'
    };

    const nativeBridge=(name,param,cbName)=>{
        let wkParam;
        if(name=='appShare'||name=='idSnsPush'){
            wkParam=param;
        }else{
            wkParam=JSON.stringify(param);
        };
        if(browser.versions.android){
            window.JSInterface[name](cbName,JSON.stringify(param||{}));
        }else if(browser.versions.ios){
            // 最新写法2020年3月20 10点 这边主要是把两个数据，撮合起来，弄成一个数组，否则的话，无法对发送的数据进行区分。
            window.webkit.messageHandlers[name].postMessage({
                fun:cbName,
                arg:{
                    callback:wkParam
                }
            });
        };
    };

    const callNative=(name,param,callback)=>{
        if(!isFunction(callback)){
            callback=param||function(){};
        };
        let cbName=`_NATIVE_CB_${name}`;
        window[cbName]=data=>{
            console.log('native-----data的值：',data);
            callback(data);
        };
        try{
            nativeBridge(name,param,cbName);
        }catch(e){
            window[cbName]();
        };
    };

    Object.keys(apiNameMap).map(key=>{
        Native[key]=(param,callback)=>{
            callNative(apiNameMap[key],param,callback);
        };
    });

    Vue.Components=Vue.Components||{};
    Vue.Components.Native=Vue.prototype.$native=Native;
};

export default Native;
