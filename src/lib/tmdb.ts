const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_KEY = "88666629d43637cbe2645b331f065d1c"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface TMDBResponse {
  results: Movie[]
  total_pages: number
  total_results: number
  page: number
}

export interface MovieDetails extends Movie {
  runtime: number
  budget: number
  revenue: number
  genres: Genre[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  homepage: string
  imdb_id: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

async function tmdbFetch(endpoint: string, params: string = ''): Promise<TMDBResponse|Movie> {
  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}${params ? '&' + params : ''}`
 
  console.log('Fetching URL:', url.replace(API_KEY!, 'API_KEY_HIDDEN'))
 
  const response = await fetch(url, { next: { revalidate: 3600 } })
 
  if (!response.ok) {
    const errorText = await response.text()
    console.error('TMDB API error:', response.status, errorText)
    throw new Error(`TMDB API error: ${response.status} - ${errorText}`)
  }
 
  return response.json()
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data: TMDBResponse = await tmdbFetch('/movie/popular') as TMDBResponse
  return data.results
}

export async function getMovieById(id: number): Promise<Movie> {
  return await tmdbFetch(`/movie/${id}`) as MovieDetails
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data: TMDBResponse = await tmdbFetch('/search/movie', `query=${encodeURIComponent(query)}`) as TMDBResponse
  return data.results
}

export function getImageUrl(path: string, size: string = 'w500'): string {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`
}