/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import Cell from './Cell.js';

class Board extends Component {
    static propTypes = {
        board: React.PropTypes.any,
        onReveal: React.PropTypes.func,
        onFlag: React.PropTypes.func
    };

    renderRow(row, rowIndex) {
        return (
            row.map((cell, cellIndex)=> {
                let cellColor, cellText;
                if (cell.revealed) {
                    cellColor = "white";
                    cellText = cell.cellValue.toString();
                }
                else if (cell.flagged) {
                    cellColor = "gray";
                    cellText = "F";
                } else {
                    cellColor = "gray";
                    cellText = null;
                }
                return (<td key={cellIndex}>
                    <Cell
                        text={cellText}
                        color={cellColor}
                        onClick={() => this.props.onReveal(rowIndex, cellIndex)}
                        onShiftClick={() => this.props.onFlag(rowIndex, cellIndex)}
                    />
                </td>);
            })
        );
    }

    render() {
        return (
            <table>
                {this.props.board.map((row, rowIndex)=> {
                    return (<tr key={rowIndex}>{this.renderRow(row, rowIndex)}</tr>);
                })}
            </table>
        );
    }
}

export default Board;
