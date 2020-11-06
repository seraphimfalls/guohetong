<template>
  <div class="body">
    <div class="middle">
      <nav-bar id="reset" title="订单支付"></nav-bar>
    <div class="width96 font28 line-height2 padding-left2 bgf7f7f7 textLeft">
      <h5>订单信息</h5>
    </div>
    <div class="width96 flex-box-between font28">
      <span>订单编号</span>
      {{orderNum}}
    </div>
    <div class="width96 flex-box-between font28">
      <span>下单时间</span>
      {{time}}
    </div>
    <div class="width96 flex-box-between font28">
      <span>订单金额</span>
      {{money}}
    </div>
    <div class="width96 flex-box-between font28">
      <span>银行卡</span>
      {{card_number}}
    </div>
    <div class="width96 font28 line-height2 padding-left2 bgf7f7f7 textLeft">
      <h5>付款方式</h5>
      <van-radio-group v-model="radio" direction="horizontal" @change="cha">
        <van-radio v-for = "(item, i) in pay_type_list" :key='i' :name="i" @click="showradio(i)">{{item}}</van-radio>
        <!-- <van-radio name="2">复消资金余额支付</van-radio> -->
      </van-radio-group>
    </div>
    <div class="" v-show="radioShow">
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
    </div>
    
    <div class="width96 flex-box-between font28" v-show='balShow'>余额：{{balance}}</div>
    <div class="pass-box">
        <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        info="请输入支付密码"
        @click="pay"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        v-show="isShow"
        @blur="blur"
      />
    </div>
        <van-button type="danger" class="buyBtn" @click="pay">确认支付{{money}}</van-button>

    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
import * as mineApi from "../../axios/mine.js";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      orderNum: "",
      time: "",
      money: "",
      value: "",
      showKeyboard: true,
      isShow: false,
      orderId:"",
      balance:"",
      radio:'1',
      card_number:'',
      alipay_image:"",
      weixin_image:"",
      fileList: [],
      pay_type_list:[],
      radioShow: true,
      name: '',
      balShow: false
    };
  },
  async created() {
    let data = JSON.parse(sessionStorage.getItem("info"))
    this.orderId=data.orderId
    const infoRes = await mineApi.getAccount();
    this.card_number = infoRes.data.card_number
    const res = await storeApi.confirmPayInfo(this.orderId)
    this.orderNum = res.data.order_number
    this.time=res.data.createtime
    this.money =res.data.amount
    this.pay_type_list = res.data.pay_type
    for(let key in this.pay_type_list){
      this.radio = key
      if(key != 2){
        this.radio = '1'
      }else if(key == 2){
        this.radioShow = false
      }
    }
    // this.balance = infoRes.data.money;
    const pay_res = await assetsApi.getRechargeConfig();
    this.alipay_image = pay_res.data.alipay_image;
    this.weixin_image = pay_res.data.wechat_image;
  },
  methods: {
    async cha(){
      const infoRes = await mineApi.getAccount();
      if(this.radio == 1){
        this.balShow = false
      }else if(this.radio == 2){
        this.balShow = true
        this.balance = infoRes.data.money
      }else if(this.radio == 3){
        this.balShow = true
        this.balance = infoRes.data.pige
      }
    },
    showradio(i){
      if(i == 1){
        this.radioShow = true
      }else{
        this.radioShow = false
      }
    },
    blur(){
      this.isShow = false;
      this.value = ''
    },
    async afterRead(file) {
      const res = await mineApi.upload(file.file);
      this.image = res.data.url;
    },
    pay() {
      this.isShow = true;
      this.value=""
    },
   async onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.isShow = false;
        if(this.radio != 1){
         const res = await storeApi.goodspay(this.orderId,this.radio,null,this.value)
         console.log(res)
         if(res.code==1){
            this.$toast.success(res.msg)
            this.$router.push({path:"myOrder"})
          }else{
            this.$toast.fail(res.msg)
          }
        }else{
          const res = await storeApi.goodspay(this.orderId,this.radio,this.image,this.value)
          if(res.code==1){
            this.$toast.success(res.msg)
            this.$router.push({path:"myOrder"})
          }else{
            this.$toast.fail(res.msg)
          }
        }
      }
    },
   
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>
<style lang="less" scope>
.buyBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
  }
.body{
  display: flex;
  flex-flow: column;
  height: 100%;
  padding-bottom: 5rem;
  .middle{
    flex: 1;
  }
}
</style>
