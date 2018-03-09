import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class Billing extends Component {
  render() {
    return (
      <Fragment>
        <Content>
          <h4>THANK YOU FOR SUPPORTING WILDKIT AQUATICS</h4>
          <p>Next bill due: 2018-02-14</p>
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
