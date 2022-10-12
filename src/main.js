/*
 * 全局初始化
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import './http';
import './filter';
import './directive';
import './utils/native';
import './utils/wx';

/* 引入MintUI组件库 */
import {
    Swipe,
    SwipeItem,
    Lazyload,
    CellSwipe
} from 'mint-ui';
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(CellSwipe.name, CellSwipe);
Vue.use(Lazyload,{
    loading:require('@/assets/images/base/load.png'),
    error:require('@/assets/images/logo.png'),
    attempt:1
});

/* 引入自定义样式 */
import './assets/iconfont/iconfont.css';
import './assets/css/common.less';
import './assets/css/main.less';

/* 引入复制功能 */
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

/* 引入echarts图表 */
// import echarts from 'echarts';
// Vue.prototype.$echarts=echarts;

/* 引入公共基础混入 */
import mixinCommon from './utils/mixins/common';
Vue.mixin(mixinCommon);

/* 引入自定义组件 */
import './components/theme/index.less';
import bsxUI from './components';
Vue.use(bsxUI);

/* 引入FastClick插件 */
// import FastClick from 'fastclick';
// FastClick.attach(document.body);

/* 引入日历插件 */
import Calendar from 'vue-mobile-calendar';
Vue.use(Calendar)

Vue.config.productionTip=false;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
