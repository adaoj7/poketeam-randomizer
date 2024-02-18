import { useEffect, useState } from "react";
import axios from "axios";
import Stats from "./Stats.tsx";
import Moveset from "./Moveset.tsx";

function App() {
    interface PokemonData {
        name: string;
        id: number;
        sprites: {
            front_default: string;
            front_shiny: string;
        };
    }

    const [searchCount, setSearchCount] = useState(0);
    const [name, setName] = useState("");
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const response: any = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/getCount`
                );
                setSearchCount(response.data);
            } catch (err: any) {
                console.log(err);
            }
        };
        response();
    }, []);

    const handleInputChange = (e: any) => {
        setName(e.target.value);
    };

    const searchPokemon = async () => {
        try {
            console.log(pokemon);
            setSearchCount(searchCount + 1);
            const response = await axios.get(
                `http://localhost:8000/api/getPokemon/${name}`
            );
            if (!response) {
                throw new Error(`Failed to fetch: ${response}`);
            }
            const data = await response.data;
            //@ts-ignore
            setPokemon(data);
            console.log(pokemon);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setPokemon(null);
        }
        try {
            await axios.put(`http://localhost:8000/api/update/${searchCount}`);
            const newCount = searchCount + 1;
            setSearchCount(newCount);
        } catch (err: any) {
            console.log(err);
        }
    };
    return (
        <div className="flex h-[725px] flex-col content-center mt-40 justify-between">
            <div>
                <h2 className="flex justify-center text-lg">
                    This project is going to help me to build teams when I play
                    through Pokemon games
                </h2>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center p-4 mt-4 items-center">
                        <input
                            type="text"
                            value={name}
                            onChange={handleInputChange}
                            placeholder="Enter Pokemon Name or Id"
                            className="p-4 m-4"
                        />
                        <button className="btn flex" onClick={searchPokemon}>
                            Search
                        </button>
                    </div>
                    <br />
                    {error && <p>Error: {error}</p>}
                    {pokemon && (
                        <div className="flex flex-row justify-center">
                            <img src={pokemon.sprites.front_default} alt="" />
                            <img src={pokemon.sprites.front_shiny} alt="" />
                        </div>
                    )}
                    {pokemon ? <Stats pokemon={pokemon} /> : <></>}
                    {pokemon ? <Moveset pokemon={pokemon} /> : <></>}
                </div>
            </div>
            <div className="flex flex-col items-center justify-end">
                <div>Pokemon generated: {searchCount}</div>
                <a href="https://pokeapi.co/">PokeAPI</a>
            </div>
        </div>
    );
}

export default App;
