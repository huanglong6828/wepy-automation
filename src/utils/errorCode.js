/**
 * 返回错误代码公共处理方法
 * @author godqian
 * @date 2017/9/27
 */
import Tips from './Tips';

export function errorCodeHandler(errorcode, message) {
  switch (errorcode) {
  case 13001:
    Tips.alert('注册时未填写公司信息！');
    break;
  case 31001:
    Tips.alert('公司待审核！');
    break;
  case 13004:
    Tips.alert('公司待审核！');
    break;
  case 13005:
    Tips.alert('公司待审核！');
    break;
    //登录超时errorCodeHandler
  case 12009:
    Tips.alert(message);
    wx.navigateTo({
      url: '/pages/login/index'
    });
    break;
  case 3008:
    Tips.alert(message);
    wx.navigateTo({
      url: '/pages/login/index'
    });
    break;
  default:
    if (message) {
      Tips.alert(message);
    }
  }
}