<template>
  <utility-bar
    @create-collection="addNew = !addNew"
    :collection="collectionName"
  ></utility-bar>
  <div>
    <product-create-collection v-if="addNew"></product-create-collection>
  </div>
  <div class="product-collection_content container">
    <products-list :products="products"></products-list>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import ProductCreateCollection from '../../components/product/ProductCreateCollection.vue'
import getCollection from '@/composables/getCollection'
import ProductsList from '../../components/product/ProductsList.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: { ProductCreateCollection, ProductsList, UtilityBar },
  setup() {
    const { error, documents: products } = getCollection('products')
    let addNew = ref(false)
    const collectionName = ref('Products Collection')
    const { user } = getUser()
    return { user, addNew, products, error, collectionName }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  height: 0;
}
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
.product-collection_content {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: row;
  gap: 1rem;
  padding-bottom: calc(var(--footer-height) + 1rem);
}
</style>
