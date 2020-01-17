import React, { Component } from 'react'
// import Pokedex from './Pokedex';
import Axios from 'axios';
import Pokecard from './Pokecard';
// import './Pokedex.css';



class PokeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            searchTerm: ''
        }
        this.handleSearchInputChanges = this.handleSearchInputChanges.bind(this);
    }
    // static defaultProps = {
    //     test: [
    //     ]
    // }
    handleSearchInputChanges(e) {
        this.setState({ searchTerm:  e.target.value })
        // console.log(this.state.searchTerm);

    }
    componentDidMount() {
       
    }
    render() {
        return (
            <div className='Pokedex'>
                <input type="text" placeholder="Search the MET art collection..." onChange={this.handleSearchInputChanges}/>
                {this.state.objects.map(object => 
                    // <img src={object.primaryImage}></img>
                    <div className='Pokedex-cards'>
                        <Pokecard {...object} />
                    </div>

                )}
                {/* <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} /> */}
            </div>
        )
    }
}

export default PokeGame;