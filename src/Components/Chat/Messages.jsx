import React from 'react';
import { useRef, useEffect } from 'react';
import Loading from '../../Assets/loading.svg'

export default function Messages(props) {
    const listRef = useRef(null);

    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });

    if (!props.loaded) {
        return <><div className='loading'><img src={Loading} alt='Loading' /></div></>
    } else {
        return (

            <ul className='list-of-messages' ref={listRef}>
                {props.messages.map(m =>
                    <li className={m.member?.id === props.currentMember.id ? 'currentMember' : 'guest'} key={crypto.randomUUID()}>
                        <div className='username'>{m.member?.clientData?.username == null ? 'Anonymous User' : m.member.clientData?.username}</div>
                        <div className='timestamp'>{new Date(m.timestamp * 1000).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                        <div className='content'>{m.data}</div>
                    </li>
                )}
            </ul>
        )
    }

}