import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import './App.css'; // Make sure the CSS is imported

function App() {
  // State variables to manage Pokémon data, score, user message, user input, and visibility transition
  const [pokemon, setPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [pokemonLoaded, setPokemonLoaded] = useState(false);

  useEffect(() => {
    fetchRandomPokemon(); // Fetch a random Pokémon when the component mounts
  }, []);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // Gen 1 Pokémon (1-151)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    setPokemon(data);
    setPokemonLoaded(false); // Reset visibility to trigger fade-in transition

    // Add a slight delay before making the Pokémon visible
    setTimeout(() => {
      setPokemonLoaded(true);
    }, 100); // Adjust this delay for smoother/faster/slower appearance transition
  };

  const handleGuess = () => {
    if (!pokemon || userGuess.trim() === "") return; // Prevent empty guesses or guessing before Pokémon loads

    if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
      setMessage("Correct! 🎉"); // Display success message
      setScore(score + 1); // Increase score
    } else {
      setMessage(`Wrong! Try again. The Pokémon was ${pokemon.name}.`); // Show correct Pokémon name
    }

    // Reset visibility to trigger fade-out transition
    setPokemonLoaded(false);

    // Fetch a new Pokémon after a short delay to allow transition effect
    setTimeout(() => {
      setMessage(""); // Clear message for next round
      setUserGuess(""); // Reset input field
      fetchRandomPokemon(); // Load new Pokémon
    }, 1000); // 1-second delay for transition effect
  };

  return (
    <div className="App">
      <h1>Guess the Pokémon!</h1>
      {/* Container for displaying the Pokémon image with visibility transition */}
      <div className={`pokemon-container ${pokemonLoaded ? 'visible' : ''}`}>
        <Pokemon pokemon={pokemon} />
      </div>
      <h2>Score: {score}</h2>

      {/* Input and button section for making guesses */}
      <div className="guess-area">
        <input
          type="text"
          placeholder="Your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)} // Update input state
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleGuess(); // Allow submission by pressing Enter key
            }
          }}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>

      {/* Display feedback message for correct/incorrect guesses */}
      <p>{message}</p>
    </div>
  );
}

export default App;
