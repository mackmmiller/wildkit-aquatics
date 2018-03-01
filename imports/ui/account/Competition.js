import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Competition extends Component {
  static propTypes = {
    competition: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      location: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      results: PropTypes.shape({
        id: PropTypes.string,
      }),
      swimmers: PropTypes.shape({
        dateOfBirth: PropTypes.string,
        middleName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    competition: null,
  }

  render() {
    const { competition } = this.props;
    return (
      <div>
        {competition.name}
      </div>
    );
  }
}

export default Competition;
