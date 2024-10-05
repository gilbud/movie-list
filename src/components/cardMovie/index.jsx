import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useGenres } from '../api/getGenre'
import MovieCard from './MovieCard'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'

const Index = ({ headingTitle, url }) => {
  const [data, setData] = useState([])
  const genres = useGenres()
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef(null)

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

  const getMovie = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASEURL}${url}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
          },
        }
      )
      setData(res.data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMovie()
  }, [url])

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div className='relative sm:px-24 px-4 min-h-64'>
      <div className='text-white items-center mb-5'>
        <h1 className='sm:text-3xl text-2xl font-bold'>{headingTitle}</h1>
      </div>

      <button
        className='absolute left-24 top-1/2 z-10 p-2 text-white rounded-full hover:scale-110 hover:opacity-90 transition-all bg-gray-700 opacity-70 active:text-black hidden sm:block'
        onClick={scrollLeft}
      >
        <MdOutlineArrowBackIos size={25} />
      </button>

      {isLoading && (
        <div className='flex justify-center items-center h-64'>
          <div className='spinner'></div>
        </div>
      )}

      <div
        ref={scrollRef}
        className='flex gap-5 overflow-x-auto hide-scrollbar transition-all duration-300'
      >
        {data.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              getGenreNames={getGenreNames}
              getYears={getYears}
              to={`${movie.id}`}
            />
          </div>
        ))}
        <button
          className='absolute right-24 top-1/2 z-10 p-2 text-white rounded-full hover:scale-110 hover:opacity-90 transition-all bg-gray-700 opacity-70 active:text-black hidden sm:block'
          onClick={scrollRight}
        >
          <MdOutlineArrowForwardIos size={25} />
        </button>
      </div>
    </div>
  )
}

export default Index
