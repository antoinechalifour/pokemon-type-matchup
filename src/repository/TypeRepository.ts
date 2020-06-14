import axios from "axios";

const DEFAULT_COLOR = "#A8A878";

const colorsByType = new Map<string, string>([
  ["bug", "#A8B820"],
  ["dark", "#38281E"],
  ["dragon", "#7038F8"],
  ["electric", "#F8D030"],
  ["fairy", "#DEA5DE"],
  ["fighting", "#C03028"],
  ["fire", "#F08031"],
  ["flying", "#A890F0"],
  ["ghost", "#705898"],
  ["grass", "#78C750"],
  ["ground", "#E0C068"],
  ["ice", "#98D8D8"],
  ["normal", "#A8A878"],
  ["poison", "#A040A0"],
  ["psychic", "#F85888"],
  ["rock", "#A8A878"],
  ["steel", "#B8B8D0"],
  ["water", "#6890F0"],
]);

export interface Type {
  id: number;
  name: string;
  color: string;
}

export interface TypeWithDamages {
  id: number;
  name: string;
  color: string;
  doubleDamageFrom: Type[];
  halfDamageFrom: Type[];
  noDamageFrom: Type[];
}

interface PokeApiTypePreview {
  name: string;
  url: string;
}

interface PokeApiType {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: PokeApiTypePreview[];
    half_damage_from: PokeApiTypePreview[];
    no_damage_from: PokeApiTypePreview[];
  };
}

interface PokeApiListResponse<T> {
  results: T[];
}

export class TypeRepository {
  async getAllTypes(): Promise<TypeWithDamages[]> {
    const allTypesResponse = await this._getAllTypesPreview();

    const allTypes = await Promise.all(
      allTypesResponse.data.results.map((item) =>
        axios.get<PokeApiType>(item.url).then((response) => response.data)
      )
    );

    return this._toTypesWithDamage(allTypes);
  }

  private _getAllTypesPreview() {
    return axios.get<PokeApiListResponse<PokeApiTypePreview>>(
      "https://pokeapi.co/api/v2/type"
    );
  }

  private _toTypesWithDamage(
    allPokeApiTypes: PokeApiType[]
  ): TypeWithDamages[] {
    const cache = new Map<string, PokeApiType>();

    allPokeApiTypes.forEach((pokeApiType) => {
      cache.set(pokeApiType.name, pokeApiType);
    });

    return allPokeApiTypes.map(
      (pokeApiType): TypeWithDamages => ({
        id: pokeApiType.id,
        name: pokeApiType.name,
        color: colorsByType.get(pokeApiType.name) || DEFAULT_COLOR,
        doubleDamageFrom: pokeApiType.damage_relations.double_damage_from.map(
          (typePreview) => this._toType(cache.get(typePreview.name)!)
        ),
        halfDamageFrom: pokeApiType.damage_relations.half_damage_from.map(
          (typePreview) => this._toType(cache.get(typePreview.name)!)
        ),
        noDamageFrom: pokeApiType.damage_relations.no_damage_from.map(
          (typePreview) => this._toType(cache.get(typePreview.name)!)
        ),
      })
    );
  }

  private _toType(pokeApiType: PokeApiType): Type {
    return {
      id: pokeApiType.id,
      name: pokeApiType.name,
      color: colorsByType.get(pokeApiType.name) || DEFAULT_COLOR,
    };
  }
}
