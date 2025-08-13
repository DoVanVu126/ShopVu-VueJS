<template>
  <div class="pv-container">
    <div class="pv-header">
      <h1>Danh sách sản phẩm</h1>
      <button class="pv-add-product-btn" @click="addProduct">Thêm sản phẩm</button>
    </div>
    <table class="pv-products-table" v-if="products.length">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Thương hiệu</th>
          <th>Danh mục</th>
          <th>Mô tả</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td class="pv-thumb-cell"><img :src="imageUrl(p.img_url)" alt /></td>
          <td>{{ p.name }}</td>
          <td>{{ p.brand?.name || 'N/A' }}</td>
          <td>{{ p.category?.name || 'N/A' }}</td>
          <td class="pv-desc">{{ p.description }}</td>
          <td class="pv-price">{{ formatPrice(p.price) }}₫</td>
          <td class="pv-quantity">{{ p.quantity || 0 }}</td>
          <td class="pv-actions">
            <button @click="editProduct(p)">Sửa</button>
            <button @click="deleteProduct(p)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Không có sản phẩm</div>
  </div>
</template>

<script>
import productApi from "../api/productApi";
import '../styles/ProductsView.css';  // import file css
export default {
  data() {
    return {
      products: []
    }
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const res = await productApi.getAll(this.$route.query);
      this.products = res.data || [];
    },
    formatPrice(v) {
      return new Intl.NumberFormat('vi-VN').format(v);
    },
    imageUrl(img) {
      return img && img.startsWith('http') ? img : `${import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}/${(img || '').replace(/^\/+/, '')}`;
    },
    addProduct() {
      // Ví dụ chuyển sang trang thêm sản phẩm mới
      this.$router.push({ name: "product-add" }); 
      // Hoặc mở modal thêm sản phẩm tùy UI bạn muốn
    },
    editProduct(product) {
      // Chuyển sang trang sửa sản phẩm, truyền id
      this.$router.push({ name: "product-edit", params: { id: product.id } });
      // Hoặc mở modal sửa sản phẩm
    },
    async deleteProduct(product) {
      if (!confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`)) return;
      try {
        await productApi.delete(product.id);
        alert("Xóa sản phẩm thành công");
        await this.loadProducts(); // Load lại danh sách sau khi xóa
      } catch (error) {
        alert("Xóa sản phẩm thất bại");
        console.error(error);
      }
    }
  }
};
</script>
