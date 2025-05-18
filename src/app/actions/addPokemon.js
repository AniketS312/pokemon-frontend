"use server";

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
        type: types[0].type.name || 'unknown'
    };
    console.log(dbPostEntry);

    const response = await fetch("https://pokemon-backedn.onrender.com/addpokemon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dbPostEntry), // Convert the data to JSON
    })
     .then(response => response.json())

    if (response.status === 400) {
        console.log(response.message);
        return response;
    }
    if (response.status === 500) {;
        console.log(response.message);
        return response;
    }

    if (response.ok) {
         const data = await response; 
        console.log(response.status, data);
        // console.log(data); 
        // return data;     
    }
};
