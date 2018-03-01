import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
          <li>
            <Link to="/aquatics-center">Burton Aquatics Center</Link>
          </li>
          <li>
            <Link to="/coaches">Coaching Staff</Link>
          </li>
          <li>
            <Link to="/board">Board of Directors</Link>
          </li>
        </StyledUL>
      </div>
      <div>
        <h3>Programs</h3>
        <StyledUL>
          <li>
            <Link to="/wildkit-swimming">Wildkit Swimming</Link>
          </li>
          <li>
            <Link to="/learn-to-swim">Learn to Swim</Link>
          </li>
          <li>
            <Link to="/eths-girls">ETHS Girls Swimming &amp; Diving</Link>
          </li>
          <li>
            <Link to="/eths-boys">ETHS Boys Swimming &amp; Diving</Link>
          </li>
          <li>
            <Link to="/girls-water-polo">ETHS Girls Water Polo</Link>
          </li>
          <li>
            <Link to="/boys-water-polo">ETHS Boys Water Polo</Link>
          </li>
        </StyledUL>
      </div>
      <div>
        <h3>External Links</h3>
        <StyledUL>
          <li>
            <a href="https://www.teamunify.com/Home.jsp?team=ilslsc">
              Illinois Swimming
            </a>
          </li>
          <li>
            <a href="https://www.ihsa.org/">IHSA</a>
          </li>
          <li>
            <a href="https://www.usaswimming.org/">USA Swimming</a>
          </li>
          <li>
            <a href="https://www.eths.k12.il.us/">
              Evanston Township High School
            </a>
          </li>
          <li>
            <a href="http://www.theswimteamstore.com/lgsteams/productcart/pc/viewCategories.asp?idCategory=3077&idAffiliate=733">
              Wildkit Aquatics Store
            </a>
          </li>
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
  background: ${props => props.theme.mainNavy};
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  padding: 4rem 1rem 1rem 1rem;
  margin-top: 5rem;
  font-size: 1.4rem;
  z-index: 1;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.3);
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
    a {
      font-weight: lighter;
      color: ${props => props.theme.white};
      text-decoration: none;
      padding-bottom: 0.2rem;
      &:hover {
        border-bottom: 2px solid ${props => props.theme.mainOrange};
      }
    }
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
