import axios from "axios";
const Axios = axios.create({
  baseURL: "http://eshakti.ewtlive.in/dashboard/api",
});

export default Axios;
