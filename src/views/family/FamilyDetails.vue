<template>
  <div>
    <UtilityBar
      @create-collection="addNew = !addNew"
      @delete-collection="coniframtion"
      :collection="collectionName"
      :deleteCollection="deleteCollection"
    />
    <div class="container">
      <FamiliesAddImageComponent v-if="addNew" :product="product" />
    </div>
    <div class="product-details__empty-container" v-if="!product.photos.length">
      <h3>No images yet</h3>
      <button @click="addNew = !addNew">Add new image</button>
    </div>
    <div v-if="product.photos.length" class="slider-content">
      <SwiperComponent :slider="product.photos" :numberOfSlides="1" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocuemnt from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import { ref } from 'vue'
// components
import FamiliesAddImageComponent from '../../components/collections/families/FamiliesAddImageComponent.vue'
// swiper
import SwiperComponent from '../../components/swiper/SwiperComponent.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: { FamiliesAddImageComponent, SwiperComponent, UtilityBar },
  props: ['id'],
  setup(props) {
    const { user } = getUser()
    const { error, document: product } = getDocument('families', props.id)
    const { deleteDocument, updateDoc } = useDocuemnt('families', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()
    const collectionName = ref('Families Collection')
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
      router.push('/families')
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
      coniframtion,
      collectionName,
      addNew,
      deleteCollection
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
.dropdown {
  height: 0;
}
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
