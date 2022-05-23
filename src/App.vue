<template>
  <the-header></the-header>
  <div class="content">
    <router-view />
  </div>
  <the-footer></the-footer>
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
  margin: var(--content-margin) 0;
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
