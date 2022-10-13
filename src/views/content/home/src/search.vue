<template>
    <div>
  <div class="top" >
        <div class="top-item" @click="btn(1)" >
          <div class="top-item-list1">上海市
          <img src="../../../../../src/assets/images/base/icon_more.png" alt="">

          </div>
        </div>
       
        <div class="top-item">
          
          <div class="top-item-list2">
            <img src="../../../../../src/assets/images/search.png" alt="">
            <input style="border:0;font-size: 0.5rem;background-color: #f8f9fa;width: 9rem;color: #dcdee2;" type="text" value="搜索">

          </div>

        </div>
        <div class="top-item">
          <div class="top-item-list3">
            <img src="../../../../../src/assets/images/soso_location.png" alt="">
          </div>

        </div>
        
      </div>
       <!-- tab==1 -->
       <div class="service" v-if="tab==1">
            <div class="topBg">
             
            </div>
            <div class="serviceContent">
                <div class="serviceContentList">
                    <div class="serviceContentListItem1" style="color:#dcdee2;width: 100%; height: 2rem;">选择城市</div>
                    <div class="serviceContentListItem">132</div>
                    <div class="serviceContentListItem">132</div>

                    <div class="serviceContentListItem">132</div>

                    <div class="bottom">
                        <div class="bottomItem1">重置</div>
                        <div class="bottomItem2" @click="esc(0)" >确定</div>

                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    data(){
        return{
            tab:0
        }
    },
     methods:{
        btn(index){
            this.tab=index;
            this.$emit('func',this.tab)
        },
        esc(index){
         this.tab=index;
         this.$emit('func',this.tab)
        }
     }
}
</script >

<style lang="less" scoped>
.top {
  margin: 1rem;
  display: flex;
  .top-item {
    display: flex;
    .top-item-list1 {
      width: 3rem;
      height: 1.8rem;
      font-size: 0.5rem;
      line-height: 1.8rem;
      img {
        width: 0.5rem;
        height: 0.5rem;

        margin: auto;
      }
    }
  }
  .top-item {
    .top-item-list2 {
      display: flex;
      width: 11.2rem;
      height: 1.8rem;
      background: #f8f9fa;
      border-radius: 0.5rem;
      margin-left: 0.5rem;
      color: #dcdee2;
      font-style: 0.4rem;
      line-height: 1.8rem;
      img {
        display: block;
        margin: 0.4rem 0.5rem;
      }
    }
  }
  .top-item {
    .top-item-list3 {
      margin-left: 1.5rem;
      width: 1.8rem;
      height: 1.8rem;
      background: #f8f9fa;
      border-radius: 0.4rem;
      img {
        display: block;
        width: 0.9rem;
        margin: 0.4rem auto;
      }
    }
  }
}

.service{
   
    .topBg{z-index: 999;
    position: fixed;top: 3.5rem; left: 0;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.5);
}
.serviceContent{
    position: absolute;
    z-index: 999;
    height: 22rem;
    background: #f8f9fa;
    top:3.5rem;
    width: 100%;
    .serviceContentList{
        height: 20rem;
        margin: 0 1rem;
        .serviceContentListItem{
            width: 100%;height: 2rem;
            font-size: 0.5rem;
            border-bottom: 0.05rem solid #dcdee2 ;
            text-align: left;
            line-height: 2rem;

        }
        .bottom{
            display: flex;
            
            position: absolute;
            bottom: 0;
            width: 100%;height: 3rem;
            justify-content: center;
            align-items: center;
            .bottomItem1{
                margin: 0 1rem;
                width: 3rem;
                height: 1.5rem;
                border: 0.03rem solid #dcdee2;
                border-radius: 0.75rem;
                text-align: center;
                line-height: 1.5rem;

            }
            .bottomItem2{
                margin: 0 1rem;
                width: 15rem;
                height: 1.5rem;
                border: 0.03rem solid #dcdee2;
                border-radius: 0.75rem;
                background-color: red;
                color: #fff;
                text-align: center;
                line-height: 1.5rem;


            }
        }
    }
}
}
</style>