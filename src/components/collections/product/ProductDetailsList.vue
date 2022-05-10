<template>
  <div class="single-image" v-for="prod in prodArray" :key="prod.id">
    <img loading="lazy" :src="prod.url" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    prodArray: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.single-image {
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    overflow: hidden;
  }
}
</style>
