<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 pb-6">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <div v-for="item in timeline" :key="item.name">
          <time :datetime="item.dateTime" class="flex items-center text-sm font-semibold leading-6 text-purple-600">
            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </svg>
            {{ item.date }}
            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true" />
          </time>
          <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ item.name }}</p>
          <p class="mt-1 text-base leading-7 text-gray-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const timeline = [
  {
    name: 'Tury Family Retirement',
    description: 'After the retirement of the Tury family in 1996, the Palace Theatre languished for three years.',
    date: '1996 - 1999',
    dateTime: '1996-01/1999-12',
  },
  {
    name: 'DaysArts Founded',
    description: 'In 1999, Daysland and District Cultural Arts Society (DaysArts) was founded, leading to the purchase by the town of Daysland of the Palace Theatre.',
    date: '1999',
    dateTime: '1999',
  },
  {
    name: 'Stage Construction',
    description: 'In March 2001, a stage was constructed by two dozen volunteers in a single day, showcasing the community\'s dedication.',
    date: 'Mar 2001',
    dateTime: '2001-03',
  },
  {
    name: 'Digital Projector and Audio System',
    description: 'Over $100,000 was raised by DaysArts in 2013 to install a new digital projector and updated audio system.',
    date: '2013',
    dateTime: '2013',
  },
  {
    name: 'Renovation and New Seats',
    description: 'DaysArts raised another $120,000 for floor replacement and new seats.',
    date: '2014 - 2015',
    dateTime: '2014-01/2015-12',
  },
  {
    name: 'Performances and Events',
    description: 'DaysArts has hosted a variety of events including concerts, movies, drama performances, and even weddings.',
    date: 'Ongoing',
    dateTime: '2023',
  },
]
</script>