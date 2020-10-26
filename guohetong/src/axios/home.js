import http from "../utils/http";
import { createFormData } from "../utils/form";

//banner
export async function banner() {
  const formData = createFormData({
  });
  return await http.post("/api/Page/banner", formData);
}
//获取广告信息
export async function publicNoticeLatest() {
  const formData = createFormData({
  });
  return await http.post("/api/Page/publicNoticeLatest", formData);
}
//获取公告列表
export async function publicNoticeList() {
  const formData = createFormData({
  });
  return await http.post("/api/Page/publicNoticeList", formData);
}
//公告详情
export async function publicNoticeInfo(id) {
  const formData = createFormData({
    id
  });
  return await http.post("/api/Page/publicNoticeInfo", formData);
}
//获取推荐商品列表
export async function getRecommendGoodsList(page,limit) {
  const formData = createFormData({
    page,
    limit
  });
  return await http.post("/api/User/getRecommendGoodsList", formData);
}
//获取PIGE价格
export async function getPIGEPrice() {
  const formData = createFormData({
  });
  return await http.post("/api/Index/getPIGEPrice", formData);
}
//获取走势图数据
// export async function getPictureConfig() {
//   const formData = createFormData({
//   });
//   return await http.post("/api/Index/getPictureConfig", formData);
// }

//获取接点关系网
export async function getMyDirectReports(id) {
  const formData = createFormData({
    id
  });
  return await http.post("/api/User/getMyDirectReports", formData);
}
//返回上一级
export async function getReturnDirectReports(id) {
  const formData = createFormData({
    id
  });
  return await http.post("/api/User/getReturnDirectReports", formData);
}
//获取我的收款记录
export async function transferList(page,limit) {
  const formData = createFormData({
    page,limit
  });
  return await http.post("/api/Transferorder/transferList", formData);
}
//付款
export async function transfer(merchant_id,number,pay_password) {
  const formData = createFormData({
    merchant_id,number,pay_password
  });
  return await http.post("/api/Transferorder/transfer", formData);
}
