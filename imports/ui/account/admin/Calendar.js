import React, { Component, Fragment } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  render() {
    const { events } = this.props;
    return (
      <Fragment>
        <BigCalendar
          views={['month', 'week']}
          defaultView="week"
          step={60}
          showMultiDayTimes
          events={events}
          defaultDate={moment().toDate()}
          titleAccessor={e => (e.group ? `${e.group.name} Practice` : e.name)}
          startAccessor={e => moment(e.start).toDate()}
          endAccessor={e => moment(e.end).toDate()}
          onSelectEvent={e => alert(e.name)}
          onSelectSlot={slotInfo => alert(`${slotInfo.start.toLocaleString()}`)}
          style={{ color: '#181818' }}
          selectable
        />
      </Fragment>
    );
  }
}

export default Calendar;
