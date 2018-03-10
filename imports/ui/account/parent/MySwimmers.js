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
    border-radius: 0.5rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  border: none;
  background: ${props => props.theme.white};
  color: ${props => props.theme.mainOrange};
  border: 2px solid ${props => props.theme.mainOrange};
  max-width: 35rem;
  outline: none;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;

class MySwimmers extends Component {
  state = {
    current: null,
  }

  render() {
    const { current } = this.state;
    const { swimmers } = this.props;
    return (
      <Fragment>
        <Left>
          {swimmers[0] ? swimmers.map(swimmer => (
            <Button
              // active={swimmer._id === current.props.swimmer}
              key={swimmer._id}
              onClick={() =>
                  this.setState({
                    current: <Swimmer swimmer={swimmer._id} />,
                  })
                }
            >
              {swimmer.firstName} {swimmer.lastName}
            </Button>
            )) : <p>You haven't registered any swimmers. Add some now!</p>}
          <Button
            onClick={() => this.setState({ current: <NewSwimmerForm /> })}
          >
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
