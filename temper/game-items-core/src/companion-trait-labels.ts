import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "@temper/game-companions-core/equipment/companion-eso-trait-map-data"
import { companionTraits } from "@temper/game-companions-core/equipment/companion-traits-data"

export function getCompanionTraitName(traitType: number): string | undefined {
  const traitId =
    ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT[traitType] ??
    ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT[traitType] ??
    ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT[traitType]
  return traitId != null ? companionTraits.data[traitId].name : undefined
}
