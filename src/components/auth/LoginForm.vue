<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { login } from '../../utils/appwrite';

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const methods = {
    async submitForm(e: Event) {
        // Prevent form submission
        e.preventDefault();
        e.stopPropagation();
        
        if (isLoading.value) return;
        
        error.value = '';
        isLoading.value = true;
        
        try {
            console.log('Attempting login with email:', email.value);
            const response = await login(email.value, password.value);
            console.log('Login response:', response);
            
            if (response.success) {
                console.log('Login successful, redirecting...');
                window.location.href = '/admin';
            } else {
                console.error('Login failed:', response.error);
                error.value = response.error?.message || 'Invalid credentials';
            }
        } catch (err) {
            console.error('Login error:', err);
            error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
        } finally {
            isLoading.value = false;
        }
        
        // Return false to prevent form submission
        return false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form 
                @submit="methods.submitForm"
                class="mt-8 space-y-6"
                action="javascript:void(0);"
            >
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            type="email"
                            autocomplete="email"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            v-model="email"
                            :disabled="isLoading"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            v-model="password"
                            :disabled="isLoading"
                        />
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center">
                    {{ error }}
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        :disabled="isLoading"
                    >
                        <span v-if="isLoading" class="flex items-center">
                            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Signing in...
                        </span>
                        <span v-else>Sign in</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
