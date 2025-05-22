import React from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
interface PokemonProps {
  id: number; 
  name: string; 
  type: string[]; 
  shiny: boolean; 
  url: string;
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
            width={200}
            height={200} />
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
            <h2 className='text-center text-2xl'>{capitalizeFirstLetter(props.name)}</h2>
            <div className='flex justify-center gap-10 text-xl'>
                <span>{capitalizeFirstLetter(props.type[0])}</span>
                <span>{props.shiny && <Sparkles width={20}/>}</span>
            </div>
            <Link href={props.url} target="_blank" className='text-center self-center'>
              <Button className='cursor-pointer '>
                To Wiki
              </Button>
            </Link>
            <a className='text-center'></a>
        </div>
    </div>
  )
}
