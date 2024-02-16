import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>This project is going to help me to build teams when I play through Pokemon games</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Generate Team
        </button>
        <br />
      </div>
          <div>Teams generated: {count}</div>
          <br />
      <a href="https://pokeapi.co/">PokeAPI</a>
    </>
  )
}

export default App
