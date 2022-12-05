<!-- eslint-disable -->
<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      :auto-upload="false"
      drag
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <div>
        <el-icon><plus /></el-icon>
        <div class="el-upload__text">
          Drop file here <br>or <em>click to upload</em>
        </div>
      </div>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="dialogImageUrl"
        alt="Preview Image"
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from 'firebase/storage'
import { storage } from '@/libs/firebase'

const fileList = ref([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const uploadFile = file => new Promise((resolve, reject) => {
  const uploaderRef = storageRef(storage, `trips/${Date.now()}_${file.name}`)
  const uploadRef = uploadBytesResumable(uploaderRef, file.raw)

  uploadRef.on('state_changed', snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    fileList.value[file.index].percentage = progress
    console.log(fileList.value[file.index])
  }, error => {
    console.log('Error: ', error)
    reject()
  }, async () => {
    const fileUrl = await getDownloadURL(uploadRef.snapshot.ref)
    resolve(fileUrl)
  })
})

const uploadFiles = async () => {
  const newFiles = fileList.value.map((file, index) => ({ ...file, index })).filter(file => file?.raw)
  const urls = await Promise.all(newFiles.map(file => uploadFile(file)))

  return urls
}

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = uploadFile => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

defineExpose({
  uploadFiles
})
</script>

<style lang="scss">
.el-upload-dragger {
  padding: unset !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
