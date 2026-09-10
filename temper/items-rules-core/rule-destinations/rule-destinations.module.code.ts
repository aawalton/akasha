import {
  type CategoryRule,
  isMoveLikeAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function collectDestinations(rules: readonly CategoryRule[]): Record<string, string> {
  const destinations: Record<string, string> = {}
  for (const rule of rules) {
    if (
      !(
        isMoveLikeAction(rule.action) ||
        (rule.action === "deconstruct" && rule.destination != null)
      ) ||
      rule.destination == null
    )
      continue
    const stolen = rule.conditions?.stolen
    const crafted = rule.conditions?.crafted
    const bound = rule.conditions?.bound
    const reconstructed = rule.conditions?.reconstructed
    const transmuted = rule.conditions?.transmuted
    const known = rule.conditions?.known
    const canInspire = rule.conditions?.canInspire
    const canResearch = rule.conditions?.canResearch
    const isTargetEquip = rule.conditions?.isTargetEquip
    const isTargetCompanionEquip = rule.conditions?.isTargetCompanionEquip
    const canUnlock = rule.conditions?.canUnlock
    const canOpen = rule.conditions?.canOpen
    const canGiveMaxRewards = rule.conditions?.canGiveMaxRewards
    const suffix =
      stolen ??
      crafted ??
      bound ??
      reconstructed ??
      transmuted ??
      known ??
      canInspire ??
      canResearch ??
      canUnlock ??
      canOpen ??
      canGiveMaxRewards ??
      isTargetEquip ??
      isTargetCompanionEquip
    const key = suffix != null ? `${rule.categoryId}:${suffix}` : rule.categoryId
    if (!(key in destinations)) destinations[key] = rule.destination

    const traits = rule.conditions?.traits
    if (traits != null && traits.length > 0) {
      for (const traitId of traits) {
        const traitKey = `${rule.categoryId}:trait:${traitId}`
        if (!(traitKey in destinations)) destinations[traitKey] = rule.destination
      }
    }
  }
  return destinations
}
