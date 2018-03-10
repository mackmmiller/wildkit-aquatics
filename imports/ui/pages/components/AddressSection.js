import React, { Component } from 'react';
import { AddressElement } from 'react-stripe-elements';

class AddressSection extends Component {
  render() {
    return (
      <div>
        <label>
          Address details
          <AddressElement style={{ base: { fontSize: '18px' } }} />
        </label>
      </div>
    );
  }
}

export default AddressSection;
