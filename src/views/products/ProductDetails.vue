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
      <product-add-image :product="product"></product-add-image>
    </div>
  </div>

  <div class="container">
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
  </div>
  <div class="slider-content">
    <swiper
      :slidesPerView="'2.2'"
      :centeredSlides="true"
      :spaceBetween="0"
      :loop="true"
      :navigation="true"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in product.photos" :key="index">
        <router-link :to="{ name: 'Products' }">
          <img :src="slide.url" alt="" />
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import useDocuemnt from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import ProductAddImage from '../../components/product/ProductAddImage.vue'
import getUser from '@/composables/getUser'

import { Swiper } from 'swiper/vue/swiper'
import { SwiperSlide } from 'swiper/vue/swiper-slide'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/modules/navigation/navigation'
// import required modules
import { Navigation } from 'swiper'
export default {
  components: { ProductAddImage, Swiper, SwiperSlide },
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
      coniframtion,
      modules: [Navigation]
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

.photo-library {
  display: colums;
  columns: 3;
  column-gap: 1rem;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr));
  gap: 1rem;
  // grid-template-rows: masonry;
  // align-tracks: end;
}
.single-image {
  overflow: hidden;
  list-style: none;
  position: relative;
  margin-bottom: 1rem;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
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
.btn-hide-admin {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 2rem;
}

// Slider
.slider-content {
  height: 911px;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide a {
  height: 100%;
  width: 100%;
}
.swiper-slide img {
  opacity: 0.8;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.5s ease-in-out;
  // filter: blur(2px);
}
.swiper-slide-active img {
  opacity: 1;
  // filter: blur(0px);
}
.swiper-slide {
  width: 60%;
}

.swiper-slide:nth-child(2n) {
  width: 40%;
}

.swiper-slide:nth-child(3n) {
  width: 20%;
}
.swiper-button-next {
  height: 100% !important;
  top: 46.5% !important;
  transform: translateY(-50%);
}
.swiper-button-next:focus-visible {
  outline: none;
}
</style>
