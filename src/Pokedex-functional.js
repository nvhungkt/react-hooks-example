import React, { useState, useCallback, useEffect, useRef } from 'react';

import PokeCard from './PokeCard-functional';

const useUpdateEffect = (fn, inputs) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return fn();
    }
  }, inputs);
}

export const useHooks = (pokemonsProps) => {
  const [pokemons, setPokemons] = useState(pokemonsProps);
  const [showingPopup, setShowingPopup] = useState(false);

  const onPokemonToggle = useCallback((pokeId) => () => {
    const index = pokemons.findIndex(pokemon => pokemon.pokeId === pokeId);
    const updatedPokemon =  { ...pokemons[index], checked: !pokemons[index].checked };

    const newPokemons = [...pokemons];
    newPokemons[index] = updatedPokemon;

    setPokemons(newPokemons);
  }, [pokemons]);

  useUpdateEffect(() => {
    setShowingPopup(true);

    const timeout = setTimeout(() => {
      setShowingPopup(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [pokemons]);

  return {
    pokemons,
    setPokemons,
    showingPopup,
    onPokemonToggle,
  }
}

export default function({ pokemons: pokemonsProps }) {
  const {
    pokemons,
    showingPopup,
    onPokemonToggle,
  } = useHooks(pokemonsProps);

  return (
    <div className="pokedex-container">
      {pokemons.map(pokemon => (
        <PokeCard key={pokemon.pokeId} pokemon={pokemon} onToggle={onPokemonToggle} />
      ))}
      {`${showingPopup}`}
    </div>
  );
}
