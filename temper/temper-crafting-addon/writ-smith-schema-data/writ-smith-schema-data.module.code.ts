import {
  BS_TEMPER_EXPERTISE,
  CL_TEMPER_EXPERTISE,
  JW_TEMPER_EXPERTISE,
  WW_TEMPER_EXPERTISE,
} from "../writ-required-skill/writ-required-skill.module.code.ts"
import type {
  School,
  TraitSet,
} from "../writ-smith-schema-types/writ-smith-schema-types.module.code.ts"

const JEWELRY_CRAFTING_TYPE = CRAFTING_TYPE_JEWELRYCRAFTING

function si(this: void, key: string): string {
  const lookup = TemperWrit.SI
  return (lookup !== undefined ? lookup(key) : undefined) ?? ""
}

export const SCHOOL_HEAVY: School = {
  trade_skill_type: CRAFTING_TYPE_BLACKSMITHING,
  base_mat_name: "rubedite",
  green_mat_name: "honing stone",
  blue_mat_name: "dwarven oil",
  purple_mat_name: "grain solvent",
  gold_mat_name: "tempering alloy",
  armor_weight_name: si("SI_ARMORTYPE3"),
  temper_skill: BS_TEMPER_EXPERTISE,
  motif_required: true,
  H1_AXE: 1,
  H1_MACE: 2,
  H1_SWORD: 3,
  H2_BATTLE_AXE: 4,
  H2_MAUL: 5,
  H2_GREATSWORD: 6,
  DAGGER: 7,
  CHEST: 8,
  FEET: 9,
  HANDS: 10,
  HEAD: 11,
  LEGS: 12,
  SHOULDERS: 13,
  WAIST: 14,
}

export const SCHOOL_MEDIUM: School = {
  trade_skill_type: CRAFTING_TYPE_CLOTHIER,
  base_mat_name: "rubedo leather",
  green_mat_name: "hemming",
  blue_mat_name: "embroidery",
  purple_mat_name: "elegant lining",
  gold_mat_name: "dreugh wax",
  armor_weight_name: si("SI_ARMORTYPE2"),
  temper_skill: CL_TEMPER_EXPERTISE,
  motif_required: true,
  CHEST: 8,
  FEET: 9,
  HANDS: 10,
  HEAD: 11,
  LEGS: 12,
  SHOULDERS: 13,
  WAIST: 14,
}

export const SCHOOL_LIGHT: School = {
  trade_skill_type: CRAFTING_TYPE_CLOTHIER,
  base_mat_name: "ancestor silk",
  green_mat_name: "hemming",
  blue_mat_name: "embroidery",
  purple_mat_name: "elegant lining",
  gold_mat_name: "dreugh wax",
  armor_weight_name: si("SI_ARMORTYPE1"),
  temper_skill: CL_TEMPER_EXPERTISE,
  motif_required: true,
  CHEST: 1,
  FEET: 2,
  HANDS: 3,
  HEAD: 4,
  LEGS: 5,
  SHOULDERS: 6,
  WAIST: 7,
}

export const SCHOOL_WOOD: School = {
  trade_skill_type: CRAFTING_TYPE_WOODWORKING,
  base_mat_name: "ruby ash",
  green_mat_name: "pitch",
  blue_mat_name: "turpen",
  purple_mat_name: "mastic",
  gold_mat_name: "rosin",
  armor_weight_name: "",
  temper_skill: WW_TEMPER_EXPERTISE,
  motif_required: true,
  BOW: 1,
  FLAME_STAFF: 2,
  ICE_STAFF: 3,
  LIGHTNING_STAFF: 4,
  RESTO_STAFF: 5,
  SHIELD: 6,
}

export const SCHOOL_JEWELRY: School = {
  trade_skill_type: JEWELRY_CRAFTING_TYPE,
  base_mat_name: "platinum",
  green_mat_name: "terne",
  blue_mat_name: "iridium",
  purple_mat_name: "zircon",
  gold_mat_name: "chromium",
  armor_weight_name: "",
  temper_skill: JW_TEMPER_EXPERTISE,
  motif_required: false,
  autocraft_not_implemented: true,
  RING: 1,
  NECKLACE: 2,
}

export const TRAITS_WEAPON: TraitSet = {
  [ITEM_TRAIT_TYPE_WEAPON_POWERED]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_POWERED, trait_index: 1 },
  [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_CHARGED, trait_index: 2 },
  [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_PRECISE, trait_index: 3 },
  [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_INFUSED, trait_index: 4 },
  [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: {
    trait_num: ITEM_TRAIT_TYPE_WEAPON_DEFENDING,
    trait_index: 5,
  },
  [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_TRAINING, trait_index: 6 },
  [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: {
    trait_num: ITEM_TRAIT_TYPE_WEAPON_SHARPENED,
    trait_index: 7,
  },
  [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: { trait_num: ITEM_TRAIT_TYPE_WEAPON_DECISIVE, trait_index: 8 },
  [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: {
    trait_num: ITEM_TRAIT_TYPE_WEAPON_NIRNHONED,
    trait_index: 9,
  },
}

export const TRAITS_ARMOR: TraitSet = {
  [ITEM_TRAIT_TYPE_ARMOR_STURDY]: { trait_num: ITEM_TRAIT_TYPE_ARMOR_STURDY, trait_index: 1 },
  [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: {
    trait_num: ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE,
    trait_index: 2,
  },
  [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: {
    trait_num: ITEM_TRAIT_TYPE_ARMOR_REINFORCED,
    trait_index: 3,
  },
  [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: {
    trait_num: ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED,
    trait_index: 4,
  },
  [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: { trait_num: ITEM_TRAIT_TYPE_ARMOR_TRAINING, trait_index: 5 },
  [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: { trait_num: ITEM_TRAIT_TYPE_ARMOR_INFUSED, trait_index: 6 },
  [ITEM_TRAIT_TYPE_ARMOR_PROSPEROUS]: {
    trait_num: ITEM_TRAIT_TYPE_ARMOR_PROSPEROUS,
    trait_index: 7,
  },
  [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: { trait_num: ITEM_TRAIT_TYPE_ARMOR_DIVINES, trait_index: 8 },
  [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: { trait_num: ITEM_TRAIT_TYPE_ARMOR_NIRNHONED, trait_index: 9 },
}

export const TRAITS_JEWELRY: TraitSet = {
  [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_ARCANE, trait_index: 1 },
  [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_HEALTHY, trait_index: 2 },
  [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_ROBUST, trait_index: 3 },
  [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_TRIUNE, trait_index: 4 },
  [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_INFUSED, trait_index: 5 },
  [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: {
    trait_num: ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE,
    trait_index: 6,
  },
  [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_SWIFT, trait_index: 7 },
  [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: { trait_num: ITEM_TRAIT_TYPE_JEWELRY_HARMONY, trait_index: 8 },
  [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: {
    trait_num: ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY,
    trait_index: 9,
  },
}

export const MOTIF_PAGE = {
  AXES: ITEM_STYLE_CHAPTER_AXES,
  BELTS: ITEM_STYLE_CHAPTER_BELTS,
  BOOTS: ITEM_STYLE_CHAPTER_BOOTS,
  BOWS: ITEM_STYLE_CHAPTER_BOWS,
  CHESTS: ITEM_STYLE_CHAPTER_CHESTS,
  DAGGERS: ITEM_STYLE_CHAPTER_DAGGERS,
  GLOVES: ITEM_STYLE_CHAPTER_GLOVES,
  HELMETS: ITEM_STYLE_CHAPTER_HELMETS,
  LEGS: ITEM_STYLE_CHAPTER_LEGS,
  MACES: ITEM_STYLE_CHAPTER_MACES,
  SHIELDS: ITEM_STYLE_CHAPTER_SHIELDS,
  SHOULDERS: ITEM_STYLE_CHAPTER_SHOULDERS,
  STAVES: ITEM_STYLE_CHAPTER_STAVES,
  SWORDS: ITEM_STYLE_CHAPTER_SWORDS,
}
