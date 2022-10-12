<template>
	<div class="ui-mode-container ui-mode-box flex-col">
		<div class="ui-header-item gradient">
			<div class="ui-header-arraw prev" @click="handleHistory" @touchstart.stop>
				<i class="iconfont icon iconjiantou-zuo-cuxiantiao"></i>
			</div>
			<div class="ui-header-title">{{title}}</div>
		</div>
		<div class="ui-mode-content"  ref="scroll">
			<div class="cont">
				<div class="item-title">基本信息</div>
				<div>
					<div class="m1" v-if="type==1||type==2||type==3">
						<div><span class="gray bold">房源类型</span><span class="red">*</span></div>
						<div class="p1 flex-row align-center"  @click="handleItemSelect(detail.goods_type,dictionary.chuZuLeiXing,'goods_type')">
							<span class="flex1" :class="{gray:detail.goods_type==''}" >{{dictionary.chuZuLeiXing[detail.goods_type]||'请选择房源类型'}}</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
						</div>
					</div>
					<div class="m1" v-if="type==5||type==4||type==6">
						<div><span class="gray bold">标题</span><span class="red">*</span></div>
						<div class="p1 flex-row align-center" >
							<input type="text" class="flex1" v-model="detail.goods_name" placeholder="请填写标题" @touchstart.stop />	
						</div>
					</div>
					<template  v-if="type==6">
						<div class="m1">
							<div><span class="gray bold">物业名称</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" >
								<input type="text" class="flex1" v-model="detail.goods_info_remark_017" placeholder="请填写物业名称" @touchstart.stop />	
							</div>
						</div>
						<div class="m1" >
							<div><span class="gray bold">所在区域</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="changeFreeTimeShow(detail.goods_info_remark_029,3,'goods_info_remark_029')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_029==''}" >{{detail.goods_info_remark_029||'请选择所在区域'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
					</template>
					<div class="m1" v-else>
						<div><span class="gray bold">小区名称</span><span class="red">*</span></div>
						<!-- <div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_017,dictionary.xiaoqu,'goods_info_remark_017')">
							<span class="flex1" :class="{gray:detail.goods_info_remark_017==''}" >{{detail.goods_info_remark_017||'请选择小区名称'}}</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
						</div> -->
						<div class="p1 flex-row align-center"  @click="handleSearch">
							<span class="flex1" :class="{gray:detail.goods_info_remark_017==''}" >{{detail.goods_info_remark_017||'请选择小区名称'}}</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
						</div>
					</div>
					<div class="m1">
						<div><span class="gray bold">详细地址</span><span class="red">*</span></div>
						<div class="p1 flex-row align-center" >
							<input type="text" class="flex1" v-model="detail.goods_info_remark_015" placeholder="请填写详细地址" @touchstart.stop />	
						</div>
					</div>
					<div class="m1" v-if="type==1||type==2||type==3">
						<div><span class="gray bold">栋号</span><span class="red">*</span></div>
						<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_005,dictionary.donghao,'goods_info_remark_005')">
							<span class="flex1" :class="{gray:detail.goods_info_remark_005==''}" >{{detail.goods_info_remark_005||'请选择栋号'}}</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
						</div>
					</div>
					<div class="m1">
						<div class="flex-row align-between-row">
							<div><span class="gray bold">楼层</span><span class="red">*</span></div>
							<div class="bt1" v-if="type==5||type==4||type==6">
								<span class="current">电梯</span>
								<span>楼梯</span>
							</div>
						</div>
						<div class="p1 flex-row align-center" @click="changeFreeTimeShow(detail.goods_info_remark_003,2,'goods_info_remark_003')">
							<span class="flex1" :class="{gray:detail.goods_info_remark_003==''}" >{{detail.goods_info_remark_003.split(',').join('')||'请选择楼层'}}</span>
							<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
						</div>
					</div>
					<div class="m1" v-if="type==1||type==2||type==3">
						<div><span class="gray bold">室号</span><span class="red">*</span></div>
						<div>
							<div class="p1 flex-row align-center" >
								<input type="number"  class="flex1"  v-model="detail.goods_info_remark_006" placeholder="请填写室号" @touchstart.stop />
								<div class="bt1">
									<span class="current">电梯</span>
									<span>楼梯</span>
								</div>
							</div>
						</div>
					</div>
					<div class="m1" v-if="type==6">
						<div><span class="gray bold">室号</span></div>
						<div>
							<div class="p1" >
								<input type="number"  class="flex1"  v-model="detail.goods_info_remark_006" placeholder="请填写室号" @touchstart.stop />
							</div>
						</div>
					</div>
					<div class="m1 flex-row m1-border">
						<div class="n1" v-if="type!=6">
							<div><span class="gray bold">户型</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="changeFreeTimeShow(detail.goods_info_remark_004,3,'goods_info_remark_004')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_004==''}" >{{detail.goods_info_remark_004.split(',').join('')||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">朝向</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_001,dictionary.chaoXiang,'goods_info_remark_001')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_001==''}" >{{detail.goods_info_remark_001||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">房屋用途</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_010,yongtu,'goods_info_remark_010')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_010==''}" >{{detail.goods_info_remark_010||'请选择'}}</span>
							</div>
						</div>
						<div class="n1" v-if="type==6">
							<div><span class="gray bold">挂牌时间</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center"  @click="changeFreeTimeShow(detail.goods_info_remark_019,3,'goods_info_remark_019')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_019==''}" >{{detail.goods_info_remark_019||'请选择'}}</span>
							</div>
						</div>
					</div>
					<div class="m1 flex-row m1-border" v-if="type==1||type==2||type==3">
						<div class="n1">
							<div><span class="gray bold">入住时间</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center"  @click="changeFreeTimeShow(detail.goods_info_remark_012,4,'goods_info_remark_012')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_012==''}" >{{detail.goods_info_remark_012||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">装修类型</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_011,dictionary.zhuangXiu,'goods_info_remark_011')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_011==''}" >{{detail.goods_info_remark_011||'请选择'}}</span>
							</div>
						</div>
						<div class="n1" v-if="detail.goods_type==1">
							<div><span class="gray bold">卧室类型</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_008,dictionary.woshi,'goods_info_remark_008')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_008==''}" >{{detail.goods_info_remark_008||'请选择'}}</span>
							</div>
						</div>
					</div>
					<div class="m1 flex-row m1-border" v-else-if="type==5||type==6">
						<div class="n1" v-if="type==5">
							<div><span class="gray bold">挂牌时间</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center"  @click="changeFreeTimeShow(detail.goods_info_remark_019,3,'goods_info_remark_019')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_019==''}" >{{detail.goods_info_remark_019||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">装修类型</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_011,zhuangxiu,'goods_info_remark_011')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_011==''}" >{{detail.goods_info_remark_011||'请选择'}}</span>
							</div>
						</div>
						<div class="n1" >
							<div><span class="gray bold">建筑年代</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_018,yearArr,'goods_info_remark_018')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_018==''}" >{{detail.goods_info_remark_018||'请选择'}}</span>
							</div>
						</div>
					</div>
					<div class="m1 flex-row m1-border" v-else-if="type==4">
						<div class="n1">
							<div><span class="gray bold">开盘时间</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center"  @click="changeFreeTimeShow(detail.goods_info_remark_026,3,'goods_info_remark_026')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_026==''}" >{{detail.goods_info_remark_026||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">交房时间</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center"  @click="changeFreeTimeShow(detail.goods_info_remark_025,3,'goods_info_remark_025')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_025==''}" >{{detail.goods_info_remark_025||'请选择'}}</span>
							</div>
						</div>
						<div class="n1">
							<div><span class="gray bold">装修类型</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_011,zhuangxiu,'goods_info_remark_011')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_011==''}" >{{detail.goods_info_remark_011||'请选择'}}</span>
							</div>
						</div>
					</div>
					<template v-if="type==1||type==2||type==3">
						<div class="m1" v-if="detail.goods_type==1">
							<div><span class="gray bold">房间号</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_032,fanghao,'goods_info_remark_032')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_032==''}" >{{this.dictionary.fanghao[detail.goods_info_remark_032]||'请选择房间号'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
						<div class="m1" v-if="detail.goods_type==1">
							<div><span class="gray bold">使用面积</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_002" placeholder="请填写使用面积" @touchstart.stop />
								<span>㎡</span>
							</div>
						</div>
						<div class="m1" v-if="detail.goods_type!=1">
							<div><span class="gray bold">整套面积</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_002" placeholder="请填写整套面积" @touchstart.stop />
								<span>㎡</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">租金</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_price" placeholder="请填写租金" @touchstart.stop />
								<span>元/月</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">付款方式</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="changeFreeTimeShow(detail.goods_info_remark_009,2,'goods_info_remark_009')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_009==''}">{{detail.goods_info_remark_009.split(',').join('')||'请选择付款方式'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">佣金比例</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_027,dictionary.yongjinz,'goods_info_remark_027')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_027==''}" >{{detail.goods_info_remark_027||'请选择佣金比例'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
					</template>
					<template v-else-if="type==5||type==4">
						<div class="m1">
							<div><span class="gray bold">产权年限</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_024,chanquannianxian,'goods_info_remark_024')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_024==''}" >{{detail.goods_info_remark_024||'请选择产权年限'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
						<div class="m1" >
							<div><span class="gray bold">建筑面积</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_002" placeholder="请填写建筑面积" @touchstart.stop />
								<span>㎡</span>
							</div>
						</div>
						<div class="m1" >
							<div><span class="gray bold">售价</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_price" placeholder="请填写售价" @touchstart.stop />
								<span>㎡</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">单价</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_020" placeholder="请填写租金" @touchstart.stop />
								<span>元/平方米</span>
							</div>
						</div>
						<div class="m1" v-if="type==4">
							<div><span class="gray bold">佣金</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_027" placeholder="请填写佣金" @touchstart.stop />
								<span>万</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">结构</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_023,dictionary.jiegou,'goods_info_remark_023')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_023==''}">{{detail.goods_info_remark_023||'请选择结构'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">权属</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect1(detail.goods_info_remark_027,dictionary.quanshu,'goods_info_remark_022')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_022==''}" >{{detail.goods_info_remark_022||'请选择权属'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
					</template>
					<template v-else-if="type==6">
						<div class="m1" >
							<div><span class="gray bold">建筑面积</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_002" placeholder="请填写建筑面积" @touchstart.stop />
								<span>㎡</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">租金</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_price" placeholder="请填写租金" @touchstart.stop />
								<span>元/月</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">单价</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center">
								<input type="text"  class="flex1" v-model="detail.goods_info_remark_020" placeholder="请填写租金" @touchstart.stop />
								<span>元/平方米/天</span>
							</div>
						</div>
						<div class="m1">
							<div><span class="gray bold">佣金比例</span><span class="red">*</span></div>
							<div class="p1 flex-row align-center" @click="handleItemSelect(detail.goods_info_remark_027,dictionary.yongjins,'goods_info_remark_027')">
								<span class="flex1" :class="{gray:detail.goods_info_remark_027==''}" >{{detail.goods_info_remark_027||'请选择佣金比例'}}</span>
								<i class="iconfont icon iconjiantou-you-cuxiantiao gray"></i>
							</div>
						</div>
					</template>
					<div class="m1">
						<div><span class="gray bold">看房联系电话</span></div>
						<div class="flex-row align-between-row">
							<div class="p1 p2 flex-row">
								<span class="red">*</span>
								<input type="text" v-model="detail.goods_info_remark_028" placeholder="常用" @touchstart.stop />
							</div>
							<div class="p1 p2">
								<input type="text" v-model="detail.goods_info_remark_031" placeholder="备用" @touchstart.stop />
							</div>
						</div>
					</div>
				</div>
				<template>
					<inner-picker :pickerVisible.sync="pickerVisible" :objItem="objItem" :selectData="selectData" :columns="columns" @freeTimeObj="changeFreeTime"></inner-picker>
				</template>
			</div>
			<div class="cont">
				<div class="item-title" v-if="type==1||type==2||type==3">照片及视频</div>
				<div class="item-title" v-else>照片及户型</div>
				<div>
					<div class="m2 mar-top-5">
						<div><span class="gray bold">房源照片</span><span class="tip">（最多可上传15张） </span></div>
						<div class="flex-row" v-if="!detail.goods_main_image||detail.goods_main_image.length==0">
							<div class="upload-img" >
								<div class="ml" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
									<i class="tipimg">主图</i>
								</div>
							</div>
							<div class="upload-img" >
								<div class="ml" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
								</div>
							</div>
						</div>
						<div class="flex-row" v-else >
							<div class="upload-img" v-for="(item,i) in detail.goods_main_image" >
								<div class="ml" v-if="i==0">
									<!-- <img :src="item.pic_src" /> -->
									<img v-lazy="item" />
									<span class="reupload" @click.stop="upload()">重新上传</span>
									<i class="tipimg" >主图</i>
								</div>
								<div class="ml" v-else>
									<!-- <img :src="item.pic_src" /> -->
									<img v-lazy="item" />
									<div class="close" @click.stop="close">
										<img src="@/assets/images/icon_delete.png" />
									</div>
								</div>
							</div>
							<div class="upload-img" >
								<div class="ml" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
								</div>
							</div>
						</div>
					</div>
					<div class="m2 mar-top-5" v-if="type==1||type==2||type==3">
						<div><span class="gray bold">房源视频</span></div>
						<div class=" upload-vadio">
							<div class="ml" v-if="detail.goods_play.length>0">
								<!-- <img :src="item.pic_src" /> -->
								<img v-lazy="detail.goods_play" />
								<div class="index-cat-play">
									<img src="@/assets/images/test/play_icon.png"  width="100%" height="100%" alt="">
								</div>
								<span class="reupload" @click.stop="upload()">重新上传</span>
							</div>
							<div v-else class="ml" @click.stop="upload()">
								<div class="upload-tip">
									<em class="iconfont icon iconguanbi6 "></em>
									<span >上传视频</span>
								</div>
							</div>
						</div>
					</div>
					<div class="m2 mar-top-5" v-else>
						<div><span class="gray bold">房源户型</span></div>
						<div class="flex-row" v-if="!detail.goods_main_image||detail.goods_main_image.length==0">
							<div class="upload-img" >
								<div class="ml" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
								</div>
							</div>
						</div>
						<div class="flex-row" v-else >
							<div class="upload-img" v-for="(item,i) in detail.goods_main_image" >
								<div class="ml">
									<!-- <img :src="item.pic_src" /> -->
									<img v-lazy="item" />
									<div class="close" @click.stop="close">
										<img src="@/assets/images/icon_delete.png" />
									</div>
								</div>
							</div>
							<div class="upload-img" >
								<div class="ml" @click.stop="upload()">
									<em class="iconfont icon iconguanbi6"></em>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cont">
				<div class="item-title">房源详情</div>
				<div>
					<div class="m3">
						<div><span class="gray bold ">房屋配置</span></div>
						<div class="flex-row flex-wrap showDialog-shoujia-select ">
							<span class="p3" :class="{current:PeiZhiStr.includes(i)}"  v-for="(item,i) in dictionary.fangYuanTool" @touchstart.stop @click="selectPeiZhi(item,i)">{{item}}</span>
						</div>
					</div>
					<div class="m3">
						<div><span class="gray bold">房源描述</span></div>
						<div class="mt-back-showDialog-box  mt-back-showDialog-box-width">
							<textarea rows="3" ref="textStr" laceholder="请在此输入......" @touchstart.stop  @keyup="changeTextStr($event,j)" maxlength="100">{{detail.goods_info_remark_016}}</textarea>
							<div class="num">
								<span>{{textStrlength}}</span>/<span>100</span>
							</div>
						</div>
					</div>
					<div class="m3">
						<div><span class="gray bold">亮点标签</span></div>
						<div class="flex-row flex-wrap showDialog-shoujia-select align-between-row">
							<span class="p4" :class="{current:liangDianStr.includes(i)}"  v-for="(item,i) in dictionary.fangYuanLiangDian" @touchstart.stop @click="selectLiangDian(item,i)">{{item}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-sumit-btn">
			<span class="sure" @click="handleSubmit">确认并发布</span>
		</div>
	</div>
</template>

<script>
	import mixinCommon from '../../../mixins/common';
	import mixinRequest from '../../../mixins/request';
	import {
		getDateInfo,
		prefixNumber
	} from '@/utils/tool';
	import innerPicker from './src/picker';



	export default {
		data() {
			return {
				detail:{
					"liang_dian": "",
					"goods_price": "",
					"sales_describe": "",
					"goods_type": 1,
					"goods_name": "",
					"goods_info_remark_001": "", //朝向
					"goods_info_remark_002": "", //面积
					"goods_info_remark_003": "", //楼层
					"goods_info_remark_004": "", //户型
					"goods_info_remark_005": "", //栋号
					"goods_info_remark_006": "", //室号
					"goods_info_remark_007": "", //电梯/楼梯
					"goods_info_remark_008": "", //卧室类型
					"goods_info_remark_009": "", //付款方式
					"goods_info_remark_010": "", //房屋用途
					"goods_info_remark_011": "", //装修类型
					"goods_info_remark_012": "", //入住时间
					"goods_info_remark_013": "", //房源编号
					"goods_info_remark_014": "", //房屋配置
					"goods_info_remark_015": "", //详细地址
					"goods_info_remark_016": "", //房源描述
					"goods_info_remark_017": "", //小区名称、物业名称
					"goods_info_remark_018": "", //建筑年代
					"goods_info_remark_019": "", //挂牌时间
					"goods_info_remark_020": "", //单价
					"goods_info_remark_022": "", //权属
					"goods_info_remark_023": "", //结构
					"goods_info_remark_024": "", //产权年限
					"goods_info_remark_025": "", //交房时间
					"goods_info_remark_026": "", //开盘时间
					"goods_info_remark_027": "", //佣金
					"goods_info_remark_028": "", //常用联系电话
					"goods_info_remark_029": "",//区域
					"goods_info_remark_030": "", //开盘时间
					"goods_info_remark_031": "", //备用联系电话
					goods_info_remark_032:"",//房间号
					"goods_main_image": "",//图片
					"goods_play": "",//视频
					"time_update":""//更新时间
				},
				liangDianStr:[],
				PeiZhiStr:[],
				textStrlength:0,
				orderId:'',
				title:'发布房源',
				showDialog:false,
				indexItem:{},
				pickerVisible:false,
				userId: '',
				type: 1,
				userType: '',
				yearArr:'',
				chanquannianxian:'',
				fanghaoLen:'',
			}
		},
		props: {
		},
		mixins: [
			mixinCommon,
			mixinRequest,
		],
		computed: {
			fanghao:function(){
				var str={},len=0
				console.log(this.fanghaoLen)
				if(this.fanghaoLen){
					len=this.fanghaoLen.substring(0,1)
					str=this.dictionary.fanghao
					str.length=len
					console.log(str)
				}
				return str
			},
			yongtu:function(){
				if(this.type==6){
					return {
						1:'商业',
						2:'办公',
					}
				}else{
					return this.dictionary.yongtu
				}
			},
			zhuangxiu:function(){
				if(this.type==6||this.type==4){
					return {
						1:'精装',
						3:'毛坯'
					}
				}else{
					return this.dictionary.zhuangXiu
				}
			}
		},
		created() {
		},
		mounted() {
			this.init()
			this.getyearArr()
		},
		methods: {
			/*
			 * 初始化
			 */
			init() {
				if(this.$route.query.userId){
				    this.userId=this.$route.query.userId
				};
				if(this.$route.query.type){
				    this.type=this.$route.query.type
				};
				if(this.$route.query.userType){
				    this.userType=this.$route.query.userType
				};
				if(this.$route.query.goodId){
					this.goodId=this.$route.query.goodId
					this.title='编辑房源'
					this.showLoading();
					this.$http.get({
						name: 'test.detail',
						loading: {
							enabled: true
						}
					}).then(({
						result,
						response
					}) => {
						console.log(result)
						if(result.public_goods_list&&result.public_goods_list.length){
							var len = result.public_goods_list.length
							for(let i=0;i<len;i++){
								if(result.public_goods_list[i].id_public_goods_info==this.goodId){
									this.detail=result.public_goods_list[i]
									this.liangDianStr=this.detail.liang_dian.split(',')
									this.PeiZhiStr=this.detail.goods_info_remark_014.split(',')
									this.detail.goods_main_image=this.detail.goods_main_image.split(',')
									this.detail.goods_main_image.map((item, index) => {
										console.log(item)
											item = require('@/assets/images/test/' + item)
									});
									if(this.detail.goods_play){
										this.detail.goods_play= require('@/assets/images/test/' + this.detail.goods_play)
									}
									this.textStrlength=this.detail.goods_info_remark_016.length
									this.type=this.detail.goods_type
								}
							}
						}
						this.pageStatus = true
						this.showContent();
					})
				}else{
					this.pageStatus = true
					this.showContent();
				}
				
				
			},

			/*
			 * 请求失败刷新
			 */
			handleRefresh() {
				this.handleLoad();
			},
			/*
			 * 上传图片
			 */
			upload(){
				
			},
			/*
			 * 提交
			 */
			handleSubmit(){
				this.handleHistory()
			},
			/*
			 * 获取列表
			 */
			getTypeOfShipment(item){
			    return Object.keys(item).map(key=>{
			        return {
			            title:item[key],
			            code:key
			        };
			    });
			},
			getTypeOfShipmentKey(item){
			    return Object.keys(item).map(key=>{
			        return {
			            title:item[key],
			            code:item[key]
			        };
			    });
			},
			/*
			 * 选择
			 */
			handleItemSelect(value,list,item){
				console.log(1)
				this.$$select({
				    title:'请选择项目',
				    value:value,
				    list:this.getTypeOfShipment(list),
				    sure:data=>{
						console.log(data)
						 this.detail[item]=data.code
						console.log(this.detail) 
						/* Vue.set(this.detail,item,data.code)
						console.log(this.detail) */
				    }
				});
			},
			/*
			 * 选择
			 */
			handleItemSelect1(value,list,item){
				console.log(1)
				this.$$select({
				    title:'请选择项目',
				    value:value,
				    list:this.getTypeOfShipmentKey(list),
				    sure:data=>{
						console.log(data)
						//this.$refs.ItemType.innerHTML=str
						this.detail[item]=data.code
						console.log(this.detail)
						/* Vue.set(this.detail,item,data.code)
						console.log(this.detail) */
				    }
				});
			},
			/*
			 * 多列显示
			 */
			changeFreeTimeShow(value,n,obj){
				this.pickerVisible=true;
				this.columns=n;
				/* this.selectData=[]
				if(value){
					this.selectData=obj=='goods_info_remark_012'?value.split('.'):value.split(',')
				} */
				this.objItem=obj
			},
			/*
			 * 获取房源亮点
			 */
			selectLiangDian(item,i){
				if(this.liangDianStr.length>0){
					if (this.liangDianStr.indexOf(i) == -1) {
						this.liangDianStr.push(i)
					}else{
						console.log(this.liangDianStr)
						this.liangDianStr.splice(this.liangDianStr.indexOf(i), 1)
					}
				}else{
					this.liangDianStr.push(i)
				}
				this.detail.liang_dian=this.liangDianStr.join(',')
			},
			/*
			 * 获取配置
			 */
			selectPeiZhi(item,i){
				if(this.PeiZhiStr.length>0){
					if (this.PeiZhiStr.indexOf(i) == -1) {
						this.PeiZhiStr.push(i)
					}else{
						console.log(this.PeiZhiStr)
						this.PeiZhiStr.splice(this.PeiZhiStr.indexOf(i), 1)
					}
				}else{
					this.PeiZhiStr.push(i)
				}
				this.detail.goods_info_remark_014=this.PeiZhiStr.join(',')
			},
			/*
			 * 获取输入字数
			 */
			changeTextStr(e,n){
				this.textStr=e.target.value
				this.textStrlength=e.target.value.length
			},
			/*
			 * 获取建筑年代
			 */
			getyearArr(){
				let indexYear= new Date().getFullYear();
				let str=[],chanquanStr=[]
				for(let i=1;i<20;i++){
					str[(indexYear-i)+'年']=(indexYear-i)+'年'
				}
				this.yearArr=str
				for(let j=1;j<10;j++){
					chanquanStr[j*10+'年']=j*10+'年'
				}
				this.chanquannianxian=chanquanStr
			},
			/*
			 * 去搜索
			 */
			handleSearch() {
				this.$router.push({
					path: '/home/soso',
				});
			},
			
			
		},
		components: {
			innerPicker
		},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.item-title{
		font-size: 0.85rem;
		font-weight: bold;
	}
	.ui-mode-content{
		font-size: 0.7rem;
		line-height: 1.6rem;
		background-color:#F8F9FA;
	}
	.cont{
		padding:0.85rem;
		margin-bottom: 0.5rem;
		background-color: #fff;
	}
	.m1{
		margin-top: 0.5rem;
		vertical-align: middle;
		.red{
			margin-left: 0.1rem;
		}
		.p2{
			width: 45%;
		}
	}
	.m1-border{
			border-bottom: solid 1px #F0F0F0;
			.n1{
				width: 33.3%;
				padding: 0 5%;
				.p1{
					border-bottom: none;
				}
			}
	}
	.p1{
		border-bottom: solid 1px #F0F0F0;
		input{
			border: none;
			font-size: 0.8rem;
			display: block;
			line-height: 1.6rem;
		}
		input::-webkit-input-placeholder{
			color: #DCDEE2;
		}
		span{
			font-size: 0.8rem;
		}
		
	}
	.bt1{
		span{
			margin-left: 0.5rem;
			display: inline-block;
			width: 2.4rem;
			height: 1.28rem;
			line-height: 1.28rem;
			border:1px solid #F0F0F0;
			border-radius: 0.64rem;
			text-align: center;
			font-size: 0.6rem;
			color: #7A7B81;
		}
	}
	.current{
		background-color: #FFF1F3;
		color: @base-active-color !important;
	}
	.tip{
		color: #7A7B81;
	}
	.m3{
		margin-top: 0.5rem;
		.p3{
			margin:0.5rem 0.5rem  0 0;
			padding: 0 0.86rem;
			display: inline-block;
			height: 1.5rem;
			line-height: 1.5rem;
			border:1px solid #F0F0F0;
			border-radius: 0.75rem;
			font-size: 0.7rem;
			color: #7A7B81;
		}
		.mt-back-showDialog-box{
			position: relative;
			margin:0.5rem auto;
			padding: 0.5rem;
			border: solid 1px #E3E3E3;
			background-color: #F9F9F9;
			border-radius: 0.4rem;
			textarea{
				width: 13rem;
				line-height: 1.4rem;
				border: none;
				background-color: transparent;
				font-size: 0.4rem;
			}
			.num{
				position: absolute;
				bottom:0.5rem;
				right:0.5rem;
				line-height: 1.4rem;
			}
		}
		.p4{
			margin-top: 0.5rem;
			width: 4.2rem;
			height: 1.86rem;
			line-height:1.86rem;
			border-radius: 0.4rem;
			background-color: #F9F9F9;
			text-align: center;
		}
		
	}
	
	
	.upload-img{
		margin: 0.3rem 0.8rem 0.5rem 0;
		}
	.upload-img,.upload-vadio{
		margin-top: 0.3rem;
		.ml{
			width: 5.6rem;
			height: 4.2rem;
			border: dotted 1px #F0F0F0 ;
			position: relative;
			background-color: #F9F9F9;
			border-radius: 0.4rem;
			img{
				width:100%;
				height: 100%; 
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
			.upload-tip{
				span{
					position: absolute;
					top:50%;
					left: 50%;
					margin-top:-1rem;
					margin-left:-1rem;
					color: #878787 ;
					line-height: 2rem;
				}
				em{
					margin-left:-2.2rem;
				}
			}
			.reupload{
				display: block;
				position: absolute;
				top:50%;
				left: 50%;
				margin-top:-0.64rem;
				margin-left:-1.6rem;
				height: 1.28rem;
				line-height: 1.28rem;
				width: 3.2rem;
				background-color: #000;
				border:solid 1px #fff;
				color: #fff ;
				border-radius: 0.64rem;
				font-size: 0.6rem;
				text-align: center;
				opacity: 0.7;
			}
			.tipimg{
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 0.85rem;
				line-height: 0.85rem;
				background: #000;
				opacity: 0.4;
				color: #fff;
				text-align: center;
				font-size: 0.6rem;
				border-radius: 0 0 0.3rem 0.3rem;
			}
		}
	}
	.upload-vadio{
		.ml{
			width: 100%;
			height: 10rem;
			.reupload{
				left: auto;
				top:auto;
				bottom: 0.85rem;
				right:0.85rem;
				height: 1.5rem;
				line-height: 1.5rem;
				width: 3.8rem;
				font-size: 0.7rem;
			}
		}
		
		
	}
	.tab-bottom{
		margin:1.28rem 0;
		span{
			display: block;
			width: 100%;
			height: 2.4rem;
			line-height: 2.4rem;
			border-radius: 1.2rem;
			font-size: 0.8rem;
			text-align: center;
		}
	}
	.close{
		position: absolute;
		right: 0.3rem;
		top:0.3rem;
		width:0.7rem ;
		height: 0.7rem;
		img{
			vertical-align: top;
			width: 100%;
			height: 100%;
		}
	}
	.index-cat-play{
		width:2.5rem ;
		height: 2.5rem;
		position: absolute;
		top:50%;
		left:50%;
		margin-left:-1.25rem;
		margin-top:-1.25rem;
	}
	
</style>
