<template>
  <div class="footer-wrapper">
    <div class="container footer-container">
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
        <div v-if="user" class="login-content">
          <div class="user-name">Hi, Iza</div>
          <button @click="handleClick">Log Out</button>
        </div>
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
    position: fixed;
    bottom: 0;
    height: var(--footer-height);
    width: 100%;
  }
  &-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    padding: 0.5rem 0;
  }
  &-social-links {
    margin-right: auto;
  }
}
.login {
  position: absolute;
  bottom: 0.5rem;
  right: 0;
}
.login-content {
  display: flex;

  align-items: center;
  gap: 1rem;
}
</style>
