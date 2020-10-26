import http from "../utils/http";
import { createFormData } from "../utils/form";

//充值金种子
export async function recharge(money,images) {
  const formData = createFormData({
    money, 
    images
  });
  return await http.post("/api/Recharge/recharge", formData);
}
//获取收款二维码
export async function getPayConfig() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/getPayConfig", formData);
}
//获取提现地址
export async function getWithdrawAddressInfo() {
  const formData = createFormData({
  });
  return await http.post("/api/Withdraw/getWithdrawAddressInfo", formData);
}
//获取提现参数
export async function getWithdrawConfig() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/getWithdrawConfig", formData);
}
//申请提现
export async function withdraw(money,pay_password) {
  const formData = createFormData({
    money,
    pay_password
  });
  return await http.post("/api/Withdraw/withdraw", formData);
}
//备用金互转
export async function transfer(number,mobile,pay_password) {
  const formData = createFormData({
    number,
    mobile,
    pay_password
  });
  return await http.post("/api/Transferorder/transfer", formData);
}
//备用金置换
export async function substitution(real_amount,pay_password) {
  const formData = createFormData({
    real_amount,
    pay_password
  });
  return await http.post("/api/Substitution/substitution", formData);
}
//备用金置换参数
export async function getSubstitutionConfig() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/getSubstitutionConfig", formData);
}
//备用金置换记录
export async function substitutionList(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("/api/Substitution/substitutionList", formData);
}
//备用金置换详情
export async function getSubstitutionInfo(id) {
  const formData = createFormData({
    id
  });
  return await http.post("/api/Substitution/getSubstitutionInfo", formData);
}
//还款申请
export async function repaySubstitution(id,image,pay_password) {
  const formData = createFormData({
    id,
    image,
    pay_password
  });
  return await http.post("/api/Substitution/repaySubstitution", formData);
}
//获取我的资金流水
export async function getList(page,limit,type) {
  const formData = createFormData({
    page,
    limit,
    type
  });
  return await http.post("/api/Money/getList", formData);
}
//获取报单参数
export async function getOrderConfig() {
  const formData = createFormData({});
  return await http.post("/api/Index/getOrderConfig", formData);
}
//获取报单参数
export async function applyOrder(seeds,score,mobile,pay_password) {
  const formData = createFormData({
    seeds,
    score,
    mobile,
    pay_password
  });
  return await http.post("/api/Order/applyOrder", formData);
}
//获取我的待发放业绩奖励
export async function getMyWaitRelease(page,limit) {
  const formData = createFormData({
   page,
   limit,
  });
  return await http.post("/api/User/getMyWaitRelease", formData);
}
// 2020.6.10
//获取我的待发放业绩奖励
export async function getPIGEList(page,limit) {
  const formData = createFormData({
   page,
   limit,
  });
  return await http.post("/api/Money/getPIGEList", formData);
}
//获取充值参数
export async function getRechargeConfig() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/getRechargeConfig", formData);
}

//申请升级服务级别
export async function upgradeService(images) {
  const formData = createFormData({
    images
  });
  return await http.post("/api/User/upgradeService", formData);
}

//申请服务中心/加盟店
export async function apply(type, images) {
  const formData = createFormData({
    type,
    images
  });
  return await http.post("/api/ApplyService/apply", formData);
}