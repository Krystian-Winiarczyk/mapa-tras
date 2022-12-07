<template>
  <div style="position: relative; height: 100vh">
    <el-collapse-transition>
      <card-glass
        v-show="showPlaces"
        style="position: absolute; height: 95vh; width: 400px; z-index: 999; right: 20px; top: 2.5vh"
      >
        <template #content>
          <place-list />
        </template>
      </card-glass>
    </el-collapse-transition>

    <!-- Place Edit Modal -->
    <place-edit-modal />
    <!-- Settings Modal -->
    <settings-modal />
    <!-- Filters -->
    <teleport to=".map-filters">
      <place-list-filters />
    </teleport>

    <l-map
      :zoom="zoom"
      :center="currentPoint"
      max-zoom="18"
      min-zoom="2"
      @update:center="updateCenterPoint"
    >
      <l-tile-layer
        :url="mapUrl"
      />

      <!--   Center Point Marker   -->
      <l-marker
        :lat-lng="currentPoint"
      >
        <l-icon>
          <div
            class="custom-pin home-pin"
            :style="{ '--color': 'white' }"
          >
            <el-icon size="17">
              <home-filled />
            </el-icon>
          </div>
        </l-icon>
      </l-marker>

      <l-marker
        v-for="place in items"
        :key="`marker_${place.id}`"
        :lat-lng="place.geolocation"
      >
        <l-icon>
          <div
            class="custom-pin home-pin"
            :style="{ '--color': place.visited ? '#67C23A' : '#F56C6C' }"
          >
            <el-icon size="17">
              <component :is="place.group.icon" />
            </el-icon>
          </div>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet"
import CardGlass from "@/core/components/cards/CardGlass"
import useMap from "@/composable/useMap"
import useMapPlaces from "@/composable/useMapPlaces"
import useSettings from "@/composable/useSettings"
import PlaceList from "@/views/map/PlaceList"
import PlaceEditModal from "@/views/map/PlaceEditModal"
import SettingsModal from "@/views/map/settings/SettingsModal"
import PlaceListFilters from "@/views/map/PlaceListFilters"

export default {
  /* eslint-disable */
  name: "Map",
  components: {
    PlaceListFilters,
    SettingsModal,
    PlaceEditModal,
    PlaceList,
    CardGlass,
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },

  setup() {
    const { currentPoint, zoom } = useMap(true)
    const { items } = useMapPlaces()
    const { showPlaces } = useSettings()

    const updateCenterPoint = event => {
      currentPoint.value = [event?.lat, event?.lng]
    }

    return {
      ...useMap(),
      items,
      showPlaces,
      currentPoint,
      zoom,

      updateCenterPoint
    }
  },
  data () {
    return {
      markerLatLng: [51.504, -0.159]
    }
  }
}
</script>


<style lang="scss">
.custom-pin {
    position: relative;
    border-radius: 50% 50% 50% 0;
    border: 2px solid var(--color);
    width: 24px;
    height: 24px;
    transform: rotate(-45deg) translate(16px, -35px);

    &.home-pin {
      & i {
        position: absolute;
        transform: translate(-50%, -50%) rotate(45deg);
        top: 50%;
        left: 50%;
      }
    }

    &:not(.home-pin)::after {
      position: absolute;
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--color);
    }
  }
</style>
