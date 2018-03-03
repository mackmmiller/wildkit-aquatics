import React from 'react';
import styled from 'styled-components';

const Index = () => (
  <Grid />
);

export default Index;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30rem);
  grid-gap: 2rem;
  color: #181818;
`;

