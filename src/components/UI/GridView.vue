<template>
  <div class="grid-view">
    <div v-for="img in images" :key="img.id" class="grid-item">
      <div @click="handleDeleteImage(img.id)" class="delete-image" v-if="user">
        X
      </div>
      <img :src="img.url" />
    </div>
  </div>
</template>

<script>
// Firebase
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocuemnt from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
export default {
  props: ['images', 'collectionName', 'id'],
  setup(props) {
    const { user } = getUser()
    const { error, document: product } = getDocument(
      props.collectionName,
      props.id
    )
    const { updateDoc } = useDocuemnt(props.collectionName, props.id)
    const { deleteImage } = useStorage()

    const handleDeleteImage = async (id) => {
      const photos = product.value.photos.filter((photo) => photo.id !== id)
      console.log(photos)
      const photo = product.value.photos.find((ph) => ph.id === id)
      await deleteImage(photo.filePath)
      await updateDoc({ photos })
    }
    return { user, handleDeleteImage, product, error }
  }
}
</script>

<style lang="scss" scoped>
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  display: column;
  grid-auto-rows: minmax(300px, auto);
  grid-auto-flow: row dense;
  gap: 1rem;
}
.grid-item {
  position: relative;

  aspect-ratio: 1/1;
  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
.delete-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  height: 2rem;
  width: 2rem;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
