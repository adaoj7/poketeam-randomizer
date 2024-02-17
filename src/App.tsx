import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Stats from "./Stats.tsx"
import Moveset from './Moveset.tsx'

function App() {

  interface PokemonData {
    name: string
    id: number
    sprites: {
      front_default: string;
      front_shiny: string;
    }
  }

  const [searchCount, setSearchCount] = useState(0)
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const response : any = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getCount`)
        setSearchCount(response.data)
      } catch (err:any) {
        console.log(err)
      }
      
    }
    response()
  },[])

  const handleInputChange = (e: any) => {
    setName(e.target.value)
  }
  
  const searchPokemon = async () => {
    try {
      console.log(pokemon)
      setSearchCount(searchCount + 1)
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
    try {
      await axios.put(`http://localhost:8000/api/update/${searchCount}`)
      const newCount = searchCount + 1
      setSearchCount(newCount)
    } catch (err: any) {
      console.log(err)
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
          {pokemon ? <Moveset pokemon={pokemon}/> : <></>}
      </div>
          <div>Pokemon generated: {searchCount}</div>
          <br />
      <a href="https://pokeapi.co/">PokeAPI</a>
    </>
  )
}

export default App
