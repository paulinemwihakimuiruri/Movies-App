'use client'

import MovieGrid from '@/components/MovieGrid'
import Navbar from '@/components/Navbar'
import { Movie, searchMovies } from '@/lib/tmdb'
import { useState } from 'react'


export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const results = await searchMovies(query)
      setMovies(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Movies</h1>
       
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-tmdb-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-tmdb-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {movies.length > 0 && <MovieGrid movies={movies} />}
      </div>
    </main>
  )
}