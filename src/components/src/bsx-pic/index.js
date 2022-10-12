/*
 * Pic框插件
 *
 */
// import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import pic from './src';
import config from './config';
import {
	createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Pic {
	constructor(ops){
		this.id=createRandomUid();
		this.ops=extend(true,{},this.getDefault(),ops);
	}
    /*
     * 初始化
     */
    init(){
		console.log(222)
		console.log(this.ops.content)
		this.args=[].slice.call(arguments,0);
		if(this.ops.content&&this.ops.content.length){
			this.picInstance=this.registerComponent();
			document.body.appendChild(this.picInstance.$el);
			this.show();
			Pic.cache=Pic.cache||{};
			Pic.cache[this.id]=this;
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
	/* registerComponent(){
		let	picContructor=Vue.extend({
			...pic,
			router,
			store
		});
		return new picContructor({
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
	} */
	/*
     * pic-cancel
     */
   /* cancel({node,close}){
        this.ops.cancel&&this.ops.cancel.apply(this,[node,close].concat(this.args));
    } */
	/*
     * pic-sure
     */
   /* sure({node,close}){
        this.ops.sure&&this.ops.sure.apply(this,[node,close].concat(this.args));
    } */
    /*
     * 移除pic
     */
    remove(){
        if(this.picInstance){
			this.picInstance.$destroy();
			delete Pic.cache[this.id];
			if(this.picInstance.$el&&this.picInstance.$el.parentNode){
				this.picInstance.$el.parentNode.removeChild(this.picInstance.$el);
			};
            this.ops.close&&this.ops.close.apply(this,this.args);
        };
    }
	/*
     * 显示pic
     */
	show(){
		this.picInstance&&this.picInstance.show();
		return this;
	}
    /*
     * 关闭pic
     */
	close(){
		this.picInstance&&this.picInstance.close();
		return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Pic.close=()=>{
	if(Pic.cache){
		Object.keys(Pic.cache).map(id=>{
	        Pic.cache[id]&&Pic.cache[id].close();
	    });
	};
};

export default Pic;
