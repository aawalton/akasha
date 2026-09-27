export type GearFamily = "weapon" | "armor" | "jewelry"

type TraitOfEso = (family: GearFamily, esoTraitType: number) => string | undefined

export type EsoTraitLookups = {
  readonly player: TraitOfEso
  readonly companion: TraitOfEso
  readonly isJewelry: (equipType: number) => boolean
}

const FAMILIES: readonly GearFamily[] = ["weapon", "armor", "jewelry"]

export function isCompanionTraitNumber(companion: TraitOfEso, esoTraitType: number): boolean {
  for (const family of FAMILIES) {
    if (companion(family, esoTraitType) !== undefined) return true
  }
  return false
}

export function esoTraitToTemperId(
  lookups: EsoTraitLookups,
  esoTraitType: number,
  equipType?: number
): string | undefined {
  if (equipType !== undefined && lookups.isJewelry(equipType)) {
    return lookups.player("jewelry", esoTraitType) ?? lookups.companion("jewelry", esoTraitType)
  }
  return (
    lookups.player("weapon", esoTraitType) ??
    lookups.player("armor", esoTraitType) ??
    lookups.player("jewelry", esoTraitType) ??
    lookups.companion("weapon", esoTraitType) ??
    lookups.companion("armor", esoTraitType) ??
    lookups.companion("jewelry", esoTraitType)
  )
}
