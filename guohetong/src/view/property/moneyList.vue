<template>
  <div>
    <nav-bar id="reset" title="资金流水"></nav-bar>
    <van-tabs v-model="activeName" @click="onClick">
      <van-tab title="报单资金" name="1">
        <blance-data></blance-data>
      </van-tab>
      <van-tab title="收益资金" name="2">
        <pige-data></pige-data>
      </van-tab>
      <van-tab title="商城积分" name="3">
        <money-data></money-data>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import blanceData from "../../components/blanceData.vue";
import pigeData from "../../components/pigeData.vue";
import moneyData from "../../components/moneyData.vue"
import * as assetsApi from "../../axios/assets.js";
export default {
  components: {
    blanceData,
    navBar,
    pigeData,
    moneyData,
  },
  data() {
    return {
      activeName: "1"
    }
  },
  async created() {
    if (this.$route.query.active) {
      this.activeName = this.$route.query.active;
    }
  },
  methods: {
    onClick(name) {
      
    }
  }
};
</script>
<style lang="less" scope>
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
