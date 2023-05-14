import { Component } from 'react';
import React from 'react';

class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className='list-of-messages'>
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }

    renderMessage(message) {
        const { member, text, timestamp } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? 'guest' : 'currentMember';
        return (
            <li className={className}>
                <div className='username'>{member.clientData.username}</div>
                <div className='timestamp'>{new Date(timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div className='content'>{text}</div>
            </li>
        );
    }
}

export default Messages;