<template>
  <div class="logo">
    <h1>Izabella Grin</h1>
    <h2>Fotografer</h2>
  </div>
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
  line-height: 1.1em;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  h1 {
    color: rgba(0, 0, 0, 0.97);
    text-transform: uppercase;
  }
  h2 {
    color: #aaa;
    font-size: 1rem;
    line-height: 0.9em;
    font-weight: 200;
  }
}
</style>
