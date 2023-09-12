import { useState } from 'react';
import React from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Input(props) {
    const [text, setText] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);

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

    const addEmoji = (e) => {
        let sym = e.unified.split('-');
        let codesArray = [];
        sym.forEach((el) => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setText(text + emoji);
    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            {showEmojis && (
                <div className='emoji-picker'>
                    <Picker data={data} onEmojiSelect={addEmoji} theme='light' previewPosition='none' />
                </div>
            )}
            <div className='input-group'>
                <textarea onChange={e => onChange(e)} onKeyDown={(e) => handleKeyPress(e)} value={text} placeholder='Enter your message' autoFocus={true} rows='1' />
                <span className='input-group-text emoji' onClick={() => setShowEmojis(!showEmojis)}>
                    <span className='material-symbols-outlined'>mood</span>
                </span>
                <span className='input-group-text' onClick={e => onSubmit(e)}>
                    <span className='material-symbols-outlined'>arrow_forward_ios</span>
                </span>
            </div>
        </form>
    );
}