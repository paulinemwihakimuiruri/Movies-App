import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-tmdb-dark shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-tmdb-primary">
            MovieDB
          </Link>
          <nav className="space-x-6">
            <Link
              href="/"
              className="hover:text-tmdb-primary transition-colors"
            >
              Popular
            </Link>
            <Link
              href="/search"
              className="hover:text-tmdb-primary transition-colors"
            >
              Search
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
