import { useEffect, useState } from 'react'

function SearchBar({selected, setSelected, servers, setServers}) {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  
  async function fetchMovies() {
    let search = inputValue.trim();
    if (search) {
      const response = await fetch(`http://localhost:5000/search?q=${search}`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    }
  }
  async function handleSelectedMovie(url) {
    setInputValue('');
    setCollapsed(true);
    try{
      const response = await fetch(`http://localhost:5000/get-episode?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const videoUrls = await response.json();
        setServers(videoUrls);
        setSelected(videoUrls[0]);
      } else {
        console.error('Failed to fetch episode URL');
      }
    } catch (error) {
      console.error('Error fetching episode URL:', error);
    }
    
    
  }
  return (
    <div className="relative flex flex-col items-center p-6 bg-gray-100">
      <div className="flex w-full max-w-3xl items-center space-x-2">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value);setCollapsed(false)}}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {setInputValue(''); setCollapsed(true)}}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <div className='text-xl'>&times;</div>
            </button>
          )}
        </div>

        <button
          className="p-3 px-5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={fetchMovies}
        >
          Search
        </button>
      </div>
      {!collapsed && movies.length === 0 && (
        <div className="absolute bg-blue-950/25 p-5 w-full sm:w-3/4 mt-20 grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 z-10">
          No results found
        </div>
      )}
      {!collapsed && movies.length > 0 && (
        <div className="absolute bg-blue-950/40 border-2 border-blue-900 p-5 w-full sm:w-3/4 mt-20 grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 z-10">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-200 w-45 rounded-lg shadow hover:shadow-sm transition flex flex-col items-center p-1 text-center cursor-pointer"
              onClick={()=>{handleSelectedMovie(movie.link)}}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[80%] object-cover rounded border border-gray-300 mb-2"
              />
              <div
                className="text-sm font-medium text-blue-900 hover:underline line-clamp-2"
              >
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>


  );
}

export default SearchBar