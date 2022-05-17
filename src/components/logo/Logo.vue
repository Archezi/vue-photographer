<template>
  <div class="logo">
    <h1>Lukasz Kaczmarek</h1>
    <h2>Frontend Developer</h2>
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
  font-family: 'Oswald', sans-serif;
  text-align: center;
  letter-spacing: 0px;
  font-size: 2.5rem;
  line-height: 1.2em;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  h1 {
    color: rgba(0, 0, 0, 0.97);
    text-transform: uppercase;
  }
  h2 {
    color: #aaa;
    font-size: 1.5rem;
    font-weight: 200;
  }
}
</style>
