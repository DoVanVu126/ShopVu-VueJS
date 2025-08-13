import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";

import ProductAddView from "../views/ProductAddView.vue";
import ProductEditView from "../views/ProductEditView.vue";

import CategoryAddView from "../views/CategoryAddView.vue";
import CategoryEditView from "../views/CategoryEditView.vue";

import LoginView from "../views/LoginView.vue";

const routes = [
  { path: "/login", name: "login", component: LoginView },

  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },

  { path: "/products", name: "products", component: ProductsView, meta: { requiresAuth: true } },
  { path: "/products/add", name: "product-add", component: ProductAddView, meta: { requiresAuth: true } },
  { path: "/products/edit/:id", name: "product-edit", component: ProductEditView, props: true, meta: { requiresAuth: true } },
  { path: "/products/:id", name: "product-detail", component: () => import("../views/ProductDetailView.vue"), props: true, meta: { requiresAuth: true } },

  { path: "/categories", name: "categories", component: CategoriesView, meta: { requiresAuth: true } },
  { path: "/categories/add", name: "category-add", component: CategoryAddView, meta: { requiresAuth: true } },
  { path: "/categories/edit/:id", name: "category-edit", component: CategoryEditView, props: true, meta: { requiresAuth: true } },

  { path: "/cart", name: "cart", component: CartView, meta: { requiresAuth: true } },
  { path: "/checkout", name: "checkout", component: CheckoutView, meta: { requiresAuth: true } },

  { path: "/search", name: "search", component: () => import("../views/SearchView.vue"), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
