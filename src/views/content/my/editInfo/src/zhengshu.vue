<template>
	<div class="inner-model">
	<template v-if="indexItem&&indexItem.length">
		<div v-for="(item,j) in indexItem"  class="" :key="`itemtime-${j}`" :ref="'itemtime'+j" >
			<template v-if="item.name">
				<div class="flex-row upload-img align-between-row">
					<div class="ml" v-if="item.pic_src">
						<!-- <img :src="item.pic_src" /> -->
						<img src="../../../../../assets/images/test/test_image.jpg" />
						<i class="del-pic iconfont icon iconguanbi6" @click.stop="delPic(j)"></i>
					</div>
					<div v-else class="ml">
						<em class="iconfont icon iconguanbi6"></em>
					</div>
					<div class="mr">
						<div class="item flex-row " >
							<div class="label flex1">证书名称</div>
							<input v-if="item.name" type="text" v-model="item.name">
							<input v-else type="text" placeholder="请填写证书名称">
						</div>
						<div class="item flex-row " >
							<div class="label flex1">授予机构</div>
							<input v-if="item.agency" type="text"  v-model="item.agency">
							<input v-else type="text" placeholder="请填写授予机构">
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="flex-row upload-img align-between-row">
					<div class="ml">
						<em class="iconfont icon iconguanbi6"></em>
					</div>
					<div class="mr">
						<div class="item flex-row " >
						    <div class="label flex1">证书名称</div>
						    <input type="text" placeholder="请填写证书名称">
						</div>
						<div class="item flex-row " >
						    <div class="label flex1">授予机构</div>
						    <input type="text" placeholder="请填写授予机构">
						</div>
					</div>
				</div>
			</template>
			<div class="flex-row align-between-row align-center-row  mar-5-box">
				<span class="gray">最多1张，支持jpg，png格式</span>
				<a href="javascript:;" class="del-btn" @click.stop="delItem(j)" >删除</a>
			</div>
		</div>
	</template>
	</div>
</template>

<script>
	export default {
	    data(){
	        return {
				indexItem:'',
			}
		},
		props:{
		    indexItem:'',
		},
		watch:{
			indexItem:{
				handler(val){
					console.log(22222)
					this.$nextTick(this.refresh);
				},
			},
		},
		computed:{
			
		},
		created(){
		},
		mounted(){
			console.log(this.indexItem)
		},
		methods:{
			delItem(n){
				this.indexItem.splice(n,1);
				console.log(this.indexItem)
			},
			delPic(n){				this.indexItem[n].pic_src='';				console.log(this.indexItem)
			}
		},
		components:{
		},
		beforeDestroy(){
		
		}
	}
</script>

<style>
	.upload-img{padding-top: 0.8rem;}
	.ml{position: relative;}
	.del-pic{
		position: absolute;
		top:-0.4rem;
		right: -0.4rem;
		display: block;
		box-sizing: content-box;
		width: 0.7rem;
		height: 0.7rem;
		line-height: 0.7rem;
		border-radius: 50%;
		text-align: center;
		font-size: 1rem;
		font-weight: bold;
		color:  #FF3E3D;
	}
</style>
