<template>
  <div class="home">
    <swiper
      :slidesPerView="slidePerView"
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
      <swiper-slide v-for="(slide, index) in homeList" :key="index">
        <router-link to="./navigation">
          <!-- <img :src="slide.img" alt="" /> -->
          <img :src="require(`@/assets/mainPage/${slide.img}`)" />
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { reactive } from 'vue'
// Import Swiper Vue.js components
import { Swiper } from 'swiper/vue/swiper'
import { SwiperSlide } from 'swiper/vue/swiper-slide'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/modules/navigation/navigation'
// import required modules
import { Navigation } from 'swiper'
// import collection
import getCollection from '@/composables/getCollection'
import { ref } from 'vue'
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const { error, documents: products } = getCollection('products')
    const homeList = reactive([
      {
        img: 'img1.jpg'
      },
      {
        img: 'img2.jpg'
      },
      {
        img: 'img3.jpg'
      },
      {
        img: 'img4.jpg'
      },
      {
        img: 'img5.jpg'
      },
      {
        img: 'img6.jpg'
      },
      {
        img: 'img7.jpg'
      }
    ])
    let intFrameWidth = window.innerWidth
    const slidePerView = ref(intFrameWidth > 992 ? '1.5' : '1')

    return {
      modules: [Navigation],
      error,
      products,
      homeList,
      slidePerView
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 12.66fr 1fr;
  grid-template-areas: 'A B C';
  position: relative;

  position: relative;
  background: #f8f8f8;
}
.mySwiper {
  grid-area: B;
  height: var(--swiper-height);
}
.swiper {
  width: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
}
.swiper-slide a {
  width: 100%;
}
.swiper-slide img {
  opacity: 0.8;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
}
.swiper-slide-active img {
  opacity: 1;
}
</style>
