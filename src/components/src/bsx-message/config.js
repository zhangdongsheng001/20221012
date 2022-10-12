/*
 * 提示框插件-默认配置
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
	 * 按钮文字
	 */
	buttonText:{
		type:String,
		default:'确定'
	},

	/*
	 * 确认钩子
	 */
	sure:Function,

	/*
	 * 关闭钩子
	 */
	close:Function
}
