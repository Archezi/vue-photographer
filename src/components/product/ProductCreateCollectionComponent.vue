<template>
  <div class="container">
    <div class="wrapper">
      <h4 class="collection-name">Collection {{ collectionNameDisplay }}</h4>
      <div class="add-collection-container">
        <div class="image-preview">
          <img id="image-preview" />
        </div>
        <div class="form-wrapper">
          <form @submit.prevent="handleSubmit" class="add-collection-form">
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
export default {
  props: ['createCollectionName', 'pathName'],
  setup(props) {
    const { filePath, url, uploadImage } = useStorage(
      props.createCollectionName
    )
    const { addDoc, error } = useCollection(props.createCollectionName)
    const { user } = getUser()
    const collectionName = ref('')
    const file = ref(null)
    const fileError = ref(null)

    const ucfirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const collectionNameDisplay = ref(ucfirst(props.createCollectionName))

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value, collectionName.value)
        const res = await addDoc({
          folderName: props.createCollectionName,
          name: collectionName.value,
          userId: user.value.uid,
          imageUrl: url.value,
          filePath: filePath.value,
          photos: [],
          createdAt: timestamp()
        })

        if (!error.value) {
          console.log('playlist added')
          console.log(res)
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
      handleChange,
      collectionNameDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  max-height: 500px;
  background: #fff;
  border-radius: 5px;
  padding: 2rem 0;
  box-sizing: border-box;
}
h4.collection-name {
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 1rem;
}
.add-collection-container {
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 400px;
  max-height: 400px;
  gap: 1rem;
  box-sizing: content-box;
}
.add-collection-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  button.create-btn {
    margin-top: auto;
  }
}
.image-preview {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-image: url(../../assets/images/placeholder.png);
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.create-btn {
  // margin-top: 2rem;
}
.input-file {
  margin: 2rem 0;
}
</style>
