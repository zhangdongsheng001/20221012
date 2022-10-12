/*
 * 静态路由
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-11-08 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-08 14:08:56
 */
export const staticRoute = {
    path: '/',
    name: 'index',
    meta:{
        auth:false
    },
    redirect:{
        name:'front_page_index'
    },
    component: () => import('@/views/index'),
    children:[
        {
            path: '/front_page_index',
            name: 'front_page_index',
            meta:{
                auth:false
            },
            component: () => import('@/views/content/index'),
        },
        {
            path: '/middle',
            name: 'middle',
            meta:{
                auth:true
            },
            component: () => import('@/views/content/middle'),
        },
        {
            path: '/login',
            name: 'login',
            meta:{
                discache: true
            },
            component: () => import('@/views/public/login')
        },
        {
            path: '/home/detail',
            name: 'home/detail',
            meta:{
                discache: true
            },
            component: () => import('@/views//content/home/detail')
        },
				{
				    path: '/home/soso',
				    name: 'home/soso',
				    meta:{
				        discache: true
				    },
				    component: () => import('@/views//content/home/soso')
				},
		{
		    path: '/my',
		    name: 'my',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my')
		},
		{
		    path: '/my/promotion',
		    name: 'my/promotion',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/promotion')
		},{
		    path: '/my/promotion/apply',
		    name: 'my/promotion/apply',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/promotion/apply')
		},{
		    path: '/my/promotion/subordinates',
		    name: 'my/promotion/subordinates',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/promotion/subordinates')
		},{
		    path: '/my/promotion/order',
		    name: 'my/promotion/order',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/promotion/order')
		},{
		    path: '/my/promotion/creatOrder',
		    name: 'my/promotion/creatOrder',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/promotion/creatOrder')
		},{
		    path: '/my/house',
		    name: 'my/house',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/house')
		},{
		    path: '/my/house/creatHouse',
		    name: 'my/house/creatHouse',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/house/creatHouse')
		},{
		    path: '/my/authentication',
		    name: 'my/authentication',
		    meta:{
		        discache: true
		    },
		    component: () => import('@/views//content/my/authentication')
		}
    ]
};

export const errorRoute = [
    {
        path:'*',
        redirect:{
            name:'index'
        }
    }
];

export const screenRoute = [

];
