<template>
  <div>
    <nav-bar title="新会员首次登录"></nav-bar>
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo" />
    </div>
    <van-cell-group>
      <van-field v-model="mobile" disabled="true" type="tel" @keyup="inputChange" label="手机号：" />
      <van-field
        v-model="captcha"
        center
        clearable
        autocomplete="new-password"
        label="短信验证码："
        placeholder="请输入短信验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sms"
          :disabled="disabled"
        >{{ btntxt }}</van-button>
      </van-field>
    </van-cell-group>

    <van-button type="info" @click="next()">下一步</van-button>
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
      mobile: "",
      captcha: "",
      event: "login",
      disabled: false,
      time: 60,
      btntxt: "发送验证码"
    };
  },
  async created() {
     this.mobile = this.$route.query.mobile;
  },
  methods: {
    inputChange() {
      this.mobile = this.mobile.replace(/[^\d]/g, "");
    },
    async sms() {
      if (this.mobile != this.mobile || this.mobile == "") {
        this.$toast("请输入正确的手机号");
        return "";
      }
      const res = await userApi.send(this.mobile, this.event);
      //   console.log(res);
      this.$toast(res.msg);
      this.time = 60;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "秒";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    },
    async next() {
      if (
        this.mobile == "" ||
        this.mobile == null ||
        this.mobile == undefined
      ) {
        this.$toast("请输入手机号");
        return "";
      }
      if (
        this.captcha == "" ||
        this.captcha == null ||
        this.captcha == undefined
      ) {
        this.$toast("请输入验证码");
        return "";
      }
      const res = await userApi.firstLogin(this.mobile, this.captcha);
      console.log(res);
      if (res.code == 1) {
        this.$toast.success(res.msg);
        localStorage.removeItem("ght_token");
        localStorage.setItem("ght_token", res.data.token);
        this.$router.push({ path: "/setting" });
      } else {
        this.$toast.fail(res.msg);
      }
    }
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
