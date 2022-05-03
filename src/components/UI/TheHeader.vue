<template>
  <header class="header">
    <Logo class="logo" />
    <div class="name">Lukasz Kaczmarek</div>
    <navigation class="navigation"></navigation>
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
  padding-inline: 30px;
  height: 80px;
  background: #2c3e50;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
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
