<template>
  <div class="body">
    <nav-bar title="申请升级为加盟店"></nav-bar>
    <div class="middle">
    <div class="current-box">
        <div class="cur-level">应支付升级费用：{{this.balance}}</div>
    </div>
    <div class="upbox">
      <span>银行卡:</span>
      <span>{{this.bankcard}}（国和堂）</span>
    </div>
    <div class="paywaybox">
        <div>
          <div class="payway">
            支付宝
          </div>
          <div class="mailadd">
            {{this.alipay_account}}
          </div>
        </div>
        <div class="imgbox">
          <div class="payimg">
            <img :src="alipay_image" alt="">
          </div>
          <!-- <div class="clickbtn">点击放大</div> -->
        </div>
      </div>

      <div class="paywaybox">
        <div>
          <div class="payway">
            微信
          </div>
          <div class="mailadd">
            {{this.wechat_account}}
          </div>
        </div>
        <div class="imgbox">
          <div class="payimg">
            <img :src="wechat_image" alt="">
          </div>
          <!-- <div class="clickbtn">点击放大</div> -->
        </div>
      </div>

      <div class="uploadingbox">
        <span>上传支付凭证</span>
        <van-form @submit="onSubmit">
        <van-field name = "uploader" label="文件上传" @change="onSubmit">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
          <van-button class="upload_btn" round block type="info" native-type="submit">
        确认上传
      </van-button>
        </van-form>
        <!-- <div class="nonebox">
          +
          <input class="img_btn" type="file" name="image" id="id" @change="shangc($event)" accept="image/jpg, image/jpeg, image/png">
        </div> -->
      </div>
      <button class="en_btn" @click="upgradeService()">确认申请</button>
    </div>
    <div class="msgbox" v-show = "msgbox">
      <div class="msg">
        <span>申请成功</span>
        <button @click="changeStyle()">确定</button>
      </div>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
import navBar from "../../components/navBar";
import tabBar from "../../components/tabBar";
import * as mineApi from "../../axios/mine";
import * as assetsApi from "../../axios/assets"

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
        msgbox:false,
        card_number:'',
        alipay_account:'',
        alipay_image:'',
        wechat_image:'',
        wechat_account:'',
        inputval:'',
        picPath:'',
        bankcard:'',
        uploader: [],
        code:'',
        state:''
    }
  },
  async created() {
    const res = await mineApi.getAccount();
    this.balance = res.data.balance
    this.bankcard = res.data.card_number
    const res2 = await assetsApi.getRechargeConfig();
    this.card_number = res2.data.card_number
    this.alipay_account = res2.data.alipay_account
    this.alipay_image = res2.data.alipay_image
    this.wechat_image = res2.data.wechat_image
    this.wechat_account = res2.data.wechat_account
  },
  mounted(){
    
  },
  methods: {
    async onSubmit(values){
      if(this.uploader.length !=0 ){
        for(let i = 0 ; i < this.uploader.length; i++){
          const res = await mineApi.upload(values.uploader[i].file)
          this.code = res.code
          this.$toast(res.msg)
        }
      }
    },
    changeStyle(){
      this.msgbox = false;
      setTimeout(()=>{
        this.$router.push({path:'/mine'})
      }, 1000)
    },
    changeProduct(event){
      this.ProductActive = event.target.value;
      if(this.ProductActive){
        this.$refs.default_op.style.display = 'none';
      }
    },
    async upgradeService(images){
      const res = await assetsApi.upgradeService(this.inputval, this.file)
      this.$toast(res.msg)
      setTimeout(()=>{
        this.$router.push({path:'/mine'})
      },1000)
    },
    async upload(e){
　　　　let inputDOM = this.$refs.inputer;
　　　　this.file = inputDOM.files[0];// 通过DOM取文件数据
　　　　let size = Math.floor(this.file.size / 1024);//计算文件的大小　
　　　　this.formData=new FormData();//new一个formData事件
　　　　this.formData.append("file",this.file); //将file属性添加到formData里
　　　　//此时formData就是我们要向后台传的参数了
     const res = await mineApi.upload(e)
     
    },
    shangc(e) {
      let files = document.getElementById("id").files[0];
      //转码base64
      let reader = new FileReader();
      let imgFile;
      reader.readAsDataURL(files);
      reader.onload =  e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        // arr[1] 就是图片的 Base64编码字符串
        
     	//这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
        this.picPath='data:image/png;base64,'+arr[1]
        
      };
    }
  },
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
      font-size:14px !important;
      text-align:center;
      margin-top:10px;
      padding:0 .1rem;
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
          input{
            border: none ;
          }
        }
      }
      
    }
   .body{
     display: flex;
     flex-flow: column;
     justify-content: flex-start;
     width: 100%;
     height: 100%;
     overflow-y: auto;
     overflow-x: hidden;

     .middle{
       flex: 1;
       height: 100%;
       overflow: auto;
       padding-bottom: 1.5rem;
     }
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
  .paywaybox{
      font-size: 16px;
      text-align: left;
      justify-content: flex-start;
      padding: .2rem .3rem;
      .payway{
        background: #1989fa;
        border-radius: .1rem;
        padding: .1rem .2rem;
        color: #fff;
      }
      .mailadd{
        margin: 0.2rem 0;
      }
      .imgbox{
        display: flex;
        position: relative;
        .payimg{
          flex: 0.4;
          img{
              width: 30%;
              min-width:1.8rem ;
              height: 30%;
              min-height:1.8rem;
            }
          
        }
        .clickbtn{
          position: absolute;
          bottom: 0;
          left: 3rem;
          line-height: 1.6;
        }
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
        font-size: 0.32rem;
      }
      .uploadingbox{
      text-align: left;
      font-size: 16px;
      span{
        display: block;
        width: 100%;
        font-size: 0.32rem;
        text-align: left;
        background: #1989fa;
        color: #fff;
        padding: .2rem .3rem;

      }
      .uploading{
        border: 1px solid #1989fa;
        width: 3rem;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        font-size: 3rem !important;
        margin: .3rem 0 0 .3rem;
      }
    }
    .nonebox{
      width: 4rem;
      height: 4rem;
      color: #B0C4DE;
      position: relative;
      text-align: center;
      line-height: 4rem;
      font-size: 1.6rem;
      margin: 0.2rem;
      font-weight: 100;
      border: 1px solid  #1989fa;
      .img_btn{
        width: 4rem;
        height: 4rem;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0px;
        z-index: 200;
        opacity:0;
      }
    }

    .upload_btn{
      width: 35%;
      text-align: center;
      margin-left: 33%;
    }
</style>
