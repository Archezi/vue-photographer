<template>
  <div>
    <UtilityBar
      @create-collection="addNew = !addNew"
      :collection="collectionName"
      :product="collectionList"
    />
    <div>
      <ProductCreateCollectionComponent v-if="addNew" />
    </div>
    <div class="product-collection_content container">
      <ProductListComponent :collectionList="collectionList" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import ProductCreateCollectionComponent from '../../components/collections/products/ProductCreateCollectionComponent.vue'
import getCollection from '@/composables/getCollection'
import ProductListComponent from '../../components/collections/products/ProductListComponent.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: {
    ProductCreateCollectionComponent,
    ProductListComponent,
    UtilityBar
  },
  setup() {
    const { error, documents: collectionList } = getCollection('products')
    let addNew = ref(false)
    const collectionName = ref('Products Collection')
    const { user } = getUser()
    return { user, addNew, collectionList, error, collectionName }
  }
}
</script>

<style lang="scss" scoped>
.product-collection_content {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: row;
  gap: 1rem;
  padding-bottom: calc(var(--footer-height) + 1rem);
}
</style>
