export interface PokeCommon {
  name: string;
  url: string;
}

interface PokeAbility {
  ability: PokeCommon;
  is_hidden: boolean;
  slot: number;
}

interface PokeGameIndice {
  game_index: number;
  version: PokeCommon;
}

interface PokeHeldItem {
  item: PokeCommon;
  version_details: Array<PokeItemRarity>;
}

interface PokeItemRarity {
  rarity: number;
  version: PokeCommon;
}

interface PokeMove {
  move: PokeCommon;
  version_group_detail: Array<PokeMoveVersionGroupDetail>;
}

interface PokeMoveVersionGroupDetail {
  level_learned_at: number;
  mover_learn_method: PokeCommon;
  version_group: PokeCommon;
}

interface PokeSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface PokeStat {
  base_stat: number;
  effort: number;
  stat: PokeCommon;
}

export interface Poke {
  abilities: Array<PokeAbility>;
  base_experience: number;
  forms: Array<PokeCommon>;
  game_indices: Array<PokeGameIndice>;
  height: number;
  held_items: Array<PokeHeldItem>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<PokeMove>;
  name: string;
  order: number;
  species: PokeCommon;
  sprites: PokeSprites;
  stats: Array<PokeStat>;
  weight: number;
}
