/*
 * loading插件-默认配置
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {

	/*
	 * loading需要覆盖的 DOM 节点
	 */
	target:{
		default(){
			return null;
		}
	},

	/*
	 * 路径颜色
	 */
	color:String,

	/*
	 * 尺寸
	 */
	size:{
 		type:Number,
 		default:40
 	},

	/*
	 * 覆盖层背景颜色
	 */
	masterBackground:{
 		type:String,
 		default:'rgba(0,0,0,0.3)'
 	},

	/*
	 * 盒子背景颜色
	 */
	boxBackground:{
  		type:String,
  		default:'rgba(0,0,0,0.4)'
  	},

	/*
	 * 是否显示文字
	 */
	showText:{
		type:Boolean,
 		default:true
	},

	/*
	 * 显示文字
	 */
	text:String,

	/*
	 * 是否独立存在
	 */
	alone:{
		type:Boolean,
 		default:false
	},

	/*
	 * 自动关闭时间
	 */
	time:{
		type:Number,
  		default:null
	}
}
