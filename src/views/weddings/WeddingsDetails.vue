<template>
  <div v-if="user" class="button-add">
    <button v-if="!addNew" @click="addNew = !addNew">Add new</button>
    <button v-else @click="addNew = !addNew">Close</button>
  </div>
  <collection-wedding v-if="addNew"></collection-wedding>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import CollectionWedding from '../../components/collections/CreateCollectionWedding.vue'

export default {
  components: { CollectionWedding },
  setup() {
    let addNew = ref(false)
    const { user } = getUser()
    return { user, addNew }
  }
}
</script>

<style lang="scss" scoped>
.button-add {
  display: flex;
  margin-bottom: 1rem;
  justify-content: flex-end;
  align-items: center;
}
</style>
