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
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="h-12 px-4 text-left align-middle font-medium">Title</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Release Date</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Status</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Show Times</th>
            <th class="h-12 px-4 text-left align-middle font-medium w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id" class="border-b">
            <td class="p-4">
              <div class="flex items-center space-x-3">
                <img 
                  v-if="movie.posterUrl" 
                  :src="movie.posterUrl" 
                  :alt="movie.title" 
                  class="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div class="font-medium">{{ movie.title }}</div>
                  <div class="text-sm text-gray-500">{{ movie.rating }}</div>
                </div>
              </div>
            </td>
            <td class="p-4">{{ formatDate(movie.releaseDate) }}</td>
            <td class="p-4">
              <span :class="[
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                movie.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ movie.status }}
              </span>
            </td>
            <td class="p-4">
              <div class="text-sm">
                <div v-for="(showTime, index) in movie.showTimes" :key="index">
                  {{ formatDate(showTime) }}
                </div>
              </div>
            </td>
            <td class="p-4">
              <div class="flex space-x-2">
                <Button variant="ghost" @click="editMovie(movie)">Edit</Button>
                <Button variant="ghost" class="text-red-600" @click="deleteMovie(movie)">Delete</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Movie Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 bg-black/50">
      <div class="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Movie' : 'Add Movie' }}</h3>
        <p class="text-sm text-gray-500">
          {{ isEditing ? 'Update the movie details below.' : 'Enter the movie details or search TMDB database.' }}
        </p>
        
        <div class="grid gap-4 py-4">
          <div class="space-y-2" v-if="!isEditing">
            <label class="text-sm font-medium">Search TMDB</label>
            <input
              v-model="searchQuery"
              placeholder="Type to search movies..."
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              @input="searchMovies"
            />
            <div v-if="searchResults.length > 0" class="mt-2 border rounded-md divide-y">
              <div
                v-for="result in searchResults"
                :key="result.id"
                class="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                @click="selectMovie(result)"
              >
                <img 
                  v-if="result.poster_path"
                  :src="`https://image.tmdb.org/t/p/w92${result.poster_path}`"
                  :alt="result.title"
                  class="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div class="font-medium">{{ result.title }}</div>
                  <div class="text-sm text-gray-500">{{ result.release_date?.split('-')[0] }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Title</label>
              <input
                v-model="movieForm.title"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium">Release Date</label>
              <input
                type="date"
                v-model="movieForm.releaseDate"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Status</label>
              <select
                v-model="movieForm.status"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                <option value="upcoming">Upcoming</option>
                <option value="current">Current</option>
                <option value="past">Past</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Runtime (minutes)</label>
              <input
                type="number"
                v-model="movieForm.runtime"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Rating</label>
              <input
                v-model="movieForm.rating"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">TMDB ID</label>
              <input
                v-model="movieForm.tmdbId"
                class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Poster URL</label>
            <input
              v-model="movieForm.posterUrl"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Trailer URL</label>
            <input
              v-model="movieForm.trailerUrl"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="movieForm.description"
              class="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Cast (comma-separated)</label>
            <input
              v-model="movieForm.cast"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Genres (comma-separated)</label>
            <input
              v-model="movieForm.genre"
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Show Times</label>
              <Button variant="outline" @click="addShowTime">Add Show Time</Button>
            </div>
            <div class="space-y-2">
              <div v-for="(showTime, index) in movieForm.showTimes" :key="index" class="flex space-x-2">
                <input
                  type="datetime-local"
                  v-model="movieForm.showTimes[index]"
                  class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                />
                <Button variant="ghost" class="text-red-600" @click="removeShowTime(index)">Remove</Button>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isReelAlternative"
              v-model="movieForm.isReelAlternative"
              class="rounded border-gray-300"
            />
            <label for="isReelAlternative" class="text-sm font-medium">Reel Alternative</label>
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
import { getMovies, createMovie, updateMovie, deleteMovie as deleteMovieFromDb } from '../../utils/appwrite'

const movies = ref([])
const showDialog = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const movieForm = ref({
  id: null,
  title: '',
  releaseDate: '',
  posterUrl: '',
  description: '',
  status: '',
  trailerUrl: '',
  cast: [],
  genre: [],
  tmdbId: '',
  rating: '',
  isReelAlternative: false,
  runtime: null,
  showTimes: []
})

// TMDB API token from environment variables
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN

onMounted(async () => {
  await loadMovies()
})

async function loadMovies() {
  try {
    const result = await getMovies()
    if (result.success) {
      movies.value = result.movies.map(movie => ({
        id: movie.$id,
        title: movie.title,
        releaseDate: movie.releaseDate,
        posterUrl: movie.posterUrl,
        description: movie.description,
        status: movie.status,
        trailerUrl: movie.trailerUrl,
        cast: movie.cast || [],
        genre: movie.genre || [],
        tmdbId: movie.tmdbId,
        rating: movie.rating,
        isReelAlternative: movie.isReelAlternative || false,
        runtime: movie.runtime,
        showTimes: movie.showTimes || []
      }))
    } else {
      console.error('Failed to load movies:', result.error)
    }
  } catch (error) {
    console.error('Failed to load movies:', error)
  }
}

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
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    const data = await response.json()
    searchResults.value = data.results.slice(0, 5)
  } catch (error) {
    console.error('Failed to search movies:', error)
  }
}

async function getMovieDetails(tmdbId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?append_to_response=credits,videos`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch movie details:', error)
    return null
  }
}

async function selectMovie(movie) {
  const details = await getMovieDetails(movie.id)
  if (details) {
    const trailer = details.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    movieForm.value = {
      ...movieForm.value,
      title: details.title,
      releaseDate: details.release_date,
      posterUrl: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '',
      description: details.overview,
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
      cast: details.credits?.cast?.slice(0, 5).map(actor => actor.name) || [],
      genre: details.genres?.map(g => g.name) || [],
      tmdbId: details.id.toString(),
      rating: details.vote_average ? `${Math.round(details.vote_average * 10) / 10}/10` : '',
      runtime: details.runtime || null,
      showTimes: [],
      isReelAlternative: false,
      status: 'upcoming'
    }
  }
  searchResults.value = []
  searchQuery.value = ''
}

function openAddMovieDialog() {
  isEditing.value = false
  movieForm.value = {
    id: null,
    title: '',
    releaseDate: '',
    posterUrl: '',
    description: '',
    status: '',
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
  movieForm.value = { ...movie }
  showDialog.value = true
}

async function saveMovie() {
  try {
    const movieData = {
      title: movieForm.value.title,
      releaseDate: movieForm.value.releaseDate,
      posterUrl: movieForm.value.posterUrl,
      description: movieForm.value.description,
      status: movieForm.value.status,
      trailerUrl: movieForm.value.trailerUrl,
      cast: movieForm.value.cast,
      genre: movieForm.value.genre,
      tmdbId: movieForm.value.tmdbId,
      rating: movieForm.value.rating,
      isReelAlternative: movieForm.value.isReelAlternative,
      runtime: movieForm.value.runtime,
      showTimes: movieForm.value.showTimes
    }

    let result
    if (isEditing.value) {
      result = await updateMovie(movieForm.value.id, movieData)
    } else {
      result = await createMovie(movieData)
    }

    if (result.success) {
      showDialog.value = false
      await loadMovies()
    } else {
      console.error(`Failed to ${isEditing.value ? 'update' : 'add'} movie:`, result.error)
    }
  } catch (error) {
    console.error(`Failed to ${isEditing.value ? 'update' : 'add'} movie:`, error)
  }
}

async function deleteMovie(movie) {
  if (!confirm('Are you sure you want to delete this movie?')) return

  try {
    const result = await deleteMovieFromDb(movie.id)
    if (result.success) {
      await loadMovies()
    } else {
      console.error('Failed to delete movie:', result.error)
    }
  } catch (error) {
    console.error('Failed to delete movie:', error)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString()
}

function addShowTime() {
  movieForm.value.showTimes.push(new Date().toISOString().slice(0, 16))
}

function removeShowTime(index) {
  movieForm.value.showTimes.splice(index, 1)
}
</script>
