import {
  PLAYER_ARMOR_ESO_TO_TRAIT,
  PLAYER_JEWELRY_ESO_TO_TRAIT,
  PLAYER_WEAPON_ESO_TO_TRAIT,
} from "@temper/game-characters-equipment/traits/eso-trait-map-data"
import {
  COMPANION_ARMOR_ESO_TO_TRAIT,
  COMPANION_JEWELRY_ESO_TO_TRAIT,
  COMPANION_WEAPON_ESO_TO_TRAIT,
} from "@temper/game-companions-core/equipment/companion-eso-trait-map-data"

const JEWELRY_EQUIP_TYPES = new Set([2, 12])

export function esoTraitToTemperId(esoTraitType: number, equipType?: number): string | undefined {
  if (equipType !== undefined && JEWELRY_EQUIP_TYPES.has(equipType)) {
    return (
      PLAYER_JEWELRY_ESO_TO_TRAIT.get(esoTraitType) ??
      COMPANION_JEWELRY_ESO_TO_TRAIT.get(esoTraitType)
    )
  }
  return (
    PLAYER_WEAPON_ESO_TO_TRAIT.get(esoTraitType) ??
    PLAYER_ARMOR_ESO_TO_TRAIT.get(esoTraitType) ??
    PLAYER_JEWELRY_ESO_TO_TRAIT.get(esoTraitType) ??
    COMPANION_WEAPON_ESO_TO_TRAIT.get(esoTraitType) ??
    COMPANION_ARMOR_ESO_TO_TRAIT.get(esoTraitType) ??
    COMPANION_JEWELRY_ESO_TO_TRAIT.get(esoTraitType)
  )
}
