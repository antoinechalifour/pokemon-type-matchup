import styled from "styled-components";

interface VStackProps {
  spacing?: "sm";
}

export const VStack = styled.div`
  display: grid;
  grid-gap: ${(props: VStackProps) => {
    if (props.spacing === "sm") return 1;

    return 2;
  }}rem;
`;
