import React from 'react'
import MovieCard from '../MovieCard';
import { Movie } from '@/lib/tmdb';

interface MovieGridProps {
  movies: Movie[];
}
const MovieGrid = ({movies}:MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid;
