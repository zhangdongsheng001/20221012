/*
 * bsx-ui 组件库
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */

import Confirm from './src/bsx-confirm';
import Message from './src/bsx-message';
import Toast from './src/bsx-toast';
import Loading from './src/bsx-loading';
import Result from './src/bsx-result';
import Sheet from './src/bsx-sheet';
import Select from './src/bsx-select';
import SelectLeft from './src/bsx-select-left';
import SelectCity from './src/bsx-select-city';
import Checkbox from './src/bsx-checkbox';
import Radio from './src/bsx-radio';
import Bigpic from './src/bsx-bigpic';
import ResultComponent from './src/bsx-result/src';
import LoadingComponent from './src/bsx-loading/src';

let bsxUI={
	Confirm,
	Message,
	Toast,
	Loading,
	Result,
	Sheet,
	Select,
	Bigpic,
	SelectLeft,
	SelectCity
};

let components={
	ResultComponent,
	LoadingComponent
};

export default {
	install(Vue,options){
		Object.keys(bsxUI).map(key=>{
			let name=key.replace(/^[A-Z]/g,function(a,b){
			   return `$$${a.toLowerCase()}`;
		    });
			Vue.prototype[name]=function(ops){
				let instance=new bsxUI[key](ops);
				return instance.init.apply(instance,[].slice.call(arguments,1));
			};
			Vue.Components=Vue.Components||{};
			Vue.Components[key]=bsxUI[key];
			Vue.prototype[name][key]=bsxUI[key];
		});
		Object.keys(components).map(key=>{
			Vue.component(components[key].name,components[key]);
		});
	}
};
