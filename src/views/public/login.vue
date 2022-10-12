<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
	<div>
      <!-- 头部 -->
	  <div class="ui-header-item gradient">
		  <div class="ui-header-title">登录</div>
	  </div>
	  <div>
      <!-- 表单内容 -->
		<form id="forms" class="relative">
	      <div class="mt-flex mt-flex-x mt-panel-item">
	          <div class="mt-item-label mar-right-5 pad-left-5">账号</div>
	          <div class="mt-item-main mt-flex-inner">
	              <input type="tel" name="user_phone" placeholder="手机号" id="userPhone" class="mt-item-input" />
	          </div>
	      </div>
	      <div class="mt-flex mt-flex-x mt-panel-item">
	          <div class="mt-item-label mar-right-5 pad-left-5">密码</div>
	          <div class="mt-item-main mt-flex-inner">
	              <input type="password" name="password_user" placeholder="请输入密码" id="passWord" class="mt-item-input" />
	          </div>
	      </div>
		  <div class="gradient">
			  <span  class="submitBtn" @click="submit">提交</span>
		  </div>
		</form>
      </div>
	  </div>
</template>

<script>
import Encrypt from '@/utils/encrypt';
import {
	on,
	off
} from '@/utils/dom';
import loginData from '@/assets/data/login';
import menuData from '@/assets/data/menu';

// 引入图片
//import imgCode from '../assets/imgs/mgr_image_code.jpg'

export default {
    data() {
        return {
            visible:false,
            sending:false,
            form:{
                username:'13162455687',
                password:'Q!W@e3r4t5',
                identify:'',
                isLoginForget:true
            },
			imgCode: 'mgr_image_code.png?invoke_method=public_page_4m_random_code&length_4_list=4&t=' + new Date().getTime(),
			username: '',
			password: '',
			imageCode: '',
			headTop: '登录账户',
			returnData: {}
        }
    },
    computed:{

    },
    watch:{
        visible(val){

        }
    },
    created(){

    },
    mounted(){
        this.init();
        //on(document,'keyup',this.keyup);
    },
    methods:{
        /*
         * 舒适化
         */
        init(){
            this.show();
            // if(this.$route.query.username&&this.$route.query.password){
            //     this.form.username=this.$route.query.username;
            //     this.form.password=this.$route.query.password;
            //     this.show();
            // }else{
            //     let account=this.$store.state.global.account;
            //     if(account){
            //         this.form.username=Encrypt.decrypt(account.username);
            //         this.form.password=Encrypt.decrypt(account.password);
            //         this.go();
            //     }else{
            //         this.show();
            //     };
            // };
        },
        /*
         * 显示
         */
        show(){
            this.visible=true;
        },
        /*
         * 消失
         */
        hide(){
            this.visible=false;
        },
        /*
         * 出发
         */
        go(){
            if(this.isLogin){
                if(!this.$route.query.fullPath){
                    this.$router.replace({
                        path:'/'
                    });
                }else{
                    if(this.$route.query.redirect&&this.$route.query.redirect==location.host){
                        this.$router.replace({
                            path:this.$route.query.fullPath
                        });
                    }else{
                        window.open(this.$route.query.redirect,'_target');
                    };
                };
            }else{
                this.submit();
            };
        },
        /*
         * 提交
         */
		submit() {
		  // 账号密码登录
			if(!this.sending){
			  this.sending=true;
			  let loading=this.$$loading();
			  let values={
				 password: document.getElementById('passWord').value,
				 userPhone:document.getElementById('userPhone').value
			  };
			  this.$http.post({
				  name:'login',
				  data:{
					  invoke_method:'login_by_password',
					  password_user: values.password,
					  user_phone:values.userPhone,
					  type_4_api_inner_cmd:1,
					  type_4_api_command:1
				  },
				  loading:{
					  enabled:false
				  }
			  }).then(({result,response})=>{
				  this.setState({
					  key:'public_agent_info',
					  value:result.public_agent_info
				  });
				  this.setState({
					  key:'public_user_info',
					  value:result.public_user_info
				  });
				  this.setState({
					  key:'unfinish_order_4_user',
					  value:result.public_goods_order_record.id_public_goods_order_record
				  });
				  result=loginData.returnData;
				  this.sending=false;
				  this.setLoginStatus({
					  status:true,
					  token:`${result.token_type} ${result.access_token}`,
					  expires:result.token_expires_time
				  });
				  if(this.form.isLoginForget){
					  this.setAccountInfo({
						  status:true,
						  account:{
							  username:Encrypt.encrypt(values.userPhone),
							  password:Encrypt.encrypt(values.password)
						  },
						  expire:30*24*60*60*1000
					  });
				  }else{
					  this.setAccountInfo({
						  status:false
					  });
				  };
				  this.getMenuList().then(()=>{
					  this.setUserInfo(result.userInfo);
					  this.$root.$children[0].$children[0].refresh(()=>{
						  loading.close();
						  this.go();
					  });
				  }).catch(({msg})=>{
					  this.showMessage(msg);
				  });
			  }).catch(({msg})=>{
				  this.sending=false;
				  this.showMessage(msg);
				  loading.close();
			  });
			}
					  
		},
       /* async submit(){
                if(!this.sending){
                    this.sending=true;

                    let loading=this.$$loading();
                    this.$http.post({
                        name:'login',
                        data:{
                            invoke_method:'login_by_password',
                            password_user:'123456',
                            user_phone:'15802531670',
                            type_4_api_inner_cmd:1,
                            type_4_api_command:1
                        },
                        loading:{
                            enabled:false
                        }
                    }).then(({result,response})=>{
                        this.setState({
                            key:'public_agent_info',
                            value:result.public_agent_info
                        });
                        this.setState({
                            key:'public_user_info',
                            value:result.public_user_info
                        });
                        result=loginData.returnData;
                        this.sending=false;
                        this.setLoginStatus({
                            status:true,
                            token:`${result.token_type} ${result.access_token}`,
                            expires:result.token_expires_time
                        });
                        if(this.form.isLoginForget){
                            this.setAccountInfo({
                                status:true,
                                account:{
                                    username:Encrypt.encrypt(this.form.username),
                                    password:Encrypt.encrypt(this.form.password)
                                },
                                expire:30*24*60*60*1000
                            });
                        }else{
                            this.setAccountInfo({
                                status:false
                            });
                        };
                        this.getMenuList().then(()=>{
                            this.setUserInfo(result.userInfo);
                            this.$root.$children[0].$children[0].refresh(()=>{
                                loading.close();
                                this.go();
                            });
                        }).catch(({msg})=>{
                            this.showMessage(msg);
                        });
                    }).catch(({msg})=>{
                        this.sending=false;
                        this.showMessage(msg);
                        loading.close();
                    });
                };
        }, */
        /*
         * 获取菜单
         */
        getMenuList(){
            return new Promise((resolve,reject)=>{
                // this.$http.get({
                //     name:'menu',
                //     data:{
                //         username:this.userInfo.username
                //     },
                //     auth:true
                // }).then(result=>{
                    let result=menuData.returnData;
                    this.setMenuList(result.list);
                    resolve(result.list);
                // }).catch(({msg})=>{
                //     reject({msg});
                // });
            });
        },
        /*
         * 键盘enter
         */
        keyup(e){
            if(e.keyCode==13){
                this.submit();
            };
        },
        /*
         * 校验验证码
         */
        handleIdentifyValid(val,code,next){

        },
        /*
         * 刷新验证码
         */
        handleIdentifyClick(){
			var picSrc =  'mgr_image_code.png?invoke_method=public_page_4m_random_code&length_4_list=4&t=' + new Date().getTime()
			this.imgCode = picSrc;
        }
    },
    components:{

    },
    beforeRouteLeave(to,from,next){
        if(this.$route.query.auth){
            if(this.isLogin){
                next();
            }else{
                next(false);
            };
        }else{
            next();
        };
    },
    beforeDestroy(){
        //off(document,'keyup',this.keyup);
    }
}
</script>
<style scoped>
.van-cell {
  border-bottom: 1px solid #e3e3e3;
}
.login-from {
  position: relative;
}
.img-code {
  position: absolute;
  right: 0;
  top: 5.333rem;
}
.submitBtn{color:#fff;display:block;text-align:center}
</style>
<!-- <style lang="less" scoped>
.button{
    padding:0 2rem;
    font-size:1rem;
    line-height:3rem;
    background-color:#2398aa;
    border-radius:0.3rem;
    color:#fff;
    &:active{
        background-color:#198090;
    }
}
</style>
 -->