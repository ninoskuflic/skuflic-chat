import { Component } from 'react';
import React from 'react';

class Input extends Component {
    state = {
        text: ''
    }

    onChange(e) {
        this.setState({ text: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ text: '' });
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <input onChange={e => this.onChange(e)} value={this.state.text} type='text' placeholder='Enter your message and press ENTER' autoFocus='true' />
                <button type='submit'>Send</button>
            </form>
        );
    }
}

export default Input;