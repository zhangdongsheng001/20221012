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
	 * 列表数据
	 */
	list:Array,

	/*
	 * 标题
	 */
	title:String,

	/*
	 * 默认值
	 */
	value:[String,Number,Array],

	/*
	 * 确认钩子
	 */
	sure:Function,

	/*
	 * 取消钩子
	 */
	cancel:Function
}
