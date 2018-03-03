import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Coach from './admin/CoachList';
import User from './admin/UserList';
import Group from './admin/Group';
import Competition from './admin/Competition';
import CompetitionForm from './admin/CompetitionForm';
import NewCoach from './admin/NewCoach';
import Utility from './admin/Utility';

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
    allParents {
      _id
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

const Admin = ({
  loading, allUsers, allGroups, allCoaches, allCompetitions, allPractices, allSwimmers, allParents,
}) => {
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
            events={allPractices.concat(allCompetitions)}
            defaultDate={moment().toDate()}
            titleAccessor={e => (e.group ? `${e.group.name} Practice` : e.name)}
            startAccessor={e => moment(e.start).toDate()}
            endAccessor={e => moment(e.end).toDate()}
            onSelectEvent={e => alert(e.name)}
            onSelectSlot={slotInfo => alert(`${slotInfo.start.toLocaleString()}`)}
            selectable
          />
        </Content>
      </Calendar>
      <Competitions className="competitions">
        <Utility
          name="Competitions"
          data={allCompetitions}
          Container={Competition}
          Form={CompetitionForm}
          search
          button
        />
      </Competitions>
      <Groups className="groups">
        <Utility name="Groups" data={allGroups} Container={Group} />
      </Groups>
      <Swimmers>
        <Utility
          name="Swimmers"
          data={allSwimmers}
          Container={() => <div />}
          search
        />
      </Swimmers>
      <Coaches className="coaches">
        <Utility
          name="Coaches"
          data={allCoaches}
          Container={Coach}
          Form={NewCoach}
          search
          button
        />
      </Coaches>
      <Users className="users">
        <Utility
          name="Parents"
          data={allParents}
          Container={User}
          search
        />
      </Users>
    </Wrapper>
  );
};

Admin.propTypes = {
  loading: PropTypes.bool.isRequired,
  allUsers: PropTypes.array,
  allCoaches: PropTypes.array,
  allGroups: PropTypes.array,
  allPractices: PropTypes.array,
  allSwimmers: PropTypes.array,
  allCompetitions: PropTypes.array,
};


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
    height: 65rem;
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
  > div {
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
