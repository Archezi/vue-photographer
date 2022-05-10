import { projectStorage } from '../firebase/config'
import { ref } from 'vue'
import getUser from './getUser'

const { user } = getUser()

const useStorage = (store) => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file, collection) => {
    filePath.value = `${store}/${user.value.uid}/${collection}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }
  const uploadImageSubcoleciton = async (file, collection) => {
    filePath.value = `${store}/${user.value.uid}/${collection}/subcolection/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  const deleteImage = async (filePath) => {
    const storageRef = projectStorage.ref(filePath)
    try {
      await storageRef.delete()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  return {
    uploadImage,
    deleteImage,
    uploadImageSubcoleciton,
    url,
    filePath,
    error
  }
}

export default useStorage
