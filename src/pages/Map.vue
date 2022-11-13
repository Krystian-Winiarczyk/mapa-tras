<template>
  <div
    style="position: relative; height: 100vh"
  >
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

    <l-map
      :zoom="zoom"
      :center="currentPoint"
      max-zoom="18"
      min-zoom="2"
    >
      <l-tile-layer
        :url="mapUrl"
      />

      <l-marker
        v-for="place in places"
        :key="`marker_${place.id}`"
        :lat-lng="place.geolocation"
      />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import CardGlass from "@/core/components/cards/CardGlass"
import useMap from "@/composable/useMap"
import useMapPlaces from "@/composable/useMapPlaces"
import useSidebar from "@/composable/useSidebar"
import PlaceList from "@/views/map/PlaceList"

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Map",
  components: {
    PlaceList,
    CardGlass,
    LMap,
    LTileLayer,
    LMarker
  },
  setup() {
    const { places } = useMapPlaces()
    const { showPlaces } = useSidebar()

    return {
      ...useMap(),
      places,
      showPlaces
    }
  },
  data () {
    return {
      markerLatLng: [51.504, -0.159]
    }
  }
}
</script>
