import axios from "axios";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const cancelToken = axios.CancelToken.source();

export { apiService, cancelToken };
