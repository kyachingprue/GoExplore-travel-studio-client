import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, 
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
