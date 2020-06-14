import React from "react";

import { TypeSelectLabel } from "@/components/TypeSelect/styles";
import { Type } from "@/repository/TypeRepository";
import { TypeBadge } from "@/ui/TypeBadge";

interface TypeSelectProps {
  type: Type;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
}

export const TypeSelect: React.FC<TypeSelectProps> = ({
  type,
  isSelected,
  onSelect,
  onUnselect,
}) => (
  <TypeSelectLabel htmlFor={type.name}>
    <input
      type="checkbox"
      id={type.name}
      checked={isSelected}
      onChange={(e) => {
        if (e.target.checked) onSelect(type.id);
        else onUnselect(type.id);
      }}
    />

    <TypeBadge typeColor={type.color}>{type.name}</TypeBadge>
  </TypeSelectLabel>
);
