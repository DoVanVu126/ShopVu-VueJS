// src/apis/categoryApi.js
import axiosClient from "./axiosClient";

export default {
  getAll(params = {}) {
    return axiosClient.get("/categories", { params });
  },
  get(id) {
    return axiosClient.get(`/categories/${id}`);
  },
  create(data) {
    return axiosClient.post("/categories", data);
  },
  update(id, data) {
    return axiosClient.put(`/categories/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/categories/${id}`);
  },
};
