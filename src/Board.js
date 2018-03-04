/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import Cell from './Cell.js';
import PropTypes from 'prop-types';

class Board extends Component {
    static propTypes = {
        board: PropTypes.any,
        onReveal: PropTypes.func,
        onFlag: PropTypes.func,
        superman: PropTypes.bool
    };

    renderRow(row, rowIndex) {
        return (
            row.map((cell, cellIndex) => {
                    let cellColor, cellCursor, cellText;
                    if (this.props.superman) {
                        cell.cellValue === -1 ? cellText = '💣' :
                            cell.cellValue === 0 ? cellText = null :
                                cellText = cell.cellValue.toString();
                        if (cell.revealed) {
                            cellColor = "#ffccbc";
                            cellCursor = "auto";
                        }
                        else {
                            cellCursor = "pointer";
                            if (cell.flagged){
                                cellColor = "#ab2639" ;
                                cellText = '🚩';
                            }
                            else
                                cellColor = "#c73145"
                        }
                    }
                    else {
                        if (cell.revealed) {
                            cellColor = "#ffccbc";
                            cellCursor = "auto";
                            cell.cellValue === -1 ? cellText = '💣' :
                                cell.cellValue === 0 ? cellText = null :
                                    cellText = cell.cellValue.toString();
                        }
                        else if (cell.flagged) {
                            cellColor = "#ab2639";
                            cellText = '🚩';
                            cellCursor = "pointer";
                        } else {
                            cellColor = "#c73145";
                            cellText = null;
                            cellCursor = "pointer";
                        }
                    }
                    return (<td key={cellIndex}>
                        <Cell
                            text={cellText}
                            color={cellColor}
                            cursor={cellCursor}
                            onClick={() => this.props.onReveal(rowIndex, cellIndex)}
                            onShiftClick={() => this.props.onFlag(rowIndex, cellIndex)}
                        />
                    </td>);
                }
            )
        );
    }

    render() {
        return (
            <table style={{userSelect: "none"}}>
                <tbody>
                {this.props.board.map((row, rowIndex) => {
                    return (<tr key={rowIndex}>{this.renderRow(row, rowIndex)}</tr>);
                })}
                </tbody>
            </table>
        );
    }
}

export default Board;
