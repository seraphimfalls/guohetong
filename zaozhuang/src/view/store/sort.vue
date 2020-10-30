<template>
  <div>
    <nav-bar id="reset" title="商品分类"></nav-bar>
    <van-tabs v-model="activeName" @click="onClick">
      <van-tab v-for="tab in tabList" :title="tab.name" :name="tab.id" :key="tab.id">
        <goods-list :listType="activeName"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as storeApi from "../../axios/store.js";
import goodsList from "../../components/goodsList.vue";
export default {
  components: {
    navBar,
    goodsList
  },
  data() {
    return {
      activeName: "0",
      tabList: [],
    };
  },
async created() {
  const res = await storeApi.getGoodsCategoryList();
  // console.log(res)
  const arr = [{id:0,name:'全部'}]
  this.tabList = [...arr,...res.data]
},
  methods: {
    onClick(name, title) {
    },
  }
};
</script>
<style lang="less" scope>
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
.sign-img {
  width: 7.5rem;
  height: 2.1rem;
  margin: 0.2rem auto;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
