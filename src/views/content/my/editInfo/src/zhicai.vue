<template>
	<div class="inner-model">
	<template v-if="indexItem&&indexItem.length">
		<div  v-for="(item,j) in indexItem"  class="experience-list" :key="`itemsaishi-${j}`" :ref="'itemsaishi'+j" >
			<template v-if="item.time">
				<div class="item flex-row align-center m1" >
					<div class="label flex1">赛事时间</div>
					<p @click="changeDate(indexItem,'time',j,item.time)">
						<span>{{item.time.split(".")[0]}}</span>年
						<span>{{item.time.split(".")[1]}}</span>月
						<span>{{item.time.split(".")[2]}}</span>日
					</p>
				</div>
				<div class="m2">
					<div>赛事名称</div>
					<div class="input-box">
						<textarea rows="3"  placeholder="请填写赛事名称"  @keyup="changeTextStr($event,j)" maxlength="30">
							{{item.name}}
						</textarea>
						<div class="num">
							<span>{{item.name.length}}</span>/<span>30</span>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="item flex-row align-center m1" >
					<div class="label flex1">赛事时间</div>
					<p @click="changeDate(indexItem,'time',j)">
						<span>2021</span>年
						<span>01</span>月
						<span>01</span>日
					</p>
				</div>
				<div class="m2">
					<div>赛事名称</div>
					<div class="input-box">
						<textarea rows="3"  placeholder="请填写赛事名称"  @keyup="changeTextStr($event,'a')" maxlength="30">
							
						</textarea>
						<div class="num">
							<span>{{textStr}}</span>/<span>30</span>
						</div>
					</div>
				</div>
			</template>
			<div class="txt-r  mar-5-box"><a href="javascript:;" class="del-btn"  @click.stop="delItem(j)"  >删除</a></div>
		</div>
	</template>
	</div>
</template>

<script>
	export default {
	    data(){
	        return {
				indexItem:'',
				textStr:0
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
			changeDate(list,str,index,indexData){
				if(indexData){
					this.$emit('changeDateF',{list:list,str:str,index:index,calendarShow:true,indexData:indexData})
				}else{
					this.$emit('changeDateF',{list:list,str:str,index:index,calendarShow:true})
				}
			},
			changeTextStr(e,n){
				if(n=='a'){
					this.textStr=e.target.value.length
				}else{
					this.indexItem[n].name=e.target.value
				}
			}
		},
		components:{
		},
		beforeDestroy(){
		
		}
	}
</script>

<style>
</style>
