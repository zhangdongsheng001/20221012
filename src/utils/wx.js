/*
 * weixin操作
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
// import Vue from 'vue';
import wx from 'weixin-js-sdk';
import {
    browser
} from './tool';

const Weixin={};

if(browser.isWeixin||browser.isMiniProgram){
    Vue.Components=Vue.Components||{};
    Vue.Components.Weixin=Vue.prototype.$wx=wx;
};

export default Weixin;
