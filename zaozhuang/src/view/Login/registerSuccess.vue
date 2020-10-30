<template>
  <div>
    <nav-bar title="注册成功"></nav-bar>
    <div class="width90 font600 flex-box-center" style="margin-top:1rem;">
      <van-icon name="success" />
      <div class="font36">恭喜您，注册成功！</div>
    </div>
   
    <div class="flex-box-center margin2">
      <van-button type="info" @click="home">返回到首页</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
export default {
  components: {
    navBar
  },
  data() {
    return {
      value: "",
      mobile:""
    };
  },
  async created() {
    this.mobile= this.$route.query.mobile;
  //   this.value = this.$baseUrl + "/#/firstLogin"
  //   console.log(this.value)
  //  this.qrcode(this.value);
  },
  
  methods: {
    home() {
      this.$router.push({ path: "/home" });
    },

  }
};
</script>
<style lang="less" scope></style>
