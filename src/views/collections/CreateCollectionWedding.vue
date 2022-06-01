<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Add new collection</h4>
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
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage('wedding')
    const { addDoc, error } = useCollection('wedding')
    const { user } = getUser()
    const collectionName = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value, collectionName.value)
        await addDoc({
          name: collectionName.value,
          userId: user.value.uid,
          imageUrl: url.value,
          filePath: filePath.value,
          photos: [],
          createdAt: timestamp()
        })
        if (!error.value) {
          console.log('playlist added')
        }
      }
    }

    // allowed file types
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
button {
  margin-top: 1.25rem;
}
</style>
