import React from "react";
import styled from "styled-components";

const Footer = () => (
  <StyledFooter>
    <FooterDetails>
      <div>
        <img src="WildkitAquatics.png" alt="Wildkit Aquatics' Logo" />
        <Address>
          <h3>Wildkit Aquatics</h3>
          <span>
            1600 Dodge Avenue<br />Burton Aquatics Center<br />Evanston,
            Illinois, 60204
          </span>
        </Address>
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
        <h3>Programs</h3>
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
    </FooterDetails>
    <Signature>
      <span>Designed and Developed by M&amp;M Software Consulting</span>
    </Signature>
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  background: #0f1f37;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding: 4rem 1rem 1rem 1rem;
  margin-top: 5rem;
  font-size: 1.4rem;
  z-index: 1;
`;

const FooterDetails = styled.div`
  display: flex;
  justify-content: space-around;
  > div {
    margin: 1rem 0;
    > img {
      max-width: 18rem;
    }
    > h3 {
      font-size: 2rem;
      margin-top: 0;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
    margin: auto;
  }
`;

const StyledUL = styled.ul`
  list-style: none;
  padding: 0;
  > li {
    padding: 0.25rem 0;
  }
`;

const Address = styled.div`
  padding: 1rem 0;
  > h3 {
    margin-bottom: 0;
  }
`;

const Signature = styled.div`
  padding-top: 1rem;
  font-size: 1rem;
  text-align: center;
`;
