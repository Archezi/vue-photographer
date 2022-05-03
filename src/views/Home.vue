<template>
  <CreateCollection />
</template>

<script>
import CreateCollection from '@/views/collections/CreateCollection.vue'
// @ is an alias to /src

export default {
  components: { CreateCollection },
  name: 'Home'
}
</script>
<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
