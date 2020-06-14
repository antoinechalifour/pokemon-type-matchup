import React from "react";
import styled from "styled-components";

import {
  ResultsTitle,
  TypesLayout,
} from "@/components/TypeMatchUpResults/styles";
import { Type } from "@/repository/TypeRepository";
import { TypeBadge } from "@/ui/TypeBadge";
import { VStack } from "@/ui/VStack";

interface TypeMatchupResultsProps {
  title: JSX.Element;
  types: Type[];
}

const EmptyContent = styled.p`
  color: #555;
`;

export const TypeMatchupResults: React.FC<TypeMatchupResultsProps> = ({
  title,
  types,
}) => (
  <VStack spacing="sm">
    <ResultsTitle>{title}</ResultsTitle>

    {types.length > 0 ? (
      <TypesLayout>
        {types.map((type) => (
          <li key={type.name}>
            <TypeBadge typeColor={type.color}>{type.name}</TypeBadge>
          </li>
        ))}
      </TypesLayout>
    ) : (
      <EmptyContent>No type</EmptyContent>
    )}
  </VStack>
);
