import { Link } from 'react-router-dom'

const MovieCard = ({ getGenreNames, movie, getYears, to }) => {
  return (
    <Link to={`/detail/${to}`}>
      <div>
        <div className='rounded-xl w-48 relative cursor-pointer overflow-hidden hover:opacity-85 transition-all duration-1000 bg-black'>
          <img
            src={`${import.meta.env.VITE_APP_API_BASEIMGURL}${
              movie.poster_path
            }`}
            alt={movie.title}
            className='object-cover h-64 w-full'
          />
          <div className='absolute rounded-md bottom-0 w-full h-16 bg-black opacity-85 hover:h-2/3 transition-all duration-1000 overflow-hidden'>
            <div className='top-0 absolute w-full h-full'>
              <h1 className='text-center text-xl font-semibold text-yellow-400 my-4'>
                {movie.title}
              </h1>
              <div className='transition-all duration-1000'>
                <p className='font-normal text-yellow-400'>
                  {getGenreNames(movie.genre_ids)}
                </p>
                <p className='font-semibold text-white'>
                  {getYears(movie.release_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
