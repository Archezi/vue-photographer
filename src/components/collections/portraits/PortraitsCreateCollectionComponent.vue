<template>
  <div class="container">
    <div class="wrapper">
      <h4 class="collection-name">Collection Name</h4>
      <div class="form-container">
        <div class="image-preview">
          <img id="image-preview" />
        </div>
        <div class="form-wrapper">
          <form @submit.prevent="handleSubmit">
            <h4>Add new collection</h4>
            <input type="text" placeholder="Title" v-model="collectionName" />

            <label for="">Choose image for the collection</label>
            <input class="input-file" type="file" @change="handleChange" />
            <div class="error" v-if="fileError">{{ fileError }}</div>
            <button class="create-btn">Create</button>
          </form>
        </div>
      </div>
    </div>
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
    const { filePath, url, uploadImage } = useStorage('portraits')
    const { addDoc, error } = useCollection('portraits')
    const { user } = getUser()
    const collectionName = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const router = useRouter()

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value, collectionName.value)
        const res = await addDoc({
          folderName: 'portraits',
          name: collectionName.value,
          userId: user.value.uid,
          imageUrl: url.value,
          filePath: filePath.value,
          photos: [],
          createdAt: timestamp()
        })

        if (!error.value) {
          console.log('playlist added')
          router.push({ name: 'Portrait', params: { id: res.id } })
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
.wrapper {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  max-height: 500px;
  height: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 2rem 3.125rem;
  box-sizing: border-box;
}
h4.collection-name {
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 1rem;
}
.form-container {
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  box-sizing: content-box;
}
.image-preview {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-image: url(../../../assets/images/placeholder.png);
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 100%;
  max-height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.create-btn {
  // margin-top: 2rem;
}
.input-file {
  margin: 2rem 0;
}
</style>
