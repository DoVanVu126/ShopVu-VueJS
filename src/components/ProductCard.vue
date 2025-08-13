<template>
  <div class="pc-card">
    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="pc-link">
      <img :src="imageUrl(product.img_url)" alt="" class="pc-image" />
      <div class="pc-content">
        <h3 class="pc-name">{{ product.name }}</h3>
        <p class="pc-price">{{ formatPrice(product.price) }}₫</p>
        <p class="pc-quantity">Số lượng trong kho: {{ product.quantity }}</p>
      </div>
    </router-link>
    <button class="pc-add-btn" @click="$emit('add', product)">Thêm</button>
  </div>
</template>

<script>
import '../styles/ProductCard.css';  // import file css
export default {
  props: { product: { type: Object, required: true } },
  methods: {
    imageUrl(img) {
      return img && img.startsWith("http") 
        ? img 
        : `${import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}/${(img||'').replace(/^\/+/,'')}`;
    },
    formatPrice(v) {
      return new Intl.NumberFormat('vi-VN').format(v);
    }
  }
};
</script>
