import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

import AddressSection from './AddressSection';
import CardSection from './CardSection';

class DonationForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <CardSection />
        <button>Confirm Order</button>
      </form>
    );
  }
}

export default injectStripe(DonationForm);
