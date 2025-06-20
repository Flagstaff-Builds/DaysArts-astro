<template>
  <div class="flex flex-wrap gap-x-2 text-sm leading-7 text-slate-300 py-2 sm:py-0">
    <p class="flex font-semibold">
      showtimes <span class="inline md:hidden">:</span>
    </p>
    <div class="flex">
      <DevicePhoneMobileIcon class="mt-1 h-5 w-5 flex-none" aria-hidden="true" />
      <a href="tel:+17806731325" class="whitespace-nowrap text-sm leading-7 text-slate-300" aria-label="Call us at 780-673-1325">780-673-1325</a>
    </div>

    <div class="flex">
      <AtSymbolIcon class="mt-1 h-5 w-5 flex-none" aria-hidden="true" />
      <a href="mailto:info@daysarts.ca" class="whitespace-nowrap text-sm leading-7 text-slate-300" aria-label="Email us at info@daysarts.ca">info@daysarts.ca</a>
    </div>
  </div>
</template>

<script setup>
import { DevicePhoneMobileIcon, AtSymbolIcon } from "@heroicons/vue/20/solid";
</script>