import React from 'react';

export default function Messages(props) {
    return (
        <ul className='list-of-messages'>
            {props.messages.map(m =>
                <li className={m.member?.id === props.currentMember.id ? 'guest' : 'currentMember'}>
                    <div className='username'>{m.member?.clientData.username == null ? 'Anonymous' : m.member.clientData.username}</div>
                    <div className='timestamp'>{new Date(m.timestamp * 1000).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    <div className='content'>{m.data}</div>
                </li>
            )}
        </ul>
    )
}