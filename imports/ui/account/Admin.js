import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

import Coach from './CoachList';
import User, { ComposedForm } from './UserList';
import Group from './Group';

BigCalendar.momentLocalizer(moment);

const adminData = gql`
  query adminData {
    allCompetitions {
      _id
      name
      location
      results {
        _id
      }
      swimmers {
        dateOfBirth
        middleName
      }
    }
    allPractices {
      _id
      group {
        name
      }
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
    allEvents {
      _id
      start
      end
      practice {
        group {
          name
        }
      }
    }
  }
`;

const transformEvents = events =>
  events.map(e => ({
    id: e._id,
    start: moment(e.start).toDate(),
    end: moment(e.end).toDate(),
    group: e.practice.group.name,
    title: `${e.practice.group.name} Practice`,
  }));

class Admin extends Component {
  state = {
    newUserForm: false,
  };

  render() {
    const {
      loading,
      allUsers,
      allGroups,
      allCoaches,
      allEvents,
      allSwimmers,
    } = this.props;
    const { newUserForm } = this.state;
    if (loading) return null;
    return (
      <Wrapper>
        <Calendar>
          <Content className="calendar">
            <BigCalendar
              views={['month', 'week']}
              defaultView="week"
              step={60}
              showMultiDayTimes
              events={transformEvents(allEvents)}
              defaultDate={moment().toDate()}
            />
          </Content>
        </Calendar>
        <Competitions className="competitions">
          <Header>
            <h3>Competitions</h3>
          </Header>
          <Content />
        </Competitions>
        <Groups className="groups">
          <Header>
            <h3>Groups</h3>
          </Header>
          <Content className="groupsContent">
            {allGroups.map(group => <Group group={group} key={group._id} />)}
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
            {allCoaches.map(coach => <Coach key={coach._id} coach={coach} />)}
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
  padding: 4rem 0;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, minmax(10rem, auto));
  grid-template-areas:
    "calendar calendar calendar calendar competitions competitions"
    "calendar calendar calendar calendar  . ."
    "groups groups groups groups groups groups"
    "swimmers swimmers coaches coaches users users"
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
    background-color: #dbdbdb;
    border: 2px solid #d1d1d1;
    border-radius: 0.5rem;
    font-size: 2rem;
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
  background-color: #f0f0f0;
  border: 2px solid #d1d1d1;
  border-radius: 0.5rem;
  min-height: 1rem;
  padding: 1.5rem;
`;

const Calendar = styled.div`
  grid-area: calendar;
  .calendar {
    height: 60rem;
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
