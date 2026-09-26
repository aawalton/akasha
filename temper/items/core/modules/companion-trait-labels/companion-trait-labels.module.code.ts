import {
  companionTraitOfEso,
  companionTraits,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"

export function getCompanionTraitName(traitType: number): string | undefined {
  const traitId =
    companionTraitOfEso("weapon", traitType) ??
    companionTraitOfEso("armor", traitType) ??
    companionTraitOfEso("jewelry", traitType)
  return traitId != null ? companionTraits().data[traitId]?.name : undefined
}
