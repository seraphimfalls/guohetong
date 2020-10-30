<template>
  <div class="main">
    <nav-bar id="reset" title="收益资金提现"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont iconemizhongzi marginR2 colorfabd02"></span>
        收益资金余额：
      </div>
      {{this.pige}}
    </div>

    <div class="text-box">
      <span>本次提现</span>
      <van-field type="number" style="width:60%" v-model="money" placeholder="请输入提现额度" />
      <span>元</span>
    </div>
    <div class="text-box">
      <span>支付密码</span>      
      <van-field type="password" style="width:60%" v-model="password" placeholder="请输入支付密码"></van-field>
    </div>
    <div class="text-box">
      <span>提现收款<br />账户</span>
      <van-field style="width:80%" v-model="adress" :placeholder="this.adress"/>
    </div>

    
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认提现</van-button>
    </div>
    <div class="hintbox">
      <span>温馨提示：</span>
      <span>每次最低提现金额100，提现金额为100的整倍数，每天限提现2次</span>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as assetsApi from "../../axios/assets.js";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      pige: "",
      fileList: [],
      image: "",
      money: "",
      adress: "",
      password:""
    };
  },
  async created() {
    const infoRes = await mineApi.getAccount();
    this.pige = infoRes.data.pige;
    const res = await assetsApi.getRechargeConfig();
    this.adress = res.data.card_number;
    console.log(this.adress)
  },
  methods: {
    onCopy(e) {
      this.$toast.success("复制成功");
    },
    onError(e) {
      this.$toast.fail("复制失败");
    },
    async afterRead(file) {
      const res = await mineApi.upload(file.file);
      //  console.log(res);
      this.image = res.data.url;
    },
    async confirm(money, pay_password) {
      const res = await assetsApi.withdraw(
        this.money,
        this.password
      );
      console.log(res)
      if (res.code == 0) {
        this.$toast.fail(res.msg);
      } else {
        this.$toast.success(res.msg);
        this.$router.push({ path: "/property" });
      }
    }
  }
};
</script>
<style lang="less" scope>
  .hintbox{
    font-size: 0.28rem;
    color: rgb(128, 128, 128);
    display: flex;
    flex-flow: column;
    text-align: left;
    padding: .2rem .3rem;
    margin-top: .2rem;
    span{
      margin-bottom: .2rem;
    }
  }
  .text-box{
    width: 98%;
    font-size: 0.32rem;
    text-align: left;
    display: flex;
    padding: .1rem .2rem;
    span{
      margin-top: 0.2rem;
      text-align: center;
    }
  }
  .main{
    width: 100%;
    overflow-y: auto;
  }
  #reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
