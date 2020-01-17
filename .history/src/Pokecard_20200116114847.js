import React, { Component } from 'react';
import './Pokecard.css';
// const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail';

class Pokecard extends Component {
  render() {
    // console.log('in pokecard', this.props);
    // const imgSrc =? `${POKE_API}/${pad(this.props.id)}.png`;
    return (
      <div className="Pokecard" >
        <h1 className="Pokecard-title">{this.props.title}</h1>
        <h4 className="Pokecard-title">{this.props.artistDisplayBio}</h2>

        <div className="Pokecard-image">
          <a href={this.props.objectURL} target="_blank" rel="noopener noreferrer">
            <img src={this.props.primaryImageSmall} alt={this.props.title} />
          </a>
        </div>
        <div className="Pokecard-data">Type: </div>
        <div className="Pokecard-data">EXP: </div>
      </div >
    );
  }
}

export default Pokecard;
// let pad = (num) => {
//   const numZeros = 3 - num.toString().length;
//   const zeroString = '0'.repeat(numZeros);
//   return zeroString + num;
// }