<template>
  <header class="header">
    <div class="container header-container">
      <Logo class="logo" />
    </div>
    <div
      @click="openNavigation"
      v-if="!navOpen"
      class="header-navigation__button"
    >
      <div class="navigation__button-icon">
        <icon-menu></icon-menu>
      </div>
    </div>
    <div @click="closeNavigation" v-else class="header-navigation__button">
      <div class="navigation__button-icon"><icon-close></icon-close></div>
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Logo from '@/components/logo/Logo.vue'
import { useRouter } from 'vue-router'
// import { ref } from 'vue'
import IconClose from '@/components/UI/IconClose.vue'
import IconMenu from '@/components/UI/IconMenu.vue'
export default {
  components: {
    Logo,
    IconClose,
    IconMenu
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    // const nav = ref(false)
    const navOpen = computed(() => {
      return store.state.navOpen
    })

    const openNavigation = () => {
      router.push('/navigation')
      store.state.navOpen = true
    }

    const closeNavigation = () => {
      router.back()
      store.state.navOpen = false
    }
    return { openNavigation, closeNavigation, navOpen }
  }
}
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
  min-height: 5rem;
  max-height: 12rem;
  width: 100vw;
  z-index: 60;
  background: #f8f8f8;
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
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 12.66fr 2fr;
  }
}

.logo {
  // margin-right: auto;
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
</style>
