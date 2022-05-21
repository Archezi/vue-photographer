<template>
  <div class="image-caption-wrapper">
    <span><slot>Collection</slot></span>
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
.image-caption-wrapper {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 81%
  );
  span {
    padding: 1rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
  }
}
</style>
