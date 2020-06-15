import styled from "styled-components";

interface TypeBadgeProps {
  typeColor: string;
}

export const TypeBadge = styled.span`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 1rem;

  color: #fff;
  text-align: center;
  text-transform: capitalize;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  border: 2px solid ${(props: TypeBadgeProps) => props.typeColor};
  background: ${(props: TypeBadgeProps) => props.typeColor};
`;
