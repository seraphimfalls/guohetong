<template>
  <div>
    <nav-bar id="reset" title="我的团队"></nav-bar>
    <div class="num-box">
      <span>直推人数：{{ invite_num }}</span>
      <span>团队人数：{{ team_num }}</span>
    </div>
    <div class="team-box" v-for="item in teamData" :key="item.id">
      <!--      <van-button type="primary" size="small" @click="showPopup(item.mobile)">展示二维码</van-button>-->

      <img src="../../assets/images/avatar.png" class="avatar"/>
      <div>
        <div class="flex-box">ID:{{ item.id }}</div>
        <div class="flex-box">手机号:{{ item.mobile }}</div>
      </div>
      <div>
        <div class="flex-box">注册时间:{{ item.createtime }}</div>
        <div class="flex-box">团队人数:{{ item.team_num }}</div>
      </div>
    </div>
    <van-popup v-model="show" @opened="sssssss">
      <div id="qrcode" ref="qrcode"></div>
    </van-popup>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as mineApi from "../../axios/mine.js";
import QRCode from "qrcodejs2";

export default {
  components: {
    navBar
  },
  data() {
    return {
      id: "",
      page: 1,
      limit: 10,
      teamData: [],
      invite_num: "",
      team_num: "",
      value: {},
      codeData: [],
      show: false,
      value: "",
      mobile1: "",
      left_team_amount: "",
      right_team_amount: ""
    };
  },
  async created() {
    const res = await mineApi.getMyTeamNew(this.page, this.limit);
    this.teamData = res.data.childrenList;
    this.team_num = res.data.team_num;
    this.invite_num = res.data.invite_num;
    this.left_team_amount = res.data.left_team_amount;
    this.right_team_amount = res.data.right_team_amount;
  },
  // mounted(){
  //   this.qrcode()
  // },
  methods: {
    showPopup(mobile) {
      this.show = true;
      this.value = this.$baseUrl + "/index.html#/firstLogin?mobile=" + mobile;
      this.mobile1 = mobile;
      //  this.qrcode(this.value)
    },
    sssssss() {
      this.value =
        this.$baseUrl + "/index.html#/firstLogin?mobile=" + this.mobile1;
      this.$refs.qrcode.innerHTML = "";
      this.qrcode(this.value);
    },
    qrcode(value) {
      console.log(document.getElementById("qrcode"));
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: value, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
      console.log(qrcode);
    },
    onClose() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scope>
.num-box {
  padding: 0.2rem;
  background: #f7f7f7;
  box-sizing: border-box;
  line-height: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.28rem;
  margin: 0rem auto;
}

.team-box {
  width: 96%;
  margin: 0.2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.28rem;
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 0.1rem;
}

#qrcode {
  padding: 0.2rem;
  background: #fff;
}
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
