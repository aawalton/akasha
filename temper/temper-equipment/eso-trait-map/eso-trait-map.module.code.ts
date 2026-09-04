import { type ArmorTraitId, armorTraits } from "../armor-traits/armor-traits.module.code.ts"
import { type JewelryTraitId, jewelryTraits } from "../jewelry-traits/jewelry-traits.module.code.ts"
import { type WeaponTraitId, weaponTraits } from "../weapon-traits/weapon-traits.module.code.ts"

const TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO = {
  "no-trait": 0,
  "powered": 1,
  "charged": 2,
  "precise": 3,
  "infused": 4,
  "defending": 5,
  "training": 6,
  "sharpened": 7,
  "decisive": 8,
  "intricate": 9,
  "ornate": 10,
  "nirnhoned": 26,
}

const TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO = {
  "no-trait": 0,
  "sturdy": 11,
  "impenetrable": 12,
  "reinforced": 13,
  "well-fitted": 14,
  "training": 15,
  "infused": 16,
  "invigorating": 17,
  "divines": 18,
  "ornate": 19,
  "intricate": 20,
  "nirnhoned": 25,
}

const TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO = {
  "no-trait": 0,
  "healthy": 21,
  "arcane": 22,
  "robust": 23,
  "ornate": 24,
  "intricate": 27,
  "swift": 28,
  "harmony": 29,
  "triune": 30,
  "bloodthirsty": 31,
  "protective": 32,
  "infused": 33,
}

export const PLAYER_WEAPON_TRAIT_TO_ESO: Record<WeaponTraitId, number> =
  TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO

export const PLAYER_ARMOR_TRAIT_TO_ESO: Record<ArmorTraitId, number> =
  TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO

export const PLAYER_JEWELRY_TRAIT_TO_ESO: Record<JewelryTraitId, number> =
  TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO

function invertViaIds<K extends string>(
  forward: Record<K, number>,
  ids: readonly K[]
): ReadonlyMap<number, K> {
  const map = new Map<number, K>()
  for (const id of ids) {
    const esoNum = forward[id]
    if (esoNum !== 0) map.set(esoNum, id)
  }
  return map
}

export const PLAYER_WEAPON_ESO_TO_TRAIT: ReadonlyMap<number, WeaponTraitId> = invertViaIds(
  PLAYER_WEAPON_TRAIT_TO_ESO,
  weaponTraits.ids
)

export const PLAYER_ARMOR_ESO_TO_TRAIT: ReadonlyMap<number, ArmorTraitId> = invertViaIds(
  PLAYER_ARMOR_TRAIT_TO_ESO,
  armorTraits.ids
)

export const PLAYER_JEWELRY_ESO_TO_TRAIT: ReadonlyMap<number, JewelryTraitId> = invertViaIds(
  PLAYER_JEWELRY_TRAIT_TO_ESO,
  jewelryTraits.ids
)
