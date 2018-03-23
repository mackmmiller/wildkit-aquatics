import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import styled from 'styled-components';

import DonationForm from './components/DonationForm';

const Wrapper = styled.div`
  display: flex;
`;

class Donate extends Component {
  render() {
    return (
      <Wrapper>
        <div>Hi</div>
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
      </Wrapper>
    );
  }
}

export default Donate;
