import React from 'react';
import { Pill, PillTop } from '../../styles/styles';

const Swimmer = ({ swimmer }) => (
    <Pill>
      <PillTop>{`${swimmer.firstName} ${swimmer.lastName}`}</PillTop>
    </Pill>
  );

export default Swimmer;
