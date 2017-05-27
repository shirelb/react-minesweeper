/**
 * Created by Shir-el on 27/05/2017.
 */
import React, {Component} from 'react';

class Cell extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        color: React.PropTypes.string,
        onClick: React.PropTypes.func,
        onShiftClick: React.PropTypes.func
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
            <div style={{
                border: 'solid 1px black',
                lineHeight: '40px',
                textAlign: 'center',
                width: 40,
                height: 40,
                backgroundColor: this.props.color
            }}
                 onClick={this.onClick.bind(this)}>
                {this.props.text}
            </ div >
        );
    }
}

export default Cell;
