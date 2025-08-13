<template>
  <div class="pf-container">
    <h2>Thêm sản phẩm mới</h2>
    <form @submit.prevent="submitForm">
      <label class="pf-label">
        Tên sản phẩm:
        <input v-model="form.name" required class="pf-input" />
      </label>

      <label class="pf-label">
        Mô tả:
        <textarea v-model="form.description" class="pf-textarea"></textarea>
      </label>

      <label class="pf-label">
        Giá:
        <input type="number" v-model.number="form.price" required min="0" class="pf-input" />
      </label>

      <label class="pf-label">
        Số lượng:
        <input type="number" v-model.number="form.quantity" required min="0" class="pf-input" />
      </label>

      <label class="pf-label">
        Ảnh:
        <input type="file" @change="onFileChange" />
      </label>

      <label class="pf-label">
        Danh mục:
        <select v-model.number="form.category_id" required class="pf-input">
          <option disabled value="">Chọn danh mục</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </label>

      <label class="pf-label">
        Thương hiệu:
        <select v-model.number="form.brand_id" required class="pf-input">
          <option disabled value="">Chọn thương hiệu</option>
          <option v-for="br in brands" :key="br.id" :value="br.id">
            {{ br.name }}
          </option>
        </select>
      </label>

      <button type="submit" class="pf-button">Lưu</button>
      <button @click.prevent="cancel" class="pf-button">Hủy</button>
    </form>
  </div>
</template>

<script>
import productApi from "../api/productApi";
import categoryApi from "../api/categoryApi";
import brandApi from "../api/brandApi";
import '../styles/ProductAddView.css';

export default {
  data() {
    return {
      categories: [],
      brands: [],
      form: {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category_id: null,
        brand_id: null,
      },
      imgFile: null,
    };
  },
  async created() {
    try {
      const resCats = await categoryApi.getAll();
      this.categories = resCats.data;

      const resBrands = await brandApi.getAll();
      this.brands = resBrands.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh mục hoặc thương hiệu", error);
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) this.imgFile = file;
      else this.imgFile = null;
    },

    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('description', this.form.description);
        formData.append('price', this.form.price);
        formData.append('quantity', this.form.quantity);
        formData.append('category_id', this.form.category_id);
        formData.append('brand_id', this.form.brand_id);

        if (this.imgFile) {
          formData.append('img_file', this.imgFile);
        }

        await productApi.create(formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert("Thêm sản phẩm thành công!");
        this.$router.push({ name: "products" });
      } catch (error) {
        console.error("Lỗi API thêm sản phẩm:", error.response || error);
        alert("Lỗi khi thêm sản phẩm.");
      }
    },

    cancel() {
      this.$router.push({ name: "products" });
    }
  }
};
</script>
