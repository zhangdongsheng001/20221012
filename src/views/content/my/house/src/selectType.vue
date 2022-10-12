<template>
	<transition name="app_dialog">
		<div class="mt-master-container flex-col align-center" @touchstart.prevent >
			<div class="mt-master-content mt-back-showDialog" >
				<div class="mt-bottom-back-close"  @touchstart.stop @click="handleBackClose()">
					<img src="@/assets/images/icon_delete.png" />
				</div>
				<div>
					<p class="font9 mt-back-showDialog-title">选择类型</p>
					<div class="mt-back-showDialog-body h18">
						<div class="mt-back-showDialog-box " :class="{current:NewHouseType==i}"   v-for="(item,i) in list">
							<label class="flex-row align-center-row align-between-row" @touchstart.stop>
								<div class="flex1">
									<p class="font8 bold">{{item}}</p>
								</div>
								<input class="mt-back-showDialog-input" :value="i" name="user_type"   type="radio" v-bind="$attrs" :checked="isChecked" v-on="getTypeListeners" />
								<span class="select"></span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
	    data(){
	        return {
						NewHouseType:1,
						userType:'',
						list:{
								1:'租房',
								5:'二手房',
								6:'商铺办公',
							}
			}
		},
		props:{
			userType:''
		},
		watch:{
			userType:{
			    handler(val){
			        if(val&&val==4){
								this.list={
									1:'租房',
									4:'新房',
									5:'二手房',
									6:'商铺办公',
								}
							}
			    },
			    immediate:true
			}
		},
		computed:{
			getTypeListeners(){
			    return {
			        ...this.$listeners,
			        input:event=>{
			            if(!this.disabled&&!this.isChecked){
										this.NewHouseType=event.target.value
										this.$emit('changeHouseType',{NewHouseType:this.NewHouseType})
			            };
			        }
			    };
			},
			isChecked(){
			    return `${this.value}`==this.NewHouseType;
			},
		},
		created(){
		},
		mounted(){
		},
		methods:{
			handleBackClose(){
				//this.$parent.showHouseDialog=false
				console.log(1)
				this.$emit('update:showHouseDialog', false)
			}
		},
		components:{
		},
		beforeDestroy(){
		
		}
	}
</script>

<style>
	.mt-master-content{
		padding-bottom: 1rem;
	}
	.h18{
		//height: 18rem;
		overflow-y: auto;
	}
	.mt-back-showDialog-input{
			display: none;
		}
		.select{
			display: inline-block;
			width:1rem ;
			height: 1rem;
			border: solid 1px #7A7B81;
			border-radius: 50%;
			
		}
	.mt-back-showDialog-box.current{
		border-color: @base-active-color;
		.select{
			border-color: transparent;
			background:url(~@/assets/images/mySelect.png)  no-repeat center center;
			background-size: 100% auto;
		}
	}
</style>
