<template>
  <div class="product-detail-view">
    <button class="product-detail-view__btn" @click="$router.push({ name: 'home' })">Quay lại trang chủ</button>

    <div class="product-detail-view__content">
      <img 
        :src="imageUrl(product.img_url)" 
        alt="Ảnh sản phẩm" 
        class="product-detail-view__image" 
      />
      <div class="product-detail-view__info">
        <h2 class="product-detail-view__title">{{ product.name }}</h2>

        <h3 class="product-detail-view__subtitle">Mô tả</h3>
        <p class="product-detail-view__text">{{ product.description || "Chưa có mô tả" }}</p>

        <h3 class="product-detail-view__subtitle">Thông tin</h3>
        <p class="product-detail-view__text"><strong>Giá:</strong> {{ formatPrice(product.price) }}₫</p>
        <p class="product-detail-view__text"><strong>Số lượng trong kho:</strong> {{ product.quantity }}</p>
        <p class="product-detail-view__text"><strong>Danh mục:</strong> {{ product.category?.name || "Không rõ" }}</p>
        <p class="product-detail-view__text"><strong>Thương hiệu:</strong> {{ product.brand?.name || "Không rõ" }}</p>

        <!-- Nút thêm vào giỏ hàng -->
        <button 
          class="product-detail-view__add-cart-btn"
          @click="addToCart"
          :disabled="product.quantity === 0"
          :title="product.quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import '../styles/ProductDetailView.css';
export default {
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  async created() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}/api/products/${this.id}`);
      if (!res.ok) throw new Error('Không tải được dữ liệu sản phẩm');
      this.product = await res.json();
    } catch (error) {
      alert(error.message);
      this.$router.push({ name: 'products' });
    }
  },
  methods: {
    imageUrl(img) {
      return img && img.startsWith('http') ? img : `${import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}/${(img || '').replace(/^\/+/, '')}`;
    },
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    addToCart() {
      // Bạn có thể sửa đoạn này tùy vào cách bạn quản lý giỏ hàng
      // Ví dụ: phát sự kiện hoặc gọi store để thêm sản phẩm
      alert(`Thêm sản phẩm "${this.product.name}" vào giỏ hàng!`);
      // Ví dụ phát event:
      // this.$emit('add-to-cart', this.product);
    }
  }
};
</script>