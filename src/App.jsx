
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'


function App() {
  

  return (
    <BrowserRouter basename="/prueba-tecnica-5IG-deploy-API/">
      <Routes>
        <Route path='/' element={<Home/>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
