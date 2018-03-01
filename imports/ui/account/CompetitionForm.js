import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CompetitionForm extends Component {
  static propTypes = {};

  handleSubmit = () => {
    console.log('Submitting');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    );
  }
}

export default CompetitionForm;
