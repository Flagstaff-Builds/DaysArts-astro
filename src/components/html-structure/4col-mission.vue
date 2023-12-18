<template>
  <footer aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8 border-t border-gray-900/10 pt-8">
        <div class="space-y-8 ">


          <!-- Branding -->
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5 hover:text-gray-600">
              <p class=" w-auto font-black text-lg">DaysArts</p>
            </a>
          </div>

          <!-- Richtext address -->
          <h2 class="text-regular text-gray-800 mb-4">Daysland and District Cultural Arts Society</h2>
          <address itemscope itemtype="http://schema.org/Organization" class="text-sm leading-6 text-gray-600">
            <span itemprop="name">Palace Theatre</span>
            <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <span itemprop="streetAddress">5012-50 Street</span><br>
                <span itemprop="addressLocality">Daysland</span>,
                <span itemprop="addressRegion">Alberta</span>
            </div>
            <p class="mt-4">
              <a href="tel:780-673-1325" itemprop="telephone" class="font-semibold leading-7 text-indigo-600 hover:underline">780-673-1325</a>
            </p>
          </address>

          <!-- Social media links -->
          <div class="flex space-x-6">
            <a v-for="item in navigation.social" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
        </div>


        <!-- Footer menu system -->
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-gray-900">Movies</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.movies" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-gray-900">Events</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.events" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-gray-900">
                <a href="/about" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">About</a></h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.about" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-gray-900"><a href="/rental" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">Rental</a></h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.rental" :key="item.name">
                  <a :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900 hover:underline">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p class="text-xs leading-5 text-gray-500">&copy; 2023 Daysland and District Cultural Arts Society. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { defineComponent, h } from 'vue';

const navigation = {
  movies: [
    { name: 'Now playing', href: '/now-playing' },
    { name: 'Reel alternative film', href: '/reel-alternative-film' },
  ],
  events: [
    { name: 'Upcoming events', href: '/event' },
    { name: 'Past shows', href: '/past-events' },
    { name: 'Become a member', href: '/membership' },
  ],
  // about: [
  //   { name: 'About', href: '#' },
  //   { name: 'Blog', href: '#' },
  //   { name: 'Jobs', href: '#' },
  //   { name: 'Press', href: '#' },
  //   { name: 'Partners', href: '#' },
  // ],
  // rental: [
  //   { name: 'Claim', href: '#' },
  //   { name: 'Privacy', href: '#' },
  //   { name: 'Terms', href: '#' },
  // ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100063455833057',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
  ],
}
</script>

<style is:global>
  address { font-style: normal; }
</style>