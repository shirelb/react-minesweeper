import React, {Component} from 'react';
import Game from './Game.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Game/>
                </div>
            </div>
        );
    }
}

export default App;
