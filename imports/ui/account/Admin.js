import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

import Coach from './CoachList';
import User, { ComposedForm } from './UserList';
import Group from './Group';
import Competition from './Competition';
import CompetitionForm from './CompetitionForm';

BigCalendar.momentLocalizer(moment);

const adminData = gql`
  query adminData {
    allCompetitions {
      _id
      name
      location
      start
      end
      results {
        _id
      }
      swimmers {
        dateOfBirth
        middleName
        firstName
        lastName
      }
    }
    allPractices {
      _id
      group {
        name
      }
      start
      end
    }
    allSwimmers {
      _id
      firstName
      middleName
      lastName
    }
    allCoaches {
      _id
      bio
      title
      user {
        email
        firstName
        lastName
      }
    }
    allGroups {
      _id
      name
    }
    allUsers {
      _id
      firstName
      lastName
      email
      userType
    }
  }
`;

const transformPractices = practices =>
  practices.map(p => ({
    id: p._id,
    start: moment(p.start).toDate(),
    end: moment(p.end).toDate(),
    group: p.group.name,
    title: `${p.group.name} Practice`,
  }));

class Admin extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    allUsers: PropTypes.array,
    allCoaches: PropTypes.array,
    allGroups: PropTypes.array,
    allPractices: PropTypes.array,
    allSwimmers: PropTypes.array,
    allCompetitions: PropTypes.array,
  }

  state = {
    newUserForm: false,
    newCompetition: false,
  };

  render() {
    const {
      loading,
      allUsers,
      allGroups,
      allCoaches,
      allCompetitions,
      allPractices,
      allSwimmers,
    } = this.props;
    const { newUserForm, newCompetition } = this.state;
    if (loading) return null;
    return (
      <Wrapper>
        <Calendar>
          <Content className="calendar">
            <BigCalendar views={['month', 'week']} defaultView="week" step={60} showMultiDayTimes events={transformPractices(allPractices)} eventPropGetter={event => ({ className: event.group.toLowerCase() })} defaultDate={moment().toDate()} />
          </Content>
        </Calendar>
        <Competitions className="competitions">
          <Header>
            <h3>Competitions</h3>
            <button
              onClick={() =>
                this.setState({ newCompetition: !this.state.newCompetition })
              }
            >
            New Competition
            </button>
          </Header>
          <Content>
            {newCompetition ? <CompetitionForm /> : null}
            {allCompetitions.map(competition => (
              <Competition
                competition={competition}
                key={competition._id}
              />
            ))}
          </Content>
        </Competitions>
        <Groups className="groups">
          <Header>
            <h3>Groups</h3>
          </Header>
          <Content className="groupsContent">
            {allGroups.map(group => (
              <Group group={group} key={group._id} />
            ))}
          </Content>
        </Groups>
        <Swimmers className="swimmers">
          <Header>
            <h3>Swimmers</h3>
          </Header>
          <Content>
            {allSwimmers.map(swimmer => <div>{swimmer.firstName}</div>)}
          </Content>
        </Swimmers>
        <Coaches className="coaches">
          <Header>
            <h3>Coaches</h3>
          </Header>
          <Content>
            {allCoaches.map(coach => (
              <Coach key={coach._id} coach={coach} />
            ))}
          </Content>
        </Coaches>
        <Users className="users">
          <Header>
            <h3>Users</h3>
            <input type="text" placeholder="Search Users" />
            <button
              onClick={() =>
                this.setState({ newUserForm: !this.state.newUserForm })
              }
            >
              Add User
            </button>
          </Header>
          <Content>
            {newUserForm ? <ComposedForm /> : null}
            {allUsers.map(user => <User user={user} key={user._id} />)}
          </Content>
        </Users>
      </Wrapper>
    );
  }
}

export default compose(
  graphql(adminData, { props: ({ data }) => ({ ...data }) }),
)(Admin);

const Wrapper = styled.div`
  height: 100%;
  width: 95%;
  margin: auto;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, minmax(10rem, auto));
  grid-template-areas:
    "calendar calendar calendar calendar competitions competitions"
    "calendar calendar calendar calendar . ."
    "groups groups groups groups groups groups"
    "swimmers swimmers coaches coaches users users"
    "swimmers swimmers coaches coaches users users";
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, minmax(10rem, auto));
    grid-template-areas:
      "calendar"
      "competitions"
      "groups"
      "swimmers"
      "coaches"
      "users";
    > div {
      width: 100%;
    }
  }
  > div {
    padding: 1rem;
    box-sizing: border-box;
    background-color: ${props => props.theme.lightGray};
    border: 2px solid ${props => props.theme.medGray};
    border-radius: 0.5rem;
    font-size: 2rem;
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;

const Header = styled.div`
  padding: 1rem 0;
  display: flex;
  align-content: flex-end;
  > h3 {
    margin: 0 auto 0 0;
    display: inline-block;
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.medGray};
  border-radius: 0.5rem;
  min-height: 1rem;
  padding: 1.5rem;
`;

const Calendar = styled.div`
  grid-area: calendar;
  .calendar {
    height: 60rem;
    font-size: 1.6rem;
  }
  .rbc-event {
    font-size: 0.9rem;
    background-color: ${props => props.theme[props.className]};
  }
`;

const Competitions = styled.div`
  grid-area: competitions;
`;

const Groups = styled.div`
  grid-area: groups;
  .groupsContent {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    > * {
      flex: 1 100%;
    }
  }
`;

const Swimmers = styled.div`
  grid-area: swimmers;
`;

const Coaches = styled.div`
  grid-area: coaches;
`;

const Users = styled.div`
  grid-area: users;
`;
