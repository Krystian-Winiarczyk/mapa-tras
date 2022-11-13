<template>
  <el-drawer
    :model-value="true"
    direction="rtl"
  >
    <template #title>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        {{ itemData.name }}
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button
          type="primary"
          @click="save"
        >
          Save
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
  import useMapPlaces from "@/composable/useMapPlaces"
  import { ref, watch } from "vue"

  const defaultPlace = {
    name: '',
    geolocation: [],
    description: '',
    visited: false,
    favourite: false,
    images: []
  }
  const itemData = ref({})

  const { isPlaceEdited, editedPlace, save } = useMapPlaces()

  watch(editedPlace, newValue => {
    if (newValue === null) Object.assign(itemData.value, { ...defaultPlace })
    else Object.assign(itemData.value, { ...newValue })
  })
</script>

<style scoped>

</style>
