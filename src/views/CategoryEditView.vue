<template>
  <div>
    <h2>Sửa danh mục</h2>
    <form @submit.prevent="save">
      <input v-model="name" placeholder="Tên danh mục" required />
      <textarea v-model="description" placeholder="Mô tả" required></textarea>
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script>
import categoryApi from "@/apis/categoryApi";
export default {
  props: ["id"],
  data() {
    return {
      name: "",
      description: ""
    };
  },
  async mounted() {
    const res = await categoryApi.get(this.id);
    this.name = res.data.name;
    this.description = res.data.description;
  },
  methods: {
    async save() {
      await categoryApi.update(this.id, { name: this.name, description: this.description });
      this.$router.push({ name: "categories" });
    }
  }
};
</script>
