/*
 * loading插件
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import loading from './src';
import config from './config';
import {
    createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Loading {
	constructor(ops){
        this.id=createRandomUid();
		this.ops=extend(true,{},this.getDefault(),ops);
        this.ops.position=this.ops.target?'absolute':'fixed';
	}
    /*
     * 初始化
     */
    init(){
        this.args=[].slice.call(arguments,0);
		this.bindContainerData();
        (this.ops.target||document.body).appendChild(this.loadingInstance.$el);
        this.loadingInstance.show();
        Loading.cache=Loading.cache||{};
        Loading.cache[this.id]=this;
        return this;
    }
    /*
     * 获取默认数据
     */
    getDefault(){
 		let o={};
 		Object.keys(config).map(key=>{
 			o[key]=isPlainObject(config[key])?isFunction(config[key].default)?config[key].default():config[key].default:null;
 		});
 		return o;
 	}
    /*
	 * 绑定dialog数据
	 */
	bindContainerData(){
		let loadingComponent=Vue.extend(loading);
		this.loadingInstance=new loadingComponent({
			propsData:{
                ...this.ops,
                id:this.id
			},
			methods:{
				remove:this.remove.bind(this)
			}
		}).$mount();
	}
    /*
     * 设置loading样式
     */
    setStyle(props){
        if(this.loadingInstance&&props){
            Object.keys(props).forEach(key=>{
                if(this.ops.hasOwnProperty(key)){
                    this.loadingInstance[key]=props[key];
                };
            });
        };
    }
    /*
     * 移除loading
     */
    remove(){
        if(this.loadingInstance){
            delete Loading.cache[this.id];
            if(this.loadingInstance.$el&&this.loadingInstance.$el.parentNode){
                this.loadingInstance.$el.parentNode.removeChild(this.loadingInstance.$el);
            };
            delete this.containerInstance;
        };
    }
    /*
     * 显示loading
     */
	show(){
		this.loadingInstance&&this.loadingInstance.show();
        return this;
	}
    /*
     * 隐藏loading
     */
	hide(){
		this.loadingInstance&&this.loadingInstance.hide();
        return this;
	}
    /*
     * 关闭loading
     */
	close(){
		this.loadingInstance&&this.loadingInstance.close();
        return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Loading.close=()=>{
    if(Loading.cache){
        Object.keys(Loading.cache).map(id=>{
            Loading.cache[id]&&Loading.cache[id].close();
        });
    };
};

export default Loading;
