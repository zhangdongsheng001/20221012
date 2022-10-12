/*
 * 全局指令
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */

// import Vue from 'vue';
import loadings from './loadings';
import ajax from './ajax';

let directive={
    loadings,
    ajax
};

Object.keys(directive).map(key=>{
    Vue.directive(key,directive[key]);
});
