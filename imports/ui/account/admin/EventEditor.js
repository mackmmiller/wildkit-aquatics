import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { adminData } from '../Admin';

const createPractice = gql`
  mutation createPractice($start: Date!, $end: Date!, $groupId: String) {
    createPractice(start: $start, end: $end, groupId: $groupId) {
      _id
    }
  }
`;

const deletePractice = gql`
  mutation deletePractice($practiceId: String!) {
    deletePractice(practiceId: $practiceId) {
      _id
    }
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.lightGray};
  border-radius: 0.3rem;
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  > form {
    display: flex;
    flex-direction: column;
  }
`;

class EventEditor extends Component {
  state = {
    eventType: 'practice',
    group: '6vEBkEZZ4QZmfKyve',
  };

  handleSubmit = (e) => {
    const { eventType } = this.state;
    e.preventDefault();
    if (eventType === 'practice') {
      this.createPractice();
    }
    if (eventType === 'competition') {
      this.createCompetition();
    }
    if (eventType === 'event') {
      this.createEvent();
    }
    this.props.unmount();
  };

  createPractice = () => {
    this.props
      .createPractice({
        variables: {
          start: this.start.value,
          end: this.end.value,
          groupId: this.state.group,
        },
      })
      .catch(err => console.log(err));
  };

  createCompetition = () => {
    console.log('creating competition');
  };

  createEvent = () => {
    console.log('creating event');
  };

  deleteEvent = (e) => {
    this.props.deletePractice({
      variables: {
        practiceId: this.props.event._id,
      },
    }).catch(err => console.log(err));
    this.props.unmount();
  }

  render() {
    const { position, event } = this.props;
    const { eventType, group } = this.state;
    return (
      <Wrapper x={position.x} y={position.y}>
        <form onSubmit={this.handleSubmit}>
          <select
            value={eventType}
            onChange={e =>
              this.setState({
                eventType: e.target.value,
              })
            }
          >
            Event Type
            <option value="practice">Practice</option>
            <option value="competition">Competition</option>
            <option value="event">Event</option>
          </select>
          {eventType != 'practice' && (
            <input
              type="text"
              defaultValue={event.name}
              ref={input => (this.name = input)}
            />
          )}
          <input
            type="datetime"
            defaultValue={event.start}
            ref={input => (this.start = input)}
          />
          <input
            type="datetime"
            defaultValue={event.end}
            ref={input => (this.end = input)}
          />
          {eventType === 'practice' && (
            <select
              value={group}
              onChange={e => this.setState({ group: e.target.value })}
            >
              <option value="6vEBkEZZ4QZmfKyve">Learn To Swim</option>
              <option value="irjkNaiqoHtHZDEAt">Bronze</option>
              <option value="yYoN7xePT8tXanLWK">Silver</option>
              <option value="yYwaDGGKKnN46E6kT">Gold</option>
              <option value="yQeCGu7FKWWT7QXHt">Platinum</option>
              <option value="tz72AupRtZFsCPQKz">High School</option>
            </select>
          )}

          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={this.props.unmount} />
          <input type="button" value="Delete" onClick={e => this.deleteEvent(e)} />
        </form>
      </Wrapper>
    );
  }
}

export default compose(
  graphql(createPractice, { name: 'createPractice' }),
  graphql(deletePractice, { name: 'deletePractice' }),
)(EventEditor);
