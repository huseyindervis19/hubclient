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

//
// Request Interceptor (Optional)
//
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

//
// Response Interceptor
//
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Axios setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
