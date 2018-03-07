import React, { Component, Fragment } from 'react';
// import braintree from 'braintree-web';
import styled from 'styled-components';

// const handlePayment = (createErr, instance) => {
//   instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
//     fetch('/checkout', {
//       method: 'POST',
//       body:
//     })
//   });
// };

// braintree.client.create({
//   authorization: 'zv74x7s3b74s42y4'
// }, handlePayment);


class Billing extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <h3>BILLING</h3>
        </Header>
        <Content>
          <h4>THANK YOU FOR SUPPORTING WILDKIT AQUATICS</h4>
          <p>Next bill due: 2018-02-14</p>
        </Content>
      </Fragment>
    );
  }
}

export default Billing;

const Header = styled.header`
  background: ${props => props.theme.mainNavy};
  color: ${props => props.theme.white};
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  > h3 {
    margin: 0;
  }
`;

const Content = styled.div`
  margin: 1rem;
  color: ${props => props.theme.white};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bolder;
`;
