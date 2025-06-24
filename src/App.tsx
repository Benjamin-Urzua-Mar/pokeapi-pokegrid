import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PokeGridPage from './pages/PokeGridPage';
import { ToastContainer } from 'react-toastify';
  
function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokegrid" element={<PokeGridPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
