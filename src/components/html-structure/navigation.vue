<template>
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <!-- DaysArts Branding -->
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5 hover:text-gray-600">
        <span class="sr-only">DaysArts</span>
        <p class=" w-auto font-black text-lg">DaysArts</p>
      </a>
    </div>

    <!-- Dropdown and Navigation Items -->
    <div class="flex lg:hidden items-center">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
        <span class="sr-only">Open main menu</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-1.5 items-center">
      <Menu v-for="item in navigation" :key="item.name" as="div" class="relative inline-block text-left items-center">
        <MenuButton v-if="item.dropdown" class="inline-flex w-full items-center justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          {{ item.name }}
          <ChevronDownIcon class="-mr-1 h-3 w-3 text-gray-900" aria-hidden="true" />
        </MenuButton>
        <a v-else :href="item.href" class="inline-flex w-full items-center justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">{{ item.name }}</a>

        <transition v-if="item.dropdown" enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.name" v-slot="{ active }">
                <a :href="dropdownItem.href" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ dropdownItem.name }}</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <!-- Additional Nav Item -->
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="/member" class="text-sm font-semibold leading-6 text-gray-900">Become a member <span aria-hidden="true">&rarr;</span></a>
    </div>
  </nav>





<!-- Mobile Menu Dialog -->
<Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
  <div class="fixed inset-0 z-50" />
  <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    <div class="flex items-center justify-between">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">DaysArts</span>
        <p class="h-8 w-auto font-bold">DaysArts</p>
      </a>
      <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
        <span class="sr-only">Close menu</span>
        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-6 flow-root">
      <div class="-my-6 divide-y divide-gray-500/10">
        <!-- Loop through navigation items for mobile menu -->
        <div v-for="item in navigation" :key="item.name" class="py-2">
          <!-- Check if the item has dropdown items -->
          <div v-if="item.dropdown">
            <!-- Dropdown Title -->
            <p class="text-base font-black leading-7 text-gray-900">{{ item.name }}</p>
            <!-- Dropdown Items -->
            <div class="space-y-2 mt-3">
              <a v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.name" :href="dropdownItem.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ dropdownItem.name }}</a>
            </div>
          </div>
          <a v-else :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
        </div>
        <!-- Additional Link -->
        <div class="py-6">
          <a href="/member" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Become a member <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>
  </DialogPanel>
</Dialog>
</template>

<script setup>
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ref } from 'vue'
import { XMarkIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/vue/24/outline';


import { navigation } from './navigationData.vue';

// const navigation = ref([
//   {
//     name: 'Movies',
//     dropdown: true,
//     dropdownItems: [
//       { name: 'Now playing', href: '/now-playing' },
//       { name: 'Reel alternative film', href: '/reel-alternative-film' }
//     ]
//   },
//   {
//     name: 'Events',
//     dropdown: true,
//     dropdownItems: [
//       { name: 'Upcoming events', href: '/event' },
//       { name: 'Past shows', href: '/past-events' }
//     ]
//   },
//   { name: 'About', href: '/about' },
//   { name: 'Rental', href: '/rental' },
// ]);

const mobileMenuOpen = ref(false);
</script>
