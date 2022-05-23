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
      <product-add-image :product="product" :mode="1"></product-add-image>
    </div>
  </div>

  <!-- <div class="container">
    <div v-if="!product.photos.length" class="empty-list">
      <h4>No products in this collection</h4>
    </div>
    <div v-if="product.photos.length" class="photo-library" name="list">
      <div class="single-image" v-for="prod in product.photos" :key="prod.id">
        <img :src="prod.url" :alt="prod.title" />
        <div
          v-if="user"
          @click="handleDeleteImage(prod.id)"
          class="delete-image"
        >
          X
        </div>
      </div>
    </div>
  </div> -->
  <div class="slider-content">
    <SwiperComponent :slider="product" :numberOfSlides="1" />
  </div>
</template>

<script>
import useDocuemnt from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import ProductAddImage from '../../components/product/ProductAddImage.vue'
import getUser from '@/composables/getUser'
// swiper
import SwiperComponent from '../../components/swiper/SwiperComponent.vue'
export default {
  components: { ProductAddImage, SwiperComponent },
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
.photo-library {
  display: colums;
  columns: 3;
  column-gap: 1rem;
  gap: 1rem;
}
.single-image {
  overflow: hidden;
  list-style: none;
  position: relative;
  margin-bottom: 1rem;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
  .delete-image {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--warning);
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }
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
.btn-hide-admin {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 2rem;
}
</style>
