import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Elements } from 'react-stripe-elements';

import BillingForm from './BillingForm';

class Billing extends Component {
  render() {
    return (
      <Fragment>
        <Content>
          <Elements>
            <BillingForm />
          </Elements>
        </Content>
      </Fragment>
    );
  }
}

export default Billing;

const Content = styled.div`
  margin: 1rem;
  color: ${props => props.theme.white};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bolder;
`;
