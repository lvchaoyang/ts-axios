import { AxiosRequestConfig } from './types/index'

export default function shr(config: AxiosRequestConfig): void {
  // todo
  const { data = null, url, method = 'get' } = config
  console.log(data)
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
