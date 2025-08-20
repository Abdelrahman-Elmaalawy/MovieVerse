function MovieCard({ movie }) {
  return (
    <div className=" bg-gray-900 p-4 rounded-lg text-white shadow hover:scale-105 transition-transform duration-300">
      <img
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie?.title || "No Title"}
        className="rounded mb-4 w-full h-[400px] object-cover"
      />
      <h2 className="text-lg font-semibold leading-tight line-clamp-2 min-h-[2.75rem]">
        {movie?.title || "No Title"}
      </h2>
      <p className=" inline text-sm opacity-70">
        {movie?.release_date || "Unknown"}
      </p>
      <p className=" inline float-end mt-2 text-yellow-400 font-medium">
        ⭐ {movie?.vote_average?.toFixed(1) || "N/A"}
      </p>
    </div>
  );
}
export default MovieCard;