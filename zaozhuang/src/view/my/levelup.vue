<template>
  <div class="body">
    <nav-bar id="reset" title="我的订单"></nav-bar>
    <div class="current-box">
        <div class="cur-level">当前等级：{{this.region_name}}</div>
        <div class="cur-banlance">报单资金余额：{{this.balance}}</div>
    </div>
    <div class="upbox">
      <div class="up">
        选择会员等级
        <select name="level" id=""  v-model = "ProductActive" @change="changeProduct($event)">
          <option value="" selected ref="default_op">请选择会员等级</option>
          <option v-for="(item, index) in this.levelList" :key="index" :value="item.difference">{{item.name}}</option>
        </select>
      </div>
      <div class="price">
        补差价
        <div class="price_num">{{this.ProductActive}}</div>
        元
      </div>
      <button class="en_btn" @click="levelup()">确认升级</button>
    </div>
    <div class="msgbox" v-show = "msgbox">
      <div class="msg">
        <span>升级成功</span>
        <button @click="changeStyle()">确定</button>
      </div>
    </div>
    <tab-bar></tab-bar>
    <div class="alertmsg" v-show="show">
      <van-button type="info" @click="closemsg">出错！！！</van-button>
    </div>
  </div>
</template>

<script>
import navBar from "../../components/navBar";
import tabBar from "../../components/tabBar";
import * as mineApi from "../../axios/mine";

export default {
  name: "levelup",
  components: {
    navBar,
    tabBar,
  },
  data() {
    return {
        region_name: '',
        balance:'',
        levelList:[],
        difference:'',
        ProductActive:"",
        msgbox:'',
        show: false
    }
  },
  async created() {
    const res = await mineApi.getAccount();
    this.region_name = res.data.region_name;
    this.balance = res.data.balance
    const res2 = await mineApi.getLevelList();
    this.levelList = res2.data
  },
  mounted(){
    
  },
  methods: {
    closemsg(){
      this.show = false
    },
    changeProduct(event){
      this.ProductActive = event.target.value;
      if(this.ProductActive){
        this.$refs.default_op.style.display = 'none';
      }
    },
    async levelup(){
      if(this.ProductActive == 8000){
        const res = await mineApi.upgrade(2)
        this.$toast(res.msg)
        setTimeout(()=>
          this.$router.push({
            path: "/mine"
          }),1000)
        // if(res){this.msgbox = true;}
      }else if(this.ProductActive == 28000){
        const res = await mineApi.upgrade(3)
        this.$toast(res.msg)
        setTimeout(()=>
          this.$router.push({
            path: "/mine"
          }),1000)
        // if(res){this.msgbox = true;}
      }else{
        const res = await mineApi.upgrade(0)
        this.$toast(res.msg)
      }
    },
    changeStyle(){
      this.msgbox = false;
      // this.$router.push({path:'/mine'})
      setTimeout(()=>
        this.$router.push({path:'/mine'})
      , 1000)
    }
  }
}
</script>

<style lang="less" scoped>
    .current-box{
        font-size:14px;
        display:flex;
        justify-content:space-between;
        padding: 0 10px;
        margin-top:10px;  
    }
    .upbox{
      font-size:14px;
      text-align:center;
      margin-top:10px;
      padding:0 50px;
      div{
        border-bottom: 1px solid #000;
        display:flex;
        justify-content:space-around;
        select{
          width:50%;
          border:none;
          background:#fff;
          margin-bottom:1px;
        }
      }
      .price{
        margin-top:20px;
        .price_num{
          border: none !important;
        }
      }
      .en_btn{
        width:80%;
        padding:0.2rem 0.3rem;
        margin-top:0.5rem;
        background:#1989fa;
        border:1px solid #1989fa;
        border-radius:0.1rem;
        color:#fff;
      }
    }
   .body{
     position: relative;
      .msgbox{
        position: fixed;
        left: 0;
        top: 0;
        background:rgba(0,0,0,0.3);
        width: 100%;
        height: 500%;
        font-size: 20px;
        line-height: 100%;
        text-align: center;
      }
      .msg{
        width:4rem;
        height: 2rem;
        display: flex;
        flex-flow: column;
        border:1px solid #1989fa;
        background: #fff;
        padding: .2rem .3rem;
        border-radius: .1rem;
        position:absolute;
        top:8%;
        left: 20%;
        span{
          padding: 10px 0;
        }
        button{
          border:1px solid #1989fa;
          background: #1989fa;
          border-radius: .1rem;
          color: #fff;
          margin-top: .2rem;
          padding: .1rem .3rem;
          font-size: 16px;
        }
      }
   }
   .alertmsg{
      position: fixed;
      z-index: 200;
      width: 100%;
      height: 100%;
      padding: 2rem 0;
      background: rgba(0,0,0,0.3);
    }
    #reset /deep/ .van-ellipsis{
		color: #fff !important;
	}
</style>
