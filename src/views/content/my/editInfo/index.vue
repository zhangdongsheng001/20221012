<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="ui-mode-container ui-mode-box flex-col">
        <div class="ui-header-item gradient">
            <div class="ui-header-arraw prev" @click="handleHistory" @touchstart.stop>
                <i class="iconfont icon iconjiantou-zuo-cuxiantiao"></i>
            </div>
            <div class="ui-header-title">编辑资料</div>
			<div class="ui-header-arraw next flex-row align-center font9"  @touchstart.stop @click="handleSave">保存</div>
        </div>
        <div class="ui-mode-content flex1 mar-bottom-20 font7" id="container" ref="scroll">
            <template v-if="pageStatus">
				<div class="box mt-user-info">
					<div class="title gray">基本信息</div>
					<div class="flex-row align-between-row align-center-row innerbox">
						<span>照片</span>
						<div class="photo-box">
							<!-- <img class="photo" @mousedown.prevent v-lazy="detailInfo.goods_main_image|'../../../../assets/images/svgIcon/icons8-edit.svg'"> -->
							<img class="photo" src="../../../../assets/images/svgIcon/avatar.svg">
							<img class="photo-icon" src="../../../../assets/images/test/photoIcon.png">
						</div>
					</div>
					<div class="item flex-row align-center" >
					    <div class="label flex1">姓名<span class="red">*</span></div>
						<input type="text" v-model="detailInfo.goods_name" value="请填写您的姓名">
					</div>
					<div class="item flex-row align-center" >
					    <div class="label flex1">联系电话<span class="red">*</span></div>
						<input type="text" v-model="detailInfo.goods_info_remark_002" value="请填写您的电话">
					</div>
					<div class="item flex-row align-center" >
					    <div class="label flex1">毕业院校</div>
					    <input type="text" v-model="detailInfo.goods_info_remark_003" value="请填写您的院校名称">
					</div>
					<div class="item flex-row align-center" @click="handleTypeSelect" >
						<div class="label flex1">方向</div>
						<span class="value" ref="userType">{{dictionary.item_user_type_obj[detailInfo.goods_info_remark_001]||'请设置方向'}}</span>
						<i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
					</div>
					<div class="item flex-row align-center" @click="handleItemSelect">
					    <div class="label flex1">所属项目</div>
					    <span class="value" ref="ItemType">{{dictionary.item_type_obj[detailInfo.id_public_goods_type]||'请设置所属项目'}}</span>
					    <i class="icon iconfont iconjiantou-you-cuxiantiao"></i>
					</div>
				</div>
				<div class="box">
					<div class="title gray">空闲时间段设置</div>
					<div class="">
						<div class="free-time" res="freeTimeList">
							<inner-freetime   :indexFreeTime="detailInfo.table_free_time" :pickerVisible="pickerVisible"  @changeShowSelect="changeFreeTimeShow"></inner-freetime>
							<!--<div  v-for="(itemtime,j) in detailInfo.table_free_time" class="pad-left-5 pad-right-5 flex-row align-between-row" ref="'itemTime'+j" >
								 <i>一</i>
								<p>
									星期<span>{{itemtime.day}}</span>
									<span>{{itemtime.beginTime.split(":")[0]}}</span>时
									<span>{{itemtime.beginTime.split(":")[1]}}</span>分 至
									<span>{{itemtime.endTime.split(":")[0]}}</span>时
									<span>{{itemtime.endTime.split(":")[1]}}</span>分
								</p> 
							</div>-->
						</div>
						<div class="add-box" @click="addItem('freeTimeList',detailInfo.table_free_time)">
							<i class="iconfont icon iconguanbi6"></i><span>添加空闲时段</span>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="title gray">资质证书</div>
					<div class="">
						<div>
							<inner-zhengshu   :indexItem="detailInfo.table_pic"></inner-zhengshu>
							<!-- <div class="flex-row upload-img align-between-row">
								<div class="ml mar-left-5">
									<em>+</em>
								</div>
								<div class="mr">
									<div class="item flex-row " >
									    <div class="label flex1">证书名称</div>
									    <input type="text" value="请填写证书名称">
									</div>
									<div class="item flex-row " >
									    <div class="label flex1">授予机构</div>
									    <input type="text" value="请填写授予机构">
									</div>
								</div>
							</div>
							<div class="flex-row align-between-row align-center-row  mar-5-box">
								<span class="gray">最多1张，支持jpg，png格式</span>
								<a href="javascript:;" class="del-btn" >删除</a>
							</div> -->
						</div>
						<div class="add-box" @click="addItem('picList',detailInfo.table_pic)">
							<i class="iconfont icon iconguanbi6"></i><span>添加资质证书</span>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="title gray">视频展示</div>
					<div class="flex-row align-center upload-vadio">
						<div class="gray upload-vadio-tip txt-c">
							<img src="../../../../assets/images/svgIcon/icons8-upload_to_cloud.svg"  class="svgIcon" />
							<p>点击上传视频</p>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="title gray">赛事经历</div>
					<inner-saishi   :indexItem="detailInfo.table_event_experience" :calendarShow="calendarShow" @changeDateF="changeDate"></inner-saishi>
					<!-- <div class="experience-list">
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">赛事时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="m2">
							<div>赛事名称</div>
							<textarea>
								
							</textarea>
						</div>
						<div class="item flex-row align-center m3" >
						    <div class="label flex1">获得名次</div>
						    <input type="text" value="请填写您的名次">
						</div>
						<div class="txt-r  mar-5-box"><a href="javascript:;" class="del-btn" >删除</a></div>
					</div> -->
					<div class="add-box"  @click="addItem('cansaiList',detailInfo.table_event_experience)">
						<i class="iconfont icon iconguanbi6"></i><span>添加赛事</span>
					</div>
				</div>
				<div class="box">
					<div class="title gray">执裁经历</div>
					<inner-zhicai   :indexItem="detailInfo.table_adjudication_experience" :calendarShow="calendarShow" @changeDateF="changeDate"></inner-zhicai>
					<!-- <div class="experience-list">
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">赛事时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="m2">
							<div>赛事名称</div>
							<textarea >
								
							</textarea>
						</div>
						<div class="txt-r  mar-5-box"><a href="javascript:;" class="del-btn" >删除</a></div>
					</div> -->
					<div class="add-box" @click="addItem('cansaiList',detailInfo.table_adjudication_experience)">
						<i class="iconfont icon iconguanbi6"></i><span>添加赛事</span>
					</div>
				</div>
				<div class="box">
					<div class="title gray">执教经历</div>
					<inner-zhijiao   :indexItem="detailInfo.table_teaching_experience" :calendarShow="calendarShow" @changeDateF="changeDate"></inner-zhijiao>
					<!-- <div class="experience-list">
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">开始时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">结束时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="item flex-row align-center" >
						    <div class="label flex1">执教单位</div>
						    <input type="text" value="请填写单位名称">
						</div>
						<div class="m2">
							<div>执教内容</div>
							<textarea >
								
							</textarea>
						</div>
						<div class="txt-r  mar-5-box"><a href="javascript:;" class="del-btn" >删除</a></div>
					</div> -->
					<div class="add-box" @click="addItem('cansaiList',detailInfo.table_teaching_experience)">
						<i class="iconfont icon iconguanbi6"></i><span>添加经历</span>
					</div>
				</div>
				<div class="box">
					<div class="title gray">就业经历</div>
					<inner-jiuye   :indexItem="detailInfo.table_employment_experience" :calendarShow="calendarShow" @changeDateF="changeDate"></inner-jiuye>
					<!-- <div class="experience-list">
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">开始时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="item flex-row align-center m1" >
						    <div class="label flex1">结束时间</div>
							<p>
								<span>{{itemtime.year}}</span>年
								<span>{{itemtime.mon}}</span>月
								<span>{{itemtime.day}}</span>日
							</p>
						</div>
						<div class="item flex-row align-center" >
						    <div class="label flex1">公司名称</div>
						    <input type="text" value="请填写公司名称">
						</div>
						<div class="m2">
							<div>担任职位</div>
							<textarea >
								
							</textarea>
						</div>
						<div class="txt-r mar-5-box"><a href="javascript:;" class="del-btn" >删除</a></div>
					</div> -->
					<div class="add-box" @click="addItem('cansaiList',detailInfo.table_employment_experience)">
						<i class="iconfont icon iconguanbi6"></i><span>添加经历</span>
					</div>
				</div>
			</template>
			<template>
				<inner-picker :pickerVisible="pickerVisible" :columns="columns" @freeTimeObj="changeFreeTime"></inner-picker>
			</template>
			<template v-if="calendarShow">
				<div class="app_calendar-master">
					<div id="calendar">
						<calendar
							v-model="calendarShow"
							:show="calendarShow"
							:defaultDate="defaultDate"
							@change="handelChange">
						</calendar>
						<!-- <inlineCalendar   mode="calendarShow"   :defaultDate="defaultDate"  @change="handelChange" /> -->
					 </div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import mixinCommon from '../../mixins/common';
import mixinRequest from '../../mixins/request';
import {
    getDateInfo,
    prefixNumber
} from '@/utils/tool';
//import mixinCart from '../../mixins/cart';
//import mixinShare from '../../mixins/share';
//import shoppingCart from '../../public/shopping-cart';

import photo1 from '../../../../assets/images/test/photo_1.png';
import photo2 from '../../../../assets/images/test/photo_2.png';
import photo3 from '../../../../assets/images/test/photo_3.png';
import photo4 from '../../../../assets/images/test/photo_4.png';
/* import photo from '../../../../assets/images/svgIcon/icons8-edit.svg'; */

import innerFreetime from './src/freetime';
import innerZhengshu from './src/zhengshu';
import innerSaishi from './src/saishi';
import innerZhicai from './src/zhicai';
import innerZhijiao from './src/zhijiao';
import innerJiuye from './src/jiuye';
import innerPicker from './src/picker';



export default {
    data(){
        return {
            public_agent_info:{},
            public_user_info:{},
            public_goods_order_record:{},
            detailInfo:{},
            public_goods_img_list:[],
            foodTips:[],
            public_goods_order_detail_list:[],
            showable:true,
			pickerVisible:false,
			calendarShow:false,
			pickerIndex:0,
			columns:3,
			appDownload:false,
			pageStatus:false,
			itemtime:{
				year:2021,
				mon:5,
				day:1
			}
        };
    },
    mixins:[
        mixinCommon,
        mixinRequest,
        //mixinCart,
        //mixinShare
    ],
    computed:{
        getGoodMainImage(){
            return this.formatImgUrl(this.detailInfo.goods_main_image);
        },
    },
    /* watch:{
        resourceLoaded:{
            handler(flag){
                flag&&this.$nextTick(this.init);
            },
            immediate:true
        }
    }, */
    created(){
		/* this.showMessage(window.location.href)
		if(this.$route.query.type_from_login ==101&&!this.isLogin){
			this.appDownload=true
			this.handleMockLogin()
		}
		if (this.isWeixin) {
		    if (!this.isMiniProgram) {
				if(this.$route.query.type_from_login ==101&&!this.isLogin){
					this.appDownload=true
					this.handleMockLogin()
				}
			}
		} */
			
    },
    mounted(){
		this.photoArr=[photo1,photo2,photo3,photo4]
		this.init()
    },
    methods:{
        /*
         * 初始化
         */
        init(){
            if(!this.$route.query.id){
                return this.showMessage('进入非法').then(()=>{
                    this.handleHistory();
                });
            };
			this.handleLoad();
			
           
        },
        /*
         * 初始化加载数据
         */
        handleLoad(){
			if(!this.$route.query.id) return
            this.showLoading();
			this.$http.get({
			    name:'test.itemUser',
			    loading:{
			        enabled:true
			    }
			}).then(({result,response})=>{
				console.log(result)
				console.log(result.public_goods_list)
				if(result.public_goods_list&&result.public_goods_list.length){
					var len = result.public_goods_list.length
					for(let i=0;i<len;i++){
						if(this.$route.query.id==result.public_goods_list[i].id_public_goods_info){
							var index=0
							if(i>=4){
								index=i%4
							}
							result.public_goods_list[i].goods_main_image=this.photoArr[index];
							this.detailInfo=result.public_goods_list[i]
							break 
						}
					}
					this.pageStatus=true
					this.showContent();
					console.log(this.detailInfo)
				}
			})
        },
		/*
		 * 获取方向列表
		 */
		getTypeOfShipment(item){
		    return Object.keys(item).map(key=>{
		        return {
		            title:item[key],
		            code:key
		        };
		    });
		},
		
		/*
		 * 选择方向
		 */
		handleTypeSelect(){
		    this.$$select({
		        title:'请选择方向',
		        value:this.detailInfo.goods_info_remark_001,
		        list:this.getTypeOfShipment(this.dictionary.item_user_type_obj),
		        sure:data=>{
					console.log(data)
					/* this.$refs.userType.innerHTML=data.title
					this.$refs.userType.id=data.code */
					for(var str='', i=0;i<data.length;i++){
						str+=this.dictionary.item_user_type_obj[i]+' '
					}
					console.log(str)
					this.$refs.userType.innerHTML=str
					this.$refs.userType.id=data.join(',')
		        }
		    });
		},
		/*
		 * 选择项目
		 */
		handleItemSelect(){
			this.$$select({
			    title:'请选择项目',
			    value:this.detailInfo.id_public_goods_type,
			    list:this.getTypeOfShipment(this.dictionary.item_type_obj),
			    sure:data=>{
					console.log(data)
					/* this.$refs.ItemType.innerHTML=data.title
					this.$refs.ItemType.id=data.code */
					for(var str='', i=0;i<data.length;i++){
						str+=this.dictionary.item_type_obj[i]+' '
					}
					console.log(str)
					this.$refs.ItemType.innerHTML=str
					this.$refs.ItemType.id=data.join(',')
			    }
			});
		},
		handleSave(){
			
		},
        /*
         * 请求失败刷新
         */
        handleRefresh(){
            this.handleLoad();
        },
		/*
		 * 点击查看大图
		 */
		showPic(){
		},
		/*
		 * 添加项目
		 */
		addItem(m1,m2){
			console.log(m1)
			console.log(m2)
			m2.unshift({})
			console.log(m2)
		},
		/*
		 * 选择空闲时间显示
		 */
		changeFreeTimeShow(ms){
			console.log(1212)
			console.log(ms)
			this.pickerVisible=ms.value;
			this.pickerIndex=ms.index;
			this.columns=ms.type
			console.log(this.pickerVisible)
		},
		changeFreeTime(time){
			if(!time){this.pickerVisible=false; return}
			if(this.columns==3){
				/* var newFreeTime={
					day:time[0].value,
					beginTime:time[1].value+":"+time[1].value,
					endTime:time[1].value+":"+time[1].value,
				} */
				this.detailInfo.table_free_time[this.pickerIndex].day=time[0].value
				this.detailInfo.table_free_time[this.pickerIndex].beginTime=prefixNumber(time[1].value)+":"+prefixNumber(time[2].value)
			}else{
				this.detailInfo.table_free_time[this.pickerIndex].endTime=prefixNumber(time[0].value)+":"+prefixNumber(time[1].value)
			}
			
			//Vue.set(this.detailInfo.table_free_time, this.pickerIndex, newFreeTime)
			this.pickerVisible=false;
			this.pickerIndex=0;
			console.log(222)
		},
		/* 选择日期 */
		handelChange(date){
			console.log(date)
			console.log(this.changeDateObj.list[this.changeDateObj.index][this.changeDateObj.str])
			this.changeDateObj.list[this.changeDateObj.index][this.changeDateObj.str]=date.$y+'.'+prefixNumber(date.$M+1)+'.'+prefixNumber(date.$D)
			console.log(this.changeDateObj.list[this.changeDateObj.index][this.changeDateObj.str])
			this.calendarShow=false
			this.changeDateObj={}
		},
		changeDate(res){
			console.log(res)
			this.calendarShow=res.calendarShow;
			//Vue.set(this.calendarShow,  res.calendarShow)
			console.log(this.calendarShow);
			this.changeDateObj=res;
			this.defaultDate=res.indexData?res.indexData.replace(/\./g, '-'):''
			console.log(this.defaultDate)
		},
		
    },
    components:{
		innerFreetime,
		innerZhengshu,
		innerSaishi,
		innerZhicai,
		innerZhijiao,
		innerJiuye,
		innerPicker
    },
    beforeDestroy(){

    }
}
</script>

<style lang="less" scoped>
	.title{
		padding: 0.3rem 0.8rem; 
		background-color: #fbfbfb;
	}
  .innerbox{padding-left:0.8rem;padding-right:0.8rem}
	.photo-box{
		margin: 0.8rem 0;
		width:3.6rem;
		height: 3.6rem;
		position: relative;
		.photo{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.photo-icon{
			position: absolute;
			bottom:0;
			right: 0;
			width: 1rem;
			height: 1rem;
		}
	}
	/* .mt-user-info,.mr{ */
	.iconfont{color: #878787;}
	.item{
	     position:relative;
	     padding:0 0.8rem;
	     line-height:2.5rem;
	     font-size:0.7rem;
	     border-bottom:solid 1px #e9e9e9;
	     .label{
	         color:#222;
	     }
	     .value{
	         color:#878787;
	         margin-right:0.3rem;
	     }
	     &:last-child{
	         border-top:none;
	     }
	     &:active{
	         background:#eee;
	     }
				input{
					border:none;
					font-size: 0.7rem;
					font-weight: normal;
					text-align: right;
					background-color: transparent;
				}
	 }
	 /deep/ .innerbox{padding-left:0.8rem;padding-right:0.8rem}
	/deep/  .inner-model{
	   .item{
	        position:relative;
	        padding:0 0.8rem;
	        line-height:2.5rem;
	        font-size:0.7rem;
	        border-bottom:solid 1px #e9e9e9;
	        .label{
	            color:#222;
	        }
	        .value{
	            color:#878787;
	            margin-right:0.3rem;
	        }
	        &:last-child{
	            border-top:none;
	        }
	        &:active{
	            background:#eee;
	        }
			input{
				border:none;
				font-size: 0.7rem;
				font-weight: normal;
				text-align: right;
				background-color: transparent;
				min-width: 10rem;
			}
			input::-webkit-input-placeholder{
				color:#C7C6C9;
			}
	    }
		.mr{width: 14rem;
			.item {
				padding-left: 0;
			}
		}
		.upload-img{
			.ml{
				margin-left: 0.8rem;
				width: 4.8rem;
				height: 4.8rem;
				border: dotted 1px #E3E3E3 ;
				position: relative;
				img{
					width: 4.8rem;
					height: 4.8rem; 
					object-fit: contain;
				}
				em{
					position: absolute;
					top:50%;
					left: 50%;
					margin-top:-1rem;
					margin-left:-0.6rem;
					color: #878787 ;
					border-radius: 50%;
					font-size: 1.2rem;
					transform:rotate(45deg);
					display: inline-block;
					line-height: 2rem;
				}
			}
		}
		.del-btn{
			display: inline-block;
			color: #FF3E3D;  
			border: solid 1px #FF3E3D; 
			width: 2.5rem;
			height: 1.4rem;
			line-height: 1.4rem;
			border-radius: 0.7rem;
			text-align: center;
		}
		.mar-5-box{margin: 0.4rem 0.8rem;}
		.experience-list{
			.m1{
				p{
					padding: 0.3rem 0;
					line-height: 1.4rem;
					span{
						display: inline-block;
						margin: 0 0.2rem;
						padding: 0.1rem 0.25rem;
						background-color: #F7F7F7;
						font-size: 0.9rem;
						color: #222;
					}
				}
			}
			.m2{
				margin: 0 0.8rem;
				.input-box{
					position: relative;
					width: 100%;
					height: 4.6rem;
					padding: 0.5rem;
					background-color: #F7F7F7;
					border: solid 1px #E3E3E3;
					font-size: 0.7rem;
					textarea{
						background-color: transparent;
						width: 100%;
						border: none;
						font-size: 0.7rem;
					}
					textarea::-webkit-input-placeholder{
						color:#C7C6C9;
					}
				}
				.num{
					position: absolute;
					bottom: 0.6rem;
					right: 0.6rem;
					line-height: 1;
				}
				
			}
		}
	}
	
	.free-time{
		line-height: 1.4rem;
		/deep/ .free{
			padding: 0.3rem 0.8rem;
			border-bottom: solid 1px #E3E3E3;
			em{
				display: inline-block;
				margin: 0 0.2rem;
				padding: 0.1rem 0.25rem;
				background-color: #F7F7F7;
				font-size: 0.9rem;
				font-style: normal;
				color: #222;
			}
			i{
				display: inline-block;
				width: 1rem;
				height: 1rem;
				line-height: 1.1rem;
				text-align: center;
				background-color: #FF3E3D;
				border-radius: 50%;
				color: #fff;
				font-size: 0.6rem;
				margin-right: 1.5rem;
			}
		}
		p:nth-last-child(1){border-bottom: none;}
		
	}
.ui-mode-container{background-color: #fff;}
.mar-5-box{margin: 0.5rem 0.5rem 0;}
.add-box{
	padding: 0 0.5rem;
	border-top:solid 0.26rem #fbfbfb;
	text-align: right;
	color: @base-color;
	font-size: 0.72rem;
	vertical-align: middle;
	i{
		display: inline-block;
		font-size: 1rem;
		margin-right: 0.3rem;
		font-weight: bold;
		color: @base-color;
		vertical-align: middle;
		transform:rotate(45deg);
	}
}

.upload-vadio-tip{
	img{
		width: 1.9rem;
	}
	p{
		margin-top: 0.5rem;
	}
}
.upload-vadio{
	height: 10rem;
	//background-color: #E3E3E3;
	margin: 0.8rem;
	border:dotted 1px #E3E3E3 ;
}



.box{
	margin-bottom: 0.5rem;
    background-color:#fff;
}
.app_calendar-master{
	left:50%;
	top:0;
	width:100%;
	max-width:20rem;
	bottom:0;
	z-index:999;
	transform:translateX(-50%);
    background-color:rgba(0,0,0,0.3);
	position:fixed;
	#calendar{
		position: absolute;
		bottom:0;
		left: 0;
		right: 0;
	}
	/* .app_bigpic-container{
		position: absolute;
		width: 100%;
		height: 100%;
		img{
			object-fit: contain;
		}
		span{
			position: absolute;
			top:0.5rem;
			right: 0.5rem;
			font-size: 2rem;
			font-weight: 300;
			color: #fff;
		}
	} */
}
</style>
