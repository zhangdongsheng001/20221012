/*
 * Confirm框插件
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import confirm from './src';
import config from './config';
import {
	createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Confirm {
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
			this.confirmInstance=this.registerComponent();
			document.body.appendChild(this.confirmInstance.$el);
			this.show();
			Confirm.cache=Confirm.cache||{};
			Confirm.cache[this.id]=this;
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
		let	confirmContructor=Vue.extend({
			...confirm,
			router,
			store
		});
		return new confirmContructor({
			propsData:{
				content:this.ops.content,
				title:this.ops.title,
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
     * confirm-cancel
     */
    cancel({node,close}){
        this.ops.cancel&&this.ops.cancel.apply(this,[node,close].concat(this.args));
    }
	/*
     * confirm-sure
     */
    sure({node,close}){
        this.ops.sure&&this.ops.sure.apply(this,[node,close].concat(this.args));
    }
    /*
     * 移除confirm
     */
    remove(){
        if(this.confirmInstance){
			this.confirmInstance.$destroy();
			delete Confirm.cache[this.id];
			if(this.confirmInstance.$el&&this.confirmInstance.$el.parentNode){
				this.confirmInstance.$el.parentNode.removeChild(this.confirmInstance.$el);
			};
            this.ops.close&&this.ops.close.apply(this,this.args);
        };
    }
	/*
     * 显示confirm
     */
	show(){
		this.confirmInstance&&this.confirmInstance.show();
		return this;
	}
    /*
     * 关闭confirm
     */
	close(){
		this.confirmInstance&&this.confirmInstance.close();
		return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Confirm.close=()=>{
	if(Confirm.cache){
		Object.keys(Confirm.cache).map(id=>{
	        Confirm.cache[id]&&Confirm.cache[id].close();
	    });
	};
};

export default Confirm;
