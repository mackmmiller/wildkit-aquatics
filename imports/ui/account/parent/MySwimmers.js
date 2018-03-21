import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Swimmer from './Swimmer';
import NewSwimmerForm from './NewSwimmerForm';

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  > div {
    min-height: 40rem;
    background: ${props => props.theme.medGray};
    border-radius: 0.3rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  border: none;
  max-width: 45rem;
  outline: none;
  border-radius: 0.3rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainOrange};
    color: ${props => props.theme.white};
  }
`;

class MySwimmers extends Component {
  state = {
    current: null,
  }

  unmount = () => this.setState({ current: null });

  renderSwimmers = swimmer => (
    <Button
      key={swimmer._id}
      onClick={() => this.setState({ current: <Swimmer swimmer={swimmer._id} /> })}
    >
      {swimmer.firstName} {swimmer.lastName}
    </Button>
  );

  render() {
    const { current } = this.state;
    const { swimmers } = this.props;
    return (
      <Fragment>
        <Left>
          {swimmers[0]
            ? swimmers.map(this.renderSwimmers)
            : <p>You haven't registered any swimmers. Add some now!</p>
          }
          <Button onClick={() => this.setState({ current: <NewSwimmerForm unmount={this.unmount.bind(this)} /> })}>
              New Swimmer
          </Button>
        </Left>
        <Right>
          <div>{current}</div>
        </Right>
      </Fragment>
    );
  }
}

export default MySwimmers;
