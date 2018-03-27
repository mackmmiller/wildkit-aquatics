import React, { Component } from 'react';
import moment from 'moment';

class Attendance extends Component {
  state = {
    current: {
      _id: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
    },
    i: 0,
    present: [],
    absent: [],
    tardy: [],
  };

  componentDidMount = () => {
    const { athletes } = this.props;
    this.setState({ current: athletes[0], i: 1 });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { length, athletes } = this.props;
    const { i } = this.state;
    const next = i + 1;
    if (!prevState.i) return;
    const current = i === length ? null : athletes[next];
    this.setState({ current });
  };

  handleClick = (attendance, id) => {
    const { present, absent, tardy } = this.state;
    if (attendance === 'present') present.push(id);
    if (attendance === 'absent') absent.push(id);
    if (attendance === 'tardy') tardy.push(id);
    this.setState({
      present,
      tardy,
      absent,
    });
  };

  render() {
    const { current } = this.state;
    if (current) {
      return (
        <div>
          <h1>
            {current.firstName} {current.lastName}
          </h1>
          <button onClick={() => this.handleClick('present', current._id)}>
            Present
          </button>
          <button onClick={() => this.handleClick('absent', current._id)}>
            Absent
          </button>
          <button onClick={() => this.handleClick('tardy', current._id)}>
            Tardy
          </button>
        </div>
      );
    }
    return <div>Done</div>;
  }
}

export default Attendance;
