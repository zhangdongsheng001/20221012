<!-- /*
 * 笔试题：请直接在此页面编写代码，设计稿中展现的弹窗已写好可以直接取用，感谢配合
 */ -->
<template>
  <div class="ui-mode-container ui-mode-box flex-col bg">
    <div class="top">
        <div class="top-item">
          <div class="top-item-list1">上海市
          <img src="../../../../src/assets/images/base/icon_more.png" alt="">

          </div>
        </div>
        <div class="top-item">
          <div class="top-item-list2">
            <img src="../../../../src/assets/images/search.png" alt="">搜索
            
          </div>

        </div>
        <div class="top-item">
          <div class="top-item-list3">
            <img src="../../../../src/assets/images/soso_location.png" alt="">
          </div>

        </div>
      </div>
    <div class="good-swipe">
      <mt-swipe :auto="4000" :prevent="true" class="swipe">
      <mt-swipe-item>
         <img src="../../../../src/assets/images/test/banner.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../../../src/assets/images/test/banner3.png" alt="">

      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../../../src/assets/images/test/banner5.png" alt="">

      </mt-swipe-item>

    </mt-swipe>

    </div>
    
    <div class="list">
      <div class="listItem">
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu1.png" alt="">
              <div class="listItembtn-text">合租</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu2.png" alt="">
              <div class="listItembtn-text">整租</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu3.png" alt="">
              <div class="listItembtn-text">公寓</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu4.png" alt="">
              <div class="listItembtn-text">新房</div>
           </div>
      </div>
    </div>
    <div class="list">
      <div class="listItem">
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu5.png" alt="">
              <div class="listItembtn-text">二手房</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu6.png" alt="">
              <div class="listItembtn-text">商铺办公</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu7.png" alt="">
              <div class="listItembtn-text">搬家</div>
           </div>
           <div class="listItembtn">
              <img src="../../../../src/assets/images/test/menu8.png" alt="">
              <div class="listItembtn-text">保洁</div>
           </div>
      </div>
    </div>
    <div class="cell-swipe">
       <div class="cell-swipe-list">
        <img src="../../../../src/assets/images/test/ad1.png" alt="">
        <div class="text">合租 12312312312312312311231</div>

       </div>
       <div class="cell-swipe-list">
        <img src="../../../../src/assets/images/test/ad2.png" alt="">
        <div class="text">123123123123199999999999999999</div>

       </div>
       <div class="cell-swipe-list">
        <img src="../../../../src/assets/images/test/ad3.png" alt="">
        <div class="text">合租</div>
       </div>
    </div>
   <div style="width: 100%;
  height: 40px;"> </div>
     
    <innerContent></innerContent>

    <!-- <div class="btn">
      <div class="btn-item" >位置<img src="../../../../src/assets/images/base/icon_more.png" alt=""></div>
      <div class="btn-item">租金<img src="../../../../src/assets/images/base/icon_more.png" alt=""></div>
      <div class="btn-item">户型<img src="../../../../src/assets/images/base/icon_more.png" alt=""></div>
      <div class="btn-item">筛选<img src="../../../../src/assets/images/base/icon_more.png" alt=""></div>
    </div> -->
    <div class="detail">
      
        <div class="detailItemList1">
          <img src="../../../../src/assets/images/test/small-pic.png" alt="">

        </div>
        <div class="detailItemList2">
          <div class="detailItemText1">
         <div >合租 </div><div style=""> 哈斯哈开始建行卡技术 asdw ad</div>
          </div>
          <div class="detailItemText2">
            <div>20m<sup>2</sup></div> <div>|</div> <div>嘉定区-南翔镇</div>

          </div>
          <div class="detailItemText3">
         <div class="btn">独卫 </div> 
         <div class="btn">进地铁 </div>  
         <div class="btn">带阳台 </div>  

          </div>
          <div class="detailItemText4">
         <div>3600</div> <div>元/月</div> 
          </div>
        </div>
      
    </div>
    <div class="detail">
      
      <div class="detailItemList1">
        <img src="../../../../src/assets/images/test/small-pic2.png" alt="">

      </div>
      <div class="detailItemList2">
        <div class="detailItemText1">
       <div >合租 </div><div style=""> 哈斯哈开始建行卡技术 asdw ad</div>
        </div>
        <div class="detailItemText2">
          <div>20m<sup>2</sup></div> <div>|</div> <div>嘉定区-南翔镇</div>

        </div>
        <div class="detailItemText3">
       <div class="btn">独卫 </div> 
       <div class="btn">进地铁 </div>  
       <div class="btn">带阳台 </div>  

        </div>
        <div class="detailItemText4">
       <div>2800</div> <div>元/月</div> 
        </div>
      </div>
    
  </div>
  <div class="detail">
      
      <div class="detailItemList1">
        <img src="../../../../src/assets/images/test/small-pic3.png" alt="">

      </div>
      <div class="detailItemList2">
        <div class="detailItemText1">
       <div >合租 </div><div style=""> 哈斯哈开始建行卡技术 asdw ad</div>
        </div>
        <div class="detailItemText2">
       <div>20m<sup>2</sup></div> <div>|</div> <div>嘉定区-南翔镇</div>
        </div>
        <div class="detailItemText3">
       <div class="btn">独卫 </div> 
       <div class="btn">进地铁 </div>  
       <div class="btn">带阳台 </div>  

        </div>
        <div class="detailItemText4">
       <div>3600</div> <div>元/月</div> 
        </div>
      </div>
    
  </div>
    <div class="ui-header-item header-item flex-row"></div>
    <div class="ui-mode-content flex1" id="container" ref="scroll">
      <template v-if="pageStatus"> </template>
    </div>
  </div>
  </div>
</template>

<script>
import mixinCommon from "../mixins/common";
import mixinRequest from "../mixins/request";
import mixinShare from "../mixins/share";
import innerContent from "./src/content";
import Ocity from "@/assets/data/city";
import { LocalStorage } from "@/utils/storage";
import { getDateInfo } from "@/utils/tool";

export default {
  data() {
    return {
      public_agent_info: {},
      public_user_info: {},
      frontpage_4_weichat_arr: null,
      list: [],
      hotList: [],
      userType: 2,
      itemType: 1,
      sosoCont: "",
      city: "上海市",
      cityId: "3101",
    };
  },
  mixins: [mixinCommon, mixinRequest, mixinShare, Ocity],
  computed: {
    getBannerList() {
      if (this.frontpage_4_weichat_arr) {
        this.frontpage_4_weichat_arr.banner.forEach((item) => {
          item.img_4_page_link_wc = require("../../../assets/images/test/" +
            item.img_4_page_link_wc +
            "");
        });
      }
      return (
        this.frontpage_4_weichat_arr && this.frontpage_4_weichat_arr.banner
      );
    },
    getLunBo() {
      if (this.frontpage_4_weichat_arr && this.frontpage_4_weichat_arr.lunbo) {
        this.frontpage_4_weichat_arr.lunbo.forEach((item) => {
          item.img_4_page_link_wc = require("../../../assets/images/test/" +
            item.img_4_page_link_wc);
        });
      }
      return this.frontpage_4_weichat_arr && this.frontpage_4_weichat_arr.lunbo;
    },
    getshowZ() {
      if (this.itemType == 0 || this.itemType == 1 || this.itemType == 2) {
        return true;
      } else {
        return false;
      }
    },
    /* getList(){
				if(this.list){
					this.list.forEach(item => {
						item.goods_main_image = require('../../../assets/images/test/'+item.goods_main_image+'' )
					})
				}
			    return this.list;
			}, */
  },
  watch: {},
  created() {
    if (this.$route.query.userType) {
      this.userType = this.$route.query.userType;
    }
    console.log(Ocity);
  },
  mounted() {
    this.init();
    //this.initBridgeShare();
    this.initLogin();
  },
  methods: {
    /** 模拟登录 */
    initLogin() {},
    /*
     * 初始化
     */
    /* init(){
			    this.showLoading();
			    this.handleMockLogin().then(()=>{
			        this.getPageInfo({
			            name:'home',
			            param:{
			                invoke_method:'content_frontpage_4_weichat'
			            }
			        }).then(({result,response})=>{
			            if(result.unfinish_order_4_user){
			                this.public_agent_info=result.public_agent_info||{};
			                this.public_user_info=result.public_user_info||{};
			                this.frontpage_4_weichat_arr=result.frontpage_4_weichat_arr||[];
			                document.title=this.public_agent_info.application_name;
			                this.setState({
			                    key:'unfinish_order_4_user',
			                    value:result.unfinish_order_4_user
			                });
			                this.setState({
			                    key:'public_agent_info',
			                    value:this.public_agent_info
			                });
			                this.setState({
			                    key:'public_user_info',
			                    value:this.public_user_info
			                });
			                this.getDiscountInfo();
			            }else{
			                this.$$message({
			                    content:'获取订单号失败！',
			                    buttonText:'重新加载',
			                    sure:(node,close)=>{
			                        this.handleRefresh();
			                    }
			                });
			            };
			        });
			    }).catch(({msg})=>{
			        this.showResult(msg,true);
			    });
			}, */
    init() {
      this.showLoading();
      this.$http
        .get({
          name: "test.userIndex",
          loading: {
            enabled: true,
          },
        })
        .then(({ result, response }) => {
          console.log(result);
          this.frontpage_4_weichat_arr = result.list || [];
          if (result.list && result.list.length) {
            var len = result.list.length;
            for (let i = 0; i < len; i++) {
              if (this.userType == result.list[i].user_type) {
                this.frontpage_4_weichat_arr = result.list[i];
                break;
              }
            }
          }

          if (result.menu && result.menu.length) {
            result.menu.forEach((item) => {
              item.icon = require("../../../assets/images/test/" + item.icon);
            });
            this.hotList = result.menu;
          }
          this.showContent();
        });
      /* this.$http.get({
					name: 'test.detail',
					loading: {
						enabled: true
					}
				}).then(({
					result,
					response
				}) => {
					if (result.public_goods_list && result.public_goods_list.length > 0) {
						result.public_goods_list.map((item, index) => {
							if (item.goods_type == this.itemType) {
								item.goods_main_image = require('../../../assets/images/test/' + item.goods_main_image)
								item.liang_dian=item.liang_dian.split(',');
								this.list.push(item)
							}
							//return this.resultList;
						});
						this.showContent();
					} else {

							this.$$toast({
								target: this.$el,
								content: '没有查询到相关数据',
								status: false
							});
					};
				}).catch(({
					msg
				}) => {
						this.showToast(msg, false);
				}); */
    },
    /*
     * 切换tab
     */
    changetab(item) {
      if (item.id_public_goods_type == 7 || item.id_public_goods_type == 8)
        return;
      this.itemType = item.id_public_goods_type;
      console.log(this.itemType);
    },

    /*
     * 选择城市
     */
    handleCitySelect(value) {
      this.$$selectCity({
        title: "请选择城市",
        value: value,
        list: Ocity,
        sure: (data) => {
          console.log(data);
          this.cityId = data;
          for (var i = 0; i < Ocity.length; i++) {
            if (Ocity[i].value == data) {
              this.city = Ocity[i].label;
              return;
            }
          }
        },
      });
    },
    /*
     * 请求失败刷新
     */
    handleRefresh() {
      this.init();
    },
    /*
     * 添加滚动事件
     */
    handleCouponAttachEvent() {
      if (this.showDiscount) {
        this.$nextTick(() => {
          this.handleAttachEvent(this.$refs.coupon);
        });
      }
    },
    /*
     * 解除滚动事件
     */
    handleCouponDetachEvent() {
      this.handleDetachEvent(this.$refs.coupon);
    },
    /*
     * 跳转
     */
    goPage(item) {
      if (!this.isLogin) {
        this.goLogin();
      } else {
        if (item.url_4_page_link_wc && item.url_4_page_link_wc != "#") {
          this.showMessage(
            `${item.title_4_page_link_wc}-跳转到<br/>${item.url_4_page_link_wc}`
          );
          // this.$router.push({
          //     path:'/aaaa',
          //     query:{
          //
          //     }
          // });
        }
      }
    },
    /*
     * 打开弹窗
     */
    show(key, type) {
      this[key] = true;
    },
    /*
     * 关闭弹窗
     */
    close(key) {
      /* if (flag) {
					this.handleCouponDetachEvent();
				}; */
      this[key] = false;
    },
    handleChangeItem() {},
    /*
     * 监听搜索键
     */
    searchEnterFun: function (e) {
      // 使用 which 和 keyCode 属性来解决兼容问题
      var keyCode = window.event ? e.keyCode : e.which;
      //var val = e.target.value;
      console.log("回车搜索", keyCode, e);
      if (keyCode == 13 && val) {
        this.handleSearch();
      }
    },
    /*
     * 去搜索
     */
    handleSearch() {
      console.log(1);
      this.$router.push({
        path: "/home/soso",
        query: {
          key: this.sosoCont,
        },
      });
    },
  },
  components: {
    innerContent,
  },
  beforeDestroy() {
    this.handleCouponDetachEvent();
  },
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 2300px;
  background: #fff;
  overflow-y: auto; //
}
.ui-header-address {
  width: 4.6rem;
  i {
    margin-left: 0.5rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url(../../../assets/images/base/icon_more.png) center center
      no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
}
.ui-header-soso {
  width: 11.2rem;
  background: #f8f9fa;
  border-radius: 0.6rem;
  vertical-align: middle;
  padding: 0 0.5rem;
  em {
    margin-right: 0.5rem;
    width: 0.8rem;
    height: 2rem;
    vertical-align: middle;
    background-size: 100% auto !important;
  }
  input {
    border: none;
    background: transparent;
    width: 9rem;
    font-size: 0.7rem;
  }
}
.ui-header-address-icon {
  height: 2rem;
  background-size: 100% auto !important;
}
.ui-banner-container {
  position: relative;
  height: 8rem;
  background-color: #fff;
  margin: 0.45rem 0.85rem 0.85rem;

  img {
    border-radius: 0.9rem;
  }
}

.mt-index-hot {
  background: #fff;
  padding: 0 0.3rem 0.8rem 0.3rem;

  .item {
    padding-top: 0.5rem;
    min-width: 25%;
    span {
      position: relative;
      height: 2.56rem;
      background: #f3f3f3;
      width: 2.56rem;
      overflow: hidden;
    }
    i {
      font-size: 0.6rem;
      line-height: 1.6rem;
      color: #333;
      text-align: center;
    }

    &:active {
      background: #f9f9f9;
    }
  }
}

.mt-index-row {
  padding: 0.25rem;
  position: relative;
  background: #fafafa;

  .item {
    position: relative;
    background: #fff;
    padding: 0.5rem;
    margin: 0.25rem;

    &.m {
      width: 9.25rem;
    }

    .box {
      width: 3.5rem;
      background: #f9f9f9;
      overflow: hidden;
      margin-right: 0.5rem;
      overflow: hidden;
      position: relative;
    }

    h3 {
      font-size: 0.8rem;
      font-weight: normal;
      line-height: 1.4rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #333;
    }

    p {
      font-size: 0.6rem;
      color: #787878;
      line-height: 1rem;
      height: 1.8rem;
      overflow: hidden;
    }
  }
}

.mt-index-lunbo {
  width: 20rem;
  height: 8rem;
  overflow-x: auto;
  padding-left: 0.85rem;

  div {
    position: relative;
    width: 10.7rem;
    height: 8rem;
    margin-right: 0.6rem;
    flex-basis: 10.7rem;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 0.9rem;
      box-shadow: 0px 0.1rem 0.4rem 0px rgba(59, 59, 59, 0.3);
    }
    img[lazy="loading"] {
      width: 20%;
      max-width: 20px;
      height: 20%;
      max-height: 20px;
      animation: loading-rotate linear 0.7s infinite;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    p {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 0.7rem;
      color: #fff;
      line-height: 2rem;
      height: 2rem;
      padding: 0 0.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.share {
  color: #fff;
  padding: 0.4rem 0;

  span {
    margin-right: 0.5rem;
    line-height: 1.6rem;
    font-size: 0.7rem;
  }

  a {
    position: relative;
    padding: 0 1rem;
    background: #f00;
    color: #fff;
    border-radius: 1rem;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.7rem;
    cursor: pointer;
    text-align: center;

    &:active {
      background: #e00000;
    }
  }
}

.mt-master-container {
  position: fixed;
  z-index: 99999999;
  background-color: rgba(0, 0, 0, 0.3);
  left: 50%;
  width: 100%;
  max-width: 20rem;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);

  .mt-master-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    margin-top: -1rem;

    &.city {
      background-color: #fff;
      width: 16rem;

      .info {
        text-align: center;
        padding: 0.5rem;

        h3 {
          font-size: 1rem;
          line-height: 2rem;
          margin-bottom: 0.3rem;
          font-weight: normal;
        }

        p {
          color: #9b9b9b;
          line-height: 1.2rem;
          font-size: 0.8rem;
          padding: 0.2rem 0;

          span {
            text-align: center;
            color: @base-color;
            position: relative;

            &.line {
              &:after {
                content: "";
                position: absolute;
                right: 0;
                top: 0.2rem;
                bottom: 0.2rem;
                width: 1px;
                background-color: @base-color;
              }
            }
          }
        }
      }

      p {
        &.m {
          border-top: solid 1px #f2f3f7;
          line-height: 2.4rem;
          color: @base-color;
          font-size: 0.9rem;
          text-align: center;
        }
      }

      .change {
        position: relative;
        z-index: 1;
        color: #fff;
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.6rem;
        border-radius: 0 0 0.2rem 0.2rem;

        &:active {
          background-color: @base-active-color;
        }
      }
    }

    &.discount-content {
      width: 18rem;
      background-color: @base-color;
      padding: 0.8rem;

      .title {
        text-align: center;
        color: #fff;
        padding-top: 0.4rem;
        font-size: 1.01rem;
        font-weight: normal;
      }

      .body {
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 13.5rem;
        margin-top: 0.5rem;
        border-radius: 0.2rem;

        .box {
          background-color: #fff;
          border-radius: 0.2rem;
          margin-top: 0.5rem;
          padding: 0.5rem 0.5rem 0.5rem 0;
          position: relative;

          &:first-child {
            margin-top: 0;
          }

          .num {
            position: relative;
            padding: 0 0.8rem;
            margin-right: 0.8rem;

            &:after {
              position: absolute;
              content: "";
              right: 0;
              top: 0.3rem;
              bottom: 0.3rem;
              border-right: dotted 1px #aaa;
            }

            p {
              &.m1 {
                font-size: 1.28rem;
                text-align: center;
                line-height: 2rem;
                height: 2rem;
                font-weight: bold;
                color: #f00;

                i {
                  font-size: 0.8rem;
                  font-family: Verdana;
                  font-weight: normal;
                }
              }

              &.m2 {
                font-size: 0.533rem;
                color: #868686;
                text-align: center;
                line-height: 1.2rem;
              }
            }
          }

          .inner {
            position: relative;

            &:before {
              position: absolute;
              content: "";
              background-color: @base-color;
              bottom: -0.82rem;
              left: -1.05rem;
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }

            &:after {
              position: absolute;
              content: "";
              background-color: @base-color;
              top: -0.82rem;
              left: -1.05rem;
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }

            p {
              &.m1 {
                font-size: 0.8rem;
                line-height: 2rem;
                height: 2rem;
              }

              &.m2 {
                font-size: 0.5333rem;
                color: #868686;
                line-height: 1.2rem;
              }
            }

            .tip {
              color: #ecb419;
              position: absolute;
              right: 0.3rem;
              top: 50%;
              border: 1px solid #ecb419;
              font-size: 0.53rem;
              line-height: 1.2rem;
              padding: 0 0.2rem;
              border-radius: 0.2rem;
              transform: translateY(-50%);
            }
          }
        }
      }
    }

    .close {
      position: absolute;
      color: #999;
      left: 50%;
      margin-left: -1rem;
      bottom: -3rem;
      display: block;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: #fff;
      text-align: center;

      i {
        font-size: 1rem;
      }

      &:before {
        content: "";
        left: 50%;
        transform: translateX(-50%);
        bottom: 100%;
        width: 1px;
        height: 1rem;
        background-color: #fff;
        position: absolute;
      }

      &:active {
        background: @base-color;
        color: #fff;
      }
    }
  }

  &.app_dialog-enter-active,
  &.app_dialog-leave-active {
    transition: all ease-out 0.3s;

    .mt-master-content {
      transition: all ease-out 0.3s;
    }
  }

  &.app_dialog-enter {
    opacity: 0;

    .mt-master-content {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }
  }

  &.app_dialog-enter-to,
  .app_dialog-leave {
    opacity: 1;

    .mt-master-content {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &.app_dialog-leave-to {
    opacity: 0;

    .mt-master-content {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }
  }
}
.good-swipe /deep/ .mint-swipe-indicator.is-active {
  width: 14px;
  height: 6px;
  display: inline-block;
  border-radius: 7px;
  background: rgb(253, 60, 92);
  opacity: 1;
  margin: 0 12px;
}
.good-swipe /deep/ .mint-swipe-indicator {
  width: 14px;
  height: 6px;
  display: inline-block;
  border-radius: 7px;
  background: #000;
  opacity: 0.5;
  margin: 0 12px;
}
.swipe {
  margin: 0 30px auto;
  width: 686px;
  height: 300px;
  border-radius: 20px;
  swipeItem {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 300px;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
.cell-swipe {
  margin: 0 30px;
  padding-top: 20px;
  width: 686px;
  height: 320px;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;

  .cell-swipe-list {
    position: relative;
    .text {
      position: absolute;
      bottom: 0px;
      left: 25px;
      color: #fff;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 300px;
    }
    img {
      border-radius: 20px;
    }
    width: 400px;
    height: 300px;
    margin: 0 10px;
  }
}
.top {
  margin: 30px;
  display: flex;
  .top-item {
    display: flex;
    .top-item-list1 {
      width: 110px;
      height: 70px;
      font-size: 24px;
      line-height: 70px;
      img {
        width: 18px;
        height: 18px;

        margin: auto;
      }
    }
  }
  .top-item {
    .top-item-list2 {
      display: flex;
      width: 450px;
      height: 70px;
      background: #f8f9fa;
      border-radius: 20px;
      margin-left: 25px;
      color: #dcdee2;
      font-style: 22px;
      line-height: 70px;
      img {
        display: block;
        margin: 22px 30px;
      }
    }
  }
  .top-item {
    .top-item-list3 {
      margin-left: 24px;
      width: 70px;
      height: 70px;
      background: #f8f9fa;
      border-radius: 20px;
      img {
        display: block;
        width: 34px;
        margin: 15px auto;
      }
    }
  }
}
.list {
  margin: 30px;
  width: 680px;
  height: 130px;
  .listItem {
    display: flex;
    justify-content: space-between;
    text-align: center;
    .listItembtn {
      img {
        width: 95px;
        height: 95px;
      }
    }
    .listItembtn-text {
      font-size: 22px;
    }
  }
}
// .btn{display: flex;
//   justify-content: space-between;

//   margin: 0 30px;
//   text-align: center;
//   line-height: 67px;
//   .btn-item{

//   width: 135px;
//   height: 67px;
//   border-radius: 35px;background: #f8f9fa;
//   color: #7a7b81;

//   }
// }
.detail {
  margin: 40px 30px;
  display: flex;
  .detailItemList1 {
    img {
      width: 270px;
      height: 202px;
      border-radius: 20px;
    }
  }
  .detailItemList2 {
    line-height: normal;
    margin-left: 30px;
    width: 380px;
    height: 202px;

    display: flex;
    flex-direction: column;
    .detailItemText1 {
      display: flex;
      width: 400px;
      div:nth-child(1) {
        font-weight: 400;
        font-size: 28px;
        white-space: nowrap;
      }
      div:nth-child(2) {
        margin-left: 10px;
        font-weight: 300;
        font-size: 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .detailItemText2 {
      display: flex;
      color: #aaa;
      div:nth-child(1) {
        font-size: 24px;
        white-space: nowrap;
      }
      div:nth-child(2) {
        margin: 0 15px;
        font-weight: 200;
      }
      div:nth-child(3) {
        font-size: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .detailItemText3 {
      display: flex;
      font-size: 22px;
      text-align: center;
      margin-top: 10px;
      .btn {
        margin: 0 10px;
        padding: 0 10px;
        line-height: 40px;
        border-radius: 25px;
        background: #f8f9fa;
        color: #7a7b81;
      }
    }
    .detailItemText4 {
      display: flex;
      margin-top: 40px;
      div:nth-child(1) {
        color: #fd3c5c;
        font-size: 28px;
        font-weight: 400;
      }
      div:nth-child(2) {
        color: #fd3c5c;
        font-size: 22px;
        font-weight: 200;
      }
    }
  }
}
</style>
