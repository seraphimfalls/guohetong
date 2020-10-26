<template>
  <div>
    <nav-bar title="USDT兑换PIGE币"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont icon3 marginR2 colorfabd02"></span>
        USDT余额
      </div>
      {{blance}}
    </div>

    <div class="width96 font28 margin2 flex-box-between border-bottom2 ">
      <span>选择额度（USDT）</span>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次兑换</span>
      <van-field
        type="number"
        style="width:60%"
        v-model="num"
        @keyup="inputChange"
        placeholder="请输入兑换数量"
      />PIGE币
    </div>
    <div
      class="width96 font28 textRight coloraeaeae"
    >1USDT可兑换{{pigeNum}}个PIGE币价格，本次兑换消耗{{scoreNum}}USDT</div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field style="width:78%" type="password" v-model="password" />
    </div>

    <van-panel title="温馨提示：" class="font28 textLeft line-height2 width90">
      <div>
        ① 最低提现额度计算后需要大于等于{{tixian_min_amount}}USDT
        <br />
        ③单笔提现手续费{{tixian_fei}}
      </div>
    </van-panel>
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认兑换</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as homeApi from "../../axios/home.js";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      blance: "",
      num: 0,
      tixian_min_amount: "",
      tixian_fei: "",
      password: "",
      receiving_account: "",
      adress: "",
      price: "",
      pigeNum: "",
      scoreNum: "",
      value1: 0,
      option1: [
        { text: "选择要兑换的额度", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res)
    this.blance = res.data.pige;
    this.adress = res.data.withdraw_address;
    const priceRes = await homeApi.getPIGEPrice();
    this.price = priceRes.data.pige_price;
    const Cres = await assetsApi.getWithdrawConfig();
    console.log(Cres);
    this.tixian_min_amount = Cres.data.tixian_min_amount;
    this.tixian_fei = Cres.data.tixian_fei;
  },
  methods: {
    inputChange() {
      this.pigeNum = parseFloat((this.num * 7) / this.price).toFixed(2);
    },
    withdrawlConfig() {
      let List = this.option1.find((ele) => ele.value === this.value1);
      this.receiving_account = List.text;
    },
    async confirm() {
      //  const res = await assetsApi.withdraw(this.num,this.password)
      // if(res.code==1){
      //   this.$toast.success(res.msg);
      //   this.$router.push({path:"/property"})
      // }else{
      //   this.$toast.fail(res.msg)
      // }
    },
  },
};
</script>
<style lang="less" scope>
</style>
