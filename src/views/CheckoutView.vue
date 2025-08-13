<template>
  <div class="co-container">
    <h1 class="co-title">Thanh toán</h1>
    <div v-if="!cart.length" class="co-empty">Giỏ hàng trống</div>
    <div v-else>
      <form @submit.prevent="submit" class="co-form">
        <div class="co-form-group">
          <label for="name">Họ tên</label>
          <input id="name" v-model="form.name" required class="co-input" />
        </div>
        <div class="co-form-group">
          <label for="address">Địa chỉ</label>
          <input id="address" v-model="form.address" required class="co-input" />
        </div>
        <div class="co-form-group">
          <label for="phone">Điện thoại</label>
          <input id="phone" v-model="form.phone" required class="co-input" />
        </div>
        <div class="co-form-group">
          <label for="note">Ghi chú</label>
          <textarea id="note" v-model="form.note" class="co-textarea"></textarea>
        </div>
        <div class="co-total">
          Tổng: <strong>{{ formatPrice(total) }}₫</strong>
        </div>
        <button type="submit" class="co-btn-submit">Đặt hàng</button>
      </form>
    </div>
  </div>
</template>

<script>
import '../styles/CheckoutView.css';  // import file css
import orderApi from "../api/orderApi";
export default {
  data() {
    return {
      cart: [],
      form: { name: "", address: "", phone: "", note: "" },
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (s, i) => s + i.product.price * i.quantity,
        0
      );
    },
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
  },
  methods: {
    formatPrice(v) {
      return new Intl.NumberFormat("vi-VN").format(v);
    },
    async submit() {
      if (!this.cart.length) return alert("Giỏ trống");
      const items = this.cart.map((i) => ({
        product_id: i.product_id,
        quantity: i.quantity,
        price: i.product.price,
      }));
      try {
        const payload = {
          shipping_address: this.form.address,
          phone: this.form.phone,
          items,
          total_price: this.total,
        };
        const res = await orderApi.create(payload);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("storage"));
        alert("Đặt hàng thành công! Mã đơn: " + (res.data.id || ""));
        this.$router.push({ name: "home" });
      } catch (e) {
        console.error(e);
        alert("Lỗi khi đặt hàng");
      }
    },
  },
};
</script>

