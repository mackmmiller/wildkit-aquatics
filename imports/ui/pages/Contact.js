import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #181818;
  width: 70%;
  margin: auto;
  /* Border radius is smaller than other ones, is this better? */
  border-radius: 0.3rem;
  flex: 1;
  background: ${props => props.theme.white};
  display: flex;
  justify-content: space-around;
  span {
    font-weight: lighter;
  }
  @media(max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

const Contact = () => (
  <Wrapper>
    <div>
      <h3>Learn to Swim Contact</h3>
      <h4>Joe Springer <span>Assistant Coach and Learn to Swim Supervisor</span></h4>
      <a href="mailto:lts@wildkitaquatics.com">lts@wildkitaquatics.com</a>
    </div>
    <div>
      <h3>Wildkit Aquatics Contact</h3>
      <h4>Kevin Auger <span>Head Coach and General Manager</span></h4>
      <a href="mailto:swim@wildkitaquatics.com">swim@wildkitaquatics.com</a>
    </div>
  </Wrapper>
);

export default Contact;

