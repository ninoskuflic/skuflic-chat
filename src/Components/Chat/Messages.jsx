import React from 'react';
import { useRef, useEffect } from 'react';

export default function Messages(props) {
    const listRef = useRef(null);

    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    });

    return (
        <ul className='list-of-messages' ref={listRef}>
            {props.messages.map(m =>
                <li className={m.member?.id === props.currentMember.id ? 'guest' : 'currentMember'} key={crypto.randomUUID()}>
                    <div className='username'>{m.member?.clientData.username == null ? 'Anonymous' : m.member.clientData.username}</div>
                    <div className='timestamp'>{new Date(m.timestamp * 1000).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    <div className='content'>{m.data}</div>
                </li>
            )}
        </ul>
    )
}