<template>
	<div>
	<template v-if="indexFreeTime&&indexFreeTime.length">
		<div v-for="(item,j) in indexFreeTime"  class="free innerbox flex-row align-between-row align-center-row" :key="`itemtime-${j}`" :ref="'itemtime'+j" >
			<i @click.stop="delItem(j)">一</i>
			<template v-if="item.day">
			<p>
				<span @click.stop="selectTime(j,3)">
				星期<em>{{item.day}}</em>
				<em>{{item.beginTime.split(":")[0]}}</em>时
				<em>{{item.beginTime.split(":")[1]}}</em>分
				 </span>
				 至
				 <span @click.stop="selectTime(j,2)">
				<em>{{item.endTime.split(":")[0]}}</em>时
				<em>{{item.endTime.split(":")[1]}}</em>分
				</span>
			</p>
			</template>
			<template v-else>
				<p @click.stop="selectTime(j)">
					星期<em>一</em>
					<em>00</em>时
					<em>00</em>分 至
					<em>00</em>时
					<em>00</em>分
				</p>
			</template>
		</div>
	</template>
	<template v-else>
		<div  class="free innerbox flex-row align-between-row align-center-row" ref="itemTime" >
			<i>一</i>
			<p>
				星期<em>一</em>
				<em>08</em>时
				<em>30</em>分 至
				<em>18</em>时
				<em>30</em>分
			</p>
		</div>
	</template>
	</div>
</template>

<script>
	export default {
	    data(){
	        return {
				indexFreeTime:'',
				itemtime:{}
			}
		},
		props:{
		    indexFreeTime:'',
		},
		watch:{
			indexFreeTime:{
				handler(val){
					this.itemtime=val;
					this.$nextTick(this.refresh);
				},
			},
		},
		computed:{
			
		},
		created(){
		},
		mounted(){
			console.log(this.indexFreeTime)
		},
		methods:{
			delItem(n){
				this.indexFreeTime.splice(n,1);
				console.log(this.indexFreeTime)
			},
			selectTime(n,type){
				console.log(44)
				this.$emit('changeShowSelect',{value:true,index:n,type:type})
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
