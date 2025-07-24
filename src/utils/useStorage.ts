class useLocalStorage {
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

class UseSessionStorage {
  get(key: string) {
    const value = window.sessionStorage.getItem(key)
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
    window.sessionStorage.setItem(key, JSON.stringify(value))
    return value
  }
  remove(key: string) {
    window.sessionStorage.removeItem(key)
    return key
  }
  clear() {
    window.sessionStorage.clear()
  }
}

const Local_Storage = new useLocalStorage()
const Session_Storage = new UseSessionStorage()

export { Local_Storage, Session_Storage }
