<template>
  <header class="header">
    <div class="container header-container">
      <Logo class="logo" />
      <navigation class="navigation"></navigation>
    </div>
    <div class="header-navigation__button">
      <div class="navigation__button-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </div>
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
  &-navigation__button {
    grid-area: C;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-inline: auto;
    cursor: pointer;
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
