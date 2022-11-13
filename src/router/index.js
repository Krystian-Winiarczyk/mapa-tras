import { createRouter, createWebHashHistory } from "vue-router"
import LoginView from "../pages/Login.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      layout: "full"
    }
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../pages/Map.vue"),
    meta: {
      layout: "vertical"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
