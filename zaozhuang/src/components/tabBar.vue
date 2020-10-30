<template>
  <div>
    <router-view />

    <van-tabbar route class="dqjt-tabbar" active-color="#4385ff" inactive-color="#9cc9ff" >
      <van-tabbar-item replace to="/home" icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item replace to="/store" icon="shop-o">商城</van-tabbar-item>
      <van-tabbar-item replace to="/property" icon="paid">资产</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.dqjt-tabbar {
  background: #fff;
  box-shadow: 0px 3px -5px rgba(250, 250, 250, 0.3);
}
</style>
