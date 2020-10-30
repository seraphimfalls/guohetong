<template>
  <div>
    <nav-bar title="收款二维码"></nav-bar>
     <div id="qrcode" class="flex-box-center marginT2"></div>
     <div class="width90 font28">
       扫描二维码，向<span class="colorca0505">{{merchant_name}}</span>商家付款
     </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import QRCode from "qrcodejs2";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      value:"",
      merchant_name:"",
      merchant_id:''
    };
  },
  async created(){
    const res = await mineApi.getAccount()
    //  console.log(res)
    this.value = res.data.merchant_url
    this.merchant_name = res.data.merchant_name
    this.qrcode(this.value);
     console.log(this.value)
  },
mounted(){
 
},
  methods: {
 
     qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: this.value, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    }
  },
};
</script>
<style lang="less" scope>
</style>
