/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
    static propTypes = {
        text: PropTypes.string,
        color: PropTypes.string,
        cursor: PropTypes.string,
        onClick: PropTypes.func,
        onShiftClick: PropTypes.func
    };

    onClick(event) {
        if (event.shiftKey) {
            this.props.onShiftClick();
        }
        else {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div style={{ lineHeight: '40px',
                            textAlign: 'center',
                            width: 40,
                            height: 40,
                            backgroundColor: this.props.color,
                            borderRadius:'50%',
                            cursor: this.props.cursor
                            }}
                 onClick={this.onClick.bind(this)}>
                {this.props.text}
            </ div >
        );
    }
}

export default Cell;
