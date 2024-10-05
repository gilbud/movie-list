import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'

const Slider = () => {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(1)
  const slideInterval = 500000
  const sliderRef = useRef(null)

  const getSlider = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASEURL}/movie/now_playing?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
      )
      const limitedData = res.data.results.slice(0, 10)
      setData([
        limitedData[limitedData.length - 1],
        ...limitedData,
        limitedData[0],
      ])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSlider()
  }, [])

  // Fungsi untuk next slide
  const nextSlide = useCallback(() => {
    if (currentIndex >= data.length - 1) {
      setCurrentIndex(1)
      sliderRef.current.style.transition = 'none'
      sliderRef.current.style.transform = `translateX(-${100}%)`
    } else {
      setCurrentIndex(currentIndex + 1)
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out'
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex + 1) * 100
      }%)`
    }
  }, [currentIndex, data.length])
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, slideInterval)

    return () => clearInterval(interval)
  }, [currentIndex, data.length, nextSlide])

  // Fungsi untuk prev slide
  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(data.length - 2)
      sliderRef.current.style.transition = 'none' // Matikan transisi
      sliderRef.current.style.transform = `translateX(-${
        (data.length - 2) * 100
      }%)`
      setTimeout(() => {
        sliderRef.current.style.transition = 'transform 0.5s ease-in-out'
        sliderRef.current.style.transform = `translateX(-${
          (data.length - 2) * 100
        }%)`
      }, 50)
    } else {
      setCurrentIndex(currentIndex - 1)
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out'
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex - 1) * 100
      }%)`
    }
  }

  return (
    <div className='w-full h-screen relative flex justify-center items-center overflow-hidden'>
      <button
        onClick={prevSlide}
        className='absolute left-5 text-white z-10 hover:scale-125 transition-all'
      >
        <MdOutlineArrowBackIos size={30} />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-5 text-white z-10 hover:scale-125 transition-all'
      >
        <MdOutlineArrowForwardIos size={30} />
      </button>

      <div className='w-full h-full overflow-hidden relative'>
        <div
          ref={sliderRef}
          className='flex'
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {data.map((movie, i) => (
            <div key={i} className='w-full flex-shrink-0 relative'>
              <div className='h-2/3 bg-gradient-to-t from-black to-transparent absolute bottom-0 z-10 w-full text-white'></div>

              <img
                src={`${import.meta.env.VITE_APP_API_BASEIMGURL}${
                  movie.backdrop_path
                }`}
                alt={movie.title}
                className='w-full h-screen object-cover'
              />
              <div className='absolute bottom-10 sm:left-10 left-4 text-white text-xl z-10 '>
                <div className=' max-w-7xl flex sm:gap-10 gap-2  items-end'>
                  <img
                    src={`${import.meta.env.VITE_APP_API_BASEIMGURL}${
                      movie.poster_path
                    }`}
                    alt=''
                    className='w-full rounded-xl shadow-md sm:max-w-64 max-w-36'
                  />
                  <div className='flex flex-col gap-2 mr-4'>
                    <h1 className='text-yellow-400 font-bold sm:text-4xl text-2xl'>
                      {movie.title}
                    </h1>
                    <p className='sm:text-md text-sm'>{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
