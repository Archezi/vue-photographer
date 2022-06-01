<template>
  <div>
    <utility-bar
      @create-collection="addNew = !addNew"
      :collection="collectionName"
    ></utility-bar>
    <div>
      <CommercialCreateCollectionComponent v-if="addNew" />
    </div>
    <div class="product-collection_content container">
      <CommercialListComponent :collectionList="collectionList" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import CommercialListComponent from '../../components/collections/commercial/CommercialListComponent.vue'
import CommercialCreateCollectionComponent from '../../components/collections/commercial/CommercialCreateCollectionComponent.vue'
import UtilityBar from '../../components/UI/UtilityBar.vue'
export default {
  components: {
    CommercialListComponent,
    CommercialCreateCollectionComponent,
    UtilityBar
  },
  setup() {
    const { error, documents: collectionList } = getCollection('commercials')
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
