<template>
  <div class="form-container">
    <h2>{{ category?.id ? 'Sửa' : 'Thêm' }} danh mục</h2>
    <form @submit.prevent="saveCategory">
      <div>
        <label>Tên danh mục</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>Mô tả</label>
        <textarea v-model="form.description" required></textarea>
      </div>
      <button type="submit">Lưu</button>
      <button type="button" @click="$emit('close')">Hủy</button>
    </form>
  </div>
</template>

<script>
import categoryApi from "@/apis/categoryApi";

export default {
  props: ["category"],
  data() {
    return {
      form: {
        name: "",
        description: ""
      }
    };
  },
  watch: {
    category: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val };
        }
      }
    }
  },
  methods: {
    async saveCategory() {
      if (this.category?.id) {
        await categoryApi.update(this.category.id, this.form);
      } else {
        await categoryApi.create(this.form);
      }
      this.$emit("saved");
      this.$emit("close");
    }
  }
};
</script>
