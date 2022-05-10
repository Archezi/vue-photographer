<template>
  <div class="cover" v-if="user">
    <img :src="product.imageUrl" alt="" />
    <div class="admin">
      <div>
        <h4>{{ product.name }}</h4>
        <p>{{ product.photos.length }} photos</p>
      </div>
      <button class="btn" @click="handleDelete">Delete collection</button>
      <add-image :product="product"></add-image>
    </div>
  </div>
  <div class="photo-library">
    <div class="single-image" v-for="prod in product.photos" :key="prod.id">
      <img loading="lazy" :src="prod.url" alt="" />
      <div v-if="user" @click="handleDeleteImage(prod.id)" class="delete-image">
        X
      </div>
    </div>
  </div>
</template>

<script>
import useDocuemnt from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import AddImage from '../../components/collections/AddImage.vue'
import getUser from '@/composables/getUser'
export default {
  components: { AddImage },
  props: ['id'],
  setup(props) {
    const { user } = getUser()
    const { error, document: product } = getDocument('products', props.id)
    const { deleteDocument, updateDoc } = useDocuemnt('products', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    // Delete all collection
    const handleDelete = async () => {
      let coverPhoto = product.value.filePath
      let photosCollection = product.value.photos
      await photosCollection.forEach((photo) => {
        deleteImage(photo.filePath)
      })
      await deleteDocument()
      await deleteImage(coverPhoto)
      router.push('/products')
    }

    // Delete single image
    const handleDeleteImage = async (id) => {
      const photos = product.value.photos.filter((photo) => photo.id !== id)
      const photo = product.value.photos.find((ph) => ph.id === id)
      await deleteImage(photo.filePath)
      await updateDoc({ photos })
    }

    return { error, product, handleDelete, handleDeleteImage, user }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  // height: calc(100vh - 80px);
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
}
.admin {
  padding: 2rem;
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  button {
    height: 50px;
    display: block;
    margin-left: auto;
  }
}
.photo-library {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 1rem;
}
.single-image {
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    overflow: hidden;
  }
}
</style>
