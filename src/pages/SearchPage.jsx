import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MovieCard from '../components/cardMovie/MovieCard'
import { useGenres } from '../components/api/getGenre'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null) // Tambahkan state untuk error
  const genres = useGenres()

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')

  const getGenreNames = (genreIds) => {
    if (!genres.length) return ''

    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const getYears = (releaseDate) => {
    return releaseDate.split('-')[0]
  }

  const searchMovie = async () => {
    try {
      setIsLoading(true)
      setError(null) // Reset error sebelum melakukan request baru
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASEURL}/search/movie?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&query=${query}`
      )
      if (res.data.results.length === 0) {
        setError('Film tidak ditemukan') // Set error jika tidak ada hasil
      }
      setData(res.data.results)
    } catch (err) {
      console.log(err)
      setError('Gagal memuat data film') // Set pesan error jika API gagal
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    searchMovie()
  }, [query])

  return (
    <div className='px-20 pt-20 bg-slate-950 min-h-screen'>
      {isLoading && (
        <div className='flex justify-center items-center h-64'>
          <div className='spinner'></div>
        </div>
      )}
      {!isLoading && error && (
        <div className='text-center text-yellow-500 text-xl'>{error}</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <div className='grid grid-cols-5 justify-start gap-10'>
          {data.map((movie) => (
            <div key={movie.id} className=''>
              <MovieCard
                movie={movie}
                getGenreNames={getGenreNames}
                getYears={getYears}
                to={`${movie.id}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchPage
