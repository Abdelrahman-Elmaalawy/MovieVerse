import banner from "/assets/hero-bg.png";
import herobanner from "/assets/hero.png";
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import { motion } from "framer-motion";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (text) => setSearchTerm(text);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (err) {
        console.error("Error loading movies", err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  // search filter
  const filteredMovies = searchTerm.trim()
    ? movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
      )
    : movies;

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  useEffect(() => {
    const updateMoviesPerPage = () => {
      const screen = window.innerWidth;
      screen <= 768 ? setMoviesPerPage(5) : setMoviesPerPage(12);
    };

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  // slice movies
  const displayedMovies = searchTerm.trim()
    ? filteredMovies
    : movies.slice(
        (currentPage - 1) * moviesPerPage,
        currentPage * moviesPerPage
      );

  return (
    <div>
      {/* Banner */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner-content backdrop-grayscale">
          <div className="flex flex-col items-center justify-center pt-16 w-full">
            <img src={herobanner} alt="" />
          </div>
          <h1 className="text-6xl font-bold text-white text-center mt-6 leading-18">
            Find{" "}
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
              Movies
            </span>{" "}
            You'll Enjoy <br /> Without the Hassle
          </h1>
        </div>
      </div>

      {/* Search */}
      <Search onSearchChange={handleSearchChange} />

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Movies grid */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {searchTerm.trim() ? (
              filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <p className="text-neutral-500 font-bold text-center col-span-full">
                  No movies found
                </p>
              )
            ) : (
              displayedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </motion.div>

          {/* Pagination */}
          {!searchTerm.trim() && (
            <div className="pagination pb-16 pt-6 text-white flex justify-center items-center gap-2 my-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="bg-gray-800 font-bold w-[100px] py-1 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.ceil(movies.length / moviesPerPage) },
                (_, index) => (
                  <button
                    className={`${
                      currentPage === index + 1 ? "bg-gray-600" : "bg-gray-800"
                    } font-bold w-[30px] py-1 rounded-lg`}
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                disabled={
                  currentPage === Math.ceil(movies.length / moviesPerPage)
                }
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(movies.length / moviesPerPage))
                  )
                }
                className="bg-gray-800 font-bold w-[100px] py-1 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
