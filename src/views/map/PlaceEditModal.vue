<script setup>
  import useMapPlaces from "@/composable/useMapPlaces"
  import { reactive, ref, watch, inject } from "vue"
  import useMap from "@/composable/useMap"
  import DragDropUploader from "@/views/utils/DragDropUploader"
  import useSettings from "@/composable/useSettings"

  const { isPlaceEdited, editedPlace, updatePlace } = useMapPlaces()
  const { getCurrentPoint, currentPoint } = useMap()
  const { groups } = useSettings()

  const icons = inject('icons')

  const uploader = ref(null)
  const rules = reactive({
    name: [
      { required: true, message: 'Please input name', trigger: 'blur' }
    ],
    description: [
      { required: true, message: 'Please input activity form', trigger: 'blur' }
    ]
  })

  const defaultPlace = {
    name: '',
    geolocation: getCurrentPoint,
    description: '',
    visited: false,
    favourite: false,
    images: [],
    group: null
  }
  const itemData = ref({})

  watch(editedPlace, newValue => {
    console.log(getCurrentPoint)
    if (newValue === true) Object.assign(itemData.value, { ...defaultPlace, geolocation: getCurrentPoint })
    else Object.assign(itemData.value, { ...newValue })
  })

  const checkPlace = () => {
    currentPoint.value = itemData.value.geolocation
  }

  const save = async () => {
    itemData.value.images = await uploader.value.uploadFiles()

    await updatePlace(itemData.value)
  }
</script>

<template>
  <el-drawer
    v-if="isPlaceEdited"
    :model-value="isPlaceEdited"
    direction="rtl"
    @closed="editedPlace = null"
  >
    <template #title>
      <h4>{{ itemData?.id ? 'Edit place' : 'Add new place' }}</h4>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="itemData"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
        label-position="top"
      >
        <el-form-item
          label="Place name"
          prop="name"
        >
          <el-input v-model="itemData.name" />
        </el-form-item>
        <el-form-item
          label="Description"
          prop="description"
        >
          <el-input
            v-model="itemData.description"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="Group"
          prop="group"
        >
          <el-select
            v-model="itemData.group"
            filterable
          >
            <el-option
              v-for="group in groups"
              :key="group.id"
              :label="group.name"
              :value="group"
            >
              <el-icon><component :is="group.icon" /></el-icon> {{ group.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Geolocation"
          prop="geolocation"
        >
          <el-row
            :gutter="10"
            style="width: 100%"
          >
            <el-col :span="11">
              <el-input
                v-model="itemData.geolocation[0]"
                label="Latitude"
                placeholder="Latitude"
              />
            </el-col>
            <el-col :span="11">
              <el-input
                v-model="itemData.geolocation[1]"
                label="Longitude"
                placeholder="Longitude"
              />
            </el-col>
            <el-col :span="2">
              <el-button
                icon
                @click="checkPlace"
              >
                <el-icon><MapLocation /></el-icon>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <drag-drop-uploader ref="uploader" />
      </el-form>
    </template>
    <template #footer>
      <div>
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
