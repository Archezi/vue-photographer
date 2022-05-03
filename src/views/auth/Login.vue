<template>
  <form @submit.prevent="handleSubmit" action="">
    <h3>Login</h3>
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Logging in...</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { login, error, isPending } = useLogin()

    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        console.log('user logged in')
        router.push({ name: 'Home' })
      }
      // console.log(res)
      email.value = ''
      password.value = ''
    }

    return { handleSubmit, email, password, error, isPending }
  }
}
</script>

<style lang="scss" scoped></style>
