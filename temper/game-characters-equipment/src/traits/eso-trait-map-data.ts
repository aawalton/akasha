import { type ArmorTraitId, armorTraits } from "./armor-traits-data"
import {
  TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO,
  TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO,
  TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO,
} from "./generated/temper-eso-trait-map.generated"
import { type JewelryTraitId, jewelryTraits } from "./jewelry-traits-data"
import { type WeaponTraitId, weaponTraits } from "./weapon-traits-data"

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
