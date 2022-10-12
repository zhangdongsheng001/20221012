/*
 * checkbox插件-默认配置
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {
	/*
	 * 值
	 */
	value:{
	    type:[String,Boolean],
	    default:false
	},
	/*
	 * 是否禁用
	 */
	disabled:{
		type:Boolean,
	    default:false
	},
	/*
	 * indeterminate状态
	 */
	indeterminate:{
		type:Boolean,
	    default:false
	}
}
