import { Type, TypeWithDamages } from "@/repository/TypeRepository";

const getDamageMultiplier = (
  pokemonType: TypeWithDamages | null,
  opponentType: Type
) => {
  if (!pokemonType) return 1;

  switch (true) {
    case pokemonType.doubleDamageFrom.some((x) => x.id === opponentType.id):
      return 2;
    case pokemonType.halfDamageFrom.some((x) => x.id === opponentType.id):
      return 0.5;
    case pokemonType.noDamageFrom.some((x) => x.id === opponentType.id):
      return 0;
    default:
      return 1;
  }
};

export const getDualTypeDamageMultiplier = (
  primaryType: TypeWithDamages,
  secondaryType: TypeWithDamages | null,
  opponentType: Type
) =>
  getDamageMultiplier(primaryType, opponentType) *
  getDamageMultiplier(secondaryType, opponentType);
