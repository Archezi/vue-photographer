<template>
  <div class="admin-section">
    <div v-if="user" class="button-add">
      <h4>Products Collection</h4>
      <div class="buttons">
        <button v-if="!addNew" @click="addNew = !addNew">Add new</button>
        <button v-else @click="addNew = !addNew">Close</button>
      </div>
    </div>
    <create-collection-product v-if="addNew"></create-collection-product>
  </div>
  <div class="content">
    <products-list :products="products"></products-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import CreateCollectionProduct from '../../components/collections/CreateCollectionProduct.vue'
import getCollection from '@/composables/getCollection'
import ProductsList from '../../components/collections/product/ProductsList.vue'
export default {
  components: { CreateCollectionProduct, ProductsList },
  setup() {
    const { error, documents: products } = getCollection('products')
    let addNew = ref(false)
    const { user } = getUser()
    return { user, addNew, products, error }
  }
}
</script>

<style lang="scss" scoped>
.admin-section {
  position: relative;
  justify-content: center;

  padding: 2rem;
}
.button-add {
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;

  .buttons {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 400px;

  gap: 1rem;
  .product-collection {
    max-height: 100%;
    overflow: hidden;
  }
}
</style>
