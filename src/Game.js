/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import deepcopy from 'deepcopy';
import Board from './Board.js';
import Cell from './Cell.js';

class Game extends Component {
    static propTypes = {
        boardHeight: React.PropTypes.number,
        boardWidth: React.PropTypes.number,
        mines: React.PropTypes.number
    };

    static defaultProps = {
        boardHeight: 10,
        boardWidth: 10,
        mines: 10
    };

    componentWillMount() {
        this.startGame();
    }

    startGame() {
        this.setState({
            boardArr: this.initBoard(),
            status: "PLAYING",
            numOfCellFlagged: 0,
            numOfCellFlaggedCorrectly: 0
        });
    }

    initBoard() {
        let boardArr = [];
        for (let i = 0; i < this.props.boardHeight; i++) {
            boardArr.push([]);
            for (let j = 0; j < this.props.boardHeight; j++) {
                boardArr[i].push({cellValue: 0, revealed: false, flagged: false});
            }
        }

        //set mines
        let randomRow, randomCol;
        for (let i = 0; i < this.props.mines; i++) {

            randomRow = Math.floor(Math.random() * this.props.boardHeight);
            randomCol = Math.floor(Math.random() * this.props.boardWidth);

            while (this.isMineCell(boardArr, randomRow, randomCol)) {
                randomRow = Math.floor(Math.random() * this.props.boardHeight);
                randomCol = Math.floor(Math.random() * this.props.boardWidth);
            }

            console.log("randomRow  randomCol  " + randomRow + " " + randomCol);
            boardArr[randomRow][randomCol].cellValue = -1;
        }

        //calculate rest cells values
        for (let i = 0; i < this.props.boardHeight; i++) {
            for (let j = 0; j < this.props.boardHeight; j++) {
                if (!this.isMineCell(boardArr, i, j))
                    boardArr[i][j].cellValue = this.calculateCellValue(boardArr, i, j);
            }
        }

        return boardArr;
    }

    isMineCell(boardArr, row, col) {
        return boardArr[row][col].cellValue === -1;
    }

    calculateCellValue(boardArr, row, col) {
        let cellVal = 0;
        for (let x = 0; x <= 2; x++)
            for (let y = 0; y <= 2; y++)
                if (x !== y && this.isWithinBounds((row - 1 + x), (col - 1 + y )) && this.isMineCell(boardArr, row - 1 + x, col - 1 + y))
                    cellVal++;
        return cellVal;
    }

    isWithinBounds(row, col) {
        return row >= 0 && col >= 0 && row < this.props.boardHeight && col < this.props.boardWidth
    }

    revealCell(row, col) {
        if (this.state.status !== "PLAYING")
            return;
        if (this.state.boardArr[row][col].flagged)
            return;
        if (this.state.boardArr[row][col].revealed)
            return;

        let boardArrCpy = deepcopy(this.state.boardArr);
        boardArrCpy[row][col].revealed = true;

        //reveal neighbors
        if (boardArrCpy[row][col].cellValue == 0)
            boardArrCpy = this.revealNeighbors(boardArrCpy, row, col);

        this.setState({boardArr: boardArrCpy});


        if (this.isMineCell(this.state.boardArr, row, col))
            this.gameOver();
    }

    revealNeighbors(boardArr, row, col) {
        if (boardArr[row][col].cellValue > 0)
            return boardArr;
        if (!(this.isWithinBounds(row, col)))
            return boardArr;
        for (let x = 0; x <= 2; x++) {
            for (let y = 0; y <= 2; y++) {
                if (x !== y && this.isWithinBounds((row - 1 + x), (col - 1 + y )) && boardArr[row - 1 + x][col - 1 + y].cellValue >= 0) {
                    if (!(boardArr[(row - 1 + x)][(col - 1 + y )].revealed)) {
                        console.log("[" + (row - 1 + x) + "][" + (col - 1 + y) + "]");
                        boardArr[row - 1 + x][col - 1 + y].revealed = true;
                        boardArr = this.revealNeighbors(boardArr, (row - 1 + x), ( col - 1 + y));
                    }
                }
            }
        }
        return boardArr;
    }

    flagCell(row, col) {
        if (this.state.status !== "PLAYING")
            return;
        if (this.state.boardArr[row][col].revealed)
            return;

        let boardArrCpy = deepcopy(this.state.boardArr);
        let numOfCellFlaggedCpy = this.state.numOfCellFlagged;
        let numOfCellFlaggedCorrectlyCpy = this.state.numOfCellFlaggedCorrectly;
        if (this.state.boardArr[row][col].flagged) {
            boardArrCpy[row][col].flagged = false;
            numOfCellFlaggedCpy--;
            numOfCellFlaggedCorrectlyCpy--;
        }
        else {
            if (this.state.numOfCellFlagged < this.props.mines) {
                boardArrCpy[row][col].flagged = true;
                numOfCellFlaggedCpy++;
                if (this.isMineCell(boardArrCpy, row, col))
                    numOfCellFlaggedCorrectlyCpy++;
            }
            else {
                //TODO alert this
            }
        }

        this.setState({
            boardArr: boardArrCpy,
            numOfCellFlagged: numOfCellFlaggedCpy,
            numOfCellFlaggedCorrectly: numOfCellFlaggedCorrectlyCpy
        });

        if (this.state.numOfCellFlaggedCorrectly === this.props.mines)
            this.gameWinner();
    }

    gameOver() {
        this.setState({status: "GAME_OVER"});
        console.log("GAME OVER!");
    }

    gameWinner() {
        this.setState({status: "GAME_WINNER"});
        console.log("YOU WON!");
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props)} <br /> <br />
                Game Status: {this.state.status} <br />

                <Board
                    board={this.state.boardArr}
                    onReveal={(row, col) => this.revealCell(row, col)}
                    onFlag={(row, col) => this.flagCell(row, col)}
                />

                {/*<table>
                    {this.state.boardArr.map((row) => <tr style={{height: 20}}>{row.map((cell) => <td
                        style={{width: 20, color: cell.flagged ? 'red' : 'black'}}> {cell.cellValue}</td>)}</tr>)}
                </table>*/}
            </ div >
        );
    }
}

export default Game;
