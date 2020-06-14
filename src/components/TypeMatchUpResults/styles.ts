import styled from "styled-components";

export const TypesLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  > li * {
    width: 100%;
  }
`;

export const ResultsTitle = styled.div`
  font-weight: bold;
`;
