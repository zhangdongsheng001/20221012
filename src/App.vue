<template>
    <router-view/>
</template>

<script>
import {
	on,
	off
} from '@/utils/dom';

export default {
    mounted(){
        on(window,'hashchange',this.handleHashChange);
    },
    methods:{
        handleHashChange(){
            let currentPath=window.location.hash.slice(1);
            if(this.$route.path!==currentPath){
                // this.$router.replace({
                //     path:currentPath
                // });
            };
        }
    },
    beforeDestroy(){
        off(window,'hashchange',this.handleHashChange);
    }
}
</script>

<style lang="less">

</style>
