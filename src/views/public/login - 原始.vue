<!-- /*
 * @Author: 谢力 843926058@qq.com
 * @Date:   2019-11-06
 * @Last Modified by:   谢力
 * @Last Modified time: 2019-11-07
 */ -->
<template>
    <div class="flex1 relative flex-col align-center">
        <span class="button" @click="submit">登录</span>
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
            }
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
        async submit(){
            //let flag=await this.getForm.fetchValid();
            //if(flag){
                if(!this.sending){
                    this.sending=true;
                    //let newValue=this.getForm.getValue();

                    let loading=this.$$loading();
                    this.$http.post({
                        name:'login',
                        data:{
                            invoke_method:'login_by_password',
                            //user_phone:'18201915071',

                            password_user:'123456',
                            user_phone:'15802531670',
                            //password_user:'abc123456',
                            type_4_api_inner_cmd:1,
                            type_4_api_command:1
                        },
                        loading:{
                            enabled:false
                        }
                        //data:{
                            // username:newValue.username,
                            // password:Encrypt.encrypt(newValue.password),
                            // identify:newValue.identify
                        //}
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
            //};
        },
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

<style lang="less" scoped>
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
