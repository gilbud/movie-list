import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async () => {
    const token = 'fake-token' // Simulasi token, ganti dengan token dari API
    localStorage.setItem('token', token) // Simpan token di localStorage

    navigate(-1) // Kembali ke halaman sebelumnya setelah login berhasil
  }

  return (
    <div>
      <button
        onClick={handleLogin}
        className='bg-blue-500 rounded-md px-3 text-white'
      >
        Login
      </button>
    </div>
  )
}

export default Login
