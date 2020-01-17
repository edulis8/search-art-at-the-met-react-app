import React, { Component } from 'react';
import './Pokecard.css';
// const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail';

class Pokecard extends Component {
  render() {
    console.log('in pokecard', this.props);

    // const imgSrc =? `${POKE_API}/${pad(this.props.id)}.png`;
    return (
      <div className="Pokecard" >
        {/* <h1 className="Pokecard-title">{this.props.name}</h1> */}
        <div className="Pokecard-image">
          <img src={this.props.object.primaryImageSmall} alt='asdf' />
        </div>
        {/* <div className="Pokecard-data">Type: {this.props.type}</div> */}
        {/* <div className="Pokecard-data">EXP: {this.props.exp}</div> */}
      </div >
    );
  }
}

export default Pokecard;

let pad = (num) => {
  const numZeros = 3 - num.toString().length;
  const zeroString = '0'.repeat(numZeros);
  return zeroString + num;
}