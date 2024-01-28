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
        <img src="https://palacetheatredaysarts.files.wordpress.com/2018/07/last-day-at-theatre-082.jpg" alt="" class="aspect-[5/3] w-full object-cover xl:rounded-xl" />
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

      <!-- Team section -->
      <!-- <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Spotlight on Excitement: Upcoming Events at DaysArts</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Step into a world of entertainment with our lineup of upcoming concerts and shows at DaysArts, where each event promises to be a memorable highlight in our vibrant cultural calendar.</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
          <li v-for="person in team" :key="person.name">
            <a :href="person.eventLink">
              <img class="mx-auto h-48 w-48 rounded-lg object-cover" :src="person.imageUrl" alt="" />
              <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{{ person.name }}</h3>
              <p class="text-sm leading-6 text-gray-600">{{ person.date }}</p>
            </a>
          </li>
        </ul>
      </div> -->

      <!-- Blog section -->
      <!-- <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Vel dolorem qui facilis soluta sint aspernatur totam cumque.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in blogPosts" :key="post.id" class="relative isolate flex flex-col justify-end overflow-hidden rounded-xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
            <img :src="post.imageUrl" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div class="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />

            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
              <div class="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div class="flex gap-x-2.5">
                  <img :src="post.author.imageUrl" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10" />
                  {{ post.author.name }}
                </div>
              </div>
            </div>
            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
              <a :href="post.href">
                <span class="absolute inset-0" />
                {{ post.title }}
              </a>
            </h3>
          </article>
        </div>
      </div> -->
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
      'The Motion Picture Theatre Association of Alberta (MPTAA) is a trade organization representing the interests of exhibitors behind more than 300 movie screens in Alberta.',
  }
]
const team = [
  {
    name: 'Scarlett Butler',
    style: 'Canadian country music',
    imageUrl:
      'https://d10j3mvrs1suex.cloudfront.net/s:bzglfiles/u/513318/445066852ecbf7f7a1c99ea563cd8e4ca193e01e/original/troy-joni-shelter-2020-low-res-34.jpg',
    eventLink: '/event/scarlett-butler',
    date: 'Jan 1, 2023',
  },
  {
    name: 'Jake Vaadeland',
    style: 'Bluegrass and 50\'s rockabilly',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/6466b769c4608b6fe0b762c4/7f4a0867-53a5-4bb6-9099-1781263ae84a/jake-vaadeland.jpeg',
    eventLink: '/event/scarlett-butler',
    date: 'Jan 1, 2023',
  },
  // More people...
]


const mobileMenuOpen = ref(false)
</script>