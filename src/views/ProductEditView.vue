<template>
  <div class="product-form">
    <h2>Sửa sản phẩm</h2>
    <form v-if="form" @submit.prevent="submitForm" enctype="multipart/form-data">
      <label>
        Tên sản phẩm:
        <input v-model="form.name" required />
      </label>

      <label>
        Mô tả:
        <textarea v-model="form.description"></textarea>
      </label>

      <label>
        Giá:
        <input type="number" v-model.number="form.price" required min="0" />
      </label>

      <label>
        Số lượng:
        <input type="number" v-model.number="form.quantity" required min="0" />
      </label>

      <label>
        Ảnh hiện tại:
        <img v-if="form.img_url" :src="form.img_url" alt="Ảnh sản phẩm" style="max-width: 200px; display: block; margin: 8px 0;" />
      </label>

      <label>
        Chọn ảnh mới (nếu muốn đổi):
        <input type="file" @change="onFileChange" />
      </label>

      <label>
        Danh mục (ID):
        <input type="number" v-model.number="form.category_id" required />
      </label>

      <label>
        Thương hiệu (ID):
        <input type="number" v-model.number="form.brand_id" required />
      </label>

      <button type="submit">Lưu</button>
      <button @click.prevent="cancel">Hủy</button>
    </form>
    <div v-else>Đang tải dữ liệu...</div>
  </div>
</template>

<script>
import productApi from "../api/productApi";

export default {
  props: ['id'],
  data() {
    return {
      form: null,
      imgFile: null,
    };
  },
  async created() {
    try {
      const res = await productApi.get(this.id);
      this.form = res.data;
    } catch (error) {
      alert("Lỗi tải dữ liệu sản phẩm.");
      this.$router.push({ name: "products" });
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.imgFile = file ? file : null;
    },
    async submitForm() {
      try {
        let res;
        if (this.imgFile) {
          // Nếu có ảnh mới, gửi FormData
          const formData = new FormData();
          formData.append('name', this.form.name);
          formData.append('description', this.form.description);
          formData.append('price', this.form.price);
          formData.append('quantity', this.form.quantity);
          formData.append('category_id', this.form.category_id);
          formData.append('brand_id', this.form.brand_id);
          formData.append('img_file', this.imgFile);

          res = await productApi.update(this.id, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          // Nếu không có ảnh mới, gửi JSON bình thường (giữ nguyên img_url)
          res = await productApi.update(this.id, this.form);
        }

        alert("Cập nhật sản phẩm thành công!");
        this.$router.push({ name: "products" });
      } catch (error) {
        alert("Lỗi khi cập nhật sản phẩm.");
        console.error(error);
      }
    },
    cancel() {
      this.$router.push({ name: "products" });
    }
  }
};
</script>
