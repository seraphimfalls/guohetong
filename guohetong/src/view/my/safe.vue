<template>
  <div>
    <nav-bar id="reset" title="账户安全"></nav-bar>
    <van-tabs v-model="active">
      <van-tab title="修改登录密码">
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>原密码：</span>
          <van-field type="password" v-model="oldPassword" style="width:70%" />
        </div>
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>设置新密码：</span>
          <van-field type="password" v-model="newPassword" style="width:70%" />
        </div>
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>确认密码：</span>
          <van-field type="password" v-model="cfmNewPassword" style="width:70%" />
        </div>
        <div class="btn-box">
          <van-button type="info" size="small" @click="save1">保存</van-button>
        </div>
      </van-tab>
      <van-tab title="设置/重置支付密码">
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>手机号：</span>
          <van-field v-model="mobile" style="width:70%" disabled="true" />
        </div>
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>验证码：</span>
          <div class="flex-box">
              <van-field
        v-model="sms"
        center
        clearable
        autocomplete="new-password"
        placeholder="请输入短信验证码"
      >
        <!--<van-button
          slot="button"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="getSms()"
        >{{ btntxt }}</van-button>-->
      </van-field>
          </div>
        </div>
        <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>设置密码：</span>
          <van-field type="password" v-model="payPassWord" style="width:70%" />
        </div>
        <!-- <div class="width96 font28 margin2 flex-box-between border-bottom2">
          <span>确认设置密码：</span>
          <van-field type="password" v-model="cdmPayPassWord" style="width:70%" />
        </div> -->
        <div class="btn-box">
          <van-button type="info" size="small" @click="save2">保存</van-button>
        </div>
      </van-tab>
    </van-tabs>
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
      oldPassword: "",
      newPassword: "",
      cfmNewPassword: "",
      active: "0",
      mobile:"",
      sms:"",
      payPassWord:"",
      cdmPayPassWord:"",
      btntxt: "发送验证码",
      event: "changepwd",
    };
  },
async created() {
  const res = await mineApi.getAccount();
  // console.log(res)
  this.mobile = res.data.mobile;
},
  methods: {
    async getSms() {
      if (this.mobile != this.mobile || this.mobile == "") {
        this.$toast("请输入正确的手机号");
        return "";
      }
      const res = await userApi.send(this.mobile, this.event);
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
      } else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    },
    async save1(){
      const res = await userApi.changepassword(this.oldPassword,this.newPassword,this.cfmNewPassword)
      if(res.code==1){
        localStorage.removeItem("ght_token");
        this.$toast.success(res.msg)
        this.$router.push({path:"/login"})
      }else{
        this.$toast.fail(res.msg)
      }
    },
     async save2(){
       const res = await userApi.resetPayPassword(this.payPassWord,this.mobile,this.sms);
       if(res.code==1){
          this.$toast.success(res.msg)
         this.$router.push({path:"/mine"})
       }else{
         this.$toast.fail(res.msg)
       }

    },
  }
};
</script>
<style lang="less" scope>
#reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
