<template>
  <div>
    <utility-bar
      @add-new="addNew = !addNew"
      :collection="collectionName"
      :product="collectionList"
    ></utility-bar>
    <div>
      <WeddingCreateCollectionComponent v-if="addNew" />
    </div>
    <div class="product-collection_content container">
      <WeddingListComponent :collectionList="collectionList" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import WeddingCreateCollectionComponent from '../../components/collections/weddings/WeddingCreateCollectionCoponent.vue'
import getCollection from '@/composables/getCollection'
import WeddingListComponent from '../../components/collections/weddings/WeddingListComponent.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: {
    WeddingCreateCollectionComponent,
    WeddingListComponent,
    UtilityBar
  },
  setup() {
    const { error, documents: collectionList } = getCollection('weddings')
    let addNew = ref(false)
    const collectionName = ref('Wedding Collection')
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
