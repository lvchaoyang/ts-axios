import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function shr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // todo
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()
    // 配置响应数据格式
    if (responseType) {
      request.responseType = responseType
    }
    // 配置超时时间
    if (timeout) {
      request.timeout = timeout
    }
    // 建立连接
    request.open(method.toUpperCase(), url, true)
    /** 监听请求状态变化 */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      // 处理响应头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 处理响应数据
      const responseData =
        responseType && responseType !== 'text' ? request.response : this.responseText
      // 组装响应返回值
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    /** 网络错误处理 */
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    /** 超时处理 */
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    /** 请求头处理 */
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'conetnt-type') {
        // data为空时，请求头设置content-type无意义
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request Failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
