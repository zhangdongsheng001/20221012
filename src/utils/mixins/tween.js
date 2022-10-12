/*
 * tween-混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
export default {
    data(){
        return {

        };
    },
    methods:{
        setAnimate(key,value,time){
            new this.TWEEN.Tween({
                [key]:this[key]
            }).to({
                [key]:value
            },time||500).onUpdate(tween=>{
                this[key]=this.setDecimalBit(parseFloat(tween[key]),this.decimal||0);
            }).start();
        },
        renderAnimate(){
            if(this.TWEEN.update()){
                requestAnimationFrame(()=>{
                    this.renderAnimate();
                });
            };
        }
    }
};
