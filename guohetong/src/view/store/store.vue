<template>
  <div class="body">
    <nav-bar id="reset" title="商城"></nav-bar>
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
import navBar from "../../components/navBar.vue";
import tabBar from "../../components/tabBar.vue";
import * as storeApi from "../../axios/store.js";
import * as homeApi from "../../axios/home.js";

export default {
  components: {
    navBar,
    tabBar
  },
  data() {
    return {
      listData: [],
      page: 1,
      limit: 10,
      price: "",
    };
  },
  async created() {
    const res = await storeApi.getGoodsList(this.page, this.limit)
    this.listData = res.data
  },
  methods: {
    sort() {
      this.$router.push({path: "/sort"})
    },
    onSale() {
      this.$router.push({path: "/onSale"})
    },
    getDetail(id) {
      let info = {
        id: id
      }
      sessionStorage.setItem("info", JSON.stringify(info));
      this.$router.push({path: "/goodsDetail"})
    },
    order() {
      this.$router.push({path: "/myOrder"})
    }
  }
};
</script>
<style lang="less" scope>
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
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
