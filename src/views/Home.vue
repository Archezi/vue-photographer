<template>
  <div class="home">
    <swiper
      :slidesPerView="'1.7'"
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
      <swiper-slide v-for="(slide, index) in products" :key="index">
        <router-link :to="{ name: 'Products' }">
          <img :src="slide.imageUrl" alt="" />
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
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
    const s = ref(products)
    console.log(s)
    return {
      modules: [Navigation],
      error,
      products
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
  // height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
}
.swiper-slide a {
  width: 100%;
  // height: 100%;
}
.swiper-slide img {
  opacity: 0.8;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
  // filter: blur(2px);
}
.swiper-slide-active img {
  opacity: 1;
  // filter: blur(0px);
}
// .swiper-slide {
//   width: 60%;
// }

// .swiper-slide:nth-child(2n) {
//   width: 40%;
// }

// .swiper-slide:nth-child(3n) {
//   width: 20%;
// }
// .swiper-button-next {
//   height: 100% !important;
//   top: 46.5% !important;
//   transform: translateY(-50%);
// }
// .swiper-button-next:focus-visible {
//   outline: none;
// }
</style>
