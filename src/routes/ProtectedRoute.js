import { Navigate } from 'react-router-dom'

// Komponen ProtectedRoute untuk melindungi rute tertentu
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') // Mendapatkan token dari localStorage

  if (!token) {
    return <Navigate to='/login' /> // Redirect ke halaman login jika token tidak ada
  }

  return children // Jika token ada, izinkan akses ke halaman yang diproteksi
}

export default ProtectedRoute
