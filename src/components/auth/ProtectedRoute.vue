<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCurrentUser } from '../../utils/appwrite';

const loading = ref(true);
const isAuthenticated = ref(false);

onMounted(async () => {
    const { success } = await getCurrentUser();
    isAuthenticated.value = success;
    loading.value = false;
    
    if (!success) {
        window.location.href = '/login';
    }
});
</script>

<template>
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
    <slot v-else-if="isAuthenticated"></slot>
</template>
