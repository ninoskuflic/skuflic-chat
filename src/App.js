import React, { useState, useEffect } from 'react';
import { errorNotification, randomName, successNotification } from './Utils/Helpers'
import './Styles/App.scss';
import { Messages, Input } from './Components';

export default function App() {
  const initialChatState = {
    member: { username: randomName() },
    messages: []
  };
  const [chat, setChat] = useState(initialChatState);
  const [members, setMembers] = useState([]);
  const [drone, setDrone] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone('CwSBeUbb8qkNGlum', {
        data: chat.member,
      });
      setDrone(drone);
    }
  }, [chat.member]);

  useEffect(() => {
    if (drone) {
      drone.on('open', (error) => {
        if (error) {
          return console.error(error);
        }
        chat.member.id = drone.clientId;
        setChat({ ...chat }, chat.member);

        const room = drone.subscribe('observable-room', {
          historyCount: 100
        });

        room.on('message', (message) => {
          const { data, member, timestamp, id } = message;
          chat.messages.push({ member, data, timestamp, id, });
          setChat({ ...chat }, chat.messages);
        });

        room.on('history_message', (message) => {
          const { data, member, timestamp, id } = message;
          chat.messages.push({ member, data, timestamp, id });
          setChat({ ...chat }, chat.messages);
        });

        room.on('members', (members) => {
          setMembers(members)
        });

        room.on('member_join', (member) => {
          successNotification(`${member.clientData.username} has joined the chat.`)
        });

        room.on('member_leave', (member) => {
          errorNotification(`${member.clientData.username} has left the chat.`)
        });
        setLoaded(true);
      });

      drone.on('close', event => console.log('Connection was closed', event));
      drone.on('error', error => console.error(error));

    }
  }, [chat, drone, members])

  const onSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message
    });
  };

  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set script source and attributes
    script.src = 'https://static.skuflic.com/cookies/cookieconsent.js';
    script.type = 'module';
    script.defer = true;

    // Define onLoad and onError handlers
    const onLoad = () => {
      console.log('Script loaded successfully');
    };

    const onError = (error) => {
      console.error('Script loading error:', error);
    };

    // Add event listeners for script loading events
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove event listeners
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);

      // Remove the script from the document body
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render


  return (
    <div className='container-fluid'>
      <div className='row no-gutter'>
        <div className='col-md-4 d-none d-md-flex bg-image'>
          <div className='legal'>
            <a href='#' data-cc='show-preferencesModal'>Cookie Settings</a>
            <a href='https://go.skuflic.com/servicesagreement' target='_blank' rel='noreferrer'>Services Agreement</a>
            <a href='https://go.skuflic.com/privacy' target='_blank' rel='noreferrer'>Privacy Policy</a>
            <p>TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com. All rights reserved. Do not enter personal or sensitive information.</p>
          </div>
        </div>

        <div className='col-md-8 bg-light'>
          {/* <div className='header'>
            <div className='online-members'>
              {members.map((member, index) =>
                <span key={member.id}>{(index ? ', ' : '') + member.clientData.username}</span>
              )}
            </div>
          </div> */}
          <div className='chat'>
            <Messages messages={chat.messages} currentMember={chat.member} loaded={loaded} />
            <Input onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}