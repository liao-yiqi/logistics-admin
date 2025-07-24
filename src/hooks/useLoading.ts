import { ref } from 'vue'

const useLoading = () => {
  const loading = ref<boolean>(false)
  const setLoading = (val: boolean): boolean => (loading.value = val)
  return { loading, setLoading }
}

export default useLoading
