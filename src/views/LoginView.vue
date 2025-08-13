<template>
  <div class="login-page">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import axios from "../api/axiosClient";

export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("/login", {
          email: this.email,
          password: this.password
        });

        localStorage.setItem("token", res.data.access_token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;

        this.$router.push("/");
      } catch (err) {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    }
  }
};
</script>
