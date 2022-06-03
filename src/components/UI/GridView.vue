<template>
  <div class="grid-view">
    <div v-for="img in images" :key="img.id" class="grid-item">
      <img :src="img.url" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: row;
  gap: 1rem;
}
.grid-item {
  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
