/*
 * 缓存图片
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import createJS from 'createjs-cmd';
import {
	isPlainObject,
	isFunction,
	isString
} from '@/utils/tool';

class Cache {
    constructor(files){
		this.cacheList=this.getCacheList(files);
		this.queue=new createJS.LoadQueue();
		this.queue.loadManifest(this.cacheList);
		this.load();
	}
	load(){
		this.queue.on('fileload',e=>{
			e.item.result=e.result;
		});
	}
	progress(fn){
		this.queue.on('progress',e=>{
			fn&&fn(e.progress);
		});
	}
	complete(fn){
		this.queue.on('complete',e=>{
			let o={};
			this.cacheList.map(item=>{
				if(!o[item.id]){
					o[item.id]=item.result;
				};
			});
			fn&&fn(o);
		});
	}
	getCacheList(files){
		return files.map(item=>{
			if(isPlainObject(item)){
				item.src=this.getSrc(item.src);
			}else if(isFunction(item)){
				item=item();
			}else if(isString(item)){
				item={
					id:item.split('.')[0],
					src:this.getSrc(item)
				};
			};
			return {
				id:item.id,
				type:createJS.AbstractLoader[(item.type||'image').toUpperCase()],
				src:item.src
			};
		});
	}
	getSrc(url){
		return require(`@/assets/images/${url}`);
	}
}

/*
 * 缓存
 */
export default files=>{
	let cache=new Cache(files);
	return {
		onProgress(fn){
			cache.progress(fn);
			return this;
		},
		onComplete(fn){
			cache.complete(fn);
			return this;
		}
	};
};
