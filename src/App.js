import React, {Component} from 'react';
import Game from './Game.js';
import {Switch, Slider, Button} from 'react-mdl';

class App extends Component {

    constructor() {
        super();
        this.state = {};
        this.state.width = 10;
        this.state.height = 10;
        this.state.mines = 10;
        this.state.superman = false;
        this.state.txtWidth = 10;
        this.state.txtHeight = 10;
        this.state.txtMines = 10;
    }

    setBoardWidth(width) {
        this.setState({txtWidth: width});
    }

    setBoardHeight(height) {
        this.setState({txtHeight: height});
    }

    setBoardMines(mines) {
        this.setState({txtMines: mines});
    }

    setSuperman(superman) {
        console.log(superman.target.value);
        this.setState({superman: superman});
    }

    startNewGame() {
        let newHeight = this.state.txtHeight;
        let newWidth = this.state.txtWidth;
        let newMines = this.state.txtMines;

        this.setState({height: newHeight, width: newWidth, mines: newMines});
    }

    render() {
        // onChange={(e) => this.setSuperman(e.target.value === "on")}
        return (
            <div className="App">
                <table style={{width: 800}}>
                    <tr>
                        <td>
                            <Switch  id="Superman" onChange={this.setSuperman.bind(this)}
                                    checked={this.state.superman}>Superman</Switch>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Height {this.state.txtHeight}
                            <Slider onChange={(e) => this.setBoardHeight(parseInt(e.target.value))} min={5} max={300}
                                    defaultValue={this.state.txtHeight}/>
                        </td>
                        <td>
                            Width {this.state.txtWidth}
                            <Slider onChange={(e) => this.setBoardWidth(parseInt(e.target.value))} min={5} max={300}
                                    defaultValue={this.state.txtWidth}/>
                        </td>
                        <td>
                            Mines {this.state.txtMines}
                            <Slider onChange={(e) => this.setBoardMines(parseInt(e.target.value))} min={5} max={300}
                                    defaultValue={this.state.txtMines}/>
                        </td>
                        <td>
                            <Button raised colored onClick={() => this.startNewGame()}>New Game</Button>
                        </td>
                    </tr>
                </table>

                <div className="game">
                    <Game
                        boardHeight={this.state.height} boardWidth={this.state.width} mines={this.state.mines} superman={this.state.superman}/>
                </div>
            </div>
        );
    }
}

export default App;
