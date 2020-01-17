import React, { Component } from 'react'
import Pokecard from './Pokecard';
import './Pokedex.css';


class Pokedex extends Component {
  render() {

    let title = this.props.isWinner ? 
    <h1 className="Pokedex-winner">Winning Hand</h1> :
    <h1 className="Pokedex-loser">Losing Hand</h1>

    return (
        <h1>POKEDEX!</h1>
        <p>Total Experience: {this.props.exp}</p>
        <p>{title}</p>
        <div className='Pokedex-cards'>
          {this.props.pokemon.map((p) => (
            <Pokecard id={p.id} name={p.name} exp={p.base_experience} key={p.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default Pokedex;
