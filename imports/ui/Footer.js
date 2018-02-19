import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <StyledFooter>
    <div>
      <ImgPlaceholder />
      <Address>
        <h3>Wildkit Aquatics</h3>
        <span>
          1600 Dodge Avenue<br />Burton Aquatics Center<br />Evanston, Illinois, 60204
        </span>
      </Address>
      <Signature>
        <span>Designed and Developed by M&amp;M Software Consulting</span>
      </Signature>
    </div>
    <div>
      <h3>About</h3>
      <StyledUL>
        <li>Burton Aquatics Center</li>
        <li>Coaching Staff</li>
        <li>Board of Directors</li>
        <li />
        <li />
        <li />
      </StyledUL>
    </div>
    <div>
      <h3>Stuff</h3>
      <StyledUL>
        <li>Wildkit Swimming</li>
        <li>Learn to Swim</li>
        <li>ETHS Girls Swimming &amp; Diving</li>
        <li>ETHS Boys Swimming &amp; Diving</li>
        <li>ETHS Girls Water Polo</li>
        <li>ETHS Boys Water Polo</li>
        <li>WSO Water Polo</li>
      </StyledUL>
    </div>
    <div>
      <h3>External Links</h3>
      <StyledUL>
        <li>Illinois Swimming</li>
        <li>IHSA</li>
        <li>USA Swimming</li>
        <li>Evanston Township High School</li>
        <li>Wildkit Aquatics Store</li>
        <li />
        <li />
      </StyledUL>
    </div>
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  background: #0f1f37;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  font-size: 1.4rem;
  z-index: 1;
`;

const StyledUL = styled.ul`
  list-style: none;
  padding: 0;
  > li {
    padding: 0.25rem 0;
  }
`;

const ImgPlaceholder = styled.div`
  height: 10rem;
  width: 20rem;
  background: yellow;
`;

const Address = styled.div`
  padding: 1rem 0;
  > h3 {
    margin-bottom: 0;
  }
`;

const Signature = styled.div`
  font-size: 1rem;
`;
