/*
 * toast插件-默认配置
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {

	/*
	 * 内容
	 */
	content:String,

	/*
	 * 确认文字
	 */
	sureText:{
		type:String,
		default:'确定'
	},

	/*
	 * 取消文字
	 */
	cancelText:{
		type:String,
		default:'取消'
	},

	/*
	 * 是否关闭按钮-点击确认自动关闭
	 */
	autoClose:{
		type:Boolean,
		default:true
	},

	/*
	 * 确认钩子
	 */
	sure:Function,

	/*
	 * 取消钩子
	 */
	cancel:Function,

	/*
	 * 关闭回调
	 */
	close:Function
}
