import { useState } from 'react';
import React from 'react';

export default function Input(props) {
    const [text, setText] = useState('');

    function onChange(e) {
        setText(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        setText('')
        props.onSendMessage(text);
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <input onChange={e => onChange(e)} value={text} type='text' placeholder='Enter your message' autoFocus='true' />
            <button type='submit'>Send</button>
        </form>
    );
}