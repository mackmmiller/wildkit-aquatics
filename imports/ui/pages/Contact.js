import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #181818;
  width: 70%;
  margin: auto;
  border-radius: 0.3rem;
  flex: 1;
  background: ${props => props.theme.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  header {
    max-width: 60rem;
    margin: 0 auto;
  }
  .contacts {
    display: flex;
    justify-content: space-around;<br/>>  }
  span {
    font-weight: lighter;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

const Contact = () => (
  <Wrapper>
    <header>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, provident.
      Sit inventore temporibus consequuntur ullam earum reprehenderit laborum
      molestias tempora, incidunt eius similique praesentium accusamus ea illum
      eveniet quisquam omnis. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati reiciendis alias dicta fuga ea magni velit temporibus sunt
      perferendis nobis. Distinctio minima culpa aperiam amet rerum! Alias quod
      qui nisi!
    </header>
    <div className="contacts">
      <div>
        <h3>Learn to Swim Contact</h3>
        <h4>
          Joe Springer<br />
          <span>Assistant Coach and Learn to Swim Supervisor</span>
        </h4>
        <a href="mailto:lts@wildkitaquatics.com">lts@wildkitaquatics.com</a>
      </div>
      <div>
        <h3>Wildkit Aquatics Contact</h3>
        <h4>
          Kevin Auger<br />
          <span>Head Coach and General Manager</span>
        </h4>
        <a href="mailto:swim@wildkitaquatics.com">swim@wildkitaquatics.com</a>
      </div>
    </div>
  </Wrapper>
);

export default Contact;
