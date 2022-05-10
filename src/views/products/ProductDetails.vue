<template>
  <div class="cover">
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
    <product-details-list :prodArray="product.photos"> </product-details-list>
  </div>
</template>

<script>
import useDocuemnt from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import AddImage from '../../components/collections/AddImage.vue'
import ProductDetailsList from '../../components/collections/product/ProductDetailsList.vue'
export default {
  components: { AddImage, ProductDetailsList },
  props: ['id'],
  setup(props) {
    const { error, document: product } = getDocument('products', props.id)
    const { deleteDocument } = useDocuemnt('products', props.id)
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

    return { error, product, handleDelete }
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
</style>
