<template>
  <div>
    <van-list
      v-model="loading"
      loading-text="加载中"
      :offset="offest"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <div class="list-box" v-for="item in listData" :key="item.id" @click="getDetail(item.id)">
          <div class="product-img">
            <img :src="item.image" />
          </div>
          <div style="width:80%">
            <div class="van-multi-ellipsis--l2 textLeft">{{ item.title }}</div>
            <div class="flex-box-between textLeft">
              <span class="colorff4b4b">折扣价：{{ item.price }}</span>
              <van-button color="#59a4fe" size="small">购买</van-button>
            </div>
          </div>
        </div>
    </van-list>
  </div>
</template>

<script>
import * as storeApi from "../axios/store.js";
export default {
  name: "goodsList",
  props:["listType"],
  data() {
    return {
      page: 1,
      limit: 10,
      offest: 10,
      loading: false,
      finished: false,
      listData: [],
      category_id:""
    };
  },
  methods: {
    async onLoad() {
      let res = await storeApi.getGoodsListByCategoryId(this.listType,this.page, this.limit);
      console.log(res)
      if (res.data.length < 10) {
        this.finished = true;
      }
      this.page = this.page + 1;
      this.listData = this.listData.concat(res.data);
      this.loading = false;
    },
    getDetail(id){
      let info={
        id:id
      }
      sessionStorage.setItem("info",JSON.stringify(info))
      this.$router.push({path:"/goodsDetail"})
    }
  }
};
</script>
<style scoped>
.list-box {
  width: 90%;
  margin: 0.2rem auto;
  display: flex;
  font-size: 0.24rem;
  line-height: 1.8em;
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 0.1rem;
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
</style>
