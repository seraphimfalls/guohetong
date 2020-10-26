<template>
  <div>
    <nav-bar title="接点关系网"></nav-bar>
    <div class="num-box">
      <span>直推人数：{{ invite_num }}</span>
      <span>团队人数：{{ team_num }}</span>
    </div>
    <div v-for="(item,index) in teamData" :key="item.id">
      <div class="team-box" @click="detail(item.id,item.mobile)" v-show="!isShow[index]">
        <img src="../../assets/images/avatar.png" class="avatar"/>
        <div>
          <div class="flex-box">ID:{{ item.id }}</div>
          <div class="flex-box">手机号:{{ item.mobile }}</div>
        </div>
        <div>
          <div class="flex-box">注册时间:{{ item.createtime }}</div>
          <div class="flex-box">
            <span v-if="index==0" style="color:red">所在区:左区</span>
            <span v-else style="color:red">所在区:右区</span>
          </div>
        </div>
      </div>
      <div class="font28 border-bottom2 width90" @click="register(index)" v-show="isShow[index]">
        <span class="font600">空位</span>
        <p>(可在该位置下注册新会员)</p>
      </div>
    </div>

    <div class="flex-box-center margin2">
      <van-button type="primary" @click="back" style="margin-right:0.5rem">返回上一级</van-button>
      <van-button type="info" @click="home">返回到首页</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "../../components/navBar.vue";
import * as homeApi from "../../axios/home.js";

export default {
  components: {
    navBar
  },
  data() {
    return {
      page: 1,
      limit: 10,
      teamData: [],
      invite_num: "",
      team_num: "",
      left_team_amount: "",
      right_team_amount: "",
      id: "",
      // isShow: true,
      isShow: {},
      order: "",
      directcode: "",
      parentMobile: "",
      parentId: "",
      childId: "",
      prevId: "",
      firstId: "",
      firstMobile: ""
    };
  },
  async created() {
    this.firstId = this.$route.query.firstId;
    this.firstMobile = this.$route.query.firstMobile;
    this.parentMobile = this.$route.query.parentMobile;
    this.childMobile = this.$route.query.childMobile;
    this.childId = this.$route.query.childId;
    if (this.childId) {
      this.id = this.childId;
    }
    else {
      this.id = this.parentId;
    }
    const res = await homeApi.getMyDirectReports(this.firstId);
    // console.log(res)
    if (res.code == 1) {
      this.invite_num = res.data.invite_num;
      this.team_num = res.data.team_num;
      this.left_team_amount = res.data.left_team_amount;
      this.right_team_amount = res.data.right_team_amount;
      this.prevId = res.data.id;
      //  console.log(this.prevId);
      this.teamData = res.data.childrenList;

      for (let i = 0; i < res.data.childrenList.length; i++) {
        if (res.data.childrenList[i].length == 0) {
          this.isShow[i] = true;
        }
        else {
          this.isShow[i] = false;
          this.teamData = res.data.childrenList;
        }
      }
    }
  },
  methods: {
    async getRes(id) {
      const res = await homeApi.getMyDirectReports(id);
      if (res.code == 1) {
        this.invite_num = res.data.invite_num;
        this.team_num = res.data.team_num;
        // console.log(res);
        this.teamData = res.data.childrenList;
        //  console.log(res.data.childrenList)
        for (let i = 0; i < res.data.childrenList.length; i++) {
          if (res.data.childrenList[i].length == 0) {
            this.isShow[i] = true;
          }
          else {
            this.isShow[i] = false;
            this.teamData = res.data.childrenList;
          }
        }
      }
    },
    home() {
      this.$router.push({path: "/home"});
    },
    async back() {
      if (this.prevId == this.firstId) {
        this.$toast("已到达最初节点");
        return;
      }
      const res = await homeApi.getReturnDirectReports(this.prevId);
      if (res.code == 1) {
        this.invite_num = res.data.invite_num;
        this.team_num = res.data.team_num;
        this.prevId = res.data.id;
        this.teamData = res.data.childrenList;
        //  console.log(res.data.childrenList)
        for (let i = 0; i < res.data.childrenList.length; i++) {
          if (res.data.childrenList[i].length == 0) {
            this.isShow[i] = true;
          }
          else {
            this.isShow[i] = false;
            this.teamData = res.data.childrenList;
          }
        }
      }
    },
    register(index) {
      this.order = index + 1;
      this.parentMobile = this.$route.query.parentMobile
      if (this.parentMobile) {
        this.$router.push({
          path: "/register",
          query: {
            order: this.order,
            parentMobile: this.parentMobile,
            firstMobile: this.firstMobile
          }
        });
      }
      else {
        this.$router.push({
          path: "/register",
          query: {
            order: this.order,
            parentMobile: this.firstMobile,
            firstMobile: this.firstMobile
          }
        });
      }
    },
    async detail(id, childMobile) {
      this.$router.push({
        path: "/network",
        query: {
          firstId: this.firstId,
          firstMobile: this.firstMobile,
          parentMobile: childMobile,
          parentId: id
        }
      });
      const res = await homeApi.getMyDirectReports(id);
      if (res.code == 1) {
        this.invite_num = res.data.invite_num;
        this.team_num = res.data.team_num;
        this.prevId = res.data.id;
        // console.log(res);
        this.teamData = res.data.childrenList;
        //  console.log(res.data.childrenList)
        for (let i = 0; i < res.data.childrenList.length; i++) {
          if (res.data.childrenList[i].length == 0) {
            this.isShow[i] = true;
          }
          else {
            this.isShow[i] = false;
            this.teamData = res.data.childrenList;
          }
        }
      }
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
  line-height: 2em;
}
</style>
