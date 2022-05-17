<template>
  <div class="wrapper">
    <h4 class="collection-name">Collection Name</h4>
    <div class="container">
      <div class="image-preview">
        <img id="image-preview" />
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <h4>Add new collection</h4>
          <input type="text" placeholder="Title" v-model="collectionName" />

          <label for="">Choose image for the collection</label>
          <input class="input-file" type="file" @change="handleChange" />
          <div class="error" v-if="fileError">{{ fileError }}</div>
          <button class="create-btn">Create</button>
        </form>
      </div>
    </div>
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
.wrapper {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  max-height: 500px;
  height: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
}
h4.collection-name {
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 1rem;
}
.container {
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  box-sizing: content-box;
}
.image-preview {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-image: url(../../assets/images/placeholder.png);
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
}
.create-btn {
  // margin-top: 2rem;
}
.input-file {
  margin: 2rem 0;
}
</style>
