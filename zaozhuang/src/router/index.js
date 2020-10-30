import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/Home/home'
import declaration from '@/view/Home/declaration'
import cashTransfer from '@/view/Home/cashTransfer'
import cashReplacement from '@/view/Home/cashReplacement'
import merchants from '@/view/Home/merchants'
import code from '@/view/Home/code'
import pay from '@/view/Home/pay'
import collectionList from '@/view/Home/collectionList'
import network from '@/view/Home/network'
import cashReplacementList from '@/view/property/cashReplacementList'
import cashRepayment from '@/view/property/cashRepayment'
import login from '@/view/Login/login'
import register from '@/view/Login/register'
import firstLogin from '@/view/Login/firstLogin'
import setting from '@/view/Login/setting'
import registerSuccess from '@/view/Login/registerSuccess'
import forgetPassword from '@/view/Login/forgetPassword'
import property from '@/view/property/property'
import buyGold from '@/view/property/buyGold'
import financial from '@/view/property/financial'
import moneyList from '@/view/property/moneyList'
import reward from '@/view/property/reward'
import scoreTransfer from '@/view/property/scoreTransfer'
import usdtTransfer from '@/view/property/usdtTransfer'
import store from '@/view/store/store'
import sort from '@/view/store/sort'
import onSale from '@/view/store/onSale'
import order from '@/view/store/order'
import orderPay from '@/view/store/orderPay'
import myOrder from '@/view/store/myOrder'
import adressList from '@/view/store/adressList'
import orderDetail from '@/view/store/orderDetail'
import goodsDetail from '@/view/store/goodsDetail'
import activityDetail from '@/view/store/activityDetail'
import addAdress from '@/view/store/addAdress'
import mine from '@/view/my/mine'
import list from '@/view/my/list'
import share from '@/view/my/share'
import team from '@/view/my/team'
import alipay from '@/view/my/alipay'
import wechat from '@/view/my/wechat'
import bank from '@/view/my/bank'
import withdrawal from '@/view/my/withdrawal'
import safe from '@/view/my/safe'
import service from '@/view/my/service'
import become from '@/view/my/become'
import levelup from "@/view/my/levelup"
import beService from "@/view/my/beService"
import serviceLevel from "@/view/my/serviceLevel"
import demo from "@/view/Login/demo"
Vue.use(Router)


export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: registerSuccess
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/declaration',
      name: 'declaration',
      component: declaration
    },
    {
      path: '/cashTransfer',
      name: 'cashTransfer',
      component: cashTransfer
    },
    {
      path: '/cashReplacement',
      name: 'cashReplacement',
      component: cashReplacement
    },
    {
      path: '/cashReplacementList',
      name: 'cashReplacementList',
      component: cashReplacementList
    },
    {
      path: '/cashRepayment',
      name: 'cashRepayment',
      component: cashRepayment
    },
    {
      path: '/property',
      name: 'property',
      component: property
    },
    {
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/buyGold',
      name: 'buyGold',
      component: buyGold
    },
    {
      path: '/financial',
      name: 'financial',
      component: financial
    },
    {
      path: '/moneyList',
      name: 'moneyList',
      component: moneyList
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/team',
      name: 'team',
      component: team
    },
    {
      path: '/alipay',
      name: 'appalipayly',
      component: alipay
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: wechat
    },
    {
      path: '/bank',
      name: 'bank',
      component: bank
    },
    {
      path: '/safe',
      name: 'safe',
      component: safe
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: withdrawal
    },
    {
      path: '/network',
      name: 'network',
      component: network
    },
    {
      path: '/firstLogin',
      name: 'firstLogin',
      component: firstLogin
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/reward',
      name: 'reward',
      component: reward
    },
    {
      path: '/sort',
      name: 'sort',
      component: sort
    },
    {
      path: '/onSale',
      name: 'onSale',
      component: onSale
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component: orderPay
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/adressList',
      name: 'adressList',
      component: adressList
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      component: activityDetail
    },
    {
      path: '/addAdress',
      name: 'addAdress',
      component: addAdress
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/become',
      name: 'become',
      component: become
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: merchants
    },
    {
      path: '/code',
      name: 'code',
      component: code
    },
    {
      path: '/collectionList',
      name: 'collectionList',
      component: collectionList
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/scoreTransfer',
      name: 'scoreTransfer',
      component: scoreTransfer
    },
    {
      path: '/usdtTransfer',
      name: 'usdtTransfer',
      component: usdtTransfer
    },
    {
      path: '/levelup',
      name: 'levelup',
      component: levelup
    },
    {
      path: '/beService',
      name: 'beService',
      component: beService
    },
    {
      path:'/serviceLevel',
      name:'serviceLevel',
      component: serviceLevel
    },
    
  ]
})
