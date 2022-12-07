import { createApp } from "vue"
import App from "./App.vue"

const app = createApp(App)

import "./registerServiceWorker"
import router from "./router"
import "leaflet/dist/leaflet.css"

// Libs
import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/dark/css-vars.css'
import "element-plus/dist/index.css"
import "./main.scss"

// Icons
import * as ElementPlusIcons from "@element-plus/icons-vue"

app.provide('icons', Object.entries(ElementPlusIcons).map(i => i[0]))
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}

app.use(ElementPlus).use(router).mount("#app")
