<template>
  <div style="height: calc(95vh - 20px)">
    <el-scrollbar height="100%">
      <el-card
        v-for="place in items"
        :key="place.id"
        style="margin: 10px 0"
        :body-style="{ padding: '0px' }"
      >
        <div style="position:relative;">
          <el-image :src="place.images[0]" />
          <div style="position:absolute; bottom: 10px; left: 10px">
            <el-tooltip
              class="box-item"
              effect="light"
              :content="place.favourite ? 'Ulubione' : 'Dodaj do ulubionych'"
              placement="top"
            >
              <el-button
                type="success"
                circle
                size="large"
                @click="updatePlace({ ...place, favourite: !place.favourite })"
              >
                <el-icon size="18">
                  <component :is="place.favourite ? 'star-filled' : 'star'" />
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              :content="place.visited ? 'Odwiedzono' : 'Nie odwiedzono'"
              placement="top"
            >
              <el-button
                type="primary"
                circle
                size="large"
                @click="updatePlace({ ...place, visited: !place.visited })"
              >
                <el-icon size="18">
                  <component :is="place.visited ? 'check' : 'close'" />
                </el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>

        <template #header>
          <div class="card-header">
            <span>{{ place.name }}</span>
            <el-icon @click="editedPlace = place">
              <edit />
            </el-icon>
          </div>
        </template>

        <div style="padding: 14px">
          <span>{{ place.description }}</span>
        </div>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import useMapPlaces from "@/composable/useMapPlaces"

export default {
  name: "PlaceList",
  setup() {
    const { editedPlace, items, updatePlace } = useMapPlaces()

    return {
      editedPlace,
      items,
      updatePlace
    }
  }
}
</script>

<style scoped>

</style>
