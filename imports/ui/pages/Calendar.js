import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);
const allPractices = gql`
  query allPractices {
    allPractices {
      _id
      start
      end
      group {
        name
      }
    }
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
  }
`;

const Calendar = ({ loading, allPractices, allCompetitions }) => {
  if (loading) {
    return (
      <div>
        <i className="fas fa-circle-notch fa-spin" />
      </div>
    );
  }
  return (
    <Wrapper>
      <BigCalendar className="calendar" events={allPractices.concat(allCompetitions)} defaultView="week" views={['month', 'week', 'day']} step={60} showMultiDayTimes defaultDate={moment().toDate()} titleAccessor={e => (e.group ? `${e.group.name} Practice` : e.name)} startAccessor={e => moment(e.start).toDate()} endAccessor={e => moment(e.end).toDate()} />
    </Wrapper>);
};

export default graphql(allPractices, {
  props: ({ data }) => ({ ...data }),
})(Calendar);

const Wrapper = styled.div`
  padding: 3rem;
  height: 85vh;
  color: #181818;
  .calendar {
    max-width: 100rem;
    margin: auto;
  }
`;
