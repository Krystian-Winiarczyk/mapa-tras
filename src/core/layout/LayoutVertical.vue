<template>
  <el-container class="layout-vertical">
    <sidebar />

    <el-container>
      <el-main>
        <el-scrollbar>
          <div>
            <slot name="content" />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/core/components/navigation/Sidebar"
export default {
  name: "LayoutVertical",
  components: { Sidebar }
}
</script>

<style lang="scss">
.layout-vertical {
  .el-menu {
    padding: 0 10px;
    border-right: none;
  }
  .el-aside {
    overflow: visible !important;
  }
  .el-main {
    padding: 0;
  }
  .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  & > .el-aside .el-scrollbar {
    box-shadow: 0 0 15px 0 rgba(34, 41, 47, 0.075);
  }
  .el-menu--collapse {
    .el-menu-tooltip__trigger {
      padding: 0 11px !important;
    }
  }

  .el-menu-item {
    border-radius: 10px;
    margin-top: 5px;
    transition: all .5s;

    &:hover {
      padding-left: 25px !important;
    }
  }
}
</style>
