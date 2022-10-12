/*
 * Select插件
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
// import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import select from './src';
import config from './config';
import {
	createRandomUid,
	isPlainObject,
	isFunction,
	extend
} from '@/utils/tool';

class Select {
	constructor(ops){
		this.id=createRandomUid();
		this.ops=extend(true,{},this.getDefault(),ops);
	}
    /*
     * 初始化
     */
    init(){
		this.args=[].slice.call(arguments,0);
		this.selectInstance=this.registerComponent();
		document.body.appendChild(this.selectInstance.$el);
		this.show();
		Select.cache=Select.cache||{};
		Select.cache[this.id]=this;
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
		let	selectContructor=Vue.extend({
			...select,
			router,
			store
		});
		return new selectContructor({
			propsData:{
				title:this.ops.title,
				list:this.ops.list,
				value:this.ops.value
			},
			methods:{
				__remove:this.remove.bind(this),
				__sure:this.sure.bind(this),
				__cancel:this.cancel.bind(this)
			}
		}).$mount();
	}
	/*
     * select-cancel
     */
    cancel(data){
        this.ops.cancel&&this.ops.cancel.apply(this,this.args);
    }
	/*
     * select-sure
     */
    sure(data){
		console.log(data)
		console.log('2222')
        this.ops.sure&&this.ops.sure.apply(this,[data].concat(this.args));
    }
    /*
     * 移除select
     */
    remove(){
        if(this.selectInstance){
			this.selectInstance.$destroy();
			delete Select.cache[this.id];
			if(this.selectInstance.$el&&this.selectInstance.$el.parentNode){
				this.selectInstance.$el.parentNode.removeChild(this.selectInstance.$el);
			};
        };
    }
	/*
     * 显示select
     */
	show(){
		this.selectInstance&&this.selectInstance.show();
        return this;
	}
    /*
     * 关闭select
     */
	close(){
		this.selectInstance&&this.selectInstance.close();
		return this;
	}
    /*
     * 销毁
     */
    destroy(){
        delete this;
    }
};

Select.close=()=>{
	if(Select.cache){
		Object.keys(Select.cache).map(id=>{
	        Select.cache[id]&&Select.cache[id].close();
	    });
	};
};

export default Select;
