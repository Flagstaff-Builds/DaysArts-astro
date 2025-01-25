<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">Events</h2>
        <p class="text-sm text-gray-500">Manage upcoming and past events</p>
      </div>
      <Button @click="openAddEventDialog">
        Add Event
      </Button>
    </div>

    <div class="mb-6">
      <div class="flex items-center space-x-4">
        <Button
          :variant="activeTab === 'upcoming' ? 'default' : 'outline'"
          @click="activeTab = 'upcoming'"
        >
          Upcoming Events
        </Button>
        <Button
          :variant="activeTab === 'past' ? 'default' : 'outline'"
          @click="activeTab = 'past'"
        >
          Past Events
        </Button>
      </div>
    </div>

    <div class="rounded-md border">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="h-12 px-4 text-left align-middle font-medium">Title</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Category</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Status</th>
            <th class="h-12 px-4 text-left align-middle font-medium w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in filteredEvents" :key="event.id" class="border-b">
            <td class="p-4">{{ event.title }}</td>
            <td class="p-4">{{ formatDate(event.eventDate) }}</td>
            <td class="p-4">{{ event.category }}</td>
            <td class="p-4">
              <span :class="[
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ event.status }}
              </span>
            </td>
            <td class="p-4">
              <div class="flex space-x-2">
                <Button variant="ghost" @click="editEvent(event)">Edit</Button>
                <Button variant="ghost" class="text-red-600" @click="deleteEvent(event)">Delete</Button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredEvents.length === 0">
            <td colspan="5" class="text-center py-4">
              No {{ activeTab }} events found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Event Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 bg-black/50">
      <div class="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Event' : 'Add Event' }}</h3>
        <p class="text-sm text-gray-500">
          {{ isEditing ? 'Update the event details below.' : 'Enter the event details below.' }}
        </p>
        
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Title</label>
            <input
              v-model="eventForm.title"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Event Date & Time</label>
            <input
              type="datetime-local"
              v-model="eventForm.eventDate"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Category</label>
            <select
              v-model="eventForm.category"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            >
              <option value="performance">Performance</option>
              <option value="workshop">Workshop</option>
              <option value="exhibition">Exhibition</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="eventForm.description"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            ></textarea>
          </div>
        </div>
        
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="showDialog = false">Cancel</Button>
          <Button @click="saveEvent">Save</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Button from '../ui/button/Button.vue'

const events = ref([])
const showDialog = ref(false)
const isEditing = ref(false)
const activeTab = ref('upcoming')
const eventForm = ref({
  id: null,
  title: '',
  eventDate: '',
  category: 'performance',
  description: '',
  status: 'upcoming'
})

const filteredEvents = computed(() => {
  return events.value.filter(event => event.status === activeTab.value)
})

onMounted(async () => {
  await loadEvents()
})

async function loadEvents() {
  try {
    // TODO: Implement Appwrite database query
    // For now using mock data
    events.value = [
      {
        id: 1,
        title: 'Sample Event',
        eventDate: '2025-02-01T19:00',
        category: 'performance',
        description: 'A sample event description',
        status: 'upcoming'
      }
    ]
  } catch (error) {
    console.error('Failed to load events:', error)
  }
}

function openAddEventDialog() {
  isEditing.value = false
  eventForm.value = {
    id: null,
    title: '',
    eventDate: '',
    category: 'performance',
    description: '',
    status: 'upcoming'
  }
  showDialog.value = true
}

function editEvent(event) {
  isEditing.value = true
  eventForm.value = { ...event }
  showDialog.value = true
}

async function saveEvent() {
  try {
    // TODO: Implement Appwrite database save
    if (isEditing.value) {
      // Update existing event
      const index = events.value.findIndex(e => e.id === eventForm.value.id)
      if (index !== -1) {
        events.value[index] = { ...eventForm.value }
      }
    } else {
      // Add new event
      events.value.push({
        ...eventForm.value,
        id: Date.now() // Temporary ID generation
      })
    }

    showDialog.value = false
  } catch (error) {
    console.error(`Failed to ${isEditing.value ? 'update' : 'add'} event:`, error)
  }
}

async function deleteEvent(event) {
  if (!confirm('Are you sure you want to delete this event?')) return

  try {
    // TODO: Implement Appwrite database delete
    events.value = events.value.filter(e => e.id !== event.id)
  } catch (error) {
    console.error('Failed to delete event:', error)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>
