<template>
  <div class="hp-container">
    <h1 class="hp-title">Trang chủ</h1>
    <section class="hp-featured-section">
      <h2 class="hp-section-title">Sản phẩm nổi bật</h2>
      <div class="hp-grid">
        <ProductCard
          v-for="p in products.slice(0,6)"
          :key="p.id"
          :product="p"
          @add="addToCart"
        />
      </div>
    </section>
  </div>
</template>

<script>
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard.vue";
import axiosClient from "../api/axiosClient";
import '../styles/HomeView.css';

export default {
  components: { ProductCard },
  data() {
    return { products: [] };
  },
  async created() {
    const res = await productApi.getAll();
    this.products = res.data || [];
  },
  methods: {
    // khi bấm Thêm
    async addToCart(product) {
      try {
        // thử gọi API lưu vào DB (yêu cầu token)
        await axiosClient.post("/cart", { product_id: product.id, quantity: 1 });

        // cập nhật localStorage để header / UI phản hồi ngay
        this.addLocalCart(product, 1);

        // báo và thông báo cho các component khác (CartView) reload
        window.dispatchEvent(new Event("cart-updated"));
        alert("Đã thêm vào giỏ hàng");
      } catch (err) {
        // nếu chưa login (401) hoặc lỗi khác -> fallback: lưu localStorage (guest)
        if (err.response && err.response.status === 401) {
          this.addLocalCart(product, 1);
          window.dispatchEvent(new Event("storage")); // để Header cập nhật
          alert("Bạn chưa đăng nhập — đã lưu tạm vào giỏ (đăng nhập sau để đồng bộ)");
        } else {
          console.error("Lỗi thêm giỏ hàng:", err);
          alert("Lỗi khi thêm giỏ hàng");
        }
      }
    },

    addLocalCart(prod, qty = 1) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const idx = cart.findIndex((i) => i.product_id === prod.id);
      if (idx > -1) cart[idx].quantity += qty;
      else cart.push({ product_id: prod.id, product: prod, quantity: qty });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    },
  },
};
</script>
