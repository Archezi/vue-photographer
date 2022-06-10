<template>
  <div class="grid-view">
    <div v-for="img in images" :key="img.id" class="grid-item">
      <div @click="$emit('deleteSingleImage')" class="delete-image" v-if="user">
        X
      </div>
      <img :src="img.url" />
    </div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
export default {
  props: ['images'],
  setup() {
    const { user } = getUser()

    return { user }
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
