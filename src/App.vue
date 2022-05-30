<template>
  <the-header></the-header>
  <div class="content">
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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
.main-view {
  min-height: var(--content);
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
