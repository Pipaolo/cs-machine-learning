import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://139.162.42.10:5000/api/v1/",
});

export default axios;
