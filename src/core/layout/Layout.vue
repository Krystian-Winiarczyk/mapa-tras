<template>
  <component
    :is="resolveLayoutTag"
    :class="resolveLayoutClasses"
  >
    <component :is="resolveLayoutType">
      <template #content>
        <router-view />
      </template>
    </component>
  </component>
</template>

<script>
import { computed } from "vue"
import { useRoute } from "vue-router"
import LayoutFull from "@/core/layout/LayoutFull"
import LayoutVertical from "@/core/layout/LayoutVertical"

export default {
  components: {
    "full-layout": LayoutFull,
    "vertical-layout": LayoutVertical
  },
  setup() {
    const route = useRoute()

    const resolveLayoutType = computed(() => {
      return route?.meta.layout === "full" ? "full-layout" : "vertical-layout"
    })

    const resolveLayoutClasses = computed(() => {
      return route?.meta.layout === "full" ? [] : ["layout-container"]
    })

    const resolveLayoutTag = computed(() => {
      return route?.meta.layout === "full" ? "div" : "el-container"
    })

    return {
      resolveLayoutType,
      resolveLayoutTag,
      resolveLayoutClasses
    }
  }
}
</script>

<style scoped></style>
