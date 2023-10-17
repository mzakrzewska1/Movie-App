import { useState, useEffect } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard/MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=d4f9fd68';
 
function App() {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => { 
    searchMovies('Spiderman');
  }, []);
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data)
  }


  return (
    <div className="App">
      <div className='header'>
      <h1>Movie Land</h1>
      <div className="search">
        <input placeholder="Search for movies"
          value={search}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value)
          }}/>
      <img src={SearchIcon} alt="search"
          onClick={() => {
          searchMovies(search)
        }} />
        </div>
        </div>

      {
        movies?.length > 0
        ? (
            <div className="container">
              {
                movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))
              }
            </div>) :
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  )
}

export default App
