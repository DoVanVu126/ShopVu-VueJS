<template>
  <div class="sv-search-container">
    <h1>Kết quả tìm kiếm: "{{ query }}"</h1>

    <div v-if="loading" class="sv-loading">Đang tải...</div>
    <div v-else>
      <div v-if="products.length === 0" class="sv-no-result">Không tìm thấy sản phẩm nào.</div>
      
      <div class="sv-products-grid">
        <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
          @add="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      loading: false,
      query: "",
    };
  },
  watch: {
    // Watch query param thay đổi để tìm kiếm lại
    "$route.query.q": {
      immediate: true,
      handler(newVal) {
        this.query = newVal || "";
        this.searchProducts();
      },
    },
  },
  methods: {
    async searchProducts() {
      if (!this.query.trim()) {
        this.products = [];
        return;
      }
      this.loading = true;
      try {
        // Giả định API hỗ trợ tìm kiếm qua param q
        const res = await productApi.getAll({ q: this.query });
        this.products = res.data || [];
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const idx = cart.findIndex((i) => i.product_id === product.id);
      if (idx > -1) cart[idx].quantity++;
      else cart.push({ product_id: product.id, product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      alert("Đã thêm vào giỏ");
    },
  },
};
</script>

<style scoped>
.sv-search-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 12px;
}

.sv-loading {
  font-style: italic;
  color: #666;
}

.sv-no-result {
  font-style: italic;
  color: #999;
  margin-top: 20px;
}

.sv-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
</style>
