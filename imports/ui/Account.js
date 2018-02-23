import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const newSwimmer = gql`
  mutation newSwimmer(
    $firstName: String
    $middleInitial: String
    $lastName: String
    $DOB: String
  ) {
    newSwimmer(
      firstName: $firstName
      middleInitial: $middleInitial
      lastName: $lastName
      DOB: $DOB
    ) {
      _id
    }
  }
`;

class Account extends Component {
  newSwimmer = (e) => {
    e.preventDefault();
    this.props
      .newSwimmer({
        variables: {
          firstName: this.firstName.value,
          middleInitial: this.middleInitial.value,
          lastName: this.lastName.value,
          DOB: this.DOB.value,
        },
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
 _id, parent, coach, admin 
} = this.props.user;
    return (
      <Wrapper className="wrapper">
        <SideBar>
          <SideBarItem>
            {/* {admin && admin._id} */}
            <h3>Admin's Dashboard</h3>
            <ul>
              <li>Coach Manager</li>
              <li>Meet Manager</li>
            </ul>
          </SideBarItem>
          <SideBarItem>
            {/* {coach && coach._id} */}
            <h3>Coach's Dashboard</h3>
            <ul>
              <li>Athlete Manager</li>
              <li>Practice Manager</li>
              <li>Profile</li>
            </ul>
          </SideBarItem>
          <SideBarItem>
            {/* {parent && parent._id} */}
            <h3>Registration</h3>
            <ul>
              <li>Swimmers</li>
              <li>Meets</li>
              <li>Waivers</li>
              <li>Payments</li>
            </ul>
          </SideBarItem>
          <SideBarItem>
            {/* {_id && _id} */}
            <h3>
              <i className="fas fa-cogs" /> Settings
            </h3>
          </SideBarItem>
        </SideBar>
        <WorkSpace />
      </Wrapper>
    );
    // <form onSubmit={this.newSwimmer}>
    //   <label htmlFor="">First Name</label>
    //   <input type="text" ref={input => (this.firstName = input)} />
    //   <label htmlFor="">Middle Initial</label>
    //   <input type="text" ref={input => (this.middleInitial = input)} />
    //   <label htmlFor="">Last Name</label>
    //   <input type="text" ref={input => (this.lastName = input)} />
    //   <label htmlFor="">DOB</label>
    //   <input type="date" ref={input => (this.DOB = input)} />
    //   <input type="submit" />
    // </form>
  }
}

export default graphql(newSwimmer, { name: 'newSwimmer' })(Account);

const Wrapper = styled.div`
  color: #181818;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const WorkSpace = styled.div`
  flex: 8;
`;

const SideBar = styled.div`
  box-sizing: border-box;
  flex: 2;
  border-right: 2px solid #d1d1d1;
  padding: 3rem 2rem;
  font-size: 2rem;
  background-color: #dbdbdb;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  min-height: 92.5vh;
`;

const SideBarItem = styled.div`
  margin-bottom: 1rem;
  > h3 {
    margin: 0;
    color: #181818;
  }
  > ul {
    list-style: none;
    margin: 0;
  }
`;
