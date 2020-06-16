import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  // todo
  xhr(config)
}
/**
 * 处理config参数
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}
/**
 * 处理url
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
/**
 * 处理data
 * @param config
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
export default axios
