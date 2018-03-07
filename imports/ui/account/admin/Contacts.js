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
        container = <Swimmer data={contact} />;
        break;

      case 'coach':
        container = <Coach data={contact} />;
        break;

      default:
        container = <User data={contact} />;
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
          <div className="top">
            <h3>Contacts</h3>
            <input type="search" placeholder="Search Contacts" />
          </div>
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
          </div>
        </Header>
        <Container>
          {contacts.map(contact => this.chooseContainer(contact))}
        </Container>
      </div>
    );
  }
}

export default Contacts;

const Container = styled.div`
  background: ${props => props.theme.white};
  height: auto;
  max-height: 30rem;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    > h3 {
      margin: 0;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0;
  }
`;
