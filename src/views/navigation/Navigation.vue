<template>
  <div class="home">
    <swiper
      :slidesPerView="'1.35'"
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
    const { error, documents: products } = getCollection('products')
    const sliderIndex = ref(null)
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
        name: 'Commercial',
        path: '/commercial',
        image: 'commercial.jpg'
      },
      {
        name: 'Family Photos',
        path: '/family',
        image: 'children.jpg'
      },
      {
        name: 'Portraits',
        path: '/commercial',
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
    const navigationIndex = ref(null)
    const onSlideChange = (swiper) => {
      navigationIndex.value = swiper.activeIndex
    }
    const onSwiper = (swiper) => {
      console.log(swiper.activeIndex)
    }

    return {
      pagination: {
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
      },
      modules: [Navigation],
      error,
      products,
      navigationList,
      sliderIndex,
      navigationIndex,
      onSlideChange,
      onSwiper
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
  // height: 100%;
}
.swiper-slide img {
  padding: 3rem;
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
.swiper-pagination {
  top: 20px;
}
.swiper-pagination-bullet {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: red;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
  bottom: 120px;
}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
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
}
.navigation-text {
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}
.active h2 {
  text-decoration: underline !important;
}
.navigation__index {
  transform: rotate(-90deg);
  text-decoration: none;
}
</style>
