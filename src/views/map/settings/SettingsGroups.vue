<template>
  <div>
    <el-input
      v-model="group.name"
      placeholder="Group name"
      class="input-with-select"
    >
      <template #prepend>
        <div style="width: 160px; display: flex; align-items: center; align-content: center">
          <div style="min-width: 40px; position:relative;">
            <el-icon
              size="18"
              style="position: absolute; left: 0; top: 50%; transform: translate(-50%, -50%)"
            >
              <component :is="group.icon" />
            </el-icon>
          </div>
          <div>
            <el-select
              v-model="group.icon"
              filterable
            >
              <el-option
                v-for="icon in icons"
                :key="icon"
                :label="icon"
                :value="icon"
              >
                <el-icon><component :is="icon" /></el-icon> {{ icon }}
              </el-option>
            </el-select>
          </div>
        </div>
      </template>
      <template #append>
        <el-button @click="saveItem">
          <el-icon><plus /></el-icon>
        </el-button>
      </template>
    </el-input>

    <el-table
      :data="groups"
      style="width: 100%"
      height="250"
    >
      <el-table-column
        prop="icon"
        label="Icon"
        width="75"
      >
        <template #default="{ row }">
          <el-icon size="18">
            <component :is="row.icon" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
      />
      <el-table-column
        fixed="right"
        label="Action"
        width="150"
      >
        <template #default="{ row }">
          <el-button
            size="small"
            @click="deleteItem(row.id)"
          >
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import useSettings from "@/composable/useSettings"
  import { ref, inject } from "vue"
  import useNotification from "@/composable/useNotification"
  import { addDoc, collection, doc, setDoc, deleteDoc } from "firebase/firestore"
  import { store } from "@/libs/firebase"
  import useAuth from "@/composable/useAuth"

  const icons = inject('icons')

  const defaultGroup = {
    icon: 'House',
    name: ''
  }
  const group = ref({ ...defaultGroup })

  const { groups } = useSettings()
  const { currentUser } = useAuth()
  const { success, error } = useNotification()

  const saveItem = async () => {
    try {
      const id = group.value?.id
      if (id) {
        delete group.value.id
        await setDoc(doc(store, 'users', currentUser.value.uid, 'groups', id), group.value)
      } else {
        const newDocRef = await addDoc(collection(store, 'users', currentUser.value.uid, 'groups'), group.value)
      }

      success('Successfully saved!')
    } catch (err) {
      error(err?.message || "Unknown error", "Error")
    } finally {
      group.value = { ...defaultGroup }
    }
  }

  const deleteItem = async id => {
    try {
      const docRef = await deleteDoc(doc(store, 'users', currentUser.value.uid, 'groups', id))

      success('Successfully saved!')
    } catch (err) {
      error(err?.message || "Unknown error", "Error")
    }
  }
</script>

<style scoped>

</style>
