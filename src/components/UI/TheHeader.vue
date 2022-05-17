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
.header {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 3.125rem;
    width: 100%;
    margin-inline: auto;
  }
  .logo {
    margin-right: auto;
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
