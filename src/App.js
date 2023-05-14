import React, { useState, useEffect } from 'react';
import { randomName } from './Utils/Helpers'
import './Styles/App.scss';

import { Messages, Input } from './Components';

export default function App() {
  const initialChatState = {
    member: { username: randomName() },
    messages: []
  };
  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone('ZH8ABIFtNT5K3hyT', {
        data: chat.member
      });
      setDrone(drone);
    }
  }, [chat.member]);

  if (drone) {
    drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      chat.member.id = drone.clientId;
      setChat({ ...chat }, chat.member);

      const room = drone.subscribe('observable-room', {
        historyCount: 5
      });

      room.on('message', (message) => {
        const { data, member, timestamp, id } = message;
        chat.messages.push({ member, data, timestamp, id });
        setChat({ ...chat }, chat.messages);
      });

      room.on('history_message', (message) => {
        const { data, member, timestamp, id } = message;
        chat.messages.push({ member, data, timestamp, id });
        setChat({ ...chat }, chat.messages);
      });

    });
  }

  const onSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row no-gutter'>
        <div className='col-md-5 d-none d-md-flex bg-image'>
          <div className='legal'>
            <div>
              <a href='https://go.skuflic.com/terms' target='_blank' rel='noreferrer'>Terms of Use</a>
              <a href='https://go.skuflic.com/servicesagreement' target='_blank' rel='noreferrer'>Services Agreement</a>
              <a href='https://go.skuflic.com/privacy' target='_blank' rel='noreferrer'>Privacy Policy</a>
            </div>
            <p>TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com. All rights reserved. <br />This is a demo application accessible to anyone on the Internet, do not enter personal or sensitive information.</p>
          </div>
        </div>

        <div className='col-md-7 bg-light'>
          <div className='py-5 chat'>
            <Messages messages={chat.messages} currentMember={chat.member} />
            <Input onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}