import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Pill } from '../../styles/styles';

class Competition extends Component {
  static propTypes = {
    data: PropTypes.shape({
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
    data: null,
  }

  render() {
    const { data } = this.props;
    return (
      <Pill>
        {data.name}
      </Pill>
    );
  }
}

export default Competition;
