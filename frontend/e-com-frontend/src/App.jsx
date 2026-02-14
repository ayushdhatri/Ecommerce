import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { FaBeer } from 'react-icons/fa';
import Products from './components/Products';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Products/>
    </>
  )
}

export default App
