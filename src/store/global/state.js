/*
 * 全局store
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
import {
    LocalStorage
} from '@/utils/storage';

export default {

    /* 是否登录 */
    isLogin:false,

    /* token */
    token:LocalStorage.read('__token__'),

    /* 账户 */
    account:LocalStorage.read('__account__'),

    /* 用户信息 */
    userInfo:LocalStorage.read('__userInfo__'),

    /* 用户权限匹配菜单 */
    menuList:LocalStorage.read('__menuList__'),

    /* 用户权限匹配路由 */
    routeList:null,

    /* 是否动态加载过菜单 */
    loadMenued:false,
		//loadMenued:true,//静态页面免除登录用

    /* 语言 */
    language:'zh-CN',

    /* 字典 */
    dictionary:{
		zuJin:['不限','1500元以下','1500-2500','2500-4000','4000-6000','6000-8000','8000-10000','10000以上'],
		shangpuzujin:['不限','0.5万以下','0.5-0.8万','0.8-1万','1-1.5万','1.5-2万','2-5万','5万以上'],
		shoujia:['不限','200万以下','200-300万','300-400万','400-500万','500-700万','700-1000万','1000万以上'],
		chuZuLeiXing:{
			1:'合租',
			2:'整租',
			3:'公寓'
		},
		huXing:{
			1:'1室',
			2:'2室',
			3:'3室',
			4:'4室+'
		},
		fangYuanLiangDian:{
			0:'独卫',
			1:'近地铁',
			2:'独立阳台',
			3:'随时看房',
			4:'精装修',
			5:'押一付一',
			6:'业主认证',
			7:'拎包入住'
		},
		fangYuanTool:{
			0:'床',
			1:'空调',
			2:'柜子',
			3:'洗衣机',
			4:'桌',
			5:'冰箱',
			6:'窗帘',
			7:'热水器',
			8:'梳妆台'
		},
		zhuangXiu:{
			0:'豪装',
			1:'精装',
			2:'简装',
			3:'毛坯'
		},
		mianJi:{
			0:'20平以下',
			1:'20-50平',
			2:'50-70平',
			3:'70-90平',
			4:'90-110平',
			5:'110-130平',
			6:'130-150平',
			7:'150平以上'
		},
		chaoXiang:{
			0:'东',
			1:'南',
			2:'西',
			3:'北',
			4:'东南',
			5:'东北',
			6:'西南',
			7:'西北'
		},
		fuJin:{
			0:'不限',
			1:'100米内',
			2:'200米内',
			3:'300米内'
		},
		diTie:{
			0:'不限',
			1:'1号线',
			2:'2号线',
			3:'3号线',
			4:'4号线'
		},
		userType:{
			1:'经纪人',
			2:'职业房东',
			3:'个人',
			4:'管理者',
		},
		userTypeStr:[
			{value:1,name:'经纪人',des:'简介简介简介'},
			{value:2,name:'职业房东',des:'经营者/多房源管理者'},
			{value:3,name:'个人',des:'简介简介简介2'},
		],
		goods_type_obj:{
			1:'合租',
			2:'整租',
			3:'公寓',
			4:'新房',
			5:'二手房',
			6:'商铺办公',
		},
		backType:{
			1:'虚假信息',
			2:'号码有误',
			3:'房已出租',
		},
		xiaoqu:{
			1:'建中小区',
			2:'澳海澜庭',
			3:'碧桂园',
		},
		donghao:{
			1:'1',
			2:'2',
			3:'3',
			4:'4',
			5:'5',
			6:'6',
			7:'7',
			8:'8',
			9:'9',
		},
		fanghao:['A','B','C','D','E','F'],
		yongtu:{
			1:'住宅',
			2:'公寓',
			3:'别墅',
			4:'复式',
			5:'Loft'
		},
		yongjinz:{
			'35%':'35%',
			'50%':'50%',
			'70%':'70%',
			'100%':'100%',
			'150%':'150%',
			'200%':'200%',
		},
		yongjins:{
			'50%':'50%',
			'70%':'70%',
			'100%':'100%',
			'150%':'150%',
			'200%':'200%',
		},
		woshi:{
			1:'主卧',
			2:'次卧',
			3:'客厅',
		},
		jiegou:{
			1:'板房',
			2:'塔房',
		},
		quanshu:{
			1:'商品房',
			2:'房改房',
			3:'集资房'
		},
		

		
		goods_type:[
			{'id_public_goods_type':'0','type_name':'合租','icon':'@/assets/images/test/menu1.png'},
			{'id_public_goods_type':'1','type_name':'整租','icon':'@/assets/images/test/menu2.png'},
			{'id_public_goods_type':'2','type_name':'公寓','icon':'@/assets/images/test/menu3.png'},
			{'id_public_goods_type':'3','type_name':'新房','icon':'@/assets/images/test/menu4.png'},
			{'id_public_goods_type':'4','type_name':'二手房','icon':'@/assets/images/test/menu5.png'},
			{'id_public_goods_type':'5','type_name':'商铺办公','icon':'@/assets/images/test/menu6.png'},
			{'id_public_goods_type':'6','type_name':'搬家','icon':'@/assets/images/test/menu7.png'},
			{'id_public_goods_type':'7','type_name':'保洁','icon':'@/assets/images/test/menu8.png'}
		],
		
		item_user_type:[
			{'id_item_type':'0','item_type_name':'教练员'},
			{'id_item_type':'1','item_type_name':'裁判员'},
			{'id_item_type':'2','item_type_name':'运动员'},
		],
		item_type_obj:{
			0:'篮球',
			1:'足球',
			2:'排球',
			3:'游泳',
			4:'体适能',
			5:'乒乓球',
			6:'羽毛球',
			7:'网球'
		},
		
		item_user_type_obj:{
			0:'教练员',
			1:'裁判员',
			2:'运动员'
		},
		

        is_send_2_home:{
            0:'支持',
            1:'不支持'
        },

        state:{
            112:'未完成',
            113:'审核中',
            114:'已审核',
            4:'已出租',
            5:'已下架',
						1:'已上架',
            8:'失败',
        },

        express:{
            0:'T+0',
            1:'T+1'
        },

        sex:{
            0:'保密',
            1:'男',
            2:'女'
        },

        payment:{
            0:'线下支付',
            1:'在线支付'
        },

        symbol:{
            0:'－',
            1:'＋'
        },

        user_type:{
            0:'普通用户',
            111:'普通店员',
            112:'店长',
            113:'运营总监'
        },

        goods_storetype:{
            0:'冷冻',
            1:'冷藏',
            2:'常温'
        },

        score_type:{
            1:'用户消费扣除',
            2:'门店消费扣除',
            3:'供应商消费扣除',
            4:'新用户注册奖励',
            5:'推荐注册奖励老用户',
            6:'用户自己充值获取奖励',
            7:'消费赠送推荐者',
            8:'消费赠送给自己',
            9:'活动积分',
            10:'平台充值'
        },

        consume_type:{
            1:'下单',
            2:'充值',
            3:'赠送',
            4:'结算'
        },

        type_promotion:{
            0:'促销',
            1:'不促销'
        },

        type_4_kinds:{
            1:'实体商品',
            2:'虚拟商品',
            3:'服务类别'
        },

        type_register_goods:{
            1:'统价上架',
            2:'供应商决定'
        },

        type_of_shipment:{
            1:'到店自取',
            2:'送货到家'
        },

        hard_level:{
            0:'暂未明确',
            1:'自提客户',
            2:'白天有人',
            3:'晚上有人',
            4:'全天可送',
            5:'轻微抱怨',
            6:'立即送达',
            7:'行动不便',
            8:'常年投诉',
            9:'难度超大'
        },

        discount:{
            104:'新人券',
            109:'满减券',
            106:'会员充值券'
        }
    },

    /* 首次资源是否加载完成 */
    resource_loaded:false,

    /* 分享信息 */
    share_info: null,

    /* 分享初始化状态 */
    is_init_share: false,

    /* 图片地址 */
    oss_host_url: 'http://upload-image.jinglintu.cn',

    /* 未完成订单 */
    unfinish_order_4_user:null,

    public_agent_info:null,

    public_user_info:null,
	

    /* 按钮权限 */
    AUTH:LocalStorage.read('__AUTH__'),

    /* 模糊搜索 */
    SUGGEST:LocalStorage.read('__SUGGEST__')
}
