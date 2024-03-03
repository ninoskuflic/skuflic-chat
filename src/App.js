import React, { useState, useEffect } from 'react';
import { errorNotification, randomName, successNotification } from './Utils/Helpers'
import './Styles/App.scss';
import * as CookieConsent from 'vanilla-cookieconsent';
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
    CookieConsent.run({ guiOptions: { consentModal: { layout: 'cloud', position: 'bottom center', equalWeightButtons: true, flipButtons: true }, preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true, flipButtons: false } }, categories: { necessary: { readOnly: true }, analytics: {} }, language: { default: 'en', translations: { en: { consentModal: { title: 'Cookies improve your experience', description: 'We use cookies and data to deliver and maintain our services, track outages and protect against spam, fraud, and abuse, and measure audience engagement and site statistics to understand how our services are used and enhance the quality of those services. You can make changes at any time. For more information, see our Privacy & Cookie Policy.', closeIconLabel: '', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject all', showPreferencesBtn: 'Manage preferences', footer: '<a href=\'https://go.skuflic.com/privacy\'>Privacy Policy</a>\n<a href=\'https://go.skuflic.com/servicesagreement\'>Terms and conditions</a>' }, preferencesModal: { title: 'Consent Preferences Center', closeIconLabel: 'Close modal', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject all', savePreferencesBtn: 'Save preferences', serviceCounterLabel: 'Service|Services', sections: [{ title: 'Your Privacy Choices', description: 'In this panel you can express some preferences related to the processing of your personal information.\nYou may review and change expressed choices at any time by resurfacing this panel via the provided link.\nTo deny your consent to the specific processing activities described below, switch the toggles to off or use the "Reject all" button and confirm you want to save your choices.' }, { title: 'Strictly Necessary <span class=\'pm__badge\'>Always On</span>', description: 'Enables core functionality to power your language, location and preferences. Also supports security, network management and accessibility.', linkedCategory: 'necessary' }, { title: 'Performance & Analytics', description: 'Allows use of behavioural data to optimise performance, review how you interact with our sites and apps, and improve Skuflic.com experiences.', linkedCategory: 'analytics' }, { title: 'More information', description: 'If you have any questions about how we respect your data and privacy, feel free to <a class=\'cc__link\' href=\'https://go.skuflic.com/support\'>get in touch</a> with us.' }] } } } }, disablePageInteraction: true });
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row no-gutter'>
        <div className='col-md-5 d-none d-md-flex bg-image'>
          <div className='legal'>
            <a href='#' data-cc='show-preferencesModal'>Cookie Settings</a>
            <a href='https://go.skuflic.com/servicesagreement' target='_blank' rel='noreferrer'>Services Agreement</a>
            <a href='https://go.skuflic.com/privacy' target='_blank' rel='noreferrer'>Privacy Policy</a>
            <p>TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com. All rights reserved. Do not enter personal or sensitive information.</p>
          </div>
        </div>

        <div className='col-md-7 bg-light'>
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