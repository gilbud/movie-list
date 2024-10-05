import { useState, useEffect } from 'react'
import axios from 'axios'

export const useGenres = () => {
  const [genres, setGenres] = useState([])

  const getGenre = async () => {
    const baseURL = 'https://api.themoviedb.org/3'
    const apiKey = '6d2181c8a2dc5ea5d5720a89bf1f2b66'
    try {
      const responseGenre = await axios.get(
        `${baseURL}/genre/movie/list?api_key=${apiKey}`
      )
      setGenres(responseGenre.data.genres)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getGenre()
  }, [])

  return genres
}
