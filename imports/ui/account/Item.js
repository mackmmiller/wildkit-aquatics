import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Item extends Component {
  state = {
    bodyVisible: false,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  render() {
    const { user } = this.props;
    const { bodyVisible } = this.state;
    console.log(bodyVisible);
    return (
      <Wrapper>
        <Top>
          <h4>
            {`${user.firstName} ${user.lastName} `}
            <span>{`${user.userType}`}</span>
          </h4>
          <a href={`mailto:${user.email}`}>
            <i className="far fa-envelope" />
          </a>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </Top>
        <Body open={bodyVisible}>
          <p>Herro it me</p>
          <div>Delete</div>
        </Body>
      </Wrapper>
    );
  }
}

export default Item;

const Wrapper = styled.div`
  background: #eb5e55;
  border: 2px solid #c14d46;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const Top = styled.div`
  display: flex;
  align-content: flex-end;
  margin: 0.75rem;
  > h4 {
    margin: 0 auto 0 0;
    span {
      font-weight: lighter;
    }
  }
  > a {
    color: #f0f0f0;
    display: inline;
  }
  > button {
    border: none;
    color: #f0f0f0;
    background-color: transparent;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Body = styled.div`
  background: #f0f0f0;
  margin: 0 1rem;
  box-sizing: border-box;
  border-radius: 0.5em;
  border: 2px solid #c14d46;
  height: ${props => (props.open ? '300px' : '0px')};
  transition: 0.5s linear;
  overflow: auto;
  display: flex;
  flex-direction: column;
  > p {
    margin-bottom: auto;
  }
`;
