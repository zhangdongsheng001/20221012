/*
 * chart-混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {
    data(){
        return {
            chart:{
                title:{
                    show:false
                },
                grid:{
                    left:0,
                    top:0,
                    right:0,
                    bottom:0,
                    borderWidth:0
                },
                toolbox:{
                    show:false
                },
                xAxis:{
                    show:false
                },
                yAxis:{
                    show:false
                },
                dataZoom:[
                   {
                       type:'slider',
                       show:false
                   },
                   {
                       type:'inside',
                       disabled:true
                   }
               ],
            }
        };
    },
    methods:{
        /*
         * 获取基础数据
         */
        getListInfo(info){
            this.list=info.rows;
            if(this.list.length){
                this.visible=true;
                this.setChart();
            }else{
                this.visible=false;
            };
        },
        /*
         * 设置图表
         */
        setChart(){
            if(!this.myChart){
                this.myChart=this.$echarts.init(this.$refs.chart);
            };
            this.myChart.setOption(this.getOption);
        }
    }
};
