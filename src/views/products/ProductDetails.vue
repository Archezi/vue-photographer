<template>
  <div class="wrapper" v-if="user">
    <div class="container">
      <div class="collection-name-panel">
        <span class="collection-name"
          >Current collection Name:
          <h4 class="">{{ product.name }}</h4></span
        >
        <button class="btn btn-delete" @click="coniframtion">
          Delete collection
        </button>
      </div>
      <add-image :product="product"></add-image>
    </div>
  </div>

  <div class="">
    <TransitionGroup tag="div" class="photo-library" name="list">
      <li class="single-image" v-for="prod in product.photos" :key="prod.id">
        <img :src="prod.url" :alt="prod.title" />
        <div
          v-if="user"
          @click="handleDeleteImage(prod.id)"
          class="delete-image"
        >
          X
        </div>
      </li>
    </TransitionGroup>
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
    const coniframtion = () => {
      if (window.confirm('Are you sure you want to delete this collection?')) {
        handleDelete()
        console.log('delete')
        router.push({ name: 'Products' })
      }
    }
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

    return {
      error,
      product,
      handleDelete,
      handleDeleteImage,
      user,
      coniframtion
    }
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
  list-style: none;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    overflow: hidden;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-1fr);
}
.list-move {
  transition: all 0.5s ease;
}
.photo-count {
  font-size: 0.8rem;
  font-weight: 200;
  margin-top: 1rem;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  span {
    border: 0.5px solid #ccc;
    border-radius: 0.5rem;
    padding: 0rem 0.4rem;
    background: rgb(237, 237, 237);
  }
}
.collection-name-panel {
  display: flex;
  justify-content: space-between;
}
.collection-name {
  display: flex;
  align-items: flex-end;
  font-weight: 300;
  h4 {
    margin-left: 1rem;
  }
}
</style>
