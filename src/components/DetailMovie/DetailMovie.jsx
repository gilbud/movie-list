import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailMovie = () => {
  const params = useParams()
  const [data, setData] = useState([])
  console.log(params)

  const getMovieId = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASEURL}/movie/${params.id}
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
          },
        }
      )
      console.log(res.data)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMovieId()
  }, [params.id])

  return (
    <div>
      <div className='h-screen flex items-end relative z-10'>
        <img
          className='h-4/5 w-full object-cover shadow-md opacity-90 '
          src={`${import.meta.env.VITE_APP_API_BASEIMGURL}${
            data.backdrop_path
          }`}
          alt=''
        />
        <div className='flex gap-10 absolute  bottom-16 left-16 rounded-md backdrop-blur-sm right-10'>
          <img
            className=' w-72 rounded-md shadow-2xl'
            src={`${import.meta.env.VITE_APP_API_BASEIMGURL}${
              data.poster_path
            }`}
            alt=''
          />
          <div className='text-white font-semibold flex flex-col gap-10 justify-center'>
            <h1 className='text-4xl'>{data.title}</h1>
            <div className='flex gap-8'>
              {data?.genres?.map((genres, i) => (
                <div
                  key={i}
                  className='border border-white rounded-xl px-2 text-white hover:scale-105 transition-all cursor-pointer backdrop-blur-sm'
                >
                  <h1 className=''>{genres.name}</h1>
                </div>
              ))}
            </div>
            <p className=''>{data.overview}</p>
            <h1>{data.tagline}</h1>
          </div>
        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default DetailMovie
