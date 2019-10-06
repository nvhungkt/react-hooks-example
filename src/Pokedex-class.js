import React from 'react';

import PokeCard from './PokeCard-class';

export default class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: props.pokemons,
    };
    this.onPokemonToggle = this.onPokemonToggle.bind(this);
  }

  onPokemonToggle = function(pokeId) {
    const { pokemons } = this.state;
    const index = pokemons.findIndex(pokemon => pokemon.pokeId === pokeId);
    const updatedPokemon =  { ...pokemons[index], checked: !pokemons[index].checked };

    const newPokemons = [...pokemons];
    newPokemons[index] = updatedPokemon;

    this.setState({ pokemons: newPokemons });
  }

  render() {
    return (
      <div className="pokedex-container">
        {this.state.pokemons.map(pokemon => (
          <PokeCard key={pokemon.pokeId} pokemon={pokemon} onToggle={this.onPokemonToggle} />
        ))}
      </div>
    );
  }
}
