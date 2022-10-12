/*
 * 公共混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import {
    checkLogin,
    isPlainObject,
    browser
} from '../tool';
import {
    mapMutations,
    mapState,
    mapGetters
} from 'vuex';
import {
    LocalStorage
} from '@/utils/storage';
import filter from '@/filter';
import {
    on,
    off
} from '@/utils/dom';

export default {
    data() {
        return {
            /*
             * 页面基础信息
             */
            baseInfo:{}
        }
    },
    created() {

    },
    computed: {
        ...mapState({
            /*
             * 用户信息
             */
            userInfo: state => state.global.userInfo||{},

            /*
             * 路由列表
             */
            routeList: state => state.global.routeList||[],

            /*
             * 公共字典
             */
            dictionary: state => state.global.dictionary,

            /*
             * 首次资源是否加载完成
             */
            resourceLoaded: state => state.global.resource_loaded

        }),

        /*
         * 是否微信
         */
        isWeixin(){
            return browser.isWeixin;
        },

        /*
         * 是否APP
         */
        isAPP(){
            return browser.isInstalledApp;
        },

        /*
         * 是否android
         */
        isAndroid(){
            return browser.versions.android;
        },

        /*
         * 是否ios
         */
        isIOS(){
            return browser.versions.ios;
        },

        /*
         * 是否小程序
         */
        isMiniProgram(){
            return browser.isMiniProgram;
        },

        /*
         * 是否登录
         */
        isLogin(){
            return checkLogin();
        },
        /*
         * 获取所嵌套路由的各个根节点数组
         */
        $dom(){
            let get=(el,res)=>{
                return el.$parent?get(el.$parent,[...res,el.$parent.$el]):res;
            };
            return get(this,[this.$el]);
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        ...mapMutations([
            'setLanguage',
            'setUserInfo',
            'setAccountInfo',
            'setMenuList',
            'setLoginStatus',
            'setRouteList',
            'setDictionary',
            'setAuthButton',
            'setSuggest',
            'setState'
        ]),

        /*
         * 公共过滤器
         */
        ...filter,

        /*
         * 获取基础数据
         */
        getListInfo(info){
            this.baseInfo=info||{};
        },

        /*
         * 信息确认框
         */
        showConfirm({content,sure,cancel}){
            return this.$$confirm({
                content,
                sure,
                cancel
            });
        },
		/*
		 * 图片放大
		 */
		showBigpic({content,sure,cancel}){
		    return this.$$bigpic({
		        content,
		    });
		},

        /*
         * 信息提示框
         */
        showMessage(content){
            return new Promise((resolve,reject)=>{
                this.$$message({
                    content,
                    sure(node,close){
                        resolve({
                            node,
                            close
                        });
                    }
                });
            });
        },

        /*
         * 状态提示框
         */
        showToast(content,status){
            return new Promise((resolve,reject)=>{
                this.$$toast({
                    content,
                    status,
                    callback(){
                        resolve();
                    }
                });
            });
        },

        /*
         * 格式化字典
         */
        formatFilterArrayList(data){
            let arr=[];
            for(let key in data){
                arr.push({
                    title:data[key],
                    value:key
                });
            };
            return arr;
        }
    },
    beforeDestroy(){

    }
}
