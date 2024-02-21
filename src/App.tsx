// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import VectorCalculator from './components/VectorCalculator'

function App() {

  return (
    <>
      <VectorCalculator vectorA={{ x: 0, y: 0 }} vectorB={{ x: 0, y: 0 }} />
    </>
  )
}

export default App
