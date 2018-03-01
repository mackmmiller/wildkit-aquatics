import styled from 'styled-components';

const theme = {
  mainOrange: '#eb5e55',
  darkOrange: '#c14d46',
  mainNavy: '#0f1f37',
  white: '#f0f0f0',
  lightGray: '#dbdbdb',
  medGray: '#d1d1d1',
  bronze: '#6c541e',
  silver: '#b3b3b3',
  gold: '#ffd700',
  platinum: '#dadada',
  'high school': '#eb5e55',
  'learn to swim': '#0f1f37',
};

export const Pill = styled.div`
  background: ${theme.mainOrange};
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: 1.6rem;
`;

export const PillBody = styled.div`
  background: ${theme.white};
  box-sizing: border-box;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  height: ${props => (props.open ? '300px' : '0px')};
  transition: 0.5s linear;
  overflow: auto;
`;

export const PillTop = styled.div`
  display: flex;
  align-content: center;
  margin: 0.75rem;
  > h4 {
    margin: 0 auto 0 0;
    span {
      font-weight: lighter;
    }
  }
  > a {
    color: ${props => props.theme.white};
    display: inline;
  }
  > button {
    border: none;
    color: ${props => props.theme.white};
    background-color: transparent;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default theme;
