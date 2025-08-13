import axiosClient from "./axiosClient";

export default {
  getAll(params = {}) {
    return axiosClient.get("/products", { params });
  },
  get(id) {
    return axiosClient.get(`/products/${id}`);
  },
  create(data, config = {}) {
    return axiosClient.post('/products', data, config);
  },
  update(id, data, config = {}) {
    return axiosClient.put(`/products/${id}`, data, config);
  },
  delete(id) {
    return axiosClient.delete(`/products/${id}`);
  }
};
