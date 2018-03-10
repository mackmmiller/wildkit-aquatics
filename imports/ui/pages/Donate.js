import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import DonationForm from './components/DonationForm';

class Donate extends Component {
  render() {
    return (
      <div>
        <div>{/* Replace this div with an image. */}</div>
        <div>
          <p>Thank you for considering donating today.</p>
          <p>
            Donations will be utilized in one of two ways. The money will be
            used to purchase equipment used by all six of the aquatics programs.
            The money will also be used to sponsor Learn to Swim or WSO
            programs.
          </p>
          <Elements>
            <DonationForm />
          </Elements>
        </div>
      </div>
    );
  }
}

export default Donate;
