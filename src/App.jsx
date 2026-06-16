import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NeonEvent from './pages/NeonEvent'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NeonEvent />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
