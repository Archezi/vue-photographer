<template>
  <div class="home">
    <swiper
      :slidesPerView="slidePerView"
      :centeredSlides="true"
      :spaceBetween="140"
      :loop="false"
      :navigation="true"
      :virtualIndex="true"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in navigationList" :key="index">
        <router-link class="slide__link" :to="slide.path">
          <div class="slide__caption">
            <p>0{{ index + 1 }}</p>
            <h2>{{ slide.name }}</h2>
          </div>
          <img :src="require(`@/assets/navigation/${slide.image}`)" />
        </router-link>
      </swiper-slide>
    </swiper>
    <div class="slider__navigation">
      <router-link
        v-for="(nav, index) in navigationList"
        :key="nav.name"
        :to="nav.path"
        @click="navigationIconChange"
        class="slider__navigation-link"
        :class="{ active: index == navigationIndex }"
      >
        <div
          :class="{ active: index == navigationIndex }"
          class="navigation-text"
        >
          <p class="navigation__index">0{{ index + 1 }}</p>
          <h2>{{ nav.name }}</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { useStore } from 'vuex'
import { onMounted, onUnmounted } from 'vue'
import { Swiper } from 'swiper/vue/swiper'
import { SwiperSlide } from 'swiper/vue/swiper-slide'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/modules/navigation/navigation'
// import required modules
import { Navigation } from 'swiper'
// import collection
import getCollection from '@/composables/getCollection'
import { reactive, ref } from 'vue'
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    onMounted(() => {
      store.state.navOpen = true
    })
    onUnmounted(() => {
      store.state.navOpen = false
    })
    const navigationList = reactive([
      {
        name: 'Home',
        path: '/',
        image: 'home1.jpg'
      },
      {
        name: 'Products',
        path: '/products',
        image: 'products.jpg'
      },
      {
        name: 'Commercials',
        path: '/commercials',
        image: 'commercial.jpg'
      },
      {
        name: 'Family Photos',
        path: '/families',
        image: 'children.jpg'
      },
      {
        name: 'Portraits',
        path: '/portraits',
        image: 'outdoor.jpg'
      },

      {
        name: 'Weddings',
        path: '/weddings',
        image: 'wedding.jpg'
      },
      {
        name: 'About',
        path: '/about',
        image: 'about.jpg'
      }
    ])

    const store = useStore()
    const { error, documents: products } = getCollection('products')
    const sliderIndex = ref(null)
    let intFrameWidth = window.innerWidth
    const slidePerView = ref(intFrameWidth > 992 ? '1.35' : '1')
    const navigationIndex = ref(null)

    const onSlideChange = (swiper) => {
      navigationIndex.value = swiper.activeIndex
    }

    const onSwiper = (swiper) => {
      console.log(swiper.activeIndex)
    }
    const navigationIconChange = () => {
      store.commit('toggleNav')
    }
    return {
      modules: [Navigation],
      error,
      products,
      navigationList,
      sliderIndex,
      navigationIndex,
      onSlideChange,
      onSwiper,
      slidePerView,
      navigationIconChange
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
  background: #f8f8f8;
  @media screen and (max-width: 768px) {
    grid-template-columns: 0fr 1fr 0fr;
  }
}
.swiper {
  width: 100%;
  .swiper-pagination {
    top: 20px;
  }
}
.mySwiper {
  grid-area: B;
  height: var(--swiper-height);
}
.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
}
.swiper-slide a {
  width: 100%;
}
.swiper-slide img {
  padding: 3rem;
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
.swiper-slide {
  width: 60%;
  height: 95%;
}

.slide__link {
  // position: relative;
}
.slide__caption {
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 0%;
  transform: translateY(-50%);
  h2 {
    font-size: 4rem;
  }
  p {
    font-size: 3rem;
    &::before {
      content: '';
      margin-left: -3rem;
      display: inline-block;
      width: 2rem;
      height: 0.1rem;
      background: #2d2d2d;
      margin-bottom: 1.5rem;
      margin-right: 1rem;
    }
  }
}

// navigation
.slider__navigation {
  z-index: 999;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0.2rem 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    gap: 0.4rem;
    font-size: 0.8rem;
    letter-spacing: 0.8px;
  }
  a {
    &:hover {
      color: red;
    }
  }
}
.slider__navigation-link {
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: 1.4px;
  color: blue;
  @media screen and (max-width: 768px) {
    gap: 0.2rem;
    font-size: 0.8rem;
    letter-spacing: 0.8px;
    font-weight: 400;
  }
}
.navigation-text {
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    gap: 0.1rem;
    font-size: 0.8rem;
    letter-spacing: 0.8px;
  }
}
.active h2 {
  text-decoration: underline !important;
}
.navigation__index {
  transform: rotate(-90deg);
  text-decoration: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
