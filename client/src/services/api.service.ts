import axios from "axios";

const apiService = axios.create({
  baseURL: "http://98.80.9.71:3000",
});

const cancelToken = axios.CancelToken.source();

export { apiService, cancelToken };
