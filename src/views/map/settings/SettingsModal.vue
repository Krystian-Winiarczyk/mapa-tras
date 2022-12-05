<template>
  <el-dialog
    v-model="settingsModal"
  >
    <template #header>
      This is a custom header!
    </template>

    <el-tabs
      v-model="activeTab"
      class="demo-tabs"
      style="padding: 0"
    >
      <el-tab-pane
        label="Groups"
        name="groups"
      >
        <settings-groups />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
  import SettingsGroups from "@/views/map/settings/SettingsGroups"

  import useSettings from "@/composable/useSettings"
  import { ref } from "vue"

  const { settingsModal } = useSettings()

  const activeTab = ref('groups')
</script>

<style lang="scss">
  .el-dialog__body {
    padding-top: 0;
  }
</style>
