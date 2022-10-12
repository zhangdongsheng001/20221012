/*
 * Bigpic框插件
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import bigpic from './src';
import config from './config';
import {
	createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Bigpic {
	constructor(ops){
		this.id=createRandomUid();
		this.ops=extend(true,{},this.getDefault(),ops);
	}
    /*
     * 初始化
     */
    init(){
		this.args=[].slice.call(arguments,0);
		if(this.ops.content&&this.ops.content.length){
			this.bigpicInstance=this.registerComponent();
			document.body.appendChild(this.bigpicInstance.$el);
			this.show();
			Bigpic.cache=Bigpic.cache||{};
			Bigpic.cache[this.id]=this;
		};
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
		let	bigpicContructor=Vue.extend({
			...bigpic,
			router,
			store
		});
		return new bigpicContructor({
			propsData:{
				content:this.ops.content,
				sureText:this.ops.sureText,
				cancelText:this.ops.cancelText,
				autoClose:this.ops.autoClose
			},
			methods:{
				__remove:this.remove.bind(this),
				__sure:this.sure.bind(this),
				__cancel:this.cancel.bind(this)
			}
		}).$mount();
	}
	/*
     * bigpic-cancel
     */
    cancel({node,close}){
        this.ops.cancel&&this.ops.cancel.apply(this,[node,close].concat(this.args));
    }
	/*
     * bigpic-sure
     */
    sure({node,close}){
        this.ops.sure&&this.ops.sure.apply(this,[node,close].concat(this.args));
    }
    /*
     * 移除bigpic
     */
    remove(){
        if(this.bigpicInstance){
			this.bigpicInstance.$destroy();
			delete Bigpic.cache[this.id];
			if(this.bigpicInstance.$el&&this.bigpicInstance.$el.parentNode){
				this.bigpicInstance.$el.parentNode.removeChild(this.bigpicInstance.$el);
			};
            this.ops.close&&this.ops.close.apply(this,this.args);
        };
    }
	/*
     * 显示bigpic
     */
	show(){
		this.bigpicInstance&&this.bigpicInstance.show();
		return this;
	}
    /*
     * 关闭bigpic
     */
	close(){
		this.bigpicInstance&&this.bigpicInstance.close();
		return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Bigpic.close=()=>{
	if(Bigpic.cache){
		Object.keys(Bigpic.cache).map(id=>{
	        Bigpic.cache[id]&&Bigpic.cache[id].close();
	    });
	};
};

export default Bigpic;
