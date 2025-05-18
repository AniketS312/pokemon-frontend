'use client'
import { useEffect , useState } from "react";
import CardComponent from "@/app/components/CardComponent";

interface Pokemon {
  id: number; 
  number: number; 
  name: string; 
  type: string[]; 
  shiny: boolean; 
}

export default function PokemonList() {
   const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://pokemon-backedn.onrender.com/getpokemon')
    .then(res => res.json())
    .then(data => setPokemonList(data))
    .catch(error => {
      setError(`Error fetching data: ${error.message}`);
    })
    setLoading(false);
  }, []);
  return(
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
     {pokemonList.length > 0 ? (
        pokemonList.map((pokemon: Pokemon) => (
         <CardComponent
            key={pokemon.id}
            id={pokemon.number}
            name={pokemon.name}
            type={pokemon.type}
            shiny={pokemon.shiny}
          />
      ))
      ) : (
        <p>No Pokemon found</p>
      )}
    </>
  )
}