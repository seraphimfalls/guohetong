<template>
  <div>
    <div class="banner-box">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="lbimg" v-lazy="image"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="news-box">
      <van-swipe
        style="height:20px;"
        :autoplay="3000"
        vertical
        class="notice-box"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in noticeData" :key="item.index" @click="noticeview(item.id)">
          <van-icon name="volume-o" class="marginR2" color="#1989fa"/>
          {{ item.title }}
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hospital-fee-box">
      <div>
        <span class="iconfont icontubiao_youhuizhekou"></span>
        <span class="title">推荐商品</span>
      </div>
<!--      <span class="coloraeaeae">更多</span>-->
    </div>
    <div class="bottom-box">
      <div class="list-box" v-for="item in listData" :key="item.id" @click="getDetail(item.id)">
        <div class="product-img">
          <img :src="item.image"/>
        </div>
        <div class="d_box" style="width:80%">
          <div class="van-multi-ellipsis--l2 textLeft">{{ item.title }}</div>
          <div class="flex-box-between textLeft">
            <div>
              <span class="colorff4b4b">￥{{ item.price }}</span><br/>
              <span class="msg_box">{{item.tips}}</span>
            </div>
            <van-button class="btn" color="#59a4fe" size="small">购买</van-button>
          </div>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "../../components/tabBar.vue";
import * as homeApi from "../../axios/home.js";
import * as mineApi from "../../axios/mine.js";
import * as storage from "../../utils/storage.js";
import * as storeApi from "../../axios/store.js"
import F2 from "@antv/f2";
import {Dialog} from "vant";

export default {
  components: {
    tabBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      images: [],
      news: "新闻内容",
      newsId: "",
      newscon: "",
      noticeData: [],
      mobile: "",
      id: "",
      listData: [],
      can_transfer: "",
      price: "",
      priceList: [],
      $chart: null,
      listTimer: null,
      priceListTimer: null,
      page: 1,
      limit: 10,
      min: "",
      max: "",
      is_merchant: "",
      show: false,
      checked: false,
      isSigned: false,
      signText: "每日签到",
    };
  },
  async created() {
    const token = localStorage.getItem("ght_token");
    //    console.log("token",token);
    if (token == "" || token == null) {
      this.$router.push({path: "/"});
    }

    const bannerRes = await homeApi.banner();
    // console.log(bannerRes)
    this.images = bannerRes.data;
    const noticeRes = await homeApi.publicNoticeList();
    //  console.log(noticeRes);
    this.noticeData = noticeRes.data.data;
    // console.log(this.noticeData);
    const getRes = await mineApi.getAccount();
    this.can_transfer = getRes.data.can_transfer;
    this.id = getRes.data.id;
    this.mobile = getRes.data.mobile;
    this.is_merchant = getRes.data.is_merchant;
    

    const productRes = await storeApi.getRecommendGoodsList();
    this.listData = productRes.data;
    console.log(productRes)
    // console.log(this.listData)
    // const priceRes = await homeApi.getPIGEPrice();
    // this.price = priceRes.data.pige_price;
  },

  methods: {
    getDetail(id){
      let info = {
        id: id
      }
      sessionStorage.setItem('info', JSON.stringify(info));
      this.$router.push({path: '/goodsDetail'})
    },
    overlayShow() {
      this.show = false;
    },
    transfer() {
      this.$router.push({path: '/usdtTransfer'})
    },
    sign() {
      if (this.isSigned == false) {
        Dialog.alert({
          message: "本次签到获得<span class='colorca0505'>5</span>积分",
        }).then(() => {
          this.signText = " 已签到"
        });
      }
      else {
        this.$toast.fail("今天已经签过了哦")
        this.signText = "已签到"
      }
    },
    merchant() {
      if (this.is_merchant == 1) {
        this.$router.push({path: "/merchants"});
      }
      else {
        this.$toast.fail("抱歉，您还不是商户!");
      }
    },
    renderChart(priceList) {
      // console.log(priceList);
      const chartEle = this.$refs.chart_trade;
      if (!chartEle) {
        return;
      }

      this.$chart = new F2.Chart({
        el: chartEle,
        width: (window.innerWidth / 750.0) * 750,
        height: (window.innerWidth / 750.0) * 400,
        pixelRatio: window.devicePixelRatio,
      });

      this.$chart.source(priceList, {
        value: {
          tickCount: 6,
          min: this.min,
          max: this.max,
        },
        day: {
          range: [0, 1],
        },
      });
      this.$chart.tooltip({
        showCrosshairs: true,
      });

      this.$chart.axis("day", {
        label: function label(text, index, total) {
          var cfg = {
            textAlign: "center",
            fontSize: (window.innerWidth / 750.0) * 18,
            fill: "#060d2a",
          };
          if (index === 0) {
            cfg.textAlign = "start";
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = "end";
          }
          return cfg;
        },
      });
      this.$chart.axis("value", {
        label: {
          fontSize: (window.innerWidth / 750.0) * 18,
          fill: "#060d2a",
        },
        line: {
          stroke: "#f7f7f7",
        },

        grid: {
          opacity: 0.5,
        },
      });
      this.$chart.line().position("day*value").shape("smooth").color("#59a4fe");
      this.$chart.point().position("day*value").shape("smooth").style({
        stroke: "#060d2a",
      });
      this.$chart.render();
    },
    register() {
      this.$router.push({
        path: "/network",
        query: {firstId: this.id, firstMobile: this.mobile},
      });
    },
    store() {
      this.$router.push({path: "/store"});
    },
    detail(id) {
      let info = {
        id: id,
      };
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({path: "/goodsDetail"});
    },
    async noticeview(id) {
      const res = await homeApi.publicNoticeInfo(id);
      this.newscon = res.data.content;
      // console.log(res);
      Dialog.alert({
        title: this.news,
        message: this.newscon,
      }).then(() => {
        // on close
      });
    },
  },
};
</script>
<style lang="less" scoped>
.banner-box {
  position: relative;
  img{
    height:3rem;
  }
}

.news-box {
  width: 7rem;
  margin: 0 auto;
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  line-height: 2em;
}

.news-icon {
  color: #59a4fe;
  font-size: 0.36rem;
  margin-right: 0.2rem;
}

.hospital-fee-box {
  width: 90%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.1rem;
  border-bottom: 0.01rem solid #f7f7f7;
}

.hospital-fee-box .iconfont {
  color: #59a4fe;
  font-size: 0.48rem;
  margin-right: 0.1rem;
}

.lbimg {
  width: 100%;
  height: 4rem;
}

.notice-box {
  font-size: 0.28rem;
  line-height: 20px;
  text-align: left;
  padding-left: 0.2rem;
  box-sizing: border-box;
}

.four-icon-box {
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
}

.four-icon {
  width: 49%;
  height: 1.45rem;
  display: flex;
  align-items: center;
  border-radius: 0.1rem;
  margin: 0.2rem 2% 0 0;
  padding: 0.2rem;
  box-sizing: border-box;
}

.four-icon1 {
  background: #effae9;
}

.four-icon2 {
  background: #e2f1fa;
}

.four-icon3 {
  background: #f3f3e2;
}

.four-icon4 {
  background: #fff3ed;
}

.four-icon:nth-child(2n) {
  margin-right: 0 !important;
}

.icon-box {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  font-size: 0.6rem;
  margin-right: 0.2rem;
}

.icon-box1 {
  background: #6cc49f;
}

.icon-box2 {
  background: #69b6e5;
}

.icon-box3 {
  background: #ffd86d;
}

.icon-box4 {
  background: #ff906d;
}

.icon-text {
  text-align: left;
  line-height: 1.8em;
  font-size: 0.26rem;
}

.five-icon-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem auto;
}

.five-icon {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 40%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
}

.five-icon .iconfont {
  font-size: 0.4rem;
}

.five-icon-text {
  width: 100%;
  margin: 0.1rem auto;
  font-size: 0.28rem;
}


.btn{
  border-radius:0.2rem;
}
.lbimg {
  width: 100%;
  height: 4rem;
}

.icon-box1 {
  background: #6cc49f;
}

.icon-box2 {
  background: #69b6e5;
}

.icon-box3 {
  background: #ffd86d;
}

.icon-box4 {
  background: #ff906d;
}

.icon-text {
  text-align: left;
  line-height: 1.8em;
  font-size: 0.26rem;
}

.five-icon-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem auto;
}

.five-icon {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 40%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
}

.five-icon .iconfont {
  font-size: 0.48rem;
}

.five-icon-text {
  width: 100%;
  margin: 0.1rem auto;
  font-size: 0.28rem;
}

.list-box {
  width: 90%;
  margin: 0.3rem auto;
  display: flex;
  font-size: 0.24rem;
  line-height: 1.8em;
  // border: 1px solid #B0C4DE;
  padding: 0.2rem 0.4rem;
  background: rgba(245,245,245,0.4);
  border-radius: .2rem;
}

.product-img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
}

.product-img img {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
}

.bottom-box {
  padding-bottom: 0.98rem;
}

.sign-img {
  width: 7.5rem;
  height: 2.1rem;
  margin: 0.2rem auto;
}
.body{
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.msg_box{
  font-size: 0.2rem;
  color: rgba(0,0,0,.5);
}
.sign-img {
  width: 7.5rem;
  height: 2.1rem;
  margin: 0.2rem auto;
}

.hospital-fee-content-box {
  width: 94%;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0.2rem auto;
  font-size: 0.28rem;
}

.hospital-fee-content {
  width: 3rem;
  flex-shrink: 0;
  margin-right: 0.2rem;
}

.hospital-fee-content img {
  width: 100%;
  height: 2.4rem;
}

.title {
  font-size: 0.32rem;
  font-weight: 600;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 80%;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  line-height: 2em;
  margin: 0 auto;
  background-color: #fff;
}
</style>
