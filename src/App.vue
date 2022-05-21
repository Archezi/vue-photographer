<template>
  <the-header></the-header>
  <div class="">
    <div class="">
      <router-view />
    </div>
  </div>
  <the-footer></the-footer>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import '@/styles/_shared.scss';
#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
  padding-top: 80px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
