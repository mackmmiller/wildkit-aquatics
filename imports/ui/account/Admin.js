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
import Swimmer from './admin/Swimmer';
import Utility from './admin/Utility';
import Contacts from './admin/Contacts';
import Groups from './admin/Groups';

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
      dateOfBirth
    }
    allCoaches {
      _id
      bio
      title
      groups {
        _id
        name
      }
      user {
        email
        firstName
        lastName
      }
    }
    allGroups {
      _id
      name
      coaches {
        _id
        title
        user {
          firstName
          lastName
        }
      }
      swimmers {
        _id
        firstName
        lastName
      }
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
  loading, allGroups, allCoaches, allCompetitions, allPractices, allSwimmers, allParents,
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
      <div className="competitions">
        <Utility
          name="Competitions"
          data={allCompetitions}
          Container={Competition}
          Form={CompetitionForm}
          search
          button
        />
      </div>
      <div className="groups">
        <Groups groups={allGroups} />
      </div>
      <div className="contacts">
        <Contacts athletes={allSwimmers} coaches={allCoaches} parents={allParents} />
      </div>
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
  color: ${props => props.theme.white};
  flex: 1;
  height: 100%;
  width: 95%;
  margin: auto;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "calendar calendar calendar competitions"
    "contacts contacts groups groups";
  .contacts {
    grid-area: contacts;
  }
  .groups {
    grid-area: groups;
  }
  .competitions {
    grid-area: competitions;
  }
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
    background-color: ${props => props.theme.medGray};
    border-radius: 0.5rem;
    font-size: 2rem;
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 0.5rem;
  height: 65rem;
  padding: 1.5rem;
`;

const Calendar = styled.div`
  grid-area: calendar;
  .rbc-event {
    font-size: 0.9rem;
    background-color: ${props => props.theme[props.className]};
  }
`;
