<template>
  <div v-if="user">
    <div class="button-add">
      <h4>Wedding Collection</h4>
      <div class="buttons">
        <button v-if="!addNew" @click="addNew = !addNew">Add new</button>
        <button v-else @click="addNew = !addNew">Close</button>
      </div>
    </div>
    <create-collection-wedding v-if="addNew"></create-collection-wedding>
  </div>
  <div class="content">
    <form-add-file>
      <template #collectionName> Collection Wedding </template>
    </form-add-file>
  </div>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import CreateCollectionWedding from '../../components/collections/CreateCollectionWedding.vue'
import getCollection from '@/composables/getCollection'
import FormAddFile from '../../components/UI/FormAddFile.vue'
export default {
  components: { CreateCollectionWedding, FormAddFile },
  setup() {
    const { error, documents: weddings } = getCollection('wedding')
    let addNew = ref(false)
    const { user } = getUser()
    return { user, addNew, error, weddings }
  }
}
</script>

<style lang="scss" scoped>
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
  // grid-template-columns: repeat(3, 1fr);
}
.wedding-collection {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  .image {
    height: 100%;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
}
</style>
