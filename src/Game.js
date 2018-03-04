/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import deepcopy from 'deepcopy';
import Board from './Board.js';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox'


class Game extends Component {
    static propTypes = {
        boardHeight: PropTypes.number,
        boardWidth: PropTypes.number,
        mines: PropTypes.number,
        superman: PropTypes.bool,
        startNewGame: PropTypes.bool
    };

    componentWillMount() {
        this.startGame();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.startNewGame) {
            this.props = newProps;
            this.startGame();
        }
    }

    startGame() {
        let board = this.initBoard();
        this.setState({
            boardArr: board,
            status: "PLAYING",
            numOfCellFlagged: 0,
            numOfCellFlaggedCorrectly: 0,

            showAlert: false,
            alertTitle: "GAME OVER!",
            alertText: "You LOST!",
            alertType: 'error',
            alertConfirmButtonText: 'Try Again'
        });
    }

    initBoard() {
        let boardArr = [];
        for (let i = 0; i < this.props.boardHeight; i++) {
            boardArr.push([]);
            for (let j = 0; j < this.props.boardWidth; j++) {
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

            boardArr[randomRow][randomCol].cellValue = -1;
        }

        //calculate rest cells values
        for (let i = 0; i < this.props.boardHeight; i++) {
            for (let j = 0; j < this.props.boardWidth; j++) {
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
                if (this.isWithinBounds((row - 1 + x), (col - 1 + y )) && this.isMineCell(boardArr, (row - 1 + x), (col - 1 + y)))
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
        if (boardArrCpy[row][col].cellValue === 0)
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
                if (this.isWithinBounds((row - 1 + x), (col - 1 + y )) && boardArr[row - 1 + x][col - 1 + y].cellValue >= 0) {
                    if (!(boardArr[(row - 1 + x)][(col - 1 + y )].revealed) && !(boardArr[(row - 1 + x)][(col - 1 + y )].flagged)) {
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
                this.setState({
                    showAlert: true,
                    alertTitle: "PAY ATTENTION!",
                    alertText: "No More Flags!",
                    alertType: 'warning',
                    alertConfirmButtonText: 'Continue'
                });
            }
        }

        this.setState({
            boardArr: boardArrCpy,
            numOfCellFlagged: numOfCellFlaggedCpy,
            numOfCellFlaggedCorrectly: numOfCellFlaggedCorrectlyCpy
        });

        if (numOfCellFlaggedCorrectlyCpy === this.props.mines)
            this.gameWinner();
    }

    gameOver() {
        this.setState({
            status: "GAME OVER", showAlert: true,
            alertTitle: "GAME OVER!",
            alertText: "You LOST!",
            alertType: 'error',
            alertConfirmButtonText: 'Try Again'
        });
    }

    gameWinner() {
        this.setState({
            status: "GAME WINNER", showAlert: true,
            alertTitle: "You WIN!",
            alertText: "GOOD JOB!",
            alertType: 'success',
            alertConfirmButtonText: 'Another One?'
        });
    }

    render() {
        return (
            <Flex column>
                <Box w={1/4}>
                Game Status: {this.state.status} <br />
                Flags Left: {this.props.mines - this.state.numOfCellFlagged} <br />
                </Box>
                <Box>
                <Board
                    board={this.state.boardArr}
                    onReveal={(row, col) => this.revealCell(row, col)}
                    onFlag={(row, col) => this.flagCell(row, col)}
                    superman={this.props.superman}
                />

                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.alertText}
                    type={this.state.alertType}
                    confirmButtonText={this.state.alertConfirmButtonText}
                    onConfirm={() => this.setState({showAlert: false})}
                />
                </Box>
            </Flex>
        );
    }
}

export default Game;
