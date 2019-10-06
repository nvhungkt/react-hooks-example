import React, { useState, useCallback } from 'react';

import PokeCard from './PokeCard-functional';

export default function({ pokemons: pokemonsProps }) {
  const [pokemons, setPokemons] = useState(pokemonsProps);

  const onPokemonToggle = useCallback((pokeId) => () => {
    const index = pokemons.findIndex(pokemon => pokemon.pokeId === pokeId);
    const updatedPokemon =  { ...pokemons[index], checked: !pokemons[index].checked };

    const newPokemons = [...pokemons];
    newPokemons[index] = updatedPokemon;

    setPokemons(newPokemons);
  }, [pokemons]);

  return (
    <div className="pokedex-container">
      {pokemons.map(pokemon => (
        <PokeCard key={pokemon.pokeId} pokemon={pokemon} onToggle={onPokemonToggle} />
      ))}
    </div>
  );
}
