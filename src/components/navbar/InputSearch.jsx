import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const InputSearch = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  // Fungsi untuk menangani submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigasi ke halaman /search dengan query parameter
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form
      className='flex items-center gap-1 relative rounded-md'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='outline-none px-2 py-1 rounded-md sm:w-80 bg-transparent border border-yellow-500 text-yellow-300'
        placeholder='Cari Film ...'
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button type='submit'>
        <IoIosSearch className='absolute text-2xl right-2 text-yellow-300 top-2' />
      </button>
    </form>
  )
}

export default InputSearch
