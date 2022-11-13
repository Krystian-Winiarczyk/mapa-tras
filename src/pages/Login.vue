<template>
  <div>
    <el-input
      v-model="email"
      placeholder="Please input"
    />
    <el-input
      v-model="password"
      placeholder="Please input"
    />

    <el-button @click="login(email, password)">
      Login
    </el-button>
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import useAuth from "@/composable/useAuth"

  const email = ref('test@wp.pl')
  const password = ref('test1234')

  const { login } = useAuth()
</script>

<style scoped></style>
