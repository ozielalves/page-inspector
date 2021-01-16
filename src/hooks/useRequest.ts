import axios from 'axios';
import * as qs from 'qs';
import { useState, useMemo, useCallback } from 'react';

const BASE_URL = 'http://testapp.axreng.com:4567'

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const DEFAULT_HTTP_METHOD = 'GET';

export type useRequestFn = <T = any>(
  endpoint: Endpoint | string,
  config?: RunRequestConfig
) => Promise<RequestResult<T>>;

export interface RunRequestConfig {
  method?: HTTPMethod;
  params?: object;
  useParamsAsQuery?: boolean;
  changeLoadingState?: boolean;
  getAll?: boolean;
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

export interface Paginated<T> {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  results: T[];
}

const DEFAULT_REQUEST_CONFIG: RunRequestConfig = {
  useParamsAsQuery: false,
  changeLoadingState: true,
  getAll: false,
};

const useRequest = function (): [useRequestFn, boolean] {
  const [amountLoading, setAmountLoading] = useState(0);

  const isLoading = useMemo(() => amountLoading !== 0, [amountLoading]);

  const axiosInstance = useMemo(
    () =>
      axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-br',
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'comma' });
        },
      }),
    []
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      /* if (error.response.status === 401) {
        AuthService.performLogout();
      } */

      throw error;
    }
  );

  const runRequest = useCallback(
    async <T = any>(
      endpoint: Endpoint | string,
      config?: RunRequestConfig
    ): Promise<RequestResult<T>> => {
      config = { ...DEFAULT_REQUEST_CONFIG, ...config };

      if (config.changeLoadingState) {
        setAmountLoading((oldAmount) => oldAmount + 1);
      }

      let response;

      let parsedEndpoint: string;
      let choosenMethod: HTTPMethod;

      if (typeof endpoint === 'string') {
        parsedEndpoint = endpoint;
        choosenMethod = config.method ?? DEFAULT_HTTP_METHOD;
      } else {
        const {
          service,
          request = '',
          method,
        } = endpoint;
        parsedEndpoint = `${BASE_URL}/${service}/${request}`;
        choosenMethod = config.method ?? method ?? DEFAULT_HTTP_METHOD;
      }

      /* if (!parsedEndpoint.endsWith('/') && !config.params) {
        parsedEndpoint = `${parsedEndpoint}/`;
      } */

      if (config.getAll === true) {
        let responseResultsList: any[] = Array<any>();
        let totalPages = 1;

        const newConfig = {
          ...config,
          params: { ...config?.params, page: 1 },
          getAll: false,
        };

        const response = ((await runRequest<T>(
          endpoint,
          newConfig
        )) as unknown) as RequestResult<Paginated<any>>;

        if (response.data) {
          totalPages = response.data?.total_pages;
          responseResultsList = [
            ...responseResultsList,
            ...response.data?.results,
          ];
        }

        await Promise.all(
          Array.from(Array(totalPages - 1).keys()).map(async (page) => {
            const reqConfig = {
              ...newConfig,
              params: { ...config?.params, page: page + 2 },
            };
            const response = ((await runRequest<T>(
              endpoint,
              reqConfig
            )) as unknown) as RequestResult<Paginated<any>>;

            if (response.data) {
              responseResultsList = [
                ...responseResultsList,
                ...response.data?.results,
              ];
            }
          })
        );
        const data = ({ results: responseResultsList } as unknown) as T;
        setAmountLoading((oldAmount) => oldAmount - 1);
        return { data };
      }

      try {
        response = await axiosInstance.request<T>({
          url: parsedEndpoint,
          method: choosenMethod,
          params:
            config.useParamsAsQuery || choosenMethod === 'GET'
              ? config.params
              : undefined,
          data:
            config.useParamsAsQuery || choosenMethod === 'GET'
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
