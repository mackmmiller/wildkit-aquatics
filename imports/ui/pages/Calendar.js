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

const Calendar = ({ loading, allPractices }) => {
  if (loading) {
 return (
    <div>
        <i className="fas fa-circle-notch fa-spin" />
      </div>
  );
  }
  return (
    <Wrapper>
      <BigCalendar
        className="calendar"
        events={transformPractices(allPractices)}
        defaultView="week"
        views={['month', 'week', 'day']}
        step={60}
        showMultiDayTimes
        eventPropGetter={event => ({ className: event.group })}
        defaultDate={moment().toDate()}
      />
    </Wrapper>
  );
};

export default graphql(allPractices, {
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
  .Bronze {
    background-color: ${props => props.theme.bronze};
  }
  .Silver {
    background-color: ${props => props.theme.silver};
  }
  .Gold {
    background-color: ${props => props.theme.gold};
  }
  .Platinum {
    background-color: ${props => props.theme.platinum};
  }
`;
