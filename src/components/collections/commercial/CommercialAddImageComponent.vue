<template>
  <div class="form-container">
    <div class="image-preview">
      <img id="image-preview" />
    </div>
    <div class="form-wrapper">
      <form @submit.prevent="handleSubmit">
        <div class="add-image-to">
          <span
            >Add new file to
            <h4>" {{ product.name }} "</h4>
            collection</span
          >
          <p class="photo-count">
            Number of photos: {{ product.photos.length }}
          </p>
        </div>

        <label for="">Choose image for this collection</label>
        <input type="text" placeholder="title" v-model="title" />
        <input class="input-file" type="file" @change="handleChange" />
        <div class="error" v-if="fileError">{{ fileError }}</div>
        <button class="create-btn">Add</button>
      </form>
    </div>
  </div>
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
    const { updateDoc } = useDocument('commercials', props.product.id)
    const { filePath, url, uploadImage } = useStorage(props.product.folderName)

    const types = ['image/png', 'image/jpeg']
    const handleChange = (e) => {
      let selected = e.target.files[0]
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
      let output = document.getElementById('image-preview')
      output.src = null
      return res
    }

    return { handleChange, handleSubmit, fileError, title, file, selectedImage }
  }
}
</script>

<style lang="scss" scoped>
.add-image-to span {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 20px;
}
.form-container {
  display: grid;
  padding: 1rem 0;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  box-sizing: content-box;
  height: 100%;
}

.image-preview {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-image: url(../../../assets/images/placeholder.png);
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 100%;
  max-height: 500px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
}
.create-btn {
  margin-top: auto;
}
</style>
