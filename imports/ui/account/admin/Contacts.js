import React, { Component } from 'react';
import styled from 'styled-components';

import Swimmer from './Swimmer';
import Coach from './CoachList';
import User from './UserList';

class Contacts extends Component {
  state = {
    contacts: [
      ...this.props.athletes,
      ...this.props.coaches,
      ...this.props.parents,
    ],
  };

  chooseContainer = (contact) => {
    let container;
    switch (contact.__typename.toLowerCase()) {
      case 'swimmer':
        container = <Swimmer key={contact._id} data={contact} />;
        break;

      case 'coach':
        container = <Coach key={contact._id} data={contact} />;
        break;

      default:
        container = <User key={contact._id} data={contact} />;
        break;
    }
    return container;
  };

  render() {
    const { athletes, coaches, parents } = this.props;
    const { contacts } = this.state;
    const all = [...athletes, ...coaches, ...parents];
    return (
      <div>
        <Header>
          <div className="buttons">
            <button onClick={() => this.setState({ contacts: all })}>
              All
            </button>
            <button onClick={() => this.setState({ contacts: athletes })}>
              Athletes
            </button>
            <button onClick={() => this.setState({ contacts: coaches })}>
              Coaches
            </button>
            <button onClick={() => this.setState({ contacts: parents })}>
              Parents
            </button>
            <input type="search" placeholder="Search Contacts" />
          </div>
        </Header>
        <Container>
          <div className="contacts">
            {contacts.map(contact => this.chooseContainer(contact))}
          </div>
          <div className="workspace">
            Hi
          </div>
        </Container>
      </div>
    );
  }
}

export default Contacts;

const Container = styled.div`
  background: ${props => props.theme.white};
  height: auto;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  display: flex;
  .contacts, .workspace {
    flex: 1;
    min-height: 45rem;
    max-height: 60rem;
    overflow-y: auto;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0;
  }
`;
