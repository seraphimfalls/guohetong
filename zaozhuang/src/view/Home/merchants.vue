<template>
  <div>
    <nav-bar title="我是商户"></nav-bar>
    <div class="mine-top-box">
      <div class="mine-content">
        <div class="flex-box">
          <img :src="apiData.avatar" class="avatar" />
          <div class="textLeft">
            <p>{{apiData.merchant_name}}</p>
            {{apiData.merchant_address}}
          </div>
        </div>
      </div>
      <div class="textLeft brief-item-box">
        <div>简介</div>{{apiData.merchant_brief}}
      </div>
    </div>
    <van-grid :border="false" :column-num="2" style="margin-top:1.5rem">
      <van-grid-item @click="code">
        <div class="five-icon icon-box1">
          <span class="iconfont iconerweima"></span>
        </div>
        <span class="five-icon-text">收款二维码</span>
      </van-grid-item>
      <van-grid-item @click="collection">
        <div class="five-icon icon-box4">
          <span class="iconfont iconshoukuan"></span>
        </div>
        <span class="five-icon-text">收款记录</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      img: "",
      account: "云天下",
      adress: "青岛市北区崂山区天宝国际A座701",
      apiData:{}
    };
  },
  async created() {
    const res = await mineApi.getAccount()
    this.apiData = res.data
    // console.log(res)
  },
  methods: {
    code() {
      this.$router.push({ path: "/code" });
    },
    collection() {
      this.$router.push({ path: "/collectionList" });
    },
  },
};
</script>
<style lang="less" scope>
.mine-top-box {
  width: 100%;
  height: 3.24rem;
  font-size: 0.28rem;
  margin: 0rem auto;
  background: url(../../assets/images/mine-bg.png) no-repeat center center;
  position: relative;
}
.mine-content {
  padding: 0.4rem 0.2rem 0.2rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  color: #fff;
  box-sizing: border-box;
}
.avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.brief-item-box {
  position: absolute;
  bottom: -1rem;
  width: 90%;
  background: #fff;
  left: 50%;
  margin-left: -3.375rem;
  border-radius: 0.1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 2em;
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
  margin: 0.2rem auto;
  font-size: 0.28rem;
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
</style>
