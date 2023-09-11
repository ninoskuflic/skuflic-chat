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

  useEffect(() => {
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone('f0vh6Bk1ZKYTHuqo', {
        data: chat.member
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
            <p>TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com. All rights reserved. Do not enter personal or sensitive information.<span className='disclaimer'>We take no responsibility for the opinions expressed in this chat room. We are unable to check any facts and therefore cannot attest to the accuracy of information contained in any discussion thread. Users of this chat room shall remain solely responsible for the content of their communications. We urge you not to use language that may be offensive to others, promote violence or negative issues, advertise products or services, or infringe anyone else's intellectual property or proprietary rights (including trademarks, copyright, or rights of publicity or privacy) or to give out personal information. Wereserve the right, but not the obligation, to monitor the content of this chat room and to remove, refuse to post or edit any material or content which we, in our sole discretion, determine to be objectionable. We, our affiliates and assignees may use, reproduce, publish, distribute, store and archive such messages in whole or in part in any form or medium whatsoever, without compensation of any sort. Users of this chat room acknowledge and agree that any material downloaded or otherwise obtained through the use of the chat room is at the user's own discretion and risk, and that such user will be solely responsible for any damage to computer systems or loss of data that may result from the download of any such material. All users under 18 should participate in this chat room under the supervision of their parents. If you DO NOT AGREE with this disclaimer, please EXIT the site immediately.</span></p>
          </div>
        </div>

        <div className='col-md-7 bg-light'>
          <div className='header'>
            {/* <div className='online-members'>
              {members.map((member, index) =>
                <span key={member.id}>{(index ? ', ' : '') + member.clientData.username}</span>
              )}
            </div> */}
          </div>
          <div className='chat'>
            <Messages messages={chat.messages} currentMember={chat.member} />
            <Input onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}