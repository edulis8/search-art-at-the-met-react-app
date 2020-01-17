import React, { Component, useRef } from 'react'
// import Pokedex from './Pokedex';
import Axios from 'axios';
import Pokecard from './Pokecard';
import { sample } from 'lodash';

// import './Pokedex.css';
const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';
// Will return a promise delayed by a random amount, picked in the delay array
const delayRandomly = () => {
    const timeout = sample([0, 200, 500, 700, 1000, 3000]);
    return new Promise(resolve =>
        setTimeout(resolve, timeout),
    );
};
// Will throw randomly with a 1/4 chance ratio
const throwRandomly = () => {
    const shouldThrow = sample([true, false, false, false]);
    if (shouldThrow) {
        throw new Error('simulated async failure');
    }
};

const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

const lastPromise = useRef();


class PokeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            searchTerm: '',
            searching: false,
            dirty: false
        }
        this.handleSearchInputChanges = this.handleSearchInputChanges.bind(this);
        this.search = debounce(this.search, 300);
        const lastPromise = useRef();

    }
    // static defaultProps = {
    //     test: [
    //     ]
    // }
    handleSearchInputChanges(e) {
        const searchTerm = e.target.value;
        this.setState({ searchTerm, dirty: true, searching: true })
        // console.log(this.state.searchTerm);
        this.search(searchTerm);
    }
    search(searchTerm) {
        console.log('searchTerm state', this.state.searchTerm);
        console.log('searchTerm local', searchTerm);

        const currentPromise = Axios.get(`${MET_API_BASE}/search?q=${searchTerm}`)
            .then(async response => {
                await delayRandomly();
                // throwRandomly();
                return response;
            });

        // store the promise to the ref
        lastPromise.current = currentPromise;

        currentPromise.then((response) => {
            if (currentPromise === lastPromise.current) {
                // console.log(response.data.objectIDs.slice(0, 20));
                // console.log(response.status, response.statusText);
                console.log('RESPONSE', response);
                if (response.data.objectIDs && response.data.total) {
                    for (let i = 0; i < 20; i++) {
                        const id = response.data.objectIDs[i];
                        Axios.get(`${MET_API_BASE}/objects/${id}`).then((response) => {
                            // console.log(idx, response.data);
                            const newObjects = [...this.state.objects, response.data];
                            // newObjects.push(response.data);
                            this.setState({ objects: newObjects.slice(0, 20), searching: false })
                            // break loop if search term changes
                        })
                    }
                } else {
                    console.log('else')
                    this.setState({ objects: [], searching: false })
                }
            }
            this.setState({ objects: [] })
        },e => {
            if (currentPromise === lastPromise.current) {
              console.warn('fetch failure', e);
            }
          },);
    }
    componentDidMount() {
        console.log('didMount');
    }
    render() {
        return (
            <div className='Pokedex'>
                {/* <p>{this.state.objects.length}</p> */}
                {/* <p>{this.state.searching.toString()}</p> */}

                <input type="text" placeholder="Search the MET art collection..." onChange={this.handleSearchInputChanges} />
                <div class="Pokedex-cards">
                    {this.state.objects.map(object =>
                        <div className='Pokedex-cards'>
                            <Pokecard {...object} />
                        </div>

                    )}
                    {!this.state.dirty && <p>Welcome. Search for art at the MET!</p>}
                    {this.state.dirty && !this.state.objects.length && !this.state.searching && <p>No results.</p>}
                    {this.state.searching && <p>Searching...</p>}
                </div>
            </div>
        )
    }
}

export default PokeGame;
