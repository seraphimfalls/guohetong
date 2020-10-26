import http from "../utils/http";
import { createFormData } from "../utils/form";

//注册
export async function register(data) {
    const formData = createFormData(data);
    return await http.post("/api/User/register", formData);
  }
//发送验证码
export async function send(mobile,event) {
    const formData = createFormData({
      mobile,
      event
    });
    return await http.post("/api/Sms/send", formData);
  }
//登录
export async function login(account,password) {
    const formData = createFormData({
      account,
      password
    });
    return await http.post("/api/Index/login", formData);
  }
//忘记密码
export async function resetPassword(newpassword,mobile,captcha) {
    const formData = createFormData({
      newpassword,
      mobile,
      captcha
    });
    return await http.post("/api/Index/resetPassword", formData);
  }
//修改登录密码
export async function changepassword(oldpassword,password,re_password) {
    const formData = createFormData({
      oldpassword,
      password,
      re_password
    });
    return await http.post("/api/User/changepassword", formData);
  }
//重置支付密码
export async function resetPayPassword(newpassword,mobile,captcha) {
    const formData = createFormData({
      newpassword,
      mobile,
      captcha
    });
    return await http.post("/api/Index/resetPayPassword", formData);
  }
//首次登录完善信息
export async function improveInformation(password,pay_password,real_name,id_card) {
    const formData = createFormData({
      password,
      pay_password,
      real_name,
      id_card
    });
    return await http.post("/api/User/improveInformation", formData);
  }
//首次登录
export async function firstLogin(mobile,captcha) {
    const formData = createFormData({
      mobile,
      captcha
    });
    return await http.post("/api/Index/firstLogin", formData);
  }
