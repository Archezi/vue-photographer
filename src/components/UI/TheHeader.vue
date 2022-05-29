<template>
  <header class="header">
    <div class="container header-container">
      <Logo class="logo" />

      <navigation class="navigation"></navigation>
    </div>
  </header>
</template>

<script>
import Navigation from '@/components/navigation/Navigation.vue'
import Logo from '@/components/logo/Logo.vue'
export default {
  components: {
    Navigation,
    Logo
  },
  setup() {
    return {}
  }
}
Navigation
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 12.66fr 1fr;
  grid-template-areas: 'A B C';
  height: calc(var(--vh, 1vh) * 11.11111);
  // height: var(--header-height);
  min-height: 5rem;
  max-height: 12rem;
  width: 100vw;
  z-index: 60;
  background: #f8f8f8;
  // box-sizing: border-box;
  // max-height: 80px;
  // background: #fff;
  // height: var(--header-height);
  // position: fixed;
  // z-index: 999;
  // top: 0;
  // left: 0;
  // width: 100%;
  &-container {
    grid-area: B;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 3.125rem;
    width: 100%;
    margin-inline: auto;
  }
  .logo {
    margin-right: auto;
    max-height: 50px;
  }
  .name {
    margin-inline: auto;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .navigation {
    margin-left: auto;
  }
}
</style>
