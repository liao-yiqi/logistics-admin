import { createPinia } from 'pinia'
import PluginState from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(PluginState)
export default pinia
