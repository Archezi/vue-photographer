<template>
  <div class="add-file-wrapper">
    <div class="image-preview">
      <img id="image-preview" />
    </div>
    <form @submit.prevent="handleSubmit">
      <h4>Add new Products collection</h4>
      <input type="text" placeholder="Title" v-model="collectionName" />

      <label for="">Choose image for the collection</label>
      <input type="file" @change="handleChange" />
      <div class="error" v-if="fileError">{{ fileError }}</div>

      <button>Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage('products')
    const { addDoc, error } = useCollection('products')
    const { user } = getUser()
    const collectionName = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const router = useRouter()

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value, collectionName.value)
        const res = await addDoc({
          folderName: 'products',
          name: collectionName.value,
          userId: user.value.uid,
          imageUrl: url.value,
          filePath: filePath.value,
          photos: [],
          createdAt: timestamp()
        })

        if (!error.value) {
          console.log('playlist added')
          router.push({ name: 'Product', params: { id: res.id } })
        }
      }
    }

    // allowed file types
    const types = ['image/png', 'image/jpeg']
    const handleChange = (e) => {
      let selected = e.target.files[0]
      console.log(selected)

      //image preview
      let output = document.getElementById('image-preview')
      output.src = URL.createObjectURL(e.target.files[0])
      output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
      }
      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }

    return {
      collectionName,
      handleSubmit,
      fileError,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.add-file-wrapper {
  margin-inline: auto;
  max-height: 500px;

  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.image-preview {
  height: 100%;
  width: 100%;
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
button {
  margin-top: 1.25rem;
}
</style>
