<template>
  <div class="content">
    <nav-bar id="reset" title="充值"></nav-bar>
    <div class="blance-box">
      <div class="flex-box">
        <span class="iconfont iconemizhongzi marginR2 colorfabd02"></span>
        当前报单资金余额：
      </div>
      {{blance}}
    </div>
    <div class="width96 font28 margin2 flex-box-around border-bottom2">
      <span>本次充值</span>
      <van-field type="number" style="width:60%" v-model="money" placeholder="请输入充值数量" />元
    </div>
    <div class="cardbox">
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
      </div>
    <div class="flex-box-center font36 margin2 font600">
      <span class="iconfont iconyoushuangxiexian color59aefe"></span>
      平台收款账号
      <span class="iconfont iconzuoshuangxiexian color59aefe"></span>
    </div>
    <van-grid :border="false" :column-num="2" :gutter="10" class="font28 margin2">
      <van-grid-item>
        <van-image :src="weixin_image" />
        <p>微信</p>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="alipay_image" />
        <p>支付宝</p>
      </van-grid-item>
    </van-grid>
    
    <div class="flex-box-center font36 margin2 font600">
      <span class="iconfont iconyoushuangxiexian color59aefe"></span>
      上传支付凭证
      <span class="iconfont iconzuoshuangxiexian color59aefe"></span>
    </div>
    <van-uploader  :after-read="afterRead" preview-size="300" v-model="fileList" multiple :max-count="1" />
    <div class="btn-box">
       <van-button type="info" @click="confirm">申请充值</van-button>
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
      blance: "",
      fileList: [],
      image:"",
      money:"",
      payPassWord:"",
      alipay_image:"",
      weixin_image:"",
      card_number:'',
      card_holder:'',
      bank_name:''

    };
  },
async created() {
  const res2 = await mineApi.getAccount()
  this.blance = res2.data.balance
  if(res2.data.card_number == 0){
       this.card_number = '请输入银行卡号'
     }else{
       this.card_number = res2.data.card_number
     }
     if(res2.data.card_holder == 0){
       this.card_holder = '请输入持卡人姓名'
     }else{
       this.card_holder = res2.data.card_holder
     }
     if(res2.data.bank_name == 0){
       this.bank_name = '请输入开户行'
     }else{
       this.bank_name = res2.data.bank_name
     }
  const res = await assetsApi.getRechargeConfig();
  this.alipay_image = res.data.alipay_image;
  this.weixin_image = res.data.wechat_image;
},
  methods: {
    async afterRead(file) {
      const res = await mineApi.upload(file.file);
      this.image = res.data.url;
    },
    async confirm(){
      const infoRes = await mineApi.getAccount();
      if(infoRes.data.card_number == 0 || infoRes.data.card_holder == 0 || infoRes.data.bank_name == 0){
        const info = await mineApi.modifyWithdrawInfo(this.bank_name, this.card_holder, this.card_number)
          if(info.code==0){
          this.$toast.fail(res.msg)
        }else{
          this.$toast.success(res.msg);
        }
      }
      const res = await assetsApi.recharge(this.money,this.image);
      if(res.code == 0){
        this.$toast.fail(res.msg)
      }else{
        this.$toast.success(res.msg);
        this.$router.push({path:'/property'})
      }
    }
  }
};
</script>
<style lang="less" scope>
 #reset /deep/ .van-ellipsis{
		color: #fff !important;
  }
  .content{
    padding-bottom: 1rem;
  }
  .cardbox{
    font-size: 0.32rem;
    text-align: left;
    padding: 0 .3rem;
  }
</style>
