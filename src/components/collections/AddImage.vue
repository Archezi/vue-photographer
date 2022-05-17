<template>
  <form @submit.prevent="handleSubmit">
    <input type="file" @change="handleChange" />
    <input type="text" placeholder="title" v-model="title" />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
export default {
  props: ['product'],
  setup(props) {
    const file = ref(null)
    const title = ref('')
    const selectedImage = ref(null)
    const fileError = ref(null)
    const { updateDoc } = useDocument('products', props.product.id)
    const { filePath, url, uploadImage } = useStorage(props.product.folderName)

    const types = ['image/png', 'image/jpeg']
    const handleChange = (e) => {
      let selected = e.target.files[0]
      console.log(selected)

      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }

    const handleSubmit = async () => {
      await uploadImage(file.value, props.product.name)
      const newPhoto = {
        title: title.value,
        id: Math.floor(Math.random() * 1000000),
        url: url.value,
        filePath: filePath.value
      }
      const res = await updateDoc({
        photos: [...props.product.photos, newPhoto]
      })
      title.value = ''
      file.value = null
      return res
    }

    return { handleChange, handleSubmit, fileError, title, file, selectedImage }
  }
}
</script>

<style lang="scss" scoped></style>
