<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">Movies</h2>
        <p class="text-sm text-gray-500">Manage upcoming movies and showtimes</p>
      </div>
      <Button @click="openAddMovieDialog">Add Movie</Button>
    </div>

    <div class="rounded-md border">
      <table class="w-full" role="table" aria-label="Movies List">
        <thead>
          <tr class="border-b">
            <th scope="col" class="h-12 px-4 text-left align-middle font-medium">Title</th>
            <th scope="col" class="h-12 px-4 text-left align-middle font-medium">Rating</th>
            <th scope="col" class="h-12 px-4 text-left align-middle font-medium">Runtime</th>
            <th scope="col" class="h-12 px-4 text-left align-middle font-medium">Show Times</th>
            <th scope="col" class="h-12 px-4 text-left align-middle font-medium w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id" class="border-b">
            <td class="p-4">
              <div class="flex items-center space-x-3">
                <img 
                  v-if="movie.posterUrl" 
                  :src="movie.posterUrl" 
                  :alt="`Movie poster for ${movie.title}`"
                  class="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div class="font-medium">{{ movie.title }}</div>
                  <div class="text-sm text-gray-500" v-if="movie.genre?.length">
                    <span class="sr-only">Genres:</span>
                    {{ movie.genre.join(', ') }}
                  </div>
                </div>
              </div>
            </td>
            <td class="p-4">
              <span class="sr-only">Rating:</span>
              {{ movie.rating }}
            </td>
            <td class="p-4">
              <span class="sr-only">Runtime:</span>
              {{ movie.runtime }} min
            </td>
            <td class="p-4">
              <div class="text-sm">
                <span class="sr-only">Showtimes:</span>
                <div v-for="(showTime, index) in formatShowtimes(movie.showTimes)" :key="index">
                  {{ showTime }}
                </div>
              </div>
            </td>
            <td class="p-4">
              <div class="flex space-x-2">
                <Button 
                  variant="ghost" 
                  @click="editMovie(movie)"
                  :aria-label="`Edit ${movie.title}`"
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  class="text-red-600" 
                  @click="handleDeleteMovie(movie)"
                  :aria-label="`Delete ${movie.title}`"
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Movie Dialog -->
    <div 
      v-if="showDialog" 
      class="fixed inset-0 z-50 bg-black/50"
      role="dialog"
      :aria-label="`${isEditing ? 'Edit' : 'Add'} Movie`"
    >
      <div class="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Movie' : 'Add Movie' }}</h3>
        <p class="text-sm text-gray-500">
          {{ isEditing ? 'Update the movie details below.' : 'Enter the movie details or search TMDB database.' }}
        </p>
        
        <div class="grid gap-4 py-4">
          <div class="space-y-2" v-if="!isEditing">
            <label for="tmdb-search" class="text-sm font-medium">Search TMDB</label>
            <input
              id="tmdb-search"
              v-model="searchQuery"
              placeholder="Type to search movies..."
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              @input="searchMovies"
            />
            <div 
              v-if="searchResults.length > 0" 
              class="mt-2 border rounded-md divide-y"
              role="listbox"
              aria-label="Search Results"
            >
              <button
                v-for="result in searchResults"
                :key="result.id"
                class="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 w-full text-left"
                @click="selectMovie(result)"
                role="option"
              >
                <img 
                  v-if="result.poster_path"
                  :src="`https://image.tmdb.org/t/p/w92${result.poster_path}`"
                  :alt="`Movie poster for ${result.title}`"
                  class="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div class="font-medium">{{ result.title }}</div>
                  <div class="text-sm text-gray-500">{{ result.release_date?.split('-')[0] }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Movie Form Fields -->
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="movie-title" class="text-sm font-medium">Title</label>
              <input
                id="movie-title"
                v-model="movieForm.title"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="movie-description" class="text-sm font-medium">Description</label>
              <textarea
                id="movie-description"
                v-model="movieForm.description"
                class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                rows="3"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label for="movie-rating" class="text-sm font-medium">Rating</label>
              <input
                id="movie-rating"
                v-model="movieForm.rating"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label for="movie-runtime" class="text-sm font-medium">Runtime (minutes)</label>
              <input
                id="movie-runtime"
                v-model="movieForm.runtime"
                type="number"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label for="movie-genres" class="text-sm font-medium">Genres (comma-separated)</label>
              <input
                id="movie-genres"
                v-model="movieForm.genre"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label for="movie-cast" class="text-sm font-medium">Cast (comma-separated)</label>
              <input
                id="movie-cast"
                v-model="movieForm.cast"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Showtimes</label>
              <div class="space-y-2">
                <div v-for="(showtime, index) in movieForm.showTimes" :key="index" class="flex gap-2">
                  <input
                    type="datetime-local"
                    v-model="movieForm.showTimes[index]"
                    class="flex h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    :aria-label="`Showtime ${index + 1}`"
                  />
                  <Button variant="ghost" @click="removeShowTime(index)" :aria-label="`Remove showtime ${index + 1}`">
                    Remove
                  </Button>
                </div>
                <Button variant="ghost" @click="addShowTime">Add Showtime</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="showDialog = false">Cancel</Button>
          <Button @click="saveMovie">Save</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from '../ui/button/Button.vue'
import { getMovies, createMovie, updateMovie, deleteMovie as deleteMovieFromDb } from '@/utils/appwrite'

const movies = ref([])
const showDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const selectedMovie = ref(null)

const movieForm = ref({
  title: '',
  releaseDate: '',
  posterUrl: '',
  description: '',
  status: 'active',
  trailerUrl: '',
  cast: [],
  genre: [],
  tmdbId: '',
  rating: '',
  isReelAlternative: false,
  runtime: null,
  showTimes: []
})

// Load movies from Appwrite
async function loadMovies() {
  try {
    const response = await getMovies()
    movies.value = response
  } catch (error) {
    console.error('Error loading movies:', error)
  }
}

// Format date for display
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'Invalid date'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

// Format showtimes for display
function formatShowtimes(showtimes) {
  if (!showtimes || !Array.isArray(showtimes)) return []
  return showtimes.map((showtime, index, array) => {
    const date = new Date(showtime)
    const isLastShowtime = index === array.length - 1
    const isMatinee = array.length === 3 && isLastShowtime
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + (isMatinee ? ' - Matinee' : '')
  })
}

onMounted(() => {
  loadMovies()
})

async function searchMovies() {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery.value)}`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    searchResults.value = data.results || []
  } catch (error) {
    console.error('Error searching movies:', error)
    searchResults.value = []
  }
}

async function getMovieDetails(tmdbId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?append_to_response=credits,videos`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return await response.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

async function selectMovie(movie) {
  const details = await getMovieDetails(movie.id)
  if (details) {
    movieForm.value = {
      title: details.title,
      releaseDate: details.release_date,
      posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/original${details.poster_path}` : '',
      description: details.overview,
      status: 'active',
      trailerUrl: details.videos?.results?.[0]?.key ? `https://www.youtube.com/watch?v=${details.videos.results[0].key}` : '',
      cast: details.credits?.cast?.slice(0, 5).map(actor => actor.name) || [],
      genre: details.genres?.map(genre => genre.name) || [],
      tmdbId: details.id.toString(),
      rating: '',
      isReelAlternative: false,
      runtime: details.runtime,
      showTimes: []
    }
  }
  searchResults.value = []
  searchQuery.value = ''
}

function openAddMovieDialog() {
  isEditing.value = false
  movieForm.value = {
    title: '',
    releaseDate: '',
    posterUrl: '',
    description: '',
    status: 'active',
    trailerUrl: '',
    cast: [],
    genre: [],
    tmdbId: '',
    rating: '',
    isReelAlternative: false,
    runtime: null,
    showTimes: []
  }
  showDialog.value = true
}

function editMovie(movie) {
  isEditing.value = true
  // Create a deep copy of the movie object and ensure showTimes are properly formatted
  movieForm.value = {
    ...movie,
    // Convert showTimes to local datetime-local format
    showTimes: movie.showTimes?.map(showtime => 
      new Date(showtime).toISOString().slice(0, 16)
    ) || []
  }
  showDialog.value = true
}

async function saveMovie() {
  try {
    if (typeof movieForm.value.cast === 'string') {
      movieForm.value.cast = movieForm.value.cast.split(',').map(item => item.trim())
    }
    if (typeof movieForm.value.genre === 'string') {
      movieForm.value.genre = movieForm.value.genre.split(',').map(item => item.trim())
    }

    // Prepare movie data without internal Appwrite fields
    const { id, $id, $createdAt, $updatedAt, $permissions, $collectionId, $databaseId, ...movieData } = movieForm.value

    const preparedData = {
      ...movieData,
      showTimes: movieForm.value.showTimes.map(showtime => new Date(showtime).toISOString()),
      runtime: Number(movieForm.value.runtime)
    }

    if (isEditing.value) {
      await updateMovie(movieForm.value.id || movieForm.value.$id, preparedData)
    } else {
      await createMovie(preparedData)
    }

    showDialog.value = false
    await loadMovies()
  } catch (error) {
    console.error('Error saving movie:', error)
  }
}

async function handleDeleteMovie(movie) {
  if (!confirm('Are you sure you want to delete this movie?')) return

  try {
    await deleteMovieFromDb(movie.id)
    await loadMovies()
  } catch (error) {
    console.error('Error deleting movie:', error)
  }
}

function addShowTime() {
  movieForm.value.showTimes.push(new Date().toISOString().slice(0, 16))
}

function removeShowTime(index) {
  movieForm.value.showTimes.splice(index, 1)
}
</script>
