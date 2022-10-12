/*
 * 购物车混入
 *
 * @Author: 谢力 843926058@qq.com
 * @Date:   2018-06-06 14:08:51
 * @Last Modified by:   谢力
 * @Last Modified time: 2018-06-06 14:08:56
 */
/* import TWEEN from '@tweenjs/tween'; */

export default {
    data() {
        return {
            cartStyle:{
                x:-999,
                y:-999
            },
            isShopping:false
        }
    },
    computed:{
        getShoppingStyle(){
            return {
                left:`${this.cartStyle.x}px`,
                top:`${this.cartStyle.y}px`
            };
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        /*
    	 * 开始动画
    	 */
        startAnimate(target,flag){
            return new Promise((resolve,reject)=>{
                this.$nextTick(()=>{
                    let info=target.getBoundingClientRect(),
                        box=flag?this.$refs.addCart.parentNode:this.$root.$el,
                        rootInfo=box.getBoundingClientRect(),
                        cartInfo=this.$refs.addCart.getBoundingClientRect(),
                        {left,top}=this.$refs.cart.$el.getBoundingClientRect();
                    this.cartStyle.x=info.left-rootInfo.left+(info.width-cartInfo.width)*0.5;
                    this.cartStyle.y=info.top-rootInfo.top;
                    /* this.setAnimate({
                        left:left-rootInfo.left,
                        top:top-rootInfo.top
                    }).then(()=>{
                        resolve();
                    });
                    this.renderAnimate(); */
                });
            });
        },
        /*
    	 * 初始化动画
    	 */
        setAnimate({left,top},time=500){
            return new Promise((resolve,reject)=>{
                new TWEEN.Tween({
                    left:this.cartStyle.x,
                    top:this.cartStyle.y
                }).to({
                    top:top,
                    left:left
                },time).easing(TWEEN.Easing.Quadratic.Out).onUpdate(tween=>{
                    this.cartStyle.y=tween.top;
                    this.cartStyle.x=tween.left;
                }).onComplete(tween=>{
                    this.stop();
                    resolve();
                }).start();
            });
        },
        /*
    	 * 执行动画
    	 */
        renderAnimate(){
            if(TWEEN.update()){
                this._animateFrame=requestAnimationFrame(this.renderAnimate);
            };
        },
        /*
    	 * 停止动画
    	 */
        stop(){
            this._animateFrame&&cancelAnimationFrame(this._animateFrame);
        }
    },
    beforeDestroy(){
        this.stop();
    }
}
