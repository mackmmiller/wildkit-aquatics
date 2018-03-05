import React from 'react';
import styled from 'styled-components';

import Swimmer from './Swimmer';

const Group = ({ group }) => {
  if (!group) return null;
  return (
    <Wrapper>
      {group.swimmers &&
        group.swimmers.map(swimmer => <Swimmer key={swimmer._id} swimmer={swimmer} />)}
    </Wrapper>
  );
};

export default Group;

const Wrapper = styled.div`
`;
