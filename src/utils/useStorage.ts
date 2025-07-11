class UseStorage {
  get(key: string) {
    const value = window.localStorage.getItem(key)
    try {
      if (value) {
        return JSON.parse(value)
      } else {
        return value
      }
    } catch (e) {
      return value
    }
  }
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
    return value
  }
  remove(key: string) {
    window.localStorage.removeItem(key)
    return key
  }
  clear() {
    window.localStorage.clear()
  }
}

const Local_Storage = new UseStorage()
export default Local_Storage
