import React from "react";
import styled from "styled-components";

const Index = () => {
  console.log("Index being rendered");
  return (
    <Grid>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>Wildkit Swimming</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>Learn to Swim</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>ETHS Girls Swim &amp; Dive</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>ETHS Boys Swim &amp; Dive</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>ETHS Girls Water Polo</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>ETHS Boys Water Polo</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>WSO Water Polo</h2>
        </div>
      </GridItem>
      <GridItem>
        <ImgPlaceholder />
        <div>
          <h2>IHSA Top Times</h2>
        </div>
      </GridItem>
    </Grid>
  );
};

export default Index;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30rem);
  grid-gap: 2rem;
  color: #181818;
`;

const ImgPlaceholder = styled.div`
  height: 20rem;
  background: yellow;
`;

const GridItem = styled.div`
  color: #f0f0f0;
  > div {
    background: #0f1f37;
    > h2 {
      margin: 0;
      padding: 1rem 0;
      text-align: center;
    }
  }
`;
