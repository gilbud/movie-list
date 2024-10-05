import { useState, useEffect } from 'react'
import { FaFilm } from 'react-icons/fa6'
import InputSearch from './InputSearch'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Fungsi untuk menangani perubahan scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`w-full px-5 h-16 flex justify-between items-center opacity-90 sm:px-20 fixed z-30 transition-colors duration-500 ${
        scrolled ? 'bg-black  ' : 'bg-transparent'
      }`}
    >
      <a href='/'>
        <div className='flex items-center gap-1 text-2xl text-yellow-500'>
          <FaFilm /> <span>dbMovies</span>
        </div>
      </a>
      <InputSearch />
      {localStorage.getItem('token') ? (
        <a href='/login'>
          <button className='bg-blue-500 text-white'>LOGIN</button>
        </a>
      ) : (
        <button onClick={handleLogout} className='bg-red-500 text-white'>
          LOGOUT
        </button>
      )}
    </div>
  )
}

export default Navbar
