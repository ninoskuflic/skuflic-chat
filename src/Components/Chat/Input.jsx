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
            <div className='input-group'>
                <input onChange={e => onChange(e)} value={text} type='text' placeholder='Enter your message' autoFocus={true} />
                <span className='input-group-text'>
                    <span className='material-symbols-outlined'>arrow_forward_ios</span>
                </span>
            </div>
        </form>
    );
}