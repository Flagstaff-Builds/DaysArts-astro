<template>
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 z-auto" aria-label="Global">
    <!-- {{company}} Branding -->
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">{{company}}</span>

        <svg aria-hidden="true" class="w-28 lg:w-64 h-auto max-w-xs fill-current" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 555.05 208.51">
          <path class="cls-1" d="M315.9,208.51c-1.77-.47-3.55-.88-5.29-1.42-5.59-1.72-10.01-7.23-9.44-13.51.39-4.33,2.55-7.87,5.02-11.28,2.99-4.13,7.14-6.96,11.44-9.42,7.11-4.07,14.81-4.96,22.77-2.98,1.19.3,2.24,1.13,3.36,1.71.35.18.72.3,1.34.55,0-.99,0-1.71,0-2.43,0-20.23-.02-40.46.03-60.7,0-1.57-.42-2.37-1.85-3.21-6.05-3.54-11.94-7.33-17.92-10.98-8.05-4.91-16.14-9.75-24.2-14.64-4.28-2.59-8.54-5.21-13.17-8.03.08,1.09.19,1.87.19,2.65.01,9.9.05,19.8,0,29.7-.07,12.59-.3,25.17-.3,37.76,0,7.08-3.15,12.42-8.2,17.07-4.24,3.92-9.07,6.63-14.55,8.21-5.24,1.51-10.48,2.21-15.83.03-7.83-3.19-10.92-10.73-7.53-18.54,3.02-6.97,8.39-11.61,14.79-15.25,3.26-1.86,6.69-3.36,10.47-3.9,6-.86,11.8-.55,17.3,2.97V9.95c5.01-.98,7.84,2.79,11.23,4.91,13.75,8.56,27.32,17.39,40.96,26.12,3.66,2.34,7.38,4.6,10.96,7.07.71.49,1.21,1.79,1.22,2.71.07,16.54.06,33.08.06,49.63,0,26.63-.07,53.26.03,79.88.03,8.79-3.85,15.32-10.63,20.45-4.94,3.74-10.45,6.17-16.54,7.32-.91.17-1.83.32-2.74.49h-2.95ZM345.08,100.72c0-6.43.02-12.43-.04-18.43,0-.49-.5-1.13-.95-1.42-1.82-1.18-3.71-2.25-5.57-3.37-7.3-4.38-14.61-8.73-21.88-13.15-8.78-5.32-17.52-10.7-26.28-16.05-.73-.44-1.48-.84-2.53-1.43,0,1.22-.01,1.95,0,2.69.11,4.53.47,9.07.23,13.58-.12,2.24.61,3.26,2.42,4.12,1.41.67,2.71,1.6,4.05,2.42,6.64,4.05,13.29,8.09,19.92,12.17,10.07,6.19,20.13,12.41,30.63,18.88Z"/>
          <path class="cls-1" d="M0,37.64c10.58.01,21.16-.13,31.73.09,7.69.16,15.36,1.03,22.69,3.58,13.06,4.54,21.44,13.54,25.39,26.79,1.23,4.13,1.79,8.32,1.67,12.56-.22,7.48-2.06,14.56-5.89,21.07-5.15,8.73-12.71,14.47-22.08,17.98-6.72,2.51-13.67,3.61-20.85,3.56-10.88-.09-21.77,0-32.65,0V37.64ZM13.99,117.03c6.92,0,13.66.23,20.37-.06,8.22-.35,15.23-3.92,20.87-9.76,6.5-6.73,9.21-15.2,9.72-24.39.28-5-.33-9.9-1.75-14.76-2.02-6.88-5.82-12.51-11.25-16.99-6.41-5.28-14.09-7.28-22.25-7.53-4.46-.14-8.93.07-13.39-.07-1.91-.06-2.35.58-2.35,2.41.06,23.18.04,46.36.04,69.53v1.61Z"/>
          <path class="cls-1" d="M555.04,3.32c-1.58,2.39-3.16,4.77-4.76,7.19-2.17-.72-2.66-3.61-.69-5.87,1.44-1.66,3.13-3.1,4.72-4.63.25.17.69.32.7.5.07.94.03,1.88.03,2.82Z"/>
          <path class="cls-1" d="M464.06,73.56c-2.72,2.92-5.43,5.86-8.18,8.77-5.67,5.99-11.26,12.05-16.68,18.28-5.28,6.07-10.87,12.01-17.56,16.66-3.57,2.48-7.24,4.84-11.6,5.77-3.15.67-6.22.78-9.09-1-3.35-2.08-4.66-5.4-4.86-9.05-.13-2.36.58-4.77.9-7.16.05-.4.06-.8.13-1.71-1.42,1.45-2.51,2.58-3.62,3.7-4.38,4.41-8.83,8.81-14.25,11.92-2.93,1.68-6.22,2.97-9.51,3.73-4.34,1.01-9.07-3.39-9.57-7.86-.88-7.9,2.54-14.16,6.98-20.15,3.74-5.05,8.38-9.15,13.31-12.97.56-.43.98-1.03,1.65-1.75-1.4-1.2-3.02-.77-4.43-.55-4.59.73-7.05,4.34-9.76,7.56-1.25,1.49-2.44,3.04-3.85,4.38-.69.66-1.74,1.73-2.81.75-1.03-.94-1.09-2.31-.22-3.46,1.79-2.37,3.59-4.73,5.52-6.98,2.75-3.22,4.88-6.7,5.86-10.88.66-2.81,1.4-5.61,3.55-7.82,2.43-2.51,5.73-.95,6.73,1.58,1.39,3.52-.09,6.26-2.51,9.29.82.05,1.38.19,1.9.1,3.02-.51,6.03-1.06,9.03-1.63,1.98-.37,4.36-1.22,5.57.77,1.2,1.98-.8,3.84-1.94,5.25-3.61,4.47-7.75,8.51-11.28,13.03-3.94,5.04-7.52,10.38-11.09,15.69-1.19,1.77-2.07,3.82-2.74,5.86-.34,1.03-.26,2.61.33,3.43.74,1.04,2.19.44,3.3,0,1.01-.4,2.13-.67,2.97-1.3,3.58-2.7,7.25-5.32,10.57-8.32,6.52-5.88,12.18-12.6,17.72-19.41,3.02-3.71,6.45-7.1,9.53-10.76,3.75-4.45,7.34-9.04,10.99-13.58.49-.6.91-1.26,1.42-1.97-1.15-.18-2.35-.14-3.32-.59-.93-.43-1.62-1.38-2.41-2.1.86-.74,1.62-1.87,2.6-2.12,1.45-.36,3.07-.25,4.58-.06,2.02.26,3.12-.82,4.26-2.21,5.03-6.16,10.21-12.2,15.15-18.43,2.31-2.92,7.48-1.21,8.89,1.07.38.61.42,1.86.04,2.43-2.11,3.17-4.37,6.23-6.62,9.3-1.75,2.39-3.54,4.74-5.46,7.31.59.21.93.43,1.3.46.8.06,1.6.02,2.4.02,1.54,0,3,.24,3.4,2.02.28,1.22-1.37,2.59-3.29,2.7-1.84.11-3.72.23-5.53-.03-1.91-.27-2.94.71-3.9,1.98-4.9,6.46-9.8,12.92-14.63,19.42-3.49,4.71-6.87,9.5-10.32,14.24-2.53,3.47-5.27,6.81-7.61,10.41-1.32,2.04-2.18,4.43-2.95,6.76-.66,2,1.09,4.09,3.23,4.12,4.13.07,7.71-1.65,10.83-4.04,4.22-3.24,8.39-6.61,12.17-10.35,4.34-4.31,8.21-9.09,12.32-13.64,2.96-3.27,5.93-6.54,8.98-9.73,2.81-2.94,5.81-5.7,8.59-8.66,1.88-2.01,2.37-4.68,2.91-7.3.3-1.46.57-2.98,1.18-4.32.68-1.5,2.34-2.48,3.7-1.87,1.31.59,2.7,2.11,3.04,3.48.63,2.51-.25,5.01-1.74,7.35,12.7,17.3,10.13,32.82-6.01,46.65.15.14.29.28.44.41,3.36-1.79,6.8-3.45,10.06-5.4,6.81-4.06,12.6-9.39,17.93-15.2,2.74-2.99,5.13-6.3,7.69-9.46.27-.33.56-.74.93-.88.62-.22,1.58-.57,1.91-.29.54.45.95,1.37.95,2.09,0,.78-.43,1.65-.89,2.33-6.75,10.02-15.13,18.41-25.32,24.91-6.78,4.32-14.19,7.28-22.13,8.57-4.68.76-9.44.69-14.08-.73-3.51-1.07-6.49-5.09-6.42-8.79.07-4.07,2.4-7.37,6.12-8.5,1.72-.52,3.44-.59,5.1.39,2.07,1.23,2.31,3.4.33,4.82-1.36.97-2.92,1.67-4.4,2.47-1.44.76-2.26,1.84-1.65,3.5.47,1.29,2.41,2.07,3.91,1.91,3.04-.33,5.47-1.88,7.68-3.79,5.32-4.6,9.66-9.96,12.72-16.36,2.18-4.57,3.75-9.32,3.64-14.36-.07-3.49-.54-7.1-2.69-10.15Z"/>
          <path class="cls-1" d="M129.13,80.44c.3-4.45-.12-8.9-1.43-13.27-1.04-3.45-5.07-6.71-9.2-7-3.51-.24-7.04-.36-10.15,1.99-2.07,1.57-2.94,3.6-3.19,6.02-.2,2-.13,4.04-.47,6.01-.52,3.03-3.15,4.86-6.4,4.75-2.71-.09-5.59-2.6-6-5.24-.83-5.24,1.51-9.55,6.41-12.49,7.34-4.41,15.35-5.59,23.67-5.04,4.71.31,9.38,1.16,13.4,4,3.77,2.67,5.75,6.42,5.87,10.92.26,10.74.31,21.48.39,32.22.05,6.58,0,13.16,0,19.83h-12.81v-9.15c-2.07,1.56-3.84,2.77-5.47,4.14-5.16,4.34-11.03,6.75-17.82,6.55-8.15-.24-13.93-3.92-16.07-12.28-1.51-5.92.19-11.24,4.19-15.82,4.45-5.11,10.33-7.98,16.54-10.17,6.07-2.14,12.25-3.97,18.53-5.98ZM129.19,84.93c-.54,0-.96-.11-1.26.02-5.02,2.17-10.14,4.15-14.99,6.64-3.26,1.67-6.15,3.98-8.49,7-2.84,3.66-3.15,8.96.07,13.84,2.47,3.74,7.57,5.57,12.11,4.43,4.39-1.1,7.89-3.76,11.49-6.3.85-.6,1.11-1.24,1.1-2.24-.04-5.9-.02-11.79-.02-17.69,0-1.89,0-3.79,0-5.7Z"/>
          <path class="cls-1" d="M147.2,57.6c4.69,0,9.16-.03,13.63.05.44,0,1.02.56,1.27,1.01,2.69,4.88,5.33,9.79,7.97,14.69,4.71,8.74,9.43,17.48,14.13,26.23.99,1.85,1.94,3.73,3.12,6.02,1.27-2.84,2.4-5.28,3.47-7.75,2.86-6.58,5.71-13.17,8.56-19.75,2.71-6.26,5.41-12.51,8.11-18.77.48-1.11,1-1.94,2.49-1.76,1.51.18,3.07.04,4.89.04-.81,1.78-1.56,3.39-2.27,5.02-3.09,7.14-6.16,14.29-9.25,21.44-3.19,7.37-6.39,14.74-9.58,22.11-2.33,5.38-4.65,10.76-6.97,16.14-1.89,4.38-3.59,8.85-5.68,13.14-3.79,7.8-8.73,14.56-17.49,17.39-4.41,1.43-8.84,1.71-12.93-.93-3.5-2.26-3.56-4.46-2.93-7.7.46-2.41,3.49-4.67,6.35-4.6,2,.04,4.25.29,5.92,1.25,5.46,3.12,9.75,1.84,12.72-3.35,1.89-3.3,3.46-6.79,5.13-10.21.92-1.9,1.79-3.84,2.57-5.8.21-.54.28-1.34.02-1.82-3.42-6.41-6.92-12.78-10.36-19.18-2.52-4.68-4.97-9.41-7.49-14.09-4.79-8.89-9.62-17.77-14.43-26.66-.34-.62-.6-1.28-.99-2.13Z"/>
          <path class="cls-1" d="M217.18,112.89c1.96-1.74,3.55-3.16,5.18-4.62,1.36,1.59,2.67,3.25,4.1,4.79,3.47,3.72,7.22,6.81,12.67,7.36,4.82.49,8.84-.47,12.52-3.79,3.5-3.17,3.33-9.25.2-12.62-2.77-2.99-6.16-4.97-9.83-6.71-5.73-2.7-11.68-5.07-16.67-9.12-9.36-7.6-8.64-21.6,1.27-27.99,4.07-2.62,8.53-3.95,13.36-4.05,4.09-.09,8.1.09,11.99,1.76,4.23,1.82,7.41,4.82,10.37,8.16.28.32.48.72.8.98,1,.84.76,1.51-.16,2.21-1.19.91-2.34,1.86-3.54,2.82-2.59-3.75-5.29-7.17-9.11-9.37-6-3.46-12.29-3.89-18.29-.24-4.87,2.96-5.27,8.76-1.43,12.99,2.8,3.08,6.5,4.79,10.18,6.54,5.83,2.76,11.73,5.4,17.36,8.52,4.57,2.54,7.68,6.6,8.47,11.9.79,5.32-.43,10.34-4.01,14.46-4.24,4.88-9.89,6.85-16.22,7.56-4.74.54-9.44.49-13.9-.93-3.21-1.02-6.23-2.89-9.04-4.81-2.28-1.56-4.12-3.75-6.28-5.78Z"/>
          <path class="cls-1" d="M522.34,61.03c-1.88-.63-3.3-1.1-4.71-1.58-1.26-.43-1.6-1.21-.9-2.38,2.83-4.71,5.59-9.46,8.51-14.11,2.85-4.55,5.84-9.01,8.82-13.48,2.68-4.02,5.43-7.98,8.12-11.99,1.11-1.65,2.24-3.31,3.16-5.07,1.18-2.26.77-2.91,4.3-.71-9.06,16.38-18.14,32.77-27.29,49.31Z"/>
          <path class="cls-1" d="M512.94,71.02c-.6-.72-1.09-.91-1.67.19-.88,1.7-1.88,3.35-2.82,5.02-.81-3.45,1.81-9.02,4.86-10.53,1.3-.64,2.17-.18,3.08.66,1.02.95-.12,1.4-.39,2.09-.46,1.17-1.05,2.36-1.14,3.58-.09,1.24-.61,1.84-1.6,2.37-1.26.68-2.45,1.48-4.05,2,1.2-1.73,2.4-3.47,3.73-5.38Z"/>
          <path class="cls-1" d="M515.98,59.96c1.49.8,2.83,1.52,4.26,2.29-1.31.89-1.02,4.12-3.87,2.51-2.3-1.3-2.09-1.06-.39-4.8Z"/>
        </svg>

      </a>
    </div>



    <!-- Dropdown and Navigation Items -->
    <div class="flex lg:hidden items-center justify-end">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
        <span class="sr-only">Open main menu</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <div class="hidden lg:flex lg:gap-x-1.5 items-center">
      <Menu v-for="item in navigation" :key="item.name" as="div" class="relative inline-block text-left items-center">
        <Popover v-if="item.dropdown" class="hidden relative lg:block">
          <PopoverButton class="inline-flex w-full items-center justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-white">
            {{ item.name }}
            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div class="w-screen max-w-md flex-auto overflow-hidden rounded-xl text-sm leading-6 shadow-purple-400/30 shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4 bg-white">
                  <div v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.name" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-yellow-300">
                    <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:text-yellow-400 text-gray-600">
                      <component :is="dropdownItem.icon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <a :href="dropdownItem.href" class="cursor-pointer font-semibold text-gray-900">
                        {{ dropdownItem.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ dropdownItem.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- call to actions if any -->
                <div v-if="item.cta && item.cta.length" class="grid divide-x divide-gray-900/5 bg-gray-50">

                  <a v-for="ctaItem in item.cta" :key="ctaItem.name" :href="ctaItem.href" class="cursor-pointer flex w-full items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-500 hover:text-yellow-400 hover:bg-charade-700">
                     <component :is="ctaItem.icon" class="h-5 w-5 flex-none" aria-hidden="true" />
                    {{ ctaItem.name }}
                  </a>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <a v-else :href="item.href" class="cursor-pointer inline-flex w-full items-center justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold ">{{ item.name }}</a>

        <transition v-if="item.dropdown" enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-purple-400/30 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.name" v-slot="{ active }">
                <a :href="dropdownItem.href" :class="[active ? 'bg-gray-100 cursor-pointer text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm ']">{{ dropdownItem.name }}</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>






    <!-- Additional Nav Item -->
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="/volunteer" class="cursor-pointer text-sm font-semibold leading-6">Get involved <span aria-hidden="true">&rarr;</span></a>
    </div>
  </nav>







  <!-- Mobile Menu Dialog -->
  <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
  <div class="fixed inset-0 z-50"></div>
  <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-white">
    <div class="flex items-center justify-between">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">{{company}}</span>
        <p class="w-auto font-bold text-lg">{{company}}</p>
      </a>
      <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
        <span class="sr-only">Close menu</span>
        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-6 flow-root">
      <div class="-my-6 divide-y divide-gray-500/10">
        <!-- Loop through navigation items for mobile menu -->
        <div v-for="item in navigation" :key="item.name" class="pt-6">
          <!-- Check if the item has dropdown items -->
          <div v-if="item.dropdown">
            <!-- Dropdown Title -->
            <p class="text-base font-bold leading-7 text-gray-900">{{ item.name }}</p>
            <!-- Dropdown Items -->
            <div class="space-y-2 mt-3">
              <a v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.name" :href="dropdownItem.href" class="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">{{ dropdownItem.name }}</a>
            </div>
          </div>
          <a v-else :href="item.href" class="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
        </div>
        <!-- Additional Link -->
        <div class="py-6">
          <a href="/volunteer" class="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Become a volunteer <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>
  </DialogPanel>
  </Dialog>

</template>

<script setup>

import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ref } from 'vue';

import { XMarkIcon, Bars3Icon, ChevronDownIcon, CursorArrowRippleIcon, SparklesIcon } from '@heroicons/vue/20/solid';

import {
  CalendarDaysIcon,
  VideoCameraIcon,
  FilmIcon,
  TicketIcon,
  FireIcon
} from '@heroicons/vue/24/outline';


const company = 'DaysArts'

const navigation = ref([
  {
    name: 'Movies',
    dropdown: true,
    dropdownItems: [
      {
        name: 'Now playing',
        href: '/now-playing',
        description: 'See what movies are playing and coming',
        icon: VideoCameraIcon
      },
      {
        name: 'Reel alternative film',
        href: '/reel-alternative-film',
        description: 'Superb independent, Canadian and foreign films',
        icon: FilmIcon
      }
    ]
  },
  {
    name: 'Events',
    dropdown: true,
    dropdownItems: [
      {
        name: 'Upcoming events',
        href: '/event',
        description: 'We have varity of six amazing shows per year',
        icon: CalendarDaysIcon
      },
      {
        name: 'Past shows',
        href: '/past-events',
        description: 'View the past talent we have hosted',
        icon: FireIcon
      }
    ],
  },
  { name: 'About',
    dropdown: true,
    dropdownItems: [
      {
        name: 'About us',
        href: '/about',
        description: 'Learn all about Daysland and District Cultural Arts Society at the Palace Theatre',
        icon: CursorArrowRippleIcon
      },
      {
        name: 'Kamotion dance',
        href: '/kamotion-dance',
        description: 'Non-competitive dance class for all abilities',
        icon: SparklesIcon
      }
    ],
    cta: [
      {
        name: 'Get involved',
        href: '/volunteer',
        icon: TicketIcon
      }
    ]
  },
  { name: 'Rental', href: '/rental' }
]);

const mobileMenuOpen = ref(false);
</script>