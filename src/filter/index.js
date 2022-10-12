/*
 * 全局过滤器
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import {
    formatDate,
    setDecimalBit,
    formatNumber,
    isArray,
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isPlainObject
} from '@/utils/tool';

const filter={
    /*
     * 格式化字符串
     */
    formatText(text,str='-'){
        return ((isString(text)&&text.length)||isNumber(text))?text:str;
    },

    /*
     * 格式化数字  1234 =>1,234.00
     */
    formatNumber(number,bits,str='-'){
        return number!=null&&number!=NaN&&number!=undefined&&number!='undefined'&&number!==''?formatNumber(number,bits):str;
    },

    /*
     * 保留小数  1.256 => 1.26
     */
    setDecimalBit(number,bits,str='-'){
        return isNumber(number)?setDecimalBit(number||0,bits):str;
    },

    /*
     * 格式化日期
     */
    formatDate(date=new Date(),format='YYYY-MM-DD'){
        return formatDate(date,format);
    }
};

Object.keys(filter).map(key=>{
    Vue.filter(key,filter[key]);
});

export default filter;
