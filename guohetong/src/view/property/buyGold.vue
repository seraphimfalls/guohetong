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
      <span>持卡人<br />姓名</span>
      <van-field style="width:80%" v-model="card_holder" :placeholder="this.card_holder"/>
    </div>
    <div class="text-box">
      <span>提现收款<br />账户</span>
      <van-field style="width:80%" v-model="card_number" :placeholder="this.card_number"/>
    </div>
    <div class="text-box">
      <span>开户行</span>
      <van-field style="width:80%" v-model="bank_name" :placeholder="this.bank_name"/>
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
      card_number: "",
      password:"",
      card_holder:'',
      bank_name:''
    };
  },
  async created() {
    const infoRes = await mineApi.getAccount();
    this.pige = infoRes.data.pige;
    if(infoRes.data.card_number == 0){
       this.card_number = '请输入银行卡号'
     }else{
      this.card_number = infoRes.data.card_number
     }
    if(infoRes.data.card_holder == 0){
       this.card_holder = '请输入持卡人姓名'
     }else{
      this.card_holder = infoRes.data.card_holder
     }
     if(infoRes.data.bank_name == 0){
       this.bank_name = '请输入开户行'
     }else{
      this.bank_name = infoRes.data.bank_name
     }
    const res = await assetsApi.getRechargeConfig();
  },
  methods: {
    clear(e){
      e.target.value = ''
    },
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
      const infoRes = await mineApi.getAccount();
      if(infoRes.data.card_number == 0 || infoRes.data.card_holder == 0 || infoRes.data.bank_name == 0){
        const info = await mineApi.modifyWithdrawInfo(this.bank_name, this.card_holder, this.card_number)
          if(info.code==0){
          this.$toast.fail(res.msg)
        }else{
          this.$toast.success(res.msg);
        }
      }
      const res = await assetsApi.withdraw(
        this.money,
        this.password
      );
      if (res.code == 0) {
        this.$toast.fail(res.msg);
      } else {
        this.$toast.success(res.msg);
        setTimeout(()=>{
          this.$router.go(-1);
        },1000)
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
    overflow-x: hidden;
  }
  #reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
