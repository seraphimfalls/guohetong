<template>
  <div>
    <nav-bar title="完善信息"></nav-bar>
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo" />
    </div>
    <van-cell-group>
       <van-field
        v-model="password"
        type="password"
        autocomplete="new-password"
        label="设置登录密码："
      />
      <van-field
        v-model="pay_password"
        type="password"
        label="设置支付密码："
      />
      <van-field v-model="real_name" label="真实姓名：" />
      <van-field v-model="id_card" label="身份证号：" />
    </van-cell-group>

    <van-button type="info" @click="complete()">完成设置</van-button>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      password: "",
      pay_password: "",
      real_name: "",
      id_card:""
    };
  },
  async created() {
    // this.invitecode = this.$route.query.invitecode;
  },
  methods: {
    async complete() {
      const res = await userApi.improveInformation(this.password,this.pay_password,this.real_name,this.id_card)
      console.log(res)
      if(res.code==1){
        this.$toast.success(res.msg);
        this.$router.push({path:"/home"})
      }else{
        this.$toast.fail(res.msg)
      }
    },

  }
};
</script>
<style lang="less" scope>
.logo-box {
  width: 2rem;
  height: 2rem;
  margin: 1rem auto 0.5rem auto;
}
.logo {
  width: 100%;
}
.van-field__label {
  width: 120px !important;
  text-align: right;
}
</style>
