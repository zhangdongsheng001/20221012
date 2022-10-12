/*
 * storage操作
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import Crypto from './crypto';
import {
	JsonToString,
	StringToJson
} from '@/utils/tool';

class Storage {
    constructor(storage){
		this.storage=storage;
	}

    /*
	 * 写入
	 * @expire 时间戳(毫秒)
	 */
    set(key,value,expire){
        this.storage.setItem(key.toString(),Crypto.encrypt({
            value:value,
            time:+new Date,
            expire:expire
        }));
    }

    /*
	 * 读取
	 * @return isExpired ==> 是否过期
	 */
    read(key){
        let data=this.storage.getItem(key.toString());
        if(data){
            data=Crypto.decrypt(data);
            if(data.expire&&(data.expire<=new Date().getTime()-data.time)){
                localStorage.removeItem(key.toString());
                return null;
            }else{
                return data.value;
            };
        };
        return null;
    }

    /*
	 * 删除
	 * @key 不传则删除所有
	 */
    clear(key){
        if(key){
            this.storage.removeItem(key.toString());
        }else{
            this.storage.clear();
        };
    }
}

/*
 * LocalStorage
 */
export const LocalStorage=new Storage(localStorage);

/*
 * SessionStorage
 */
export const SessionStorage=new Storage(sessionStorage);
