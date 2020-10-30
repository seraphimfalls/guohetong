<template>
  <div>
    <nav-bar id="reset" title="提现账户"></nav-bar>
    
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>银行卡号</span>
      <van-field type="text" style="width:60%" v-model="card_number" placeholder="请输入银行卡号" />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>持卡人姓名</span>
      <van-field type="text" style="width:60%" v-model="card_holder" placeholder="请输入持卡人姓名" />
    </div>
    <div class="width96 font28 margin2 flex-box-between border-bottom2">
      <span>开户行</span>
      <van-field type="text" style="width:60%" v-model="bank_name" placeholder="请输入开户行" />
    </div>
    <div class="btn-box">
      <van-button type="info" @click="save">保存</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      type: 1,
      withdraw_address: "",
      bank_name:'', 
      card_holder:'', 
      card_number:''
    };
  },
  async created() {
     const res = await mineApi.getAccount();
     if(res.data.withdraw_address){
       this.withdraw_address = res.data.withdraw_address;
     }
  },
  methods: {
    async save() {
      const res = await mineApi.modifyWithdrawInfo(this.bank_name, this.card_holder, this.card_number)
      if(res.code==0){
        this.$toast.fail(res.msg)
      }else{
        this.$toast.success(res.msg);
        this.$router.push({path:"/mine"})
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>
