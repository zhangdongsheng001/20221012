/*
 * 全局请求api
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
export default {
    /*
     * login 登录 @xieli
     */
    //'login': './data/login.json',
    'login': '/customer_public_global_mgr',
    /*
     * 根据用户权限获取菜单 @xieli
     */
    'menu': './data/menu.json',
    /*
     * 公共促销字典 @xieli
     */
    'common.promotion': '/mgr_public_platform_global',
    /*
     * 中间跳转 @xieli
     */
    'common.middle': '/customer_public_global_mgr',
    /*
     * 扫码 @xieli
     */
    'common.scan': '/customer_public_goods_mgr',
    /*
     * 切换门店 @xieli
     */
    'common.shop.switch': '/customer_public_global_mgr',
    /*
     * 门店信息 @xieli
     */
    'common.shop.info': '/customer_public_base_info_mgr',
    /*
     * 去评价 @xieli
     */
    'common.evaluate': '/customer_public_order_mgr',
    /*
     * 获取评价数量 @xieli
     */
    'common.estimate': '/customer_public_order_mgr',
    /*
     * 获取购物车数量 @xieli
     */
    'common.shopping': '/customer_public_order_mgr',
    /*
     * 修改购物车-按钮 @xieli
     */
    'common.shopping.modify.step': '/customer_public_order_mgr',
    /*
     * 修改购物车-输入框 @xieli
     */
    'common.shopping.modify.input': '/customer_public_order_mgr',
    /*
     * 修改购物车信息 @xieli
     */
    'common.shopping.info': '/customer_public_order_mgr',
    /*
     * 删除订单对应优惠券 @xieli
     */
    'common.order.quan.delete': '/customer_public_order_mgr',
    /*
     * 购物车-支付 @xieli
     */
    'common.shopping.pay': '/customer_public_order_mgr',
    /*
     * 购物车-支付-现金 @xieli
     */
    'common.shopping.pay.cash': '/customer_public_order_mgr',
    /*
     * 购物车-支付-支付宝 @xieli
     */
    'common.shopping.pay.alipay': '/alipay_4_cust',
    /*
     * 购物车-支付-微信 @xieli
     */
    'common.shopping.pay.weichat': '/weichat_input_pay',
    /*
     * 购物车-支付-h5 @xieli
     */
    'common.shopping.pay.h5': '/weichat_input_pay',
    /*
     * 分享 @xieli
     */
    'common.share': '/weichat_input_pay',
    /*
     * 请求失败 @xieli
     */
    'error': './data/error.json',
    /*
     * 请求成功没数据 @xieli
     */
    'no.list': './data/no-list.json'
}
