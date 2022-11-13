<template>
  <div class="card-glass">
    <div style="padding: 10px">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGlass"
}
</script>

<style scoped>
  .card-glass {
    background: rgba(88, 84, 84, 0.3);
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.38);
  }
</style>
