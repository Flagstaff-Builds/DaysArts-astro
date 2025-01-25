import { ref, markRaw } from 'vue'
import Toast from './Toast.vue'

const toastComponent = ref(null)

export function useToast() {
  const toast = ({ title, description, variant = 'default' }) => {
    if (toastComponent.value) {
      toastComponent.value.addToast({ title, description, variant })
    }
  }

  const setToastComponent = (component) => {
    toastComponent.value = component
  }

  return {
    toast,
    setToastComponent
  }
}

// Create a Vue plugin
export const ToastPlugin = {
  install(app) {
    const toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    
    const toastInstance = markRaw(Toast)
    app.component('Toast', toastInstance)
  }
}
