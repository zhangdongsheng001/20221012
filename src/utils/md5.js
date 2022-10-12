/*
 * md5加密操作,不可逆
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import {
	JsonToString
} from '@/utils/tool';
import MD5 from 'js-md5';

export default {

	/*
	 * 加密
	 */
	encrypt(value){
		return MD5(JsonToString(value));
	}
}
