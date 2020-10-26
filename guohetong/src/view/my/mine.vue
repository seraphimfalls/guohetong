<template>
  <div class="bg">
    <div class="mine-top-box">
      <div class="mine-content">
        <div class="flex-box">
          <img src="../../assets/images/avatar.png" class="avatar"/>
          <div class="textLeft">
            <p>手机号:{{ mobile }}</p>
            <p>{{ service_name }}</p>
          </div>
          <div class="agency-box">
            <div class="agency-text" >
              等级：{{this.region_name}}
            </div>
            <div class="agency-btn" @click="click" v-if="can_upgrade">
              升级
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-bottom:1rem">
      <div class="link-box" @click="list" >
        <div class="flex-box">
          我的订单
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="team">
        <div class="flex-box">
          我的团队
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="become">
        <div class="flex-box">
          成为服务中心/加盟店
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="safe">
        <div class="flex-box">
          账户安全
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="adress">
        <div class="flex-box">
          收货地址
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="withdrawal" >
        <div class="flex-box">
          提现收款账号
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="link-box" @click="service">
        <div class="flex-box">
          联系客服
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="btn-box width96" style="margin-top:0.8rem">
        <van-button type="info" @click="logout" block>安全退出</van-button>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "../../components/tabBar.vue";
import * as mineApi from "../../axios/mine.js";
import {Dialog} from "vant";

export default {
  components: {
    tabBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      id: "",
      mobile: "",
      img: "",
      service_name: '',
      region_name: '',
      region_level: '',
      can_upgrade:''
    };
  },
  async created() {
    const res = await mineApi.getAccount();
    // console.log(res);
    this.can_upgrade = res.data.can_upgrade;
    this.region_name = res.data.region_name;
    this.region_level = res.data.region_level;
    this.id = res.data.id;
    this.mobile = res.data.mobile;
    this.img = res.data.avatar;
    this.service_name = res.data.service_name;
  },
  methods: {
    level(){
      this.$router.push({path:"/level"})
    },
    click(){
      this.$router.push({path: "/levelup"})
    },
    list() {
      this.$router.push({path: "/myOrder"});
    },
    share() {
      this.$router.push({path: "/share"});
    },
    become() {
      this.$router.push({
        path: "/become"
      })
    },
    team() {
      this.$router.push({path: "/team"});
    },
    async adress() {
      this.$router.push({path: "/adressList"});
    },
    withdrawal() {
      this.$router.push({path: "/alipay"});
    },
    safe() {
      this.$router.push({path: "/safe"});
    },
    service() {
      this.$router.push({path: "/service"});
    },
    async logout() {
      const res = await mineApi.logout();
      localStorage.removeItem("token");
      this.$toast.success(res.msg);
      if (res.code == 1) {
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.$router.push({path: "/login"});
          }
          else {
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
          }
        }, 1000);
      }
    },
  },
};
</script>
<style lang="less" scope>
body,
html {
  height: 100%;
}

.bg {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}

.mine-top-box {
  width: 100%;
  height: 3.24rem;
  background: url(../../assets/images/mine-bg.png) no-repeat center center;
  .agency-box{
    font-size:14px;
    display:flex;
    margin-top:-30px;
    margin-left:20px;
    .agency-btn{
      background:#fff;
      color:#000;
      border-radius:5px;
      padding:2px 4px;
      margin-left:3px;
      
    }
  }
}

.mine-content {
  padding: 0.8rem 0.2rem 0 0.2rem;
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

.link-box .iconfont {
  font-size: 0.36rem;
  color: #59a4fe;
}
</style>
