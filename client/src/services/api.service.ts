import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
});

const cancelToken = axios.CancelToken.source();

export { apiService, cancelToken };
