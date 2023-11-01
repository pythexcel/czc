import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://116.202.210.102:8002/api/",
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("auth_token");

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
  (res)=>{
    if(res.status===401){
      localStorage.clear()
      window.location.href= '/'
    }
    else{
      return res.data
    }
  }
)
export default axiosInstance;







