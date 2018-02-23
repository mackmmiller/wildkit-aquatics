import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
const eventsQuery = gql`
  query eventsQuery {
    allEvents {
      _id
      start
      end
      eventType
    }
  }
`;
const event = {
  id: 0,
  start: '1519403400',
  end: '1519408800',
  title: 'Practice',
};

const Calendar = ({ loading, allEvents }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <BigCalendar
        className="calendar"
        events={event}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={moment().toDate()}
      />
    </Wrapper>
  );
};

export default graphql(eventsQuery, {
  props: ({ data }) => ({ ...data }),
})(Calendar);

const Wrapper = styled.div`
  padding: 3rem;
  height: 70vh;
  color: #181818;
  .calendar {
    max-width: 100rem;
    margin: auto;
  }
`;
