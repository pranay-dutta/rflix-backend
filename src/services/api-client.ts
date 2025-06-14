import axios, { AxiosRequestConfig } from "axios";
import FetchResponse from "@/interfaces/FetchResponse";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  params: {
    api_key: process.env.TMDB_API,
  },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };
  getAll = async (params?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, params)
      .then((res) => res.data);
  };
}

export default ApiClient;
