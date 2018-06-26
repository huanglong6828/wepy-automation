import fly from '@/utils/http'
import qs from 'qs'

const config = {
  proxy: 'base' // 接口种类
};

export async function requestLogin(params) {
  return await fly.post('/login', qs.stringify(params), config)
}