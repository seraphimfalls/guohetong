<template>
  <div>
    <nav-bar title="收款记录"></nav-bar>
    <van-list
      v-model="loading"
      loading-text="加载中"
      :offset="offest"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list-data-box" v-for="item in listData" :key="item.index">
        <div class="textLeft">
          <div>{{ item.remark }}</div>
          <div class="coloraeaeae font24">{{ item.create_time }}</div>
        </div>
        <div class="textLeft">
          <div class="font600">{{ item.number }}</div>
          <div  class="coloraeaeae font24">{{ item.tips }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as homeApi from "../../axios/home.js";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      offest: 10,
      loading: false,
      finished: false,
      listData: [],
    };
  },

  methods: {
    async onLoad() {
      let res = await homeApi.transferList(this.page, this.limit);
      // console.log(res);
      if (res.data.length < 10) {
        this.finished = true;
      }
      this.page = this.page + 1;
      this.listData = this.listData.concat(res.data);
      this.loading = false;
    },
  },
};
</script>
<style lang="less" scope>
</style>
