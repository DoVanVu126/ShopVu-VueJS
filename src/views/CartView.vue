<template>
  <div class="cv-container">
    <h1 class="cv-title">Giỏ hàng</h1>

    <table class="cv-table" v-if="cart.length">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Tổng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it, idx) in cart" :key="it.id || idx">
          <td><img :src="imageUrl(it.product?.img_url)" alt class="cv-img" /></td>
          <td>{{ it.product?.name || '---' }}</td>
          <td>
            <input
              type="number"
              v-model.number="it.quantity"
              @change="saveItem(it)"
              min="1"
              class="cv-qty-input"
            />
          </td>
          <td>{{ formatPrice(it.product?.price || 0) }}₫</td>
          <td>{{ formatPrice((it.product?.price || 0) * (it.quantity || 0)) }}₫</td>
          <td>
            <button class="cv-btn-remove" @click="removeItem(it)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="cv-empty">Giỏ hàng trống</div>

    <div class="cv-footer" v-if="cart.length">
      <div>Tổng: <strong>{{ formatPrice(total) }}₫</strong></div>
      <router-link to="/checkout">
        <button class="cv-btn-checkout">Thanh toán</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import '../styles/CartView.css';
import axiosClient from "../api/axiosClient";

export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (s, i) => s + (i.product?.price || 0) * (i.quantity || 0),
        0
      );
    },
  },
  created() {
    this.loadCartFromApi();
    window.addEventListener("cart-updated", this.loadCartFromApi);
  },
  beforeUnmount() {
    window.removeEventListener("cart-updated", this.loadCartFromApi);
  },
  methods: {
    async loadCartFromApi() {
      try {
        const res = await axiosClient.get("/cart");
        this.cart = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        console.error("Không thể load cart từ API:", err);
        this.cart = [];
      }
    },
    imageUrl(img) {
      return img && img.startsWith("http")
        ? img
        : `${import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000"}/${(img || "").replace(/^\/+/, "")}`;
    },
    formatPrice(v) {
      return new Intl.NumberFormat("vi-VN").format(v);
    },
    async saveItem(item) {
      const qty = Math.max(1, parseInt(item.quantity) || 1);
      item.quantity = qty;
      try {
        const res = await axiosClient.put(`/cart/${item.id}`, { quantity: qty });
        Object.assign(item, res.data);
      } catch (err) {
        console.error("Lỗi cập nhật số lượng:", err);
        alert("Cập nhật thất bại. Vui lòng thử lại.");
      }
    },
    async removeItem(item) {
      try {
        await axiosClient.delete(`/cart/${item.id}`);
        this.loadCartFromApi();
        window.dispatchEvent(new Event("cart-updated"));
      } catch (err) {
        console.error("Lỗi xóa:", err);
        alert("Xóa thất bại");
      }
    },
  },
};
</script>
