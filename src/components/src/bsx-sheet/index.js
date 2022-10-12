/*
 * Sheet插件
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import sheet from './src';
import config from './config';
import {
	createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Sheet {
	constructor(ops){
		this.id=createRandomUid();
		this.ops=extend(true,{},this.getDefault(),ops);
	}
    /*
     * 初始化
     */
    init(){
		this.args=[].slice.call(arguments,0);
		this.sheetInstance=this.registerComponent();
		document.body.appendChild(this.sheetInstance.$el);
		this.show();
		Sheet.cache=Sheet.cache||{};
		Sheet.cache[this.id]=this;
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
	 * 注册内置组件并绑定数据
	 */
	registerComponent(){
		let	sheetContructor=Vue.extend({
			...sheet,
			router,
			store
		});
		return new sheetContructor({
			propsData:{
				actions:this.ops.actions
			},
			methods:{
				__remove:this.remove.bind(this)
			}
		}).$mount();
	}
    /*
     * 移除sheet
     */
    remove(){
        if(this.sheetInstance){
			this.sheetInstance.$destroy();
			delete Sheet.cache[this.id];
			if(this.sheetInstance.$el&&this.sheetInstance.$el.parentNode){
				this.sheetInstance.$el.parentNode.removeChild(this.sheetInstance.$el);
			};
            this.ops.close&&this.ops.close.apply(this,this.args);
        };
    }
	/*
     * 显示sheet
     */
	show(){
		this.sheetInstance&&this.sheetInstance.show();
        return this;
	}
    /*
     * 关闭sheet
     */
	close(){
		this.sheetInstance&&this.sheetInstance.close();
		return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Sheet.close=()=>{
	if(Sheet.cache){
		Object.keys(Sheet.cache).map(id=>{
	        Sheet.cache[id]&&Sheet.cache[id].close();
	    });
	};
};

export default Sheet;
