import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"

export const ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> = {
  34: "quickened",
  35: "prolific",
  36: "focused",
  37: "shattering",
  38: "aggressive",
  39: "soothing",
  40: "augmented",
  41: "bolstered",
  42: "vigorous",
}

export const ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> = {
  43: "quickened",
  44: "prolific",
  45: "focused",
  46: "shattering",
  47: "aggressive",
  48: "soothing",
  49: "augmented",
  50: "bolstered",
  51: "vigorous",
}

export const ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> = {
  52: "quickened",
  53: "prolific",
  54: "focused",
  55: "shattering",
  56: "aggressive",
  57: "soothing",
  58: "augmented",
  59: "bolstered",
  60: "vigorous",
}

function toMap(record: Record<number, CompanionTraitId>): Map<number, CompanionTraitId> {
  return new Map(Object.entries(record).map(([k, v]) => [Number(k), v]))
}

export const COMPANION_WEAPON_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT
)

export const COMPANION_ARMOR_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT
)

export const COMPANION_JEWELRY_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT
)
