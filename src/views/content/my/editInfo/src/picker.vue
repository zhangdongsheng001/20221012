
<template>
  <div>
    <VuePicker :data="pickData"
      :showToolbar="true"
	  :title="indexTitle"
      @cancel="cancel"
      @confirm="confirm"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
  import VuePicker from 'vue-pickers'
  export default {
    components: { VuePicker },
    data () {
      return {
        pickerVisible: false,
        pickData:[],
		columns:'',
        result: '',
		indexTitle:'请选择开始时间'
      }
    },
	props:{
	    pickerVisible:'',
		columns:'',
	},
	 watch:{
		columns:{
			handler(val){
				console.log(5)
				console.log(this.columns)
			    this.getpickData()
			},
		}
	}, 
	created(){
		this.getpickData()
	},
    methods: {
		getpickData(){
			if(this.columns&&this.columns==3){
				this.indexTitle='请选择开始时间';
			    this.pickData=[
					this.getdateday(),
					this.getdatehh(),
					this.getdatemm()
				]
			}else{
				this.indexTitle='请选择结束时间';
				this.pickData=[
					this.getdatehh(),
					this.getdatemm()
				]
			}
		},
      cancel () {
		console.log('click cancel result: null')
		this.$emit('freeTimeObj')
      },
      confirm (res) {
		console.log(res)
        this.result = JSON.stringify(res)
		console.log(res)
		this.$emit('freeTimeObj',res)
      },
	  getdateday(){
	  		  var tdata1=['日','一','二','三','四','五','六']
	  		  for(var i=0;i<7;i++){
	  			  tdata1[i]={
	  				  label: '星期'+tdata1[i],
	  				  value:tdata1[i]
	  			  }
	  		  }
	  		  return tdata1
	  },
	  getdatehh(){
		  var tdata2=[]
		  for(var i=0;i<24;i++){
			  tdata2[i]={
				  label: (i+1)+'时',
				  value:i+1
			  }
		  }
		  return tdata2
	  },
	  getdatemm(){
	  		  var tdata3=[]
	  		  for(var i=0;i<24;i++){
	  			  tdata3[i]={
	  				  label:(i+1)+'分',
	  				  value:i+1
	  			  }
	  		  }
			return tdata3
	  }
    }
  }
</script>














