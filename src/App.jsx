import { Toaster } from 'sonner'
import './App.css'
import BlogPage from './pages/BlogPage'
import NavBar from './pages/components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BlogDetails from './pages/BlogDetails'




function App() {
  return (
    <>

      <div className='bg-slate-700 min-h-screen'>
        <NavBar />
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/detail/:id" element={<BlogDetails />} />
        </Routes>
        <Toaster />
      </div>

    </>
  )
}

export default App

