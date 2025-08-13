<template>
  <header class="svh-header">
    <div class="svh-container">
      <div class="svh-left">
        <router-link to="/" class="svh-logo">ShopVu</router-link>
      </div>

      <div class="svh-center">
        <input v-model="q" @keyup.enter="search" placeholder="Tìm kiếm sản phẩm..." />
      </div>

      <div class="svh-right">
        <router-link to="/cart" class="svh-cart-link">Giỏ ({{ cartCount }})</router-link>

        <!-- Dropdown quản lý -->
        <div class="svh-manage" @mouseenter="showManage = true" @mouseleave="showManage = false">
          <button class="svh-manage-btn">Quản lí ▾</button>
          <ul v-if="showManage" class="svh-manage-list">
            <li><router-link to="/products">Quản lí sản phẩm</router-link></li>
            <li><router-link to="/categories">Quản lí danh mục</router-link></li>
            <li><router-link to="/brands">Quản lí nhãn hiệu</router-link></li>
          </ul>
        </div>

        <span v-if="userName" class="svh-username">Xin chào, {{ userName }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import "../styles/Header.css";
import axios from "../api/axiosClient";

export default {
  name: "Header",
  data() {
    return { 
      q: "",
      userName: "",
      cartCount: 0,
      showManage: false
    };
  },
  methods: {
    search() {
      this.$router.push({ name: "search", query: { q: this.q } });
    },
    async getUser() {
      try {
        const res = await axios.get("/user");
        this.userName = res.data.name;
      } catch {
        this.userName = "";
      }
    },
    async loadCartCount() {
      try {
        const res = await axios.get("/cart");
        const cart = Array.isArray(res.data) ? res.data : [];
        this.cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);
      } catch {
        this.cartCount = 0;
      }
    }
  },
  mounted() {
    this.getUser();
    this.loadCartCount();
    window.addEventListener("cart-updated", this.loadCartCount);
  },
  beforeUnmount() {
    window.removeEventListener("cart-updated", this.loadCartCount);
  }
};
</script>
