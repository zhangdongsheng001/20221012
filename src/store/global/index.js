/*
 * 全局vuex
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}
