import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Modal from './Modal';

class Nav extends Component {
  state = {
    programsIsOpen: false,
    aboutIsOpen: false,
    modalOpen: false,
    targetModal: undefined,
  };

  togglePrograms = () => {
    this.setState({
      programsIsOpen: !this.state.programsIsOpen,
    });
  };

  toggleAbout = () => {
    this.setState({
      aboutIsOpen: !this.state.aboutIsOpen,
    });
  };

  toggleModal = (e) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      targetModal: e.target.textContent,
    });
  };

  closeModal = (e) => {
    if (e.target.classList.contains('wrapper')) {
      this.setState({
        modalOpen: false,
      });
    }
  };

  menu = () => {
    console.log('Menu clicked');
  };

  render() {
    const { client, user } = this.props;
    return (
      <NavBar>
        <ul className="wide">
          <StyledLi>
            <Link to="/">Home</Link>
          </StyledLi>
          <StyledLi
            onMouseEnter={this.toggleAbout}
            onMouseLeave={this.toggleAbout}
          >
            About
            {this.state.aboutIsOpen && (
              <Dropdown>
                <Link to="/coaches">Coaches</Link>
                <Link to="/aquaticscenter">Burton Aquatics Center</Link>
                <Link to="/board">Board of Directors</Link>
                <Link to="/records+results">Records &amp; Results</Link>
              </Dropdown>
            )}
          </StyledLi>
          <StyledLi
            onMouseEnter={this.togglePrograms}
            onMouseLeave={this.togglePrograms}
          >
            Programs
            {this.state.programsIsOpen && (
              <Dropdown>
                <Link to="/wildkitswimming">Wildkit Swimming</Link>
                <Link to="/LearnToSwim">Learn to Swim</Link>
                <Link to="/ETHSGirls">ETHS Girls</Link>
                <Link to="/ETHSBoys">ETHS Boys</Link>
                <Link to="/GirlsWaterPolo">Girls Water Polo</Link>
                <Link to="/BoysWaterPolo">Boys Water Polo</Link>
              </Dropdown>
            )}
          </StyledLi>
          <StyledLi>
            <Link to="/calendar">Calendar</Link>
          </StyledLi>
          <StyledLi>
            <Link to="/contribute">Contribute</Link>
          </StyledLi>
          <StyledLi>
            <Link to="/contact">Contact</Link>
          </StyledLi>
          {user._id ? (
            <StyledLi>
              <Link to="/account" href="/account">
                Account
              </Link>
            </StyledLi>
          ) : (
            <StyledLi>
              <button onClick={this.toggleModal}>Log In</button>
            </StyledLi>
          )}
          {user._id ? (
            <StyledLi>
              <button
                onClick={() => {
                  Meteor.logout();
                  client.resetStore();
                }}
              >
                Log Out
              </button>
            </StyledLi>
          ) : (
            <StyledLi>
              <button onClick={this.toggleModal}>Register</button>
            </StyledLi>
          )}
          {this.state.modalOpen &&
            createPortal(
              <Modal
                client={client}
                targetModal={this.state.targetModal}
                handleClick={this.closeModal.bind(this)}
              />,
              document.getElementById('modal'),
            )}
        </ul>
        <ul className="narrow">
          <StyledLi>
            <button onClick={this.menu}>
              <i className="fas fa-bars" />
            </button>
          </StyledLi>
        </ul>
      </NavBar>
    );
  }
}

export default Nav;

const NavBar = styled.nav`
  background: #eb5e55;
  z-index: 10000;
  height: 5.8rem;
  font-size: 1.6rem;
  .narrow {
    display: none;
  }
  @media (max-width: 900px) {
    .narrow {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
      color: #f0f0f0;
      > li {
        margin: 0;
      }
    }
    .wide {
      display: none;
    }
  }
  > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const StyledLi = styled.li`
  padding: 2rem 1rem;
  text-align: center;
  width: 8rem;
  &:nth-child(1) {
    margin-left: 2rem;
    margin-right: 6rem;
  }
  &:nth-child(7) {
    margin-left: auto;
  }
  &:nth-child(8) {
    margin-right: 2rem;
  }
  &:hover {
    background: #c14d46;
    cursor: default;
  }
  > a {
    text-decoration: none;
    color: #f0f0f0;
  }
  > button {
    padding: 0;
    border: none;
    background: transparent;
    color: #f0f0f0;
    font-size: 1.6rem;
    &:focus {
      outline: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  top: 2rem;
  margin-left: -1rem;
  margin-right: -1rem;
  background: #eb5e55;
  display: flex;
  flex-direction: column;
  width: 15rem;
  > a {
    text-align: center;
    padding: 1.5rem 0;
    text-decoration: none;
    color: #f0f0f0;
    &:hover {
      background: #c14d46;
    }
  }
`;
