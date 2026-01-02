import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import './index.css'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
        <SortingVisualizer />
    </>
  )
}

export default App
