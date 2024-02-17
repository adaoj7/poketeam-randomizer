import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Stats from "./Stats.tsx"

function App() {

  interface PokemonData {
    name: string
    id: number
    sprites: {
      front_default: string;
      front_shiny: string;
    }
  }

  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [error, setError] = useState('')

  const handleInputChange = (e: any) => {
    setName(e.target.value)
  }
  
  const searchPokemon = async () => {
    try {
      console.log(pokemon)
      setCount(count + 1)
      const response = await axios.get(`http://localhost:8000/api/getPokemon/${name}`)
      if (!response) {
        throw new Error(`Failed to fetch: ${response}`)
      }
      const data = await response.data
      //@ts-ignore
      setPokemon(data);
      console.log(pokemon)
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
            <img src={pokemon.sprites.front_default} alt="" />
            <img src={pokemon.sprites.front_shiny} alt="" />
          </div>
          
          )}
          {pokemon ? <Stats pokemon={pokemon}/> : <></>}
      </div>
          <div>Pokemon generated: {count}</div>
          <br />
      <a href="https://pokeapi.co/">PokeAPI</a>
    </>
  )
}

export default App
