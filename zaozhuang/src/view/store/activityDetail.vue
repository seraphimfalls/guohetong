<template>
  <div>
    <nav-bar id="reset" title="商品详情"></nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="lbimg" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="width96 font28 textLeft font600 border-bottom2">{{title}}</div>
    <div class="width96 textLeft flex-box border-bottom2">
      <span class="colorca0505 font36 marginR2">售价：{{price}}</span>
      <span class="font28 coloraeaeae">({{tips}})</span>
    </div>
    <div class="brief-box border-bottom2">
      <h4>商品简介</h4>
      <div :class="{twoline:isActive}">{{brief}}</div>
      <div class="margin2 textRight">
        <van-button type="primary" size="mini" @click="show">展开</van-button>
      </div>
      
    </div>
    <div class="detail-box">
      <h4>商品详情</h4>
      <div v-html="tohtml"></div>
    </div>
    <van-button type="danger" class="buyBtn" :disabled="disabled" @click="buy">{{enable}}</van-button>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
export default {
  components: {
    navBar
  },
  data() {
    return {
      images: [],
      price: "",
      tips: "本商品使用备用金+现金方式支付",
      id: "",
      title: "",
      tohtml: "",
      brief: "",
      isActive:true,
      disabled:false,
      enable:""
    };
  },
  async created() {
   let data = JSON.parse(sessionStorage.getItem("info"))
   this.id=data.id
    const res = await storeApi.getSpecialGoodsDetail(this.id);
    console.log(res)
    this.images = res.data.image_list;
    this.price = res.data.price;
    this.title = res.data.title;
    this.tips = res.data.tips;
    this.tohtml = res.data.content;
    this.brief = res.data.brief;
    this.enable = res.data.enable
    if(this.enable=="已抢光"){
      this.disabled=true
    }else{
      this.disabled=false
    }
  },
  methods: {
    buy() {
      let info={
        id:this.id,
        type:1
      }
      sessionStorage.setItem("info",JSON.stringify(info))
      this.$router.push({ path: "/order"});
    },
    show(){
     this.isActive = !this.isActive
    }
  }
};
</script>
<style lang="less" scope>
.lbimg {
  width: 100%;
  height: 4rem;
}
.detail-box {
  width: 94%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  text-align: left;
  padding-bottom: 1rem;
}
.brief-box {
  width: 94%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  text-align: left;
}
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
</style>
