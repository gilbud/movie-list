import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/navbar'
import './App.css'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute' // Impor ProtectedRoute

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Lindungi halaman detail dan search dengan ProtectedRoute */}
        <Route
          path='/detail/:id'
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/search'
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
