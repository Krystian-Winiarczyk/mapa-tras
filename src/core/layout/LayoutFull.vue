<template>
  <div class="layout-full">
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: "LayoutFull"
}
</script>

<style scoped>
.layout-full {
  height: 100vh;
  overflow: hidden;
}
</style>
