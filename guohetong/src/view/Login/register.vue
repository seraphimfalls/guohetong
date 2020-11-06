<template>
  <div>
    <nav-bar title="注册"></nav-bar>
    <div class="logo-box">
      <img src="../../assets/images/logo.png" class="logo"/>
    </div>
    <van-cell-group>
      <van-field v-model="mobile" type="tel" @keyup="inputChange" label="手机号："/>
      <van-field
        v-model="captcha"
        center
        clearable
        autocomplete="new-password"
        label="短信验证码："
        placeholder="请输入短信验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sms"
          :disabled="disabled"
        >{{ btntxt }}
        </van-button>
      </van-field>
      <van-field v-model="firstMobile" label="推荐人："/>
      <van-field v-model="parentMobile" disabled="true" label="接点人："/>
      <van-field v-model="levelText" readonly @click="levelPopupShow=true" label="报单等级：" placeholder="请选择报单等级"/>
      <van-field v-model="transportText" readonly @click="transportPopupShow=true" label="报单商品运输方式："
                 placeholder="请选择报单商品运输方式"/>
      <van-field v-model="receiver_address" label="邮寄地址：" placeholder="请输入邮寄地址"/>
      <van-field v-model="receiver_name" label="收件人：" placeholder="请输入收件人"/>
      <van-field v-model="receiver_mobile" label="联系方式：" placeholder="请输入联系方式"/>
    </van-cell-group>
    <div class="width90 font24 line-height2 color59aefe">初始登录密码 、支付密码均默认123456，请会员注册后及时修改！</div>
    <van-button type="info" @click="register()" style="margin-bottom:20px" :loading="loading">立即注册</van-button>
    <van-popup position="bottom" :style="{ height: '50%' }" v-model="levelPopupShow">
      <van-picker
        title="报单等级"
        show-toolbar
        :columns="levelList"
        @confirm="confirmLevel"
        @cancel="levelPopupShow=false"
      />
    </van-popup>
    <van-popup position="bottom" :style="{ height: '50%' }" v-model="transportPopupShow">
      <van-picker
        title="报单商品运输方式"
        show-toolbar
        :columns="transportList"
        @confirm="confirmTransport"
        @cancel="transportPopupShow=false"
      />
    </van-popup>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as userApi from "../../axios/user.js";
import * as mineApi from "../../axios/mine.js";

export default {
  components: {
    navBar
  },
  data() {
    return {
      loading: true,
      receiver_address: '',
      receiver_name: '',
      receiver_mobile: '',
      level: '',
      transport: '',
      mobile: "",
      position: "",
      captcha: "",
      firstMobile: "",
      event: "register",
      disabled: false,
      time: 60,
      btntxt: "发送验证码",
      parentMobile: "",
      levelPopupShow: false,
      transportPopupShow: false,
      defaultLevelList: {
        '1': '区代',
        '2': '市代',
        '3': '总代'
      },
      defaultTransportList: {
        '1': '快递',
        '2': '自取'
      },
      levelText: '',
      transportText: ''
    };
  },
  computed: {
    levelList() {
      return Object.values(this.defaultLevelList);
    },
    transportList() {
      return Object.values(this.defaultTransportList);
    }
  },
  async created() {
    this.parentMobile = this.$route.query.parentMobile;
    // this.firstMobile = this.$route.query.firstMobile;
    this.position = this.$route.query.order;
    const getRes = await mineApi.getAccount();
    if (!getRes.code) {
      this.$toast.fail(getRes.msg);
    }
    this.loading = false;
    // this.invitecode = getRes.data.mobile;
  },
  methods: {
    confirmLevel(value, index) {
      this.levelText = value
      this.level = Object.keys(this.defaultLevelList)[index];
      this.levelPopupShow = false;
    },
    confirmTransport(value, index) {
      this.transportText = value
      this.transport = Object.keys(this.defaultTransportList)[index];
      this.transportPopupShow = false;
    },
    inputChange() {
      this.mobile = this.mobile.replace(/[^\d]/g, "");
    },
    async sms() {
      if (this.mobile != this.mobile || this.mobile == "") {
        this.$toast("请输入正确的手机号");
        return "";
      }
      const res = await userApi.send(this.mobile, this.event);
      //   console.log(res);
      this.$toast(res.msg);
      this.time = 60;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "秒";
        setTimeout(this.timer, 1000);
      }
      else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    },
    async register() {
      this.loading = true;
      const res = await userApi.register({
        direct_mobile: this.parentMobile,//接点人手机号
        position: this.position,//安置位置（可选值：1，2）：1 代表左区，2 代表右区
        mobile: this.mobile,//注册手机号
        invite_mobile: this.firstMobile,//推荐人手机号
        level: this.level,//报单等级：1 区代，2 市代，3 总代
        transport: this.transport,//报单商品运输方式：1 快递，2 自取
        receiver_address: this.receiver_address,//收货地址
        receiver_name: this.receiver_name,//收件人
        receiver_mobile: this.receiver_mobile,//联系方式
        captcha: this.captcha,//手机验证码
      });
      this.loading = false;
      // console.log(res);
      if (res.code) {
        this.$router.push({
          path: "/registerSuccess",
          query: {mobile: this.mobile}
        });
      }
      else {
        this.$toast(res.msg);
      }
    }
  }
};
</script>
<style lang="less" scope>
.logo-box {
  width: 2rem;
  height: 2rem;
  margin: 1rem auto 0.5rem auto;
}

.logo {
  width: 100%;
}

.van-field__label {
  width: 120px !important;
  text-align: right;
}
</style>
