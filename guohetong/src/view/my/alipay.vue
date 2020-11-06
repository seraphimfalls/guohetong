<template>
  <div>
    <nav-bar id="reset" title="提现账户"></nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="card_number"
        name="银行卡号"
        label="银行卡号"
        :placeholder="this.card_number"
      />
      <van-field
        v-model="card_holder"
        name="持卡人姓名"
        label="持卡人姓名"
        :placeholder="this.card_holder"
      />
      <van-field
        v-model="bank_name"
        name="开户行"
        label="开户行"
        :placeholder="this.bank_name"
      />
    </van-form>
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
     if(res.data.card_number == 0){
       this.card_number = '请输入银行卡号'
     }else{
       this.card_number = res.data.card_number
     }
     if(res.data.card_holder == 0){
       this.card_holder = '请输入持卡人姓名'
     }else{
       this.card_holder = res.data.card_holder
     }
     if(res.data.bank_name == 0){
       this.bank_name = '请输入开户行'
     }else{
       this.bank_name = res.data.bank_name
     }
  },
  methods: {
    clear(e){
      e.target.value = ''
    },
    async save() {
      const res = await mineApi.modifyWithdrawInfo(this.bank_name, this.card_holder, this.card_number)
      if(res.code==0){
        this.$toast.fail(res.msg)
      }else{
        this.$toast.success(res.msg);
        setTimeout(()=>{
          this.$router.push({path:"/mine"})
        },1000)
      }
    },
    onSubmit(){

    }
  }
};
</script>
<style lang="less" scope>
</style>
