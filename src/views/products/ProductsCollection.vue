<template>
  <div>
    <UtilityBar
      @add-new="addNew = !addNew"
      :collection="collectionName"
      :product="collectionList"
    />
    <div>
      <ProductCreateCollectionComponent
        v-if="addNew"
        :createCollectionName="'products'"
      />
    </div>
    <div class="product-collection_content container">
<<<<<<< HEAD
      <ProductListComponent
        :collectionList="collectionList"
        :pathName="'Product'"
      />
=======
      <ProductsListComponent :collectionList="collectionList" />
>>>>>>> 9a77eb82bbaaa907d089b8008a665f8ff6f63040
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ProductCreateCollectionComponent from '../../components/product/ProductCreateCollectionComponent.vue'
<<<<<<< HEAD
import ProductListComponent from '../../components/product/ProductsListComponent.vue'
=======
import ProductsListComponent from '../../components/product/ProductsListComponent.vue'
>>>>>>> 9a77eb82bbaaa907d089b8008a665f8ff6f63040
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: {
    ProductsListComponent,
    UtilityBar,
    ProductCreateCollectionComponent
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
