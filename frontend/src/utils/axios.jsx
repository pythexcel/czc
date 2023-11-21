import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://116.202.210.102:8002/",
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("auth_token");
    console.log(token,'=================>tok')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (e) => {
    return Promise.reject(e);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      return err;
    }
  }
);
export default axiosInstance;