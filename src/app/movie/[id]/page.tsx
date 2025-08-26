import Navbar from '@/components/Navbar'
import { getImageUrl, getMovieById } from '@/lib/tmdb'
import Image from 'next/image'


interface MoviePageProps {
  params: { id: string }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieById(parseInt(params.id))

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(movie.poster_path, 'w780')}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center mb-6">
              <span className="text-yellow-400 text-xl mr-2">★</span>
              <span className="text-xl">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400 ml-4">{movie.release_date}</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  )
}