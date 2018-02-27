import React, { Component } from 'react';
import styled from 'styled-components';

class Group extends Component {
  render() {
    return <Wrapper>{this.props.group.name}</Wrapper>;
  }
}

export default Group;

const Wrapper = styled.div``;
