import axiosClient from "./axiosClient";
export default {
  create(payload) { return axiosClient.post("/orders", payload); },
  list() { return axiosClient.get("/orders"); },
  show(id) { return axiosClient.get(`/orders/${id}`); }
};
