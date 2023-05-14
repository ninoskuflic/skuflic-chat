import React, { Component } from 'react';
import './App.scss';
import { randomName, randomColor } from './Utils/Helpers'

import { Messages, Input } from './Components';

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone('ZH8ABIFtNT5K3hyT', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe('observable-room');
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row no-gutter'>
          <div className='col-md-5 d-none d-md-flex bg-image'>
            <div className='legal'>
              <div>
                <a href='https://go.skuflic.com/terms' target='_blank' rel='noreferrer'>Terms of Use</a>
                <a href='https://go.skuflic.com/servicesagreement' target='_blank' rel='noreferrer'>Services
                  Agreement</a>
                <a href='https://go.skuflic.com/privacy' target='_blank' rel='noreferrer'>Privacy Policy</a>
              </div>
              <p>TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com. All rights reserved. This is a demo application, messages will not be stored.</p>
            </div>
          </div>

          <div className='col-md-7 bg-light'>
            <div className='py-5 chat'>
              <Messages messages={this.state.messages} currentMember={this.state.member} />
              <Input onSendMessage={this.onSendMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message
    });
  }
}

export default App;