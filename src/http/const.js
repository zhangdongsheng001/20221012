/*
 * 公共静态数据
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */

/*
 * 根地址-普通
 */
export const baseUrl={
	//development:'http://app10.downline.cn/wholefarm_demo_project_005',
	//development:'https://app.downline.cn',
	development:'./',
	//production:'http://app10.downline.cn/wholefarm_demo_project_005',
	//production:process.env.VUE_APP_HOST
	//production:`${window.location.origin}/wholefarm_demo_project_005`
	production:function(){
    	if(location.pathname.split('/')[1].indexOf('wholefarm')==-1){
    		return '/'
    	}else{
    		return '/'+location.pathname.split('/')[1]+'/'
    	}
    }()
}[process.env.NODE_ENV];

// export const baseUrl=process.env.NODE_ENV=='development'?'./':process.env.VUE_APP_HOST;

/*
 * 超时时间
 */
export const TIME_OUT=60000;
