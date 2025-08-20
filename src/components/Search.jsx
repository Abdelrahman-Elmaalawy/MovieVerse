import searchicon from '/assets/search.svg'

function Search({ onSearchChange }) {
  return (
    <div className="relative flex items-center justify-center mt-16 mb-16 h-[60px] w-[80%] mx-auto">
      <img src={searchicon} alt="Search" className="absolute left-5 w-5" />
      <input 
        onChange={(e) => onSearchChange(e.target.value)} // Placeholder for search functionality
        type="text"
        placeholder="Search through thousands of movies"
        className="bg-gray-800 text-white text-lg rounded w-full h-full pl-12 pr-4 py-2 outline-none"
      />
    </div>
  );
}
export default Search;