<template>
  <!--  Filter  -->
  <li class="el-menu-item">
    <div class="el-menu-tooltip__trigger el-tooltip__trigger el-tooltip__trigger">
      <el-popover
        placement="right"
        :width="400"
        trigger="click"
      >
        <template #reference>
          <el-badge
            :value="activeFilters"
            type="primary"
          >
            <el-icon><Filter /></el-icon>
          </el-badge>
        </template>
        <!-- Filters-->
        <el-form
          ref="ruleFormRef"
          :model="filters"
          label-width="120px"
          class="demo-ruleForm"
          size="default"
          status-icon
          label-position="left"
        >
          <!-- Group -->
          <el-form-item
            label="Group"
            prop="group"
          >
            <div style="width: 100%; display: flex; align-items: center">
              <div style="margin-right: 5px">
                <el-button
                  disabled
                  size="small"
                >
                  <el-icon
                    v-if="filters.group"
                    size="16"
                  >
                    <component :is="filters.group.icon" />
                  </el-icon>
                  <span v-else>-</span>
                </el-button>
              </div>
              <el-select
                v-model="filters.group"
                size="small"
                filterable
                style="width: 100%"
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
            </div>
          </el-form-item>
          <!-- Visited -->
          <el-row>
            <el-col :span="12">
              <div>Favourite</div>
              <el-button-group>
                <el-button
                  type="primary"
                  v-bind="{ plain: filters.isFavourite || filters.isNotFavourite }"
                  @click="changeFavFilter()"
                >
                  All
                </el-button>
                <el-button
                  type="primary"
                  v-bind="{ plain: !filters.isFavourite }"
                  @click="changeFavFilter(false, true)"
                >
                  <el-icon><star /></el-icon>
                </el-button>
                <el-button
                  type="primary"
                  v-bind="{ plain: !filters.isNotFavourite }"
                  @click="changeFavFilter(true, false)"
                >
                  <el-icon><star-filled /></el-icon>
                </el-button>
              </el-button-group>
            </el-col>
            <el-col :span="12">
              <div>Visited</div>
              <el-button-group>
                <el-button
                  type="primary"
                  v-bind="{ plain: filters.isVisited || filters.isNotVisited }"
                  @click="changeVisitedFilter()"
                >
                  All
                </el-button>
                <el-button
                  type="primary"
                  v-bind="{ plain: !filters.isVisited }"
                  @click="changeVisitedFilter(false, true)"
                >
                  <el-icon><check /></el-icon>
                </el-button>
                <el-button
                  type="primary"
                  v-bind="{ plain: !filters.isNotVisited }"
                  @click="changeVisitedFilter(true, false)"
                >
                  <el-icon><close /></el-icon>
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-form></el-popover>
    </div>
  </li>

  <!--  Filter::END  -->
</template>

<script setup>
import { computed, reactive, watch } from "vue"
import useSettings from "@/composable/useSettings"
import useMapPlaces from "@/composable/useMapPlaces"

const { groups } = useSettings()
const { getData } = useMapPlaces()

const filters = reactive({
  group: null,
  isVisited: false,
  isNotVisited: false,
  isFavourite: false,
  isNotFavourite: false
})

const activeFilters = computed(() => {
  return Object.entries(filters).filter(entry => entry[1]).length
})

const changeFavFilter = (notFav = false, fav = false) => {
  filters.isFavourite = fav
  filters.isNotFavourite = notFav
}

const changeVisitedFilter = (notVisited = false, visited = false) => {
  filters.isVisited = visited
  filters.isNotVisited = notVisited
}

watch(filters, (newValue, oldValue) => {
  if (oldValue && newValue) {
    getData(newValue)
  }
})

</script>

<style scoped>

</style>
