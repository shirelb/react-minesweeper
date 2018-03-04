import React, {Component} from 'react';
import Game from './Game.js';
import {Switch, Slider, Button} from 'react-mdl';
import { Flex, Box } from 'reflexbox'

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
        if(width > 100)
            width = 100;
        let updateMaxMines = width * this.state.height;
        this.setState({txtWidth: width, width: width, maxMines: updateMaxMines, startNewGame: false});
    }

    setBoardHeight(height) {
        if(height > 100)
            height = 100;
        let updateMaxMines = height * this.state.width;
        this.setState({txtHeight: height, height: height, maxMines: updateMaxMines, startNewGame: false});
    }

    setBoardMines(mines) {
        if(mines >  this.state.width* this.state.height)
            mines = this.state.width* this.state.height;
        this.setState({txtMines: mines, mines:mines, startNewGame: false});
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
            <Flex p={2} column w={1} className="App">
                <Flex p={1} ml={100}>
                    <h1>
                    Welcome To Minesweeper ! =)
                    </h1>
                </Flex>
                <Flex w={1} px={2}>
                    <Box px={2} w={1/6}>
                        <div>
                            <Switch id="Superman" onChange={(e) => this.setSuperman(e.target.checked)}>Superman</Switch>
                        </div>
                        <br/>
                        <div>
                            Height <input type="text" name="txtbHight"
                                          onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                          maxLength={5} value={this.state.txtHeight}
                                          style={{width: '30px', textAlign: 'center'}}/>
                            <Slider onChange={(e) => this.setBoardHeight(parseInt(e.target.value, 10))}
                                    min={5} max={100}
                                    value={this.state.txtHeight}/>
                        </div>
                        <br/>
                        <div>
                            Width <input type="text" name="txtbWidth"
                                         onChange={(e) => this.setBoardWidth(parseInt(e.target.value, 10))}
                                         maxLength={5} value={this.state.txtWidth}
                                         style={{width: '30px', textAlign: 'center'}}/>
                            <Slider onChange={(e) => this.setBoardWidth(parseInt(e.target.value, 10))}
                                    min={5} max={100}
                                    value={this.state.txtWidth}/>
                        </div>
                        <br/>
                        <div>
                            Mines <input type="text" name="txtbMines"
                                         onChange={(e) => this.setBoardMines(parseInt(e.target.value, 10))}
                                         maxLength={5} value={this.state.txtMines}
                                         style={{width: '30px', textAlign: 'center'}}/>
                            <Slider onChange={(e) => this.setBoardMines(parseInt(e.target.value, 10))}
                                    min={1} max={this.state.maxMines}
                                    value={this.state.txtMines}/>
                        </div>
                        <br/>
                        <div>
                            <Button raised colored onClick={() => this.restartGame()}>New Game</Button>
                        </div>
                    </Box>
                    <Box px={2} w={5/6} className="game">
                        <Game
                            boardHeight={this.state.height} boardWidth={this.state.width} mines={this.state.mines}
                            superman={this.state.superman} startNewGame={this.state.startNewGame}/>
                    </Box>
                </Flex>
            </Flex>
        );
    }
}

export default App;
