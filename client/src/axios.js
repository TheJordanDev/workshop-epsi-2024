import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://mindapi.thejordan.dev"
});
export default axiosInstance;
