<template>
  <div>
    <nav-bar title="扫码支付"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont icon3 marginR2 colorfabd02"></span>
        PIGE币余额：
      </div>
      {{blance}}
    </div>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次支付</span>
      <van-field
        type="number"
        style="width:60%"
        autocomplete="new-password"
        v-model="num"
        placeholder="请输入支付金额"
      />PIGE币
    </div>

    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field
        style="width:78%"
        type="password"
        autocomplete="new-password"
        v-model="password"
        placeholder="请输入支付密码"
      />
    </div>

    <div class="btn-box width90">
      <van-button type="info" @click="confirm" block>确认支付</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as homeApi from "../../axios/home.js";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      blance: "",
      num: "",
      password: "",
      merchant_id: ""
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res)
    this.blance = res.data.pige;
    this.merchant_id = this.$route.query.merchant_id;
  },
  methods: {
    async confirm() {
      const res = await homeApi.transfer(
        this.merchant_id,
        this.num,
        this.password
      );
      if (res.code == 1) {
        this.$toast.success(res.msg);
        this.$router.push({ path: "/mine" });
      } else {
        this.$toast.fail(res.msg);
      }
    },
  },
};
</script>
<style lang="less" scope>
</style>
