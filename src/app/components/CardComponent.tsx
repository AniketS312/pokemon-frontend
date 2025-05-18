import React from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react';

interface PokemonProps {
  id: number; 
  name: string; 
  type: string[]; 
  shiny: boolean; 
}



export default function CardComponent(props: PokemonProps) {
function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  
  return (
    <div>
        <div>
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} 
            alt={props.name}
            width={96}
            height={96} />
        </div>
        <div>
            <h2 className='text-center text-2xl'>{capitalizeFirstLetter(props.name)}</h2>
            <div className='flex justify-center gap-2'>
                <span>{props.type[0]}</span>
                <span>{props.shiny && <Sparkles width={20}/>}</span>
            </div>
            <a className='text-center'>To Wiki</a>
        </div>
    </div>
  )
}
