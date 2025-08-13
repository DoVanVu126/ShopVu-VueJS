<template>
  <div>
    <h2>Thêm danh mục</h2>
    <form @submit.prevent="save">
      <input v-model="name" placeholder="Tên danh mục" required />
      <textarea v-model="description" placeholder="Mô tả" required></textarea>
      <button type="submit">Lưu</button>
    </form>
  </div>
</template>

<script>
import categoryApi from "@/apis/categoryApi";
export default {
  data() {
    return {
      name: "",
      description: ""
    };
  },
  methods: {
    async save() {
      await categoryApi.create({ name: this.name, description: this.description });
      this.$router.push({ name: "categories" });
    }
  }
};
</script>
