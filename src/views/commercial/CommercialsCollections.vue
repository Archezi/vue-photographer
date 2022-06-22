<template>
  <div>
    <utility-bar
      @add-new="addNew = !addNew"
      :collection="collectionName"
      :product="collectionList"
    ></utility-bar>
    <div>
      <ProductCreateCollectionComponent
        v-if="addNew"
        :createCollectionName="'commercials'"
      />
    </div>
    <div class="product-collection_content container">
      <ProductsListComponent
        :collectionList="collectionList"
        :pathName="'Commercial'"
      />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ProductsListComponent from '../../components/product/ProductsListComponent.vue'
import ProductCreateCollectionComponent from '../../components/product/ProductCreateCollectionComponent.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: {
    ProductCreateCollectionComponent,
    ProductsListComponent,
    UtilityBar
  },
  setup() {
    const { error, documents: collectionList } = getCollection('commercials')
    let addNew = ref(false)
    const collectionName = ref('Commercials Collection')
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
