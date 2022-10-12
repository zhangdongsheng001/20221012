<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="app_selectCity-main flex-col">
        <template v-if="getList&&getList.length">
            <div class="app_selectCity-box">
                <div class="app_selectCity-list" :class="{active:!cursorDown}" :style="getStyle">
									<label :key="i" v-for="(item,i) in getList" @touchstart.stop >
                    <p class="app_selectCity-item flex-row align-between-row align-center-row" >
											{{item.label}}
											<input class="app_radio-input" :value="item.value" name="love" v-model="value"  type="radio" v-bind="$attrs" :checked="isChecked" v-on="getListeners">
											<span class="select"></span>
										</p>
									</label>
                </div>
            </div>
        </template>
        <div v-else class="flex1 align-center flex-row app_selectCity-null">没有数据</div>
    </div>
</template>

<script>
import {
    on,
    off
} from '@/utils/dom';
import {
    trim,
    browser
} from '@/utils/tool';

export default {
    data() {
        return {
            size:0,
            moveY:0,
            cursorDown:false,
            index:0,
			itemIndex:{},
			itemValue:[],
        }
    },
    props:{
        /*
    	 * 列表数据
    	 */
    	list:Array,
        /*
    	 * 默认值
    	 */
    	value:[String,Number]
    },
    computed:{
        getStyle(){
            return {
                transform:`translateY(${this.index*this.size+this.moveY}px)`
            };
        },
        getList(){
            if(this.list&&this.itemValue){
                return this.list.filter(item=>{
                    return !!(item.label&&trim(`${item.label}`).length);
                });
            };
        },
				/* getCity(){
					return this.value
				}, */
        isMobile(){
            return browser.versions.mobile;
        },
        getEventName(){
            return this.isMobile?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'];
        },
				getListeners(){
				    return {
				        ...this.$listeners,
				        input:event=>{
				            if(!this.disabled&&!this.isChecked){
											console.log(this)
				            };
				        }
				    };
				},
				isChecked(){
				    return `${this.value}`=='true';
				},
    },
    mounted(){
		console.log(this.itemValue)
        if(this.getList&&this.getList.length){
			if(this.value&&this.value.length>0){
				this.itemValue=this.value.split(',')
				console.log(this.itemValue)
			}
            this.index=this.getIndex();
            //this.getHeight();
        };
        on(this.$el,this.getEventName[0],this.handleMouseDown);
    },
    methods:{
        /*
         * 获取索引
         */
        getIndex(){
            for(let i=0;i<this.getList.length;i++){
                if(this.getList[i].value==this.value){
										this.getList[i].checked=true
                    return
                };
            };
/* 						Object.keys(this.getList).forEach(key=>{
							if (this.itemValue.indexOf(this.getList[key].value) != -1) {
								this.getList[key].checked=true
							}else{
								this.getList[key].checked=false
							}
						});
 */        },
		selectValue(item,i){
			/* this.itemIndex=item
			this.value=item.code
			console.log(this.value) */
			console.log(1)
			console.log(this.itemValue)
			if (this.itemValue.indexOf(this.getList[i].value) == -1) {
				this.list[i].checked=true;
				this.itemValue.push(this.getList[i].value)
			}else{
				this.list[i].checked=false
				this.itemValue.splice(this.itemValue.findIndex(e => e== this.getList[i].value), 1)
			}
			//Vue.set(this.getList, i, this.getList[i])
			console.log(this.itemValue)
			console.log(this.getList)
			this.itemValue=item.value;
			this.list[i].checked=true;
		},
        /*
         * 点击拖拽
         */
        handleMouseDown(e){
            if(this.isMobile){
                e.stopImmediatePropagation();
                if(e.touches.length>1){
                    return;
                };
            };
            if(e.ctrlKey||e.button===2){
                return;
            };
            let event=this.isMobile?e.touches[0]:e;
            this.y=event.pageY;
            this.handleStartDrag(e);
        },
        /*
         * 拖拽
         */
        handleStartDrag(e){
            e.stopImmediatePropagation();
            this.cursorDown=true;
            on(document,this.getEventName[1],this.HandleMousemoveDocument);
            on(document,this.getEventName[2],this.HandleMouseupDocument);
            document.onselectstart=()=>false;
        },
        /*
         * 移动拖拽
         */
        HandleMousemoveDocument(e){
            if(!this.cursorDown){
                return;
            };
            if(!this.y){
                return;
            };
            let event=this.isMobile?e.touches[0]:e;
            this.moveY=event.pageY-this.y;
        },
        /*
         * 释放拖拽
         */
        HandleMouseupDocument(){
            this.cursorDown=false;
            document.onselectstart=null;
            let index=Math.round(this.moveY/this.size);
            this.index=Math.min(0,Math.max(1-this.getList.length,this.index+index));
            //this.moveY=0;
			if(this.moveY>0) this.moveY=0;
            delete this.y;
            off(document,'mousemove',this.HandleMousemoveDocument);
            off(document,'mouseup',this.HandleMouseupDocument);
        },
        /*
         * 获取选中数据
         */
        getSelectedValue(){
            /* if(this.getList&&this.getList.length){
                return this.getList[Math.abs(this.index)];
            }; */
			/* if (this.itemValue.indexOf(this.getList[key].code) != -1) {
				
			}else{
				
			}
			return this.itemIndex */
					return this.value
        },
        /*
         * 获取高度
         */
        getHeight(){
            let style=this.$refs.high.getBoundingClientRect();
            this.size=style.height;
        }
    },
    components:{

    },
    beforeDestroy(){
        off(this.$el,this.getEventName[0],this.handleMouseDown);
    }
}
</script>

<style lang="less">

</style>
