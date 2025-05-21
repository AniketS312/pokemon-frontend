import Form from 'next/form';
import { ModeToggle } from "@/app/components/Toggle";
import PokemonList from '@/app/components/PokemonList';
import AlertError from './components/AlertError';
import  { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Checkbox } from "@/app/components/ui/checkbox";
import { Plus } from "lucide-react";

import addPokemon from "@/app/actions/addPokemon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center justify-between p-10 text-2xl relative w-full">
        <h1>Pokemons to Collect</h1> 
        <div className="absolute left-10">
          <DialogBox />                                                                                                                                                                                                                                                                                                                                   
        </div>
        <div className="absolute right-10">
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-10 px-20">
        <PokemonList />  
      </div>
    </main>
  );
}

function DialogBox() {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add a Pokemon
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form action={addPokemon} className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="Name" required  className="p-2"/>
            <AlertError />
            <div className="flex items-center space-x-2">
              <Checkbox id="shiny" name='shiny' />
              <label
                htmlFor="shiny"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Shiny?
              </label>
            </div>
            <Button variant="outline" type="submit">Button</Button>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

