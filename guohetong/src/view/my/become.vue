<template>
  <div>
    <nav-bar id="reset" title="服务中心/加盟店"></nav-bar>
    <div v-if="account.service_level == 1">
      <div class="link-box" @click="register">
        <div class="flex-box">
          会员报单
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click ="reward">
        <div class="flex-box">
          报单资金充值
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click ="levelUp">
        <div class="flex-box">
          申请升级为加盟店
        </div>
        <van-icon name="arrow"/>
      </div>
    </div>
    <div v-else>
      <div class="link-box">
          <div class="flex-box" @click ="beService">
            申请成为服务中心/加盟店
          </div>
          <van-icon name="arrow"/>
      </div>    
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import navBar from "../../components/navBar";
import tabBar from "../../components/tabBar";
import * as mineApi from "../../axios/mine";

export default {
  name: "become",
  components: {
    navBar,
    tabBar,
    region_level: '',
  },
  data() {
    return {
      account: {}
    }
  },
  async created() {
    const res = await mineApi.getAccount();
    console.log(res.data.service_level)
    this.region_level = res.data.region_level;
    if (res.code) {
      this.account = res.data;
    }
  },
  methods: {
    register() {
      this.$router.push({path: '/network', query: {firstId: this.account.id, firstMobile: this.account.mobile},})
    },
    reward(){
      this.$router.push({path: '/reward'})
    },
    levelUp(){
      this.$router.push({path: '/serviceLevel'})
    },
    beService(){
      if(this.region_level){
        this.$router.push({
          path: "/beService",
        })
      }else{
        this.$router.push({
          path: "/become"
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
