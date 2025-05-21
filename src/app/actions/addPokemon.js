"use server";
import { redirect } from 'next/navigation'

export default async function addPokemon(formData) {
    // get pokemon name/shiny and check to see if it exists.
    const pokemonName = await formData.get("name");
    const isShiny = formData.get("shiny") === "on"; // Check if the checkbox is checked

    const pokemonAPILink = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const fetchPokemon = await fetch(pokemonAPILink);
     if (!fetchPokemon.ok) {
        console.log("Error fetching the Pokemon data");
        console.log(fetchPokemon.status);
        return {};
    }
    // filter the needed pokemon data to get name, type and ID.
    const pokemon = await fetchPokemon.json();
    const {name, id, types } = pokemon;
    const dbPostEntry =  {
        name: name,
        number: id,
        shiny: isShiny || false,
        type: types[0].type.name || 'unknown'};   
    
    const fetchResponse = await fetch("https://pokemon-backedn.onrender.com/addpokemon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dbPostEntry), // Convert the data to JSON
    });
    
    // Check HTTP status before parsing JSON
    if (fetchResponse.status === 400) {
        const errorData = await fetchResponse.json().catch(e => ({ message: "Pokemon already added" }));
        console.log(errorData);
        return errorData;
    }
    
    if (fetchResponse.status === 500) {
        const errorData = await fetchResponse.json().catch(e => ({ message: "Server error" }));
        console.log(errorData.message);
        return errorData;
    }
    
    if (fetchResponse.ok) {
        // Only parse JSON if response is OK
        const response = await fetchResponse.json().catch(e => {
            console.log("Error parsing JSON response:", e);
            return { error: true, message: "Failed to parse response" };
        });
        // If everything is successful, redirect
        redirect("/");

    } else {
        // Handle any other error cases
        return { error: true, status: fetchResponse.status, message: "Request failed" };
    }
};
