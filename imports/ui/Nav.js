import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {
    programsIsOpen: false
  };

  togglePrograms = () => {
    this.setState({
      programsIsOpen: !this.state.programsIsOpen
    });
    console.log(this.state.programsIsOpen);
  };

  render() {
    console.log("Nav being rendered");
    return (
      <NavBar>
        <ul>
          <StyledLi>
            <Link to={`/`}>Home</Link>
          </StyledLi>
          <StyledLi>
            <Link to={`/about`}>About</Link>
          </StyledLi>
          <StyledLi
            onMouseEnter={this.togglePrograms}
            onMouseLeave={this.togglePrograms}
          >
            Programs
            {this.state.programsIsOpen && (
              <Dropdown>
                <Link to={`/wildkitswimming`}>Wildkit Swimming</Link>
                <Link to={`/LearnToSwim`}>Learn to Swim</Link>
                <Link to={`/ETHSGirls`}>ETHS Girls</Link>
                <Link to={`/ETHSBoys`}>ETHS Boys</Link>
                <Link to={`/GirlsWaterPolo`}>Girls Water Polo</Link>
                <Link to={`/BoysWaterPolo`}>Boys Water Polo</Link>
              </Dropdown>
            )}
          </StyledLi>
          <StyledLi>
            <Link to={`/calendar`}>Calendar</Link>
          </StyledLi>
          <StyledLi>
            <Link to={`/contact`}>Contact</Link>
          </StyledLi>
          <StyledLi>
            <Link to={`/login`}>Log In</Link>
          </StyledLi>
          <StyledLi>
            <Link to={`/register`}>Register</Link>
          </StyledLi>
        </ul>
      </NavBar>
    );
  }
}

export default Nav;

const NavBar = styled.nav`
  background: #eb5e55;
  grid-area: nav;
  z-index: 1;
  height: 5.8rem;
  font-size: 1.6rem;
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
  &:nth-child(1) {
    margin-left: 2rem;
    margin-right: 6rem;
  }
  &:nth-child(3) {
    width: 8rem;
  }
  &:nth-child(6) {
    margin-left: auto;
  }
  &:nth-child(7) {
    margin-right: 2rem;
  }
  &:hover {
    background: #c14d46;
  }
  > a {
    text-decoration: none;
    color: #f0f0f0;
  }
`;

const Dropdown = styled.div`
  position: relative;
  top: 2rem;
  margin-left: -1rem;
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
