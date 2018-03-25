import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import EventEditor from './EventEditor';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    events: this.props.events,
    eventEditor: false,
    position: { x: 0, y: 0 },
    event: null,
  }

  createBlankEvent = (start, end) => {
    const { events } = this.state;
    const newEvent = {
      name: 'Untitled Event',
      start,
      end,
    };
    events.push(newEvent);
    this.setState({ events });
  }

  editEvent = (event, e) => {
    const { eventEditor } = this.state;
    this.setState({
      eventEditor: !eventEditor,
      position: { x: e.pageX, y: e.pageY },
      event,
    });
  }

  unmount = () => this.setState({ eventEditor: false });

  render() {
    const {
      events, eventEditor, position, event,
    } = this.state;
    return (
      <Fragment>
        <BigCalendar
          views={['month', 'week']}
          defaultView="week"
          step={15}
          timeslots={8}
          showMultiDayTimes
          events={events}
          defaultDate={moment().toDate()}
          titleAccessor={e => (e.group ? `${e.group.name} Practice` : e.name)}
          startAccessor={e => moment(e.start).toDate()}
          endAccessor={e => moment(e.end).toDate()}
          onSelectEvent={(event, e) => this.editEvent(event, e)}
          onSelectSlot={({ start, end }) => this.createBlankEvent(start, end)}
          style={{ color: '#181818', height: '60rem', width: '100%' }}
          selectable
        />
        {eventEditor && <EventEditor position={position} event={event} unmount={this.unmount.bind(this)} />}
      </Fragment>
    );
  }
}

export default Calendar;
