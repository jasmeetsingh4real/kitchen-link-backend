import axios, { AxiosRequestConfig, Method } from "axios";
import { encryptForServer } from "../helpers/encryptForServer";

const deliveryServerAxios = axios.create({
  baseURL: "http://localhost:5000",
});

export const deliveryProxy = async (
  method: Method,
  url: string,
  data: any,
  headers?: any
) => {
  let reqObj: AxiosRequestConfig = {
    method,
    url,
    data: {
      encryptedData: encryptForServer(data), //encrypt this
    },
    headers,
  };

  let deliveryProxyRequest;
  try {
    deliveryProxyRequest = await deliveryServerAxios(reqObj);
  } catch (error: any) {
    deliveryProxyRequest = error.message;
  }
  return deliveryProxyRequest;
};
