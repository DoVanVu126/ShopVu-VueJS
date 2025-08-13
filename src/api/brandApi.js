import axiosClient from "./axiosClient";
export default {
  getAll() { return axiosClient.get("/brands"); }
};
