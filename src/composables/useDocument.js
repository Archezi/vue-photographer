import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)
  let docRef = projectFirestore.collection(collection).doc(id)

  const deleteDocument = async () => {
    isPending.value = true
    error.value = null
    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = err
      isPending.value = false
    }
  }

  const updateDoc = async (data) => {
    isPending.value = true
    error.value = null
    try {
      const res = await docRef.update(data)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = err
      isPending.value = false
    }
  }

  return { deleteDocument, updateDoc, error, isPending }
}
export default useDocument
