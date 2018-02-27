import React from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import moment from "moment";

BigCalendar.momentLocalizer(moment);
const allEvents = gql`
  query allEvents {
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
    title: `${e.practice.group.name} Practice`
  }));

const Calendar = ({ loading, allEvents }) => {
  if (loading)
    return (
      <div>
        <i className="fas fa-circle-notch fa-spin" />
      </div>
    );
  return (
    <Wrapper>
      <BigCalendar
        className="calendar"
        events={transformEvents(allEvents)}
        defaultView="week"
        views={["month", "week", "day"]}
        step={60}
        showMultiDayTimes
        eventPropGetter={event => ({ className: event.group })}
        defaultDate={moment().toDate()}
      />
    </Wrapper>
  );
};

export default graphql(allEvents, {
  props: ({ data }) => ({ ...data })
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
    background-color: #6c541e;
  }
  .Silver {
    background-color: #b3b3b3;
  }
  .Gold {
    background-color: #ffd700;
  }
  .Platinum {
    background-color: #dadada;
  }
`;
