import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import React from 'react';

export default function Input(props) {
    const [text, setText] = useState('');

    function onChange(e) {
        e.preventDefault();
        setText(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        if (text !== '') {
            setText('')
            props.onSendMessage(text);
        }
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            onSubmit(e)
        }
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <div className='input-group'>
                <textarea onChange={e => onChange(e)} onKeyDown={(e) => handleKeyPress(e)} value={text} placeholder='Enter your message' autoFocus={true} rows='1' />
                <span className='input-group-text' onClick={e => onSubmit(e)}>
                    <span className='material-symbols-outlined'>add_reaction</span>
                </span>
                <span className='input-group-text' onClick={e => onSubmit(e)}>
                    <span className='material-symbols-outlined'>arrow_forward_ios</span>
                </span>
            </div>
        </form>
    );
}