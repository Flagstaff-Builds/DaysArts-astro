<template>
  <Teleport to="body">
    <TransitionGroup
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-1 opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="fixed bottom-4 right-4 z-50 flex items-center space-x-4 rounded-md border bg-background p-6 shadow-lg"
        :class="[toast.variant === 'destructive' && 'border-destructive']"
      >
        <div class="grid gap-1">
          <div class="text-sm font-semibold">{{ toast.title }}</div>
          <div class="text-sm opacity-90">{{ toast.description }}</div>
        </div>
        <button
          class="text-foreground/50 hover:text-foreground"
          @click="removeToast(toast.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let toastTimeout = null

const addToast = (toast) => {
  const id = Date.now()
  toasts.value.push({ ...toast, id })
  
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }
  
  toastTimeout = setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

// Expose methods to parent
defineExpose({
  addToast
})
</script>
