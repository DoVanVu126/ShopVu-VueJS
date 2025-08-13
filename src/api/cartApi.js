import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/carts"),
  getById: (id) => axiosClient.get(`/carts/${id}`),
};

export default productApi;
