import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/Navbar";
import { getPopularMovies } from "@/lib/tmdb";


export default async function Home() {
  
  const movies = await getPopularMovies()
  return (
    <div className="min-h-screen">
      <Navbar/>
      <div>
        <h1>Popular Movies</h1>
        <MovieGrid movies={movies}/>
      </div>
    </div>
  );
}
