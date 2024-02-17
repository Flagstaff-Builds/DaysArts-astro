<template>
  <div class="bg-white">

    <main class="isolate">


      <!-- Content section -->
      <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Exciting Insights from DaysArts!</h2>
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p class="mt-10 text-lg font-semibold leading-8 tracking-tight text-gray-900">Where Every Snack Counts!</p>
              <div class="mt-4 max-w-xl text-base leading-7 text-gray-700">
                <p>Did you know that every treat you purchase at our concession stand fuels the magic of DaysArts? Yes, that's right! Each popcorn, soda, and snack you enjoy contributes directly to keeping the Daysland Palace Theatre alive and buzzing. From essential utilities like heat and power to those crucial supplies that keep our space clean and welcoming (think napkins, hand soaps, and more), your munching matters!</p>
              </div>
              <p class="mt-10 text-lg font-semibold leading-8 tracking-tight text-gray-900">Powered by Passion and Volunteers</p>
              <div class="mt-4 max-w-xl text-base leading-7 text-gray-700">
                <p>And here's something truly special about us: The Daysland Palace Theatre is a marvel of community spirit, operated entirely by volunteers! Every ticket you buy, every show you attend is brought to life by dedicated individuals who volunteer their time and energy. This isn't just a theatre; it's a testament to what we can achieve when we come together for the love of art and community. So, next time you're here, remember: each moment of your experience is made possible by the incredible efforts of our volunteers. Let's celebrate this extraordinary journey together at DaysArts!</p>
              </div>
            </div>
            <div class="lg:flex lg:flex-auto lg:justify-center">
              <dl class="w-64 space-y-8 xl:w-80">
                <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse gap-y-4">
                  <dt class="text-base leading-7 text-gray-600">{{ stat.label }}</dt>
                  <dd class="text-5xl font-bold tracking-tight text-gray-900">{{ stat.value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Image section -->
      <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img src="https://palacetheatredaysarts.files.wordpress.com/2018/07/last-day-at-theatre-082.jpg" alt="" class="aspect-[5/3] w-full object-cover xl:rounded-xl bg-purple-100" />
      </div>

      <!-- Values section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Partners: The Associations and Friends of DaysArts</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Discover the robust network of established foundations, alliances, and councils that form the backbone of DaysArts, each playing a pivotal role in enriching and sustaining our thriving cultural community.</p>
        </div>
        <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div v-for="value in values" :key="value.name">
            <dt class="font-semibold text-gray-900">{{ value.name }}</dt>
            <dd class="mt-1 text-gray-600">{{ value.description }}</dd>
          </div>
        </dl>
      </div>
    </main>

  </div>
</template>

<script setup>
import { defineComponent, h, ref } from 'vue'

const stats = [
  { label: 'of popcorn', value: '🍿 400lbs' },
  { label: 'chocolate bars enjoyed', value: '🍫 440' },
  { label: 'bottles of water drank', value: '💧 1,200' },
]
const values = [
  {
    name: 'Alberta Foundation for the Arts (AFA)',
    description:
      'The Alberta Foundation for the Arts is a dynamic provincial agency that fosters and supports the arts community in Alberta. It provides funding and grants to artists and art organizations, aiming to enrich the cultural landscape of the province. The AFA plays a pivotal role in promoting artistic creativity and cultural development in Alberta.',
  },
  {
    name: 'Arts Touring Alliance of Alberta (ATAA)',
    description:
      'The Arts Touring Alliance of Alberta is dedicated to enhancing and ensuring the viability of the performing arts touring network in Alberta. It facilitates touring opportunities for a diverse range of artistic disciplines and supports the professional development of those in the arts sector. ATAA serves as a vital connector between artists, presenters, and communities.',
  },
  {
    name: 'Motion Picture Theater Association of Alberta',
    description:
      'The Motion Picture Theater Association of Alberta (MPTAA) is a trade organization representing the interests of exhibitors behind more than 300 movie screens in Alberta.',
  }
]



const mobileMenuOpen = ref(false)
</script>