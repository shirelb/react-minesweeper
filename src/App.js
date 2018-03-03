import React, {Component} from 'react';
import Game from './Game.js';
import {Switch, Slider, Button} from 'react-mdl';

class App extends Component {

    constructor() {
        super();
        this.state = {
            width: 10,
            height: 10,
            mines: 10,
            superman: false,
            txtWidth: 10,
            txtHeight: 10,
            txtMines: 10,
            startNewGame: false,
            maxMines: 10 * 10
        };
    }

    setBoardWidth(width) {
        let updateMaxMines = width * this.state.height;
        this.setState({txtWidth: width, maxMines: updateMaxMines, startNewGame: false});
    }

    setBoardHeight(height) {
        let updateMaxMines = height * this.state.width;
        this.setState({txtHeight: height, maxMines: updateMaxMines, startNewGame: false});
    }

    setBoardMines(mines) {
        this.setState({txtMines: mines, startNewGame: false});
    }

    setSuperman(superman) {
        this.setState({superman: superman, startNewGame: false});
    }

    restartGame() {
        let newHeight = this.state.txtHeight;
        let newWidth = this.state.txtWidth;
        let newMines = this.state.txtMines;
        let updateSuperman = this.state.superman;

        this.setState({
            height: newHeight,
            width: newWidth,
            mines: newMines,
            superman: updateSuperman,
            startNewGame: true
        });
    }

    render() {
        return (
            <div className="App">
                <h1>
                    Welcome To Minesweeper ! =)
                </h1>
                <table style={{width: '1000px', display: 'inline-block', textAlign: 'center'}}>
                    <tr>
                        <td>
                            <Switch id="Superman" onChange={(e) => this.setSuperman(e.target.checked)}>Superman</Switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Height <input type="text" name="txtbHight"
                                          onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                          maxLength={3} value={this.state.txtHeight}
                                          style={{width: '30px' , textAlign: 'center'}} />
                            <Slider onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                    min={5} max={300}
                                    value={this.state.txtHeight}/>
                        </td>
                        <td>
                            Width <input type="text" name="txtbWidth"
                                          onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                          maxLength={3} value={this.state.txtWidth}
                                          style={{width: '30px' , textAlign: 'center'}} />
                            <Slider onChange={(e) => this.setBoardWidth(parseInt(e.target.value, 10))}
                                    min={5} max={300}
                                    value={this.state.txtWidth}/>
                        </td>
                        <td>
                            Mines <input type="text" name="txtbMines"
                                          onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                          maxLength={3} value={this.state.txtMines}
                                          style={{width: '30px' , textAlign: 'center'}} />
                            <Slider onChange={(e) => this.setBoardMines(parseInt(e.target.value, 10))}
                                    min={1} max={this.state.maxMines}
                                    value={this.state.txtMines}/>
                        </td>
                        <td>
                            <Button raised colored onClick={() => this.restartGame()}>New Game</Button>
                        </td>
                    </tr>
                </table>

                <div className="game">
                    <Game
                        boardHeight={this.state.height} boardWidth={this.state.width} mines={this.state.mines}
                        superman={this.state.superman} startNewGame={this.state.startNewGame}/>
                </div>
            </div>
        );
    }
}

export default App;
