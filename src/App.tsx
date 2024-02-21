// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import MathQuiz from './components/MathQuiz'
import VectorCalculator from './components/VectorCalculator'

function App() {

  const questions = [
    {
      question: "What is the value of $$\\pi$$?",
      answer: 3.14,
      difficulty: "Easy",
    },
    {
      question: "What is the solution of $$x^2 - 5x + 6 = 0$$ ? ",
      answer: -2,
      difficulty: "Medium",
    },
    {
      question: "What is the derivative of $$\\sin(x)$$?", answer: 0,
      difficulty: "Hard",
    },
  ];

  return (
    <>
      <VectorCalculator vectorA={{ x: 0, y: 0 }} vectorB={{ x: 0, y: 0 }} />
      <div class="separator"></div>
      <MathQuiz questions={questions} />
    </>
  )
}

export default App
