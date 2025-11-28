import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 10000,
};

const apiClient: AxiosInstance = axios.create(baseConfig);

apiClient.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 204) {
      return { ...response, data: {} };
    }
    if (response.data === null || response.data === undefined) {
      return { ...response, data: {} };
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });

      return Promise.reject({
        message: "API responded with an error.",
        status: error.response.status,
        data: error.response.data,
      });
    }

    if (error.request) {
      console.error("No Response from Server:", error.request);

      return Promise.reject({
        message: "No response received from server.",
        status: null,
        data: null,
      });
    }

    console.error("Axios Internal Error:", error.message);

    return Promise.reject({
      message: error.message || "Internal Axios error.",
      status: null,
      data: null,
    });
  }
);

export default apiClient;
