<template>
  <div
    class="product-collection"
    v-for="product in products"
    :key="product.uid"
  >
    <router-link :to="{ name: 'Product', params: { id: product.id } }">
      <div class="image">
        <img :src="product.imageUrl" />
      </div>
      <div class="info">
        <h4>{{ product.name }}</h4>
        <p>{{ product.photos.length }} photos</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
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
  overflow: hidden;
  a .image {
    max-height: 90%;
    width: 100%;
    img {
      max-width: 100%;
      object-fit: scale-down;
      overflow: hidden;
    }
  }
}
</style>
