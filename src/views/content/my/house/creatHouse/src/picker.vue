<template>
	<div>
		<VuePicker @touchstart.stop :data="pickData" :showToolbar="true"  @cancel="cancel"
			@confirm="confirm" :visible.sync="pickerVisible"  :layer="layer" :link="link" />
	</div>
</template>
<!-- <template>
	<div>
		<VuePicker @touchstart.stop :data="pickData" :showToolbar="true" :defaultIndex="selectData" @cancel="cancel"
			@confirm="confirm" :visible.sync="pickerVisible"  @change="change" :layer="layer" :link="link" />
	</div>
</template> -->

<script>
	import VuePicker from 'vue-pickers'
	import Ocity from '@/assets/data/city';
	export default {
		components: {
			VuePicker
		},
		data() {
			return {
				pickerVisible: false,
				pickData: [],
				columns: '',
				result: '',
				index: [],
				selectData: [],
				objItem:'',
				layer:0,
				link:false,
				getdateIndexM:1,
				getdateIndexY:'',
			}
		},
		props: {
			pickerVisible: '',
			columns: '',
			selectData: '',
			objItem:''
		},
		computed: {
			/* getdateD:function(){
				let arr=[1,3,5,7,8,10,12]
				let len=30
				let str=[]
				if(this.getdateIndexM){
					console.log(444)
				}
				if(this.getdateIndexM==2){
					console.log(333)
					len=(this.getdateIndexY%400==0||(this.getdateIndexY%100!=0&&this.getdateIndexY%4==0))?29:28
				}else if(arr.includes(this.getdateIndexM)){
					len=31
				}
				for(let i=0;i<len;i++){
					str[i] ={
						label: (i+1)+'日',
						value: i+1
					}
				}
				console.log(str)
				return str
			}, */
			
		},
		mixins: [
			Ocity,
		],
		watch: {
			/* columns: {
				handler(val) {
					console.log(5)
					console.log(this.columns)
					this.getpickData()
				}
			}, */
			objItem:{
				handler(val) {
					console.log(val)
					this.getpickData()
				}
			},
		},
		created() {
			this.getpickData()
		},
		methods: {
			getpickData() {
				this.layer=0;
				this.link=false
				if(this.objItem=='goods_info_remark_009'){
					this.pickData = [
						this.getdateYa(),
						this.getdateFu()
					]
				} else if(this.objItem=='goods_info_remark_003'){
					this.pickData = [
						this.getdateLou(),
						this.getdateZong()
					]
				}else if(this.objItem=='goods_info_remark_004'){
					this.pickData = [
						this.getdateShi(),
						this.getdateTing(),
						this.getdateWei()
					]
				}else if(this.objItem=='goods_info_remark_019'||this.objItem=='goods_info_remark_025'||this.objItem=='goods_info_remark_026'){
					this.layer=3
					this.link=true
					/* this.pickData = [
						this.getdateY(),
						this.getdateM(),
						this.getdateD
					] */
					this.pickData =this.getdateY()
				}else if(this.objItem=='goods_info_remark_012'){
					this.layer=4
					this.link=true
					this.pickData =this.getdateY(4)
				}else if(this.objItem=='goods_info_remark_029'){
					this.layer=3
					//this.link=true
					this.pickData = Ocity
				}
				console.log(this.pickData)
			},
			cancel() {
				console.log('click cancel result: null')
				//this.$emit('close')
				this.$emit("update:pickerVisible",false);
			},
			confirm(res) {
				var str=[]
				if(this.objItem=="goods_info_remark_029"){
					for(var i=0;i<this.columns;i++){
						str[i]=res[i].label
					}
					Vue.set(this.$parent.detail,this.objItem,str.join('-'))
				}else{
					for(var i=0;i<this.columns;i++){
						str[i]=res[i].value
					}
					if(this.objItem=='goods_info_remark_012'||this.objItem=='goods_info_remark_019'||this.objItem=='goods_info_remark_025'||this.objItem=='goods_info_remark_026'){
						if(str[1]<10){
							str[1]="0"+str[1]
						}
						if(str[2]<10){
							str[2]="0"+str[2]
						}
						if(str[3]&&str[3]<10){
							str[3]="0"+str[3]
						}
						this.$parent.detail[this.objItem]=str.join('.')
					}else{
						//this.$parent.detail[this.objItem]=str.join(',')
						Vue.set(this.$parent.detail,this.objItem,str.join(','))
						if(this.objItem=="goods_info_remark_004"){
							this.$parent.fanghaoLen=str[0]
						}
					}
				}
				this.$emit("update:pickerVisible",false);
			},
			getdateYa() {
				var tdata1 = []
				for (var i = 0; i < 7; i++) {
					tdata1[i] = {
						label: '押' + (i + 1),
						value: '押' +(i + 1)
					}
				}
				return tdata1
			},
			getdateFu() {
				var tdata2 = []
				for (var i = 0; i < 7; i++) {
					tdata2[i] = {
						label: '付' +(i + 1),
						value: '付' +(i + 1)
					}
				}
				return tdata2
			},
			getdateLou() {
				var tdata1 = []
				for (var i = 0; i < 32; i++) {
					tdata1[i] = {
						label: (i + 1)+'层',
						value: (i + 1)+'层'
					}
				}
				return tdata1
			},
			getdateZong() {
				var tdata2 = []
				for (var i = 0; i < 32; i++) {
					tdata2[i] = {
						label: '共' +(i + 1)+'层',
						value: '共' +(i + 1)+'层'
					}
				}
				return tdata2
			},
			getdateShi() {
				var tdata1 = []
				for (var i = 0; i < 8; i++) {
					tdata1[i] = {
						label: (i + 1)+'室',
						value: (i + 1)+'室'
					}
				}
				return tdata1
			},
			getdateTing() {
				var tdata1 = []
				for (var i = 0; i < 5; i++) {
					tdata1[i] = {
						label: i+'厅',
						value: i+'厅'
					}
				}
				return tdata1
			},
			getdateWei() {
				var tdata1 = []
				for (var i = 0; i < 8; i++) {
					tdata1[i] = {
						label: i+'卫',
						value: i+'卫'
					}
				}
				return tdata1
			},
			getdateY(n) {
				var tdata3 = [],t=n?n:'';
				var IndexYear=new Date().getFullYear()
				for(let i=0;i<2;i++){
					tdata3[i] ={
						label: (IndexYear+i)+'年',
						value: (IndexYear+i),
						children:this.getdateM(IndexYear,t)
					}
				}
				return tdata3
			},
			getdateM(n,t) {
				var tdata3 = []
				for (let j = 0; j < 12; j++) {
					tdata3[j] ={
						label: (j+1)+'月',
						value: (j+1),
						children:this.getdateD(n,j+1,t)
					}
				}
				return tdata3
			},
			getdateD(n,j,t){
				let arr=[1,3,5,7,8,10,12]
				let len=30
				let str=[]
				if(j==2){
					len=(n%400==0||(n%100!=0&&n%4==0))?29:28
				}else if(arr.includes(j)){
					len=31
				}
				if(t){
					for(let i=0;i<len;i++){
						str[i] ={
							label: (i+1)+'日',
							value: i+1,
							children:this.getdateT()
						}
					}
				}else{
					for(let i=0;i<len;i++){
						str[i] ={
							label: (i+1)+'日',
							value: i+1
						}
					}
				}
				
				return str
			},
			getdateT() {
				var tdata3 = []
				for (let j = 0; j < 24; j++) {
					tdata3[j] ={
						label: (j+1)+'时',
						value: (j+1),
					}
				}
				return tdata3
			},
		},
	}
</script>
<style scoped>
	/deep/ .vue-picker{
		border-radius: 0.85rem 0.85rem 0px 0px;
		padding:1rem 0 4rem;
	}
	/deep/ .header{
		position: absolute !important;
		bottom: 1.5rem;
		left: 0;
		right: 0;
		z-index: 6;
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
	}
	
	/deep/ .left,/deep/ .right{
			flex:1;
			text-align: center;
		}
		/deep/ .left span,/deep/ .right	span{
			display: inline-block;
				width: 4rem;
				height: 1.8rem;
				line-height: 1.8rem;
				background-color: #F0F0F0;
				border-radius: 0.2rem;
				text-align: center;
				color: #7A7B81;
				font-size: 0.8rem;
			}
			/deep/ .right span{
					color: #fff;
					background-color:#FD3C5C  !important;
			}
</style>
