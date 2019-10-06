import React from 'react';

// import Pokedex from './Pokedex-class';
import Pokedex from './Pokedex-functional';
import { pokemons } from './constants';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokédex</h1>
        <Pokedex pokemons={pokemons} />
      </header>
    </div>
  );
}

export default App;
