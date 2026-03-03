import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { FaBeer } from 'react-icons/fa';
import Products from './components/products/Products';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/products' element ={<Products/>}/>
      </Routes>
    </Router>
   
    </>
  )
}

export default App
