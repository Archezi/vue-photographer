<template>
  <div>
    <UtilityBar
      @add-new="addNew = !addNew"
      @delete-collection="coniframtion"
      :collection="collectionName"
      :deleteCollection="deleteCollection"
      :product="product"
    />
    <div class="container">
      <ProductAddImageComponent
        v-if="addNew"
        :product="product"
        :collection="'portraits'"
      />
    </div>
    <div class="product-details__empty-container" v-if="!product.photos.length">
      <h3>No images yet</h3>
      <button @click="addNew = !addNew">Add new image</button>
    </div>
    <div v-if="product.photos.length" class="slider-content">
      <SwiperDetailsComponent
        v-if="store.state.sliderView"
        :slider="product.photos"
        :numberOfSlides="1"
      />
      <div v-if="store.state.gridView" class="grid-view__container container">
        <grid-view
          :images="product.photos"
          :collectionName="'portraits'"
          :id="id"
          @delete-single-image="handleDeleteImage(product.photos.id)"
        ></grid-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Firebase
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocuemnt from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
// components
import ProductAddImageComponent from '../../components/product/ProductAddImageComponent.vue'
import GridView from '../../components/UI/GridView.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'

// swiper
import SwiperDetailsComponent from '../../components/swiper/SwiperDetailsComponent.vue'
export default {
  components: {
    ProductAddImageComponent,
    SwiperDetailsComponent,
    UtilityBar,
    GridView
  },
  props: ['id'],
  setup(props) {
    const { user } = getUser()
    const { error, document: product } = getDocument('portraits', props.id)
    const { deleteDocument, updateDoc } = useDocuemnt('portraits', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()
    const store = useStore()
    const collectionName = ref('Commercial Collection')
    const addNew = ref(false)
    const deleteCollection = ref(true)
    // Delete all collection
    const coniframtion = () => {
      if (window.confirm('Are you sure you want to delete this collection?')) {
        handleDelete()
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
      router.push({ name: 'Products' })
    }

    // Delete single image
    const handleDeleteImage = async (id) => {
      const photos = product.value.photos.filter((photo) => photo.id !== id)
      const photo = product.value.photos.find((ph) => ph.id === id)
      await deleteImage(photo.filePath)
      await updateDoc({ photos })
    }

    return {
      store,
      user,
      error,
      addNew,
      product,
      coniframtion,
      handleDelete,
      collectionName,
      deleteCollection,
      handleDeleteImage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/pagesDetailsViews.scss';

.product-details__empty-container {
  min-height: calc(var(--content) - 34px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  h3 {
    font-size: 1.5rem;
    font-weight: 300;
  }
}
</style>
