import React, { Component } from 'react'
import Pokedex from './Pokedex';
import Axios from 'axios';

class PokeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectIDs: {
                objectIDs: []
            
        }
    }
    static defaultProps = {
        test: [
        ]
    }
    componentDidMount() {
        console.log('cdm');
        Axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflower').then((response) => {
            console.log(response.data.objectIDs.slice(0, 20));
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            this.setState({ objectIDs: response.data.objectIDs.slice(0,20) });
          });
    }
    render() {
        return (
            <div>
                {this.state.data.objectIDs.map(object => <p>{object}</p>)}
                {/* <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} /> */}
                {/* <Pokedex pokemon={hand2} exp={exp2} isWinner={exp2 > exp1} /> */}
            </div>
        )
    }
}

export default PokeGame;