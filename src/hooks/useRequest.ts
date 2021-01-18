import axios from "axios";
import * as qs from "qs";
import { useState, useMemo, useCallback } from "react";

const BASE_URL = "http://testapp.axreng.com:4567";
const CORS_HANDLER = "https://stormy-mesa-43703.herokuapp.com/";

export type HTTPMethod = "GET" | "POST";
const DEFAULT_HTTP_METHOD = "GET";

export type useRequestFn = <T = any>(
  endpoint: Endpoint,
  config?: RunRequestConfig
) => Promise<RequestResult<T>>;

export interface RunRequestConfig {
  method?: HTTPMethod;
  params?: any;
  useParamInline?: boolean;
  changeLoadingState?: boolean;
}

export interface RequestResult<T> {
  data?: T;
  error?: ErrorReason;
}

export interface Endpoint {
  service: string;
  request?: string;
  method?: HTTPMethod;
}

export interface ErrorReason {
  response: ErrorResponse;
}

export interface ErrorResponse {
  data?: ErrorResponseData;
  status: number;
}

export interface ErrorResponseData {
  [key: string]: string;
}

const DEFAULT_REQUEST_CONFIG: RunRequestConfig = {
  useParamInline: false,
  changeLoadingState: true,
};

const useRequest = function (): [useRequestFn, boolean] {
  const [amountLoading, setAmountLoading] = useState(0);

  const isLoading = useMemo(() => amountLoading !== 0, [amountLoading]);

  const axiosInstance = useMemo(
    () =>
      axios.create({
        headers: {
          "Content-Type": "application/json",
        },
        /* paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "comma" });
        }, */
      }),
    []
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  const runRequest = useCallback(
    async <T = any>(
      endpoint: Endpoint,
      config?: RunRequestConfig
    ): Promise<RequestResult<T>> => {
      config = { ...DEFAULT_REQUEST_CONFIG, ...config };

      if (config.changeLoadingState) {
        setAmountLoading((oldAmount) => oldAmount + 1);
      }

      let response;

      let parsedEndpoint: string;
      let choosenMethod: HTTPMethod;

      if (endpoint.method === "POST") {
        const { service, method } = endpoint;
        parsedEndpoint = `${BASE_URL}/${service}`;
        choosenMethod = method;
      } else {
        const { service, method } = endpoint;
        parsedEndpoint = `${BASE_URL}/${service}/${config.params.id}`;
        choosenMethod = config.method ?? method ?? DEFAULT_HTTP_METHOD;
      }

      try {
        response = await axiosInstance.request<T>({
          url: CORS_HANDLER + parsedEndpoint,
          method: choosenMethod,
          data:
            config.useParamInline || choosenMethod === "GET"
              ? undefined
              : config.params,
        });

        return {
          data: response.data,
        };
      } catch (e) {
        return {
          error: e as ErrorReason,
        };
      } finally {
        if (config.changeLoadingState) {
          setAmountLoading((oldAmount) => oldAmount - 1);
        }
      }
    },
    [axiosInstance]
  );

  return [runRequest, isLoading];
};

export default useRequest;
