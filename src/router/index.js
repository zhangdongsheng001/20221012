/*
 * 路由全局操作
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '@/store'
import {staticRoute,errorRoute,screenRoute} from './src'
import {
    goLogin,
    checkLogin
} from '@/utils/tool';
Vue.use(VueRouter);

let getRouter=(list,res=[],path,index)=>{
    path=path||list.map(()=>[]);
    list.forEach((item,i)=>{
        let _index=index==undefined?i:index,
            _path=index==undefined?path[_index]:path;
        if(index!=undefined){
            if(!i){
                _path.push(item.path);
            }else{
                _path[_path.length-1]=item.path;
            };
        }else{
            _path.push(item.path);
        };
        _path=JSON.parse(JSON.stringify(_path));
        res.push({
            title:item.title,
            path:`/${_path.join('/')}`,
            name:`${_path.join('/')}`,
            meta:{
                auth:true,
                parentId:item.parentId,
                id:item.id,
                aaa:`@/views/content/${_path.join('/')}/index`
            },
            component:()=>import(`@/views/content/${_path.join('/')}/index`)
        });
        if(item.children&&item.children.length){
            getRouter(item.children,res,JSON.parse(JSON.stringify(_path)),_index);
        };
    });
    return res;
};

const createRouter=(routes)=>new VueRouter({
    routes
});

/*
 * 中断请求队列
 */
const cancelRequest=(from,to,msg='interrupt')=>{
    if(to.name!=from.name){
        if(Vue.$httpRequestList&&Vue.$httpRequestList.length){
            Vue.$httpRequestList=Vue.$httpRequestList.filter(item=>{
                if(item.flag&&item.route.name==from.name){
                //if(item.flag&&item.route.fullPath==from.fullPath){
                    item.request('interrupt');
                    return false;
                };
                return true;
            });
        };
    };
};

let router = createRouter([staticRoute]);

router.afterEach((to,from)=>{
    if(Vue.Components){
        Object.keys(Vue.Components).map(key=>{
            let component=Vue.Components[key];
            component&&component.close&&component.close();
        });
    };
    //cancelRequest(from,to);
});

let goInTo=(next,from,to)=>{
    // if(Vue.__cacheList){
    //     if(from.name==to.name){
    //
    //     }else{
    //         next();
    //     };
    // }else{
    //     if(!to.meta.discache){
    //         router.replace({
    //             name:'loading'
    //         });
    //     }else{
    //         if(from.name==to.name){
    //
    //         }else{
    //             next();
    //         };
    //     };
    // };
    if(from.fullPath!=to.fullPath){
        next();
    };
};

router.beforeEach((to,from,next)=>{
    //console.log('to.path',to.path)
    let flag=false;
		//let flag=true;
    for(let i=0;i<staticRoute.children.length;i++){
        if(to.path==staticRoute.children[i].path&&!staticRoute.children[i].meta.auth){
            flag=true;
            break;
        };
    };
    //console.log('flag',flag)
    if(flag){
        goInTo(next,from,to);
    }else{
        if(!store.state.global.loadMenued){
            if(store.state.global.menuList){
                let routeList=getRouter(store.state.global.menuList);
                routeList=[...screenRoute,...routeList];
                router.options.routes[0].children.push(...routeList);
                router.options.routes=[...router.options.routes,...errorRoute];
                router.matcher=createRouter([]).matcher;
                store.commit('setRouteList',routeList);
                store.commit('setMenuStatus',true);
                router.addRoutes(router.options.routes);
                if(to.path!='/'){
                    return router.push(to.fullPath);
                };
            }else{
                return goLogin(to,true);
            };
        };
        if(to.meta.auth){
            if(checkLogin()){
                goInTo(next,from,to);
            }else{
                goLogin(to,true);
            };
        }else{
            goInTo(next,from,to);
        };
    };
})

export default router;
