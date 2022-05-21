<template>
  <div
    class="product-collection"
    v-for="product in products"
    :key="product.uid"
  >
    <router-link
      class="product-link"
      :to="{ name: 'Product', params: { id: product.id } }"
    >
      <div class="image">
        <img :src="product.imageUrl" />
      </div>
      <image-caption class="image-caption">{{ product.name }}</image-caption>
    </router-link>
  </div>
</template>

<script>
import ImageCaption from '../UI/ImageCaption.vue'
export default {
  components: { ImageCaption },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.product-collection {
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:hover {
    border-color: #0055b2;
    text-decoration: none;
    box-shadow: 0 0 3.75rem 0 rgba(0, 0, 0, 0.3);
  }
  a.product-link {
    position: relative;
    display: block;
    .image {
      aspect-ratio: 1 / 1;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
    .image-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
