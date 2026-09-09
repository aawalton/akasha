import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "akasha/temper/temper-companions-core/companion-eso-trait-map/companion-eso-trait-map.module.code.ts"
import { companionTraits } from "akasha/temper/temper-companions-core/companion-traits/companion-traits.module.code.ts"

export function getCompanionTraitName(traitType: number): string | undefined {
  const traitId =
    ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT[traitType] ??
    ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT[traitType] ??
    ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT[traitType]
  return traitId != null ? companionTraits.data[traitId].name : undefined
}
