import React from 'react';

export default class PokeCard extends React.Component {
  render() {
    const { pokemon: { name, avatar, checked, pokeId, type }, onToggle } = this.props;

    return (
      <div className="pokeCard-container" onClick={() => onToggle(pokeId)}>
        <div
          className="pokeCard-avatar"
          style={{
            backgroundImage: `url(${avatar})`,
            filter: checked ? 'none' : 'grayscale(100%)'
          }}
        />
        <div className="pokeCard-info">
          <span className="pokeCard-name">{checked ? name : 'Name: ???'}</span>
          <span className="pokeCard-type-container">
            Type:
            {checked
              ? type.map(item => 
                <span key={item} className={`pokeCard-type ${item}`}>{item}</span>
              ) : ' ???'}
          </span>
        </div>
      </div>
    );
  }
}
