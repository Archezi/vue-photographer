<template>
  <div class="utility-bar_wrapper">
    <div class="container">
      <div class="utility-bar">
        <div class="section-name">
          <div @click="goBackButton" class="go-back">Go Back</div>
        </div>
        <div class="utility-bar-call-to-action">
          <div class="utility-bar-icons">
            <div class="slider-icon active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.227"
                height="18.42"
                viewBox="0 0 24.227 18.42"
              >
                <g
                  id="Group_4"
                  data-name="Group 4"
                  transform="translate(0.5 0.5)"
                >
                  <path
                    id="Icon_material-view-carousel"
                    data-name="Icon material-view-carousel"
                    d="M8.807,23.42H20.42V6H8.807ZM3,21.1H7.645V8.323H3ZM21.581,8.323V21.1h4.645V8.323Z"
                    transform="translate(-3 -6)"
                    fill="none"
                    stroke="#7a7f8c"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </div>
            <div class="grid-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.581"
                height="19.581"
                viewBox="0 0 19.581 19.581"
              >
                <g
                  id="Group_5"
                  data-name="Group 5"
                  transform="translate(0.5 0.5)"
                >
                  <g id="Icon_feather-grid" data-name="Icon feather-grid">
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M4.5,4.5h8.129v8.129H4.5Z"
                      transform="translate(-4.5 -4.5)"
                      fill="none"
                      stroke="#7a7f8c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M21,4.5h8.129v8.129H21Z"
                      transform="translate(-10.548 -4.5)"
                      fill="none"
                      stroke="#7a7f8c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M21,21h8.129v8.129H21Z"
                      transform="translate(-10.548 -10.548)"
                      fill="none"
                      stroke="#7a7f8c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M4.5,21h8.129v8.129H4.5Z"
                      transform="translate(-4.5 -10.548)"
                      fill="none"
                      stroke="#7a7f8c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div class="admin-call-to-action" v-if="user">
            <button
              v-if="!addNewCollection"
              @click="$emit('createCollection'), toggleAddNewCollection()"
            >
              Add New
            </button>
            <button
              v-if="addNewCollection"
              @click="$emit('createCollection'), toggleAddNewCollection()"
            >
              Close
            </button>
            <button @click="$emit('addNewImage')" v-if="addNewImage">
              Add New Image
            </button>
            <button
              class="delete-collection"
              v-if="deleteCollection"
              @click="$emit('deleteCollection')"
            >
              Delete Collection
            </button>
            <button @click="handleLogout">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
export default {
  props: ['collection', 'addNewImage', 'deleteCollection'],
  setup() {
    const { logout, isPending } = useLogout()
    const { user } = getUser()
    const router = useRouter()
    const addNewCollection = ref(false)
    const goBackButton = () => {
      router.back()
    }
    // logout
    const handleLogout = async () => {
      await logout()
      console.log('user logged out')
    }
    const toggleAddNewCollection = () => {
      addNewCollection.value = !addNewCollection.value
      console.log('add new collection', addNewCollection.value)
    }
    return {
      toggleAddNewCollection,
      addNewCollection,
      handleLogout,
      logout,
      user,
      isPending,
      goBackButton
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --utility-bar-bg: #f5f5f5;
  --utility-bar-color: #7a7f8c;
}
.utility-bar_wrapper {
  background: #f6f7fb;
  border-top: 1px solid #f2f3f8;
  border-bottom: 1px solid #f2f3f8;
}
.utility-bar {
  height: var(--utility-bar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0;

  .section-name {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    height: 100%;
    border-right: 1px solid #f2f3f8;

    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--utility-bar-color);
    }
  }
  .utility-bar-call-to-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // gap: 1rem;
  }
}
.utility-bar-icons {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  border-left: 1px solid #f2f3f8;
  .grid-icon,
  .slider-icon {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    height: 28px;
    min-width: 2rem;
    border-left: 1px solid #f2f3f8;
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      background: #f2f3f8;
      box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
  .grid-icon svg,
  .slider-icon svg {
    height: 24px;
  }
  .active {
    -webkit-box-shadow: inset 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  }
}

.utility-bar-call-to-action button {
  height: 32px;
  padding: 0 0.5rem;
  text-align: cenete;
  border-radius: 0;
  border-left: 1px solid #f2f3f8;
  background: none;
  font-weight: 400;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: var(--primary);
  }
}
button.delete-collection {
  &:hover {
    background: var(--warning);
  }
}
.go-back {
  cursor: pointer;
}
.admin-call-to-action {
  font-family: 'Footura PT', sans-serif;
}
</style>
