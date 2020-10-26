import http from "../utils/http";
import { createFormData } from "../utils/form";


//我的
export async function getAccount() {
  const formData = createFormData({
  });
  return await http.post("/api/User/getAccount", formData);
}
//退出
export async function logout() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/logout", formData);
}
//申请成为报单中心
export async function applyService() {
  const formData = createFormData({
  });
  return await http.post("/api/User/applyService", formData);
}
//获取我的团队
export async function getMyTeamNew(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("api/User/getMyTeamNew", formData);
}
//提现地址
export async function modifyWithdrawInfo(bank_name, card_holder, card_number) {
  const formData = createFormData({
    bank_name, 
    card_holder, 
    card_number
  });
  return await http.post("/api/User/modifyWithdrawInfo", formData);
}

//上传文件
export async function upload(file) {
  const formData = createFormData({
    file
  });
  return await http.post("/api/common/upload", formData);
}
//报单记录
export async function orderList(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("/api/Order/orderList", formData);
}
//获取代理级别可升级级别数据
export async function getLevelList() {
  const formData = createFormData({
    
  });
  return await http.post("/api/User/getLevelList", formData);
}
//申请升级代理级别
export async function upgrade( level){
  const formData = createFormData({
    level 
  })
  return await http.post("/api/User/upgrade", formData)
}
//获取服务级别可升级级别数据
export async function getServiceLevelList(){
  const formData = createFormData({

  })
  return await http.post("/api/Index/getServiceLevelList", formData)
}
//获取平台微信客服账号
export async function getWXServiceConfig(level){
  const formData = createFormData({
    level
  })
  return await http.post("/api/Index/getWXServiceConfig", formData)
}