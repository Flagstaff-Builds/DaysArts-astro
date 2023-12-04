<script>
import { ref } from 'vue';

export const navigation = ref([
  {
    name: 'Movies',
    dropdown: true,
    dropdownItems: [
      { name: 'Now playing', href: '/now-playing' },
      { name: 'Reel alternative film', href: '/reel-alternative-film' }
    ]
  },
  {
    name: 'Events',
    dropdown: true,
    dropdownItems: [
      { name: 'Upcoming events', href: '/event' },
      { name: 'Past shows', href: '/past-events' }
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Rental', href: '/rental' },
]);

export default navigation;
</script>
