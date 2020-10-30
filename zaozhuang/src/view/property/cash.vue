<template>
  <div>
    <nav-bar title="PIGE币提现"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont icon3 marginR2 colorfabd02"></span>
        PIGE币余额
      </div>
      {{blance}}
    </div>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次提现</span>
      <van-field type="number" style="width:60%" v-model="num" @keyup="inputChange" placeholder="请输入提现数量" />USDT
    </div>
    <div class="width96 font28 textRight coloraeaeae">
      当前PIGE币价格：{{price}}  消耗{{pigeNum}}个PIGE币
    </div>
      <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>支付密码</span>
      <van-field style="width:78%" type="password" v-model="password" />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>提现收款码</span>
      <van-field style="width:78%" v-model="adress" />
    </div>
   
 <van-panel title="温馨提示：" class="font28 textLeft line-height2 width90">
      <div>
        ① 最低提现额度计算后需要大于等于{{tixian_min_amount}}USDT
        <br />③单笔提现手续费{{tixian_fei}}
      </div>
    </van-panel>
    <div class="btn-box">
      <van-button type="info" @click="confirm">确认提现</van-button>
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
    navBar
  },
  data() {
    return {
      blance: "",
      num:0,
      tixian_min_amount:"",
      tixian_fei:"",
      password:"",
      receiving_account:"",
      adress:"",
      price:"",
      pigeNum:0
    };
  },
async created() {
    const res = await mineApi.getAccount();
    // console.log(res)
    this.blance = res.data.pige;
    this.adress=res.data.withdraw_address
    // const priceRes = await homeApi.getPIGEPrice();
    // console.log(priceRes)
    // this.price = priceRes.data.pige_price
    // const Cres = await assetsApi.getWithdrawAddressInfo();
    // console.log(Cres)
    const test = await assetsApi.getRechargeConfig();
    console.log(test)
    // this.tixian_min_amount = Cres.data.tixian_min_amount;
    // this.tixian_fei = Cres.data.tixian_fei;
  },
  methods: {
    inputChange(){
      this.pigeNum= (parseFloat(this.num*7/this.price)).toFixed(2)
    },
    withdrawlConfig(){
       let List = this.option1.find(ele=>ele.value === this.value1);
      this.receiving_account = List.text
    },
    async confirm(){
       const res = await assetsApi.withdraw(this.num,this.password)
      if(res.code==1){
        this.$toast.success(res.msg);
        this.$router.push({path:"/property"})
      }else{
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>
