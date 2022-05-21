<template>
  <div class="navbar">
    <nav class="navigation">
      <ul class="navigation-list">
        <li class="navigation-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="navigation-item">
          <router-link to="/Commercial">About</router-link>
        </li>
        <li class="navigation-item">
          <router-link to="/Commercial">Commercial</router-link>
        </li>

        <li class="navigation-item">
          <router-link to="/Commercial">Commercial</router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{ name: 'Weddings' }">Weddings</router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{ name: 'Products' }">Products</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
export default {
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
.navbar {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  .user-name {
    border-left: 1px solid #ccc;
    padding-inline: 0.5rem;
    color: #aaa;
  }
}
.navigation {
  &-list {
    display: flex;
    gap: 1rem;
    list-style: none;
    li {
      a {
        font-family: 'Jost', sans-serif;
        transition: 0.2s color ease-in-out;
        color: #aaa;
        text-decoration: none;
        &:hover {
          color: #9199a1;
        }
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
