<template>
  <the-header></the-header>
  <div class="content">
    <router-view class="main-view"> </router-view>
    <the-footer></the-footer>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import '@/styles/_shared.scss';
@import '@/styles/_variables.scss';
#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
  position: relative;
  margin: var(--content-margin) 0 0 0;
}
</style>
