import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Utility extends Component {
  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.array.isRequired,
    button: PropTypes.bool,
    Container: PropTypes.func.isRequired,
    Form: PropTypes.func,
  };

  static defaultProps = {
    name: null,
    Form: null,
    button: null,
  }

  state = {
    formOpen: false,
  }

  render() {
    const {
      name, data, button, Form, Container, search,
    } = this.props;
    const { formOpen } = this.state;
    return (
      <Fragment>
        <Header>
          <h3>{name}</h3>
          {search ?
            <input type="text" placeholder={`Search ${name}`} /> :
            null
          }
          {button ?
            <button onClick={() => this.setState({ formOpen: !formOpen })}>{`Add ${name}`}</button> :
            null
          }
        </Header>
        <Content>
          {formOpen ? <Form /> : null}
          {data.map(d => <Container key={d._id} data={d} />)}
        </Content>
      </Fragment>
    );
  }
}

export default Utility;

const Header = styled.div`
  padding: 1rem 0;
  display: flex;
  align-content: flex-end;
  > h3 {
    margin: 0 auto 0 0;
    display: inline-block;
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.medGray};
  border-radius: 0.5rem;
  min-height: 1rem;
  padding: 1.5rem;
`;
