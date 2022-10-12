/*
 * 请求api列表
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import common from './src/common';
import test from './src/test';
import home from './src/home';
import my from './src/my';
import share from './src/share';
import book from './src/book';

export default {
    ...common,
    ...test,
    ...home,
    ...my,
    ...share,
    ...book
};
