<template>
  <el-scrollbar class="vertical-menu">
    <el-menu collapse>
      <div>
        <div class="text-center pt-50 pl-25 pr-25">
          <el-image
            fit="contain"
            style="height: 50px"
            src="logo"
          />
        </div>
      </div>

      <!-- Collapse Places Card -->
      <el-menu-item @click="showPlaces = !showPlaces">
        <el-icon>
          <star />
        </el-icon>
        <template #title>
          Places
        </template>
      </el-menu-item>

      <!-- Add Places Card -->
      <el-menu-item @click="editedPlace = true">
        <el-icon>
          <plus />
        </el-icon>
        <template #title>
          Places
        </template>
      </el-menu-item>

      <el-menu-item @click="settingsModal = true">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>
          Settings
        </template>
      </el-menu-item>

      <el-menu-item
        v-for="(navMenuItem, index) in routes"
        :key="`router_link_${index}`"
      >
        <el-icon>
          <component :is="navMenuItem.icon" />
        </el-icon>
        <template #title>
          {{ navMenuItem.title }}
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import navMenuItems from "@/core/components/navigation/navMenuItems"
import useSettings from "@/composable/useSettings"
import useMapPlaces from "@/composable/useMapPlaces"

export default {
  name: "SidebarCompo",
  setup() {
    const { showPlaces, settingsModal } = useSettings()
    const { editedPlace } = useMapPlaces()

    return {
      showPlaces,
      editedPlace,
      settingsModal
    }
  },
  data: () => ({
    routes: navMenuItems
  })
}
</script>

<style scoped>
  .vertical-menu .el-menu {
    height: 100vh !important;
  }
</style>
