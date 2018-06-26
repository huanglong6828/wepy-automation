/**
 *  Created by huanglong 2018-06-19 .
 *  flyio处理拦截器 自动处理接口
 */

import Fly from 'flyio/dist/npm/wx' //npm引入方式
import { base, common, elevator, workorder, device, authcontract, contract, events } from '../api/staticEnv'
import Tips from './Tips';
import { errorCodeHandler } from './errorCode'
//创建fly实例
const fly = new Fly()

//配置请求baseURL
fly.config.baseURL = BASE_API

//添加请求拦截器
fly.interceptors.request.use((config) => {
  Tips.loading();
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  const token = wx.getStorageSync('token')
  if (token) {
    config.headers.tokenStr = token;
  }
  // 统一添加接口种类  "http://api.p1.ettda.com/api-login"
  switch (config.proxy) {
  case 'base':
    config.url = base + config.url;
    break;
  case 'common':
    config.url = common + config.url;
    break;
  case 'elevator':
    config.url = elevator + config.url;
    break;
  case 'workorder':
    config.url = workorder + config.url;
    break;
  case 'device':
    config.url = device + config.url;
    break;
  case 'authcontract':
    config.url = authcontract + config.url;
    break;
  case 'contract':
    config.url = contract + config.url;
    break;
  case 'events':
    config.url = events + config.url;
    break;
  default:
    break;
  }
  return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    Tips.loaded();
    //返回错误代码处理前端页面提示
    if (response.data.code != 0) {
      errorCodeHandler(response.data.code, response.data.message);
      return Promise.reject(response.data)
    }
    return response.data;
  },
  error => {
    if (error.response) {
      Tips.error('出错啦,请稍后再试！')
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  });


export default fly;