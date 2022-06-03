<template>
  <div class="footer-wrapper">
    <div class="container footer-content">
      <div class="footer-social-links">
        <Social></Social>
      </div>
      <div class="footer-phone">
        <p>Contact me: 0 876 253 544</p>
      </div>
      <div class="login">
        <div v-if="!user" class="login-content">
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </div>
        <!-- <div v-if="user" class="login-content">
          <div class="user-name">Hi, Iza</div>
          <button @click="handleClick">Log Out</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Social from '@/components/social/Social.vue'

import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
export default {
  components: {
    Social
  },
  setup() {
    const { logout, isPending } = useLogout()
    const { user } = getUser()

    const handleClick = async () => {
      await logout()
      console.log('user logged out')
    }

    return { logout, isPending, handleClick, user }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
.footer {
  &-wrapper {
    position: relative;
    bottom: 0;
    background: #f8f8f8;

    height: var(--footer-height);
    width: 100%;
    z-index: 999;
  }
  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  &-social-links {
    margin-right: auto;
  }
  &-phone p {
    color: #7a7f8c;
    font-size: 1.125rem;
  }
}
</style>
