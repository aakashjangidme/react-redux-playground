import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios"
import logger from "../../utils/logger"

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const onRequest = (config: AdaptAxiosRequestConfig) => {
  logger.log(`[request] [${JSON.stringify(config, null, 2)}]`)
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  logger.error(`[request error] [${JSON.stringify(error, null, 2)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  logger.log(`[response] [${JSON.stringify(response, null, 2)}]`)
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  logger.error(`[response error] [${JSON.stringify(error, null, 2)}]`)
  return Promise.reject(error)
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
