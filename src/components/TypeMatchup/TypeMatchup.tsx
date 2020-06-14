import React from "react";

import { TypeMatchupResults } from "@/components/TypeMatchUpResults/TypeMatchUpResults";
import { getDualTypeDamageMultiplier } from "@/domain/damage";
import { Type, TypeWithDamages } from "@/repository/TypeRepository";
import { PageTitle } from "@/ui/Page/PageTitle";
import { VStack } from "@/ui/VStack";

interface TypeMatchupProps {
  allTypes: Type[];
  primaryType: TypeWithDamages;
  secondaryType: TypeWithDamages | null;
}

export const TypeMatchup: React.FC<TypeMatchupProps> = ({
  allTypes,
  primaryType,
  secondaryType,
}) => {
  const fourTimesDamageFrom = allTypes.filter(
    (type) =>
      getDualTypeDamageMultiplier(primaryType, secondaryType, type) === 4
  );
  const doubleDamageFrom = allTypes.filter(
    (type) =>
      getDualTypeDamageMultiplier(primaryType, secondaryType, type) === 2
  );
  const quarterDamageFrom = allTypes.filter(
    (type) =>
      getDualTypeDamageMultiplier(primaryType, secondaryType, type) === 0.25
  );
  const halfDamageFrom = allTypes.filter(
    (type) =>
      getDualTypeDamageMultiplier(primaryType, secondaryType, type) === 0.5
  );
  const noDamageFrom = allTypes.filter(
    (type) =>
      getDualTypeDamageMultiplier(primaryType, secondaryType, type) === 0
  );

  return (
    <VStack>
      <PageTitle as="h2">Results</PageTitle>

      <TypeMatchupResults
        title={<h3>4x Damage from</h3>}
        types={fourTimesDamageFrom}
      />

      <TypeMatchupResults
        title={<h3>2x Damage from</h3>}
        types={doubleDamageFrom}
      />

      <TypeMatchupResults
        title={<h3>0.5x Damage from</h3>}
        types={halfDamageFrom}
      />

      <TypeMatchupResults
        title={<h3>0.25x Damage from</h3>}
        types={quarterDamageFrom}
      />

      <TypeMatchupResults
        title={<h3>No damage from</h3>}
        types={noDamageFrom}
      />
    </VStack>
  );
};
