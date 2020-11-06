<template>

  <div>
    <nav-bar id="reset" title="我的资产"></nav-bar>
    <div class="property-box">
      <div class="property-content">
        <span class="iconfont iconemizhongzi marginR2 color1"></span>
        <div>
          <span class="title width100">报单余额</span>
          <span class="text width100">{{usdt}}</span>
        </div>
      </div>
      <div class="property-content">
         <span class="iconfont icongongzi marginR2 color6"></span>
        <div>
          <span class="title width100">累计收益</span>
           <span class="text">{{pige}}</span>
        </div>
      </div>

      <div class="property-content">
        <span class="iconfont iconjine marginR2 color2"></span>
        <div>
          <span class="title width100">商城积分</span>
          <span class="text">{{this.money}}</span>
        </div>
      </div>
    </div>
    <div style="padding-bottom:1rem">
      <div class="link-box" @click="reward">
        <div class="flex-box">
          <span class="iconfont iconjiangli marginR2"></span>
          报单资金充值
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="buygold">
        <div class="flex-box">
          <span class="iconfont icontubiaozhizuomoEban marginR2"></span>
          收益资金提现
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="link-box" @click="moneyList">
        <div class="flex-box">
          <span class="iconfont icondingdangdaizijinliushui marginR2"></span>
          资金流水
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import tabBar from "../../components/tabBar.vue";
import * as mineApi from "../../axios/mine.js";
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    navBar,
    tabBar,
  },
  data() {
    return {
      usdt: "",
      pige: "",
      static_bonus: "",
      dynamic_bonus: "",
      point_award: "",
      center_subsidy: "",
      score: "",
      can_transfer: "",
      score_lock: "",
      bonus: "",
      money:'',
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res)
    this.usdt = res.data.balance;
    this.pige = res.data.pige;
    this.money = res.data.money;
    this.static_bonus = res.data.static_bonus;
    this.dynamic_bonus = res.data.dynamic_bonus;
    // console.log(res);
  },
  methods: {
    scoreTransfer(){
      this.$router.push({ path: "/scoreTransfer" });
    },
    reward() {
      this.$router.push({ path: "/reward" });
    },
    buygold() {
      this.$router.push({ path: "/buyGold" });
    },
    cash() {
      this.$router.push({ path: "/cash" });
    },
    transfer() {
      if (this.can_transfer == 0) {
        this.$toast.fail("您不能使用备用金互转");
      } else {
        this.$router.push({ path: "/cashTransfer" });
      }
    },
    replacement() {
      this.$router.push({ path: "/cashReplacement" });
    },
    financial() {
      this.$router.push({ path: "/financial" });
    },
    moneyList() {
      this.$router.push({ path: "/moneyList" });
    },
    more() {},
  },
};
</script>
<style lang="less" scope>
.property-box {
  width: 96%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 0.28rem;
  line-height: 2em;
  text-align: left;
}
.property-content {
  width: 30%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  padding: .1rem;
}
.property-content:nth-child(2n) {
  margin-right: 0 !important;
}
.width100 {
  width: 100%;
  display: block;
}
.text {
  color: #aeaeae;
}
.money-box {
  width: 96%;
  margin: 0.2rem auto;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  font-size: 0.28rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.money-box img {
  width: 2.58rem;
  height: 1.48rem;
}
.link-box .iconfont {
  font-size: 0.36rem;
  color: #59a4fe;
}
.color1 {
  color: #fabc00 !important;
}
.color2 {
  color: #815498 !important;
}
.color3 {
  color: #afce40 !important;
}
.color4 {
  color: #4482bb !important;
}
.color5 {
  color: #7dcfc4 !important;
}
.color6 {
  color: #f2705a !important;
}
.color7 {
  color: #88a4d4 !important;
}
.color8 {
  color: #ff8750 !important;
}

.property-content .iconfont {
  font-size: 0.48rem;
  margin: 2px !important;
}
.property-content .title {
  font-size: 0.24rem;
  font-weight: 600;
}
.link-box{
  margin: .2rem .2rem;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
