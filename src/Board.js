/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import Cell from './Cell.js';

class Board extends Component {
    static propTypes = {
        board: React.PropTypes.any,
        onReveal: React.PropTypes.func,
        onFlag: React.PropTypes.func,
        superman: React.PropTypes.bool
    };

    renderRow(row, rowIndex) {
        return (
            row.map((cell, cellIndex)=> {
                    let cellColor, cellText;
                    if (this.props.superman) {
                        cell.cellValue === -1 ? cellText = '💣' :
                            cell.cellValue === 0 ? cellText = null :
                                cellText = cell.cellValue.toString();
                        cell.revealed ?
                            cellColor = "#ffccbc" :
                            cell.flagged ?
                                cellColor = "#ab2639" :
                                cellColor = "#c73145"
                    }
                    else {
                        if (cell.revealed) {
                            cellColor = "#ffccbc";
                            cell.cellValue === -1 ? cellText = '💣' :
                                cell.cellValue === 0 ? cellText = null :
                                    cellText = cell.cellValue.toString();
                        }
                        else if (cell.flagged) {
                            cellColor = "#ab2639";
                            cellText = '🚩';
                        } else {
                            cellColor = "#c73145";
                            cellText = null;
                        }
                    }
                    return (<td key={cellIndex}>
                        <Cell
                            text={cellText}
                            color={cellColor}
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
                {this.props.board.map((row, rowIndex)=> {
                    return (<tr key={rowIndex}>{this.renderRow(row, rowIndex)}</tr>);
                })}
            </table>
        );
    }
}

export default Board;
