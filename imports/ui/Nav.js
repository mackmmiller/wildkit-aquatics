import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Modal from './modals/Modal';

class Nav extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  state = {
    programsIsOpen: false,
    aboutIsOpen: false,
    contributeIsOpen: false,
    modalOpen: false,
    targetModal: undefined,
    accountOpen: false,
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

  toggleContribute = () => {
    this.setState({
      contributeIsOpen: !this.state.contributeIsOpen,
    });
  }

  toggleAccount = () => {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

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
    return (<NavBar>
      <ul className="wide">
        <StyledLi>
          <Link to="/" href="/">
              Home
          </Link>
        </StyledLi>
        <StyledLi onMouseEnter={this.toggleAbout} onMouseLeave={this.toggleAbout}>
            About
          {this.state.aboutIsOpen &&
          <Dropdown>
            <Link to="/about/coaches" href="/about/coaches">
                  Coaches
            </Link>
            <Link to="/about/aquatics-center" href="/about/aquatics-center">
                  Burton Aquatics Center
            </Link>
            <Link to="/about/board" href="/board">
                  Board of Directors
            </Link>
            <Link to="/about/records-and-results" href="/about/record-and-results">
                  Records &amp; Results
            </Link>
          </Dropdown>}
        </StyledLi>
        <StyledLi onMouseEnter={this.togglePrograms} onMouseLeave={this.togglePrograms}>
            Programs
          {this.state.programsIsOpen &&
          <Dropdown>
            <Link to="/programs/wildkit-swimming" href="/programs/wildkit-swimming">
                  Wildkit Swimming
            </Link>
            <Link to="/programs/learn-to-swim" href="/programs/learn-to-swim">
                  Learn to Swim
            </Link>
            <Link to="/programs/eths-girls" href="/programs/eths-girls">
                  ETHS Girls
            </Link>
            <Link to="/programs/eths-boys" href="/programs/eths-boys">
                  ETHS Boys
            </Link>
            <Link to="/programs/girls-water-polo" href="/programs/girls-water-polo">
                  Girls Water Polo
            </Link>
            <Link to="/programs/boys-water-polo" href="/programs/boys-water-polo">
                  Boys Water Polo
            </Link>
          </Dropdown>}
        </StyledLi>
        <StyledLi>
          <Link to="/calendar" href="/calendar">
              Calendar
          </Link>
        </StyledLi>
        <StyledLi onMouseEnter={this.toggleContribute} onMouseLeave={this.toggleContribute}>
            Contribute
          {this.state.contributeIsOpen &&
          <Dropdown>
            <Link to="/contribute/donate" href="/contribute/donate">Donate</Link>
            <Link to="/contribute/volunteer" href="/contribute/volunteer">Volunteer</Link>
            <Link to="/contribute/support-coach-joe" href="/contribute/support-coach-joe">Support Coach Joe</Link>
          </Dropdown>}
        </StyledLi>
        <StyledLi>
          <Link to="/contact" href="/contact">
              Contact
          </Link>
        </StyledLi>
        {user._id ?
          <React.Fragment>
            <StyledLi onMouseEnter={this.toggleAccount} onMouseLeave={this.toggleAccount}>
              Account
              { this.state.accountOpen &&
              <Dropdown>
                <Link to="/account/admin" href="/account/admin">Admin</Link>
                <Link to="/account/coach" href="/account/coach">Coach</Link>
                <Link to="/account/parent" href="/account/parent">Parent</Link>
              </Dropdown>}
            </StyledLi>
            <StyledLi>
              <button onClick={() => {
                    Meteor.logout();
                    client.resetStore();
                  }}
              >
                  Log Out
              </button>
            </StyledLi>
          </React.Fragment> :
          <React.Fragment>
            <StyledLi>
              <button onClick={this.toggleModal}>Log In</button>
            </StyledLi>
            <StyledLi>
              <button onClick={this.toggleModal}>Register</button>
            </StyledLi>
          </React.Fragment>}
        {this.state.modalOpen && createPortal(<Modal client={client} targetModal={this.state.targetModal} handleClick={this.closeModal.bind(this)} />, document.getElementById('modal'))}
      </ul>
      <ul className="narrow">
        <StyledLi>
          <button onClick={this.menu}>
            <i className="fas fa-bars" />
          </button>
        </StyledLi>
      </ul>
    </NavBar>);
  }
}

export default Nav;

const NavBar = styled.nav`
  background: ${props => props.theme.mainOrange};
  z-index: 100000;
  height: 5.8rem;
  font-size: 1.6rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
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
    background: ${props => props.theme.darkOrange};
    cursor: default;
  }
  > a {
    text-decoration: none;
    color: ${props => props.theme.white};
  }
  > button {
    padding: 0;
    border: none;
    background: transparent;
    color: ${props => props.theme.white};
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
  background: ${props => props.theme.mainOrange};
  display: flex;
  flex-direction: column;
  width: 15rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4), -3px 3px 3px rgba(0, 0, 0, 0.4),
    3px 3px 3px rgba(0, 0, 0, 0.4);
  > a {
    text-align: center;
    padding: 1.5rem 0;
    text-decoration: none;
    color: ${props => props.theme.white};
    &:hover {
      background: ${props => props.theme.darkOrange};
    }
  }
`;
