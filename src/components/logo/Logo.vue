<template>
  <router-link to="/">
    <div class="logo">
      <h1>Izabella Grin</h1>
      <h2>Fotografer & Art Director</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-height: calc(50 / 16) rem;
  height: 50px;
  font-family: 'Oswald', sans-serif;
  text-align: center;
  letter-spacing: 0px;
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: rgba(0, 0, 0, 0.97);
    text-transform: uppercase;
  }
  h2 {
    color: #aaa;

    font-size: 1rem;
    line-height: 1.2em;
    font-weight: 200;
  }
}
</style>
