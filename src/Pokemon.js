import React, { useEffect, useState } from 'react';

function Pokemon({ pokemon, onGuess }) {
  const [showPokemon, setShowPokemon] = useState(false); // Controls the fade-in effect

  useEffect(() => {
    if (pokemon) {
      setShowPokemon(false); // Hide Pokémon initially to trigger transition
      setTimeout(() => setShowPokemon(true), 50); // Fade in the Pokémon after a short delay
    }
  }, [pokemon]); // Runs every time a new Pokémon is set

  if (!pokemon) return null; // Return nothing if no Pokémon is loaded

  return (
    <div className={`pokemon ${showPokemon ? 'show' : ''}`}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} /> {/* Displays Pokémon image */}
    </div>
  );
}

export default Pokemon;
