/*
 * 全局mutations
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import * as types from '../type';
import {
    LocalStorage
} from "@/utils/storage";

export default {
    [types.INIT_LOADING](state,urls){
        state.loadingList = urls
    },
    /*
     * 语言设置
     */
    setLanguage(state,language){
        state.language=language;
        LocalStorage.set('language',language);
    },
    /*
     * 用户信息设置
     */
    setUserInfo(state,obj){
        state.userInfo=obj;
        LocalStorage.set('__userInfo__',obj);
    },
    /*
     * 用户账户设置
     */
    setAccountInfo(state,{status,account,expire}){
        if(status){
            state.account=account;
            LocalStorage.set('__account__',account,expire);
        }else{
            state.account=null;
            LocalStorage.clear('__account__');
        };
    },
    /*
     * 设置用户权限匹配菜单
     */
    setMenuList(state,obj){
        state.menuList=obj;
        LocalStorage.set('__menuList__',obj);
    },
    /*
     * 设置用户权限匹配路由
     */
    setRouteList(state,obj){
        state.routeList=obj;
        LocalStorage.set('__routeList__',obj);
    },
    /*
     * 清除用户信息
     */
    clearUserInfo(state){
        state.userInfo=null;
        LocalStorage.clear('__userInfo__');
    },
    /*
     * 清除用户权限匹配菜单
     */
    clearMenuList(state){
        state.menuList=null;
        LocalStorage.clear('__menuList__');
    },
    /*
     * 清除用户权限匹配路由
     */
    clearRouteList(state){
        state.routeList=null;
        LocalStorage.clear('__routeList__');
    },
    /*
     * 设置是否动态加载过菜单
     */
    setMenuStatus(state,status){
        state.loadMenued=status;
    },
    /*
     * 设置登录状态
     */
    setLoginStatus(state,{status,token,expires}){
        state.isLogin=status;
        if(status){
            state.token=token;
            LocalStorage.set('__token__',token,expires);
        }else{
            state.token=null;
            LocalStorage.clear('__token__');
        };
    },
    /*
     * 字典设置
     */
    setDictionary(state,{key,value}){
        state.dictionary[key]=value;
    },
    /*
     * 状态设置
     */
    setState(state,{key,value}){
        state[key]=value;
    },
    /*
     * 按钮权限设置
     */
    setAuthButton(state,value){
        state.AUTH=value;
        LocalStorage.set('__AUTH__',value);
    },
    /*
     * 记录模糊搜索
     */
    setSuggest(state,{type,value}){
        let o=state.SUGGEST||{};
        o[type]=o[type]||[];
        for(let i=0;i<o[type].length;i++){
            if(o[type][i].value==value.value){
                return;
            };
        };
        o[type].push(value);
        state.SUGGEST=o;
        LocalStorage.set('__SUGGEST__',o);
    }
}
