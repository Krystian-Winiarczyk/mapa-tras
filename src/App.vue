<template>
  <div class="dark">
    <layout />
  </div>
</template>

<script>
import Layout from "@/core/layout/Layout"
import { useDark } from "@vueuse/core"
import useAuth from "@/composable/useAuth"
import { provide } from "vue"
import useSettings from "@/composable/useSettings"

export default {
  components: { Layout },
  setup() {
    useDark()
    useAuth(true)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');

:root {
--el-aside-width: 225px;
}

* {
font-family: 'Roboto', sans-serif;
}

body, html, .el-container {
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
