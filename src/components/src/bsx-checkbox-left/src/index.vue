<template>
  <div class="topHead">
    <van-nav-bar
    :title="tittle"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  </div>
</template>

<script>
export default {
  name: 'topHead',
  data() {
    return {
      tittle: this.name,
    }
  },
  props: ['name'],
  created() {},
  methods: {
    onClickLeft() {
      console.log('返回');
      this.$router.push('/home')
    },
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar .van-icon {
  color: #333;
}
</style>
