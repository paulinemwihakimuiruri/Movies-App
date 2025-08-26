import { getImageUrl, Movie } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  movie: Movie;
}
const MovieCard = ({movie}:MovieCardProps) => {
  return (
    <div>
      <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
          <div className="relative aspect-[2/3]">
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <p className="text-gray-400 text-sm mb-2">{movie.release_date}</p>
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm ml-1">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
