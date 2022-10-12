<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="app_select-main flex-col">
        <template v-if="getList&&getList.length">
            <div class="app_select-box flex1">
                <div class="app_select-list" :class="{active:!cursorDown}" :style="getStyle">
                    <p class="app_select-item"></p>
                    <p class="app_select-item"></p>
                    <p class="app_select-item" :key="i" v-for="(item,i) in getList">{{item.title}}</p>
                    <p class="app_select-item"></p>
										<p class="app_select-item"></p>
                </div>
            </div>
            <div class="app_select-alpha flex-col">
                <div class="app_select-shadow flex1 up"></div>
                <div class="app_select-high" ref="high"></div>
                <div class="app_select-shadow flex1 down"></div>
            </div>
        </template>
        <div v-else class="flex1 align-center flex-row app_select-null">没有数据</div>
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
            if(this.list){
                return this.list.filter(item=>{
                    return !!(item.title&&trim(`${item.title}`).length);
                });
            };
        },
        isMobile(){
            return browser.versions.mobile;
        },
        getEventName(){
            return this.isMobile?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'];
        },
				/* getcurrent(){
					return this.getList[Math.abs(this.index)]
				} */
    },
    mounted(){
        if(this.getList&&this.getList.length){
			
            this.index=this.getIndex();
            this.getHeight();
        };
        on(this.$el,this.getEventName[0],this.handleMouseDown);
    },
    methods:{
        /*
         * 获取索引
         */
        getIndex(){
            for(let i=0;i<this.getList.length;i++){
                if(this.getList[i].code==this.value){
                    return -i;
                };
            };
            return 0; 
		
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
						let index=Math.round(this.moveY/this.size);
						console.log(index)
		
        },
        /*
         * 释放拖拽
         */
        HandleMouseupDocument(){
            this.cursorDown=false;
            document.onselectstart=null;
            let index=Math.round(this.moveY/this.size);
            this.index=Math.min(0,Math.max(1-this.getList.length,this.index+index));
            this.moveY=0;
            delete this.y;
            off(document,'mousemove',this.HandleMousemoveDocument);
            off(document,'mouseup',this.HandleMouseupDocument);
						console.log(this.index)
						console.log(this.size)
						console.log(this.moveY)
        },
        /*
         * 获取选中数据
         */
        getSelectedValue(){
             if(this.getList&&this.getList.length){
                return this.getList[Math.abs(this.index)];
            }; 
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
