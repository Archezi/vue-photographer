<template>
  <div class="admin-section container">
    <div v-if="user" class="button-add">
      <h4>Products Collection</h4>
      <div class="buttons">
        <button v-if="!addNew" @click="addNew = !addNew">Add new</button>
        <button v-else @click="addNew = !addNew">Close</button>
      </div>
    </div>
    <transition>
      <product-create-collection v-if="addNew"></product-create-collection>
    </transition>
  </div>
  <!-- Collection list  -->

  <div class="content container">
    <products-list :products="products"></products-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import ProductCreateCollection from '../../components/product/ProductCreateCollection.vue'
import getCollection from '@/composables/getCollection'
import ProductsList from '../../components/product/ProductsList.vue'
export default {
  components: { ProductCreateCollection, ProductsList },
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: row;
  gap: 1rem;
}
</style>
