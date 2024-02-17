import { useState } from 'react'
import './App.css'

function App() {

  interface PokemonData {
    name: string
    id: number
    sprites: {
      front_default: string;
    }
  }

  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [error, setError] = useState('')

  const handleInputChange = (e: any) => {
    setName(e.target.value)
    console.log(name)
  }
  
  const searchPokemon = async () => {
    try {
      console.log(pokemon)
      setCount(count + 1)
      const response = await fetch(`http://localhost:8000/getPokemon${name}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      const data = await response.json()
      //@ts-ignore
      setPokemon(data);
      setError('')
    } catch (err: any) {
      setError(err.message)
      setPokemon(null)
    }
  }
  return (
    <>
      <h2>This project is going to help me to build teams when I play through Pokemon games</h2>
      <div className="card">
        <input type="text"
        value={name}
        onChange={handleInputChange}
        placeholder='Enter Pokemon Name' />
        <button onClick={searchPokemon}>Search</button>
        <br />
        {error && <p>Error: {error}</p>}
        {pokemon && (
          <div>
            <h2>{pokemon.name}</h2>
          </div>
        )}
      </div>
          <div>Pokemon generated: {count}</div>
          <br />
      <a href="https://pokeapi.co/">PokeAPI</a>
    </>
  )
}

export default App
