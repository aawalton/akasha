import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"

const DAMAGE_BUFFS = new Set([
  "minor-berserk",
  "major-berserk",
  "minor-brutality",
  "major-brutality",
  "minor-sorcery",
  "major-sorcery",
  "light-attack-damage",
  "heavy-attack-damage",
  "next-attack-damage",
])

const PROTECTION_BUFFS = new Set([
  "minor-protection",
  "major-protection",
  "minor-resolve",
  "major-resolve",
  "flat-resistance",
  "flat-damage-reduction",
])

const HEALING_BUFFS = new Set([
  "minor-fortitude",
  "major-fortitude",
  "health-recovery",
  "healing-received",
])

const DAMAGE_DEBUFFS = new Set([
  "minor-vulnerability",
  "major-vulnerability",
  "minor-breach",
  "major-breach",
  "minor-fracture",
  "damage-taken-increase",
])

const PROTECTION_DEBUFFS = new Set(["minor-maim", "major-maim"])

const HEALING_DEBUFFS = new Set(["minor-defile", "major-defile"])

type EffectCategory = "damage" | "healing" | "protection" | "control" | "utility"

const CATEGORY_SORT_ORDER: Record<EffectCategory, number> = {
  damage: 0,
  healing: 1,
  protection: 2,
  control: 3,
  utility: 4,
}

function getEffectCategory(effect: CompanionEffect): EffectCategory {
  if (effect.type === "delayed") {
    return getEffectCategory(effect.effect)
  }

  switch (effect.type) {
    case "damage":
    case "dot":
    case "multi-hit":
    case "retaliation":
    case "player-trigger":
      return "damage"
    case "heal":
    case "hot":
    case "light-attack-heal":
      return "healing"
    case "shield":
      return "protection"
    case "apply-status":
      return "control"
    case "apply-buff": {
      const buffType = effect.buff.buff
      if (DAMAGE_BUFFS.has(buffType)) return "damage"
      if (PROTECTION_BUFFS.has(buffType)) return "protection"
      if (HEALING_BUFFS.has(buffType)) return "healing"
      return "utility"
    }
    case "apply-debuff": {
      const debuffType = effect.debuff.debuff
      if (DAMAGE_DEBUFFS.has(debuffType)) return "damage"
      if (PROTECTION_DEBUFFS.has(debuffType)) return "protection"
      if (HEALING_DEBUFFS.has(debuffType)) return "healing"
      return "utility"
    }
    case "passive":
    case "multi-heal":
    case "ultimate-generation":
    case "cooldown-reduction":
    case "special":
    case "synergy":
    case "periodic-trigger":
    case "resource-cost":
    case "armor-piece-scaling":
    case "cooldown":
    case "cast-time":
    case "channel":
      return "utility"
    default:
      assertNever(effect)
  }
}

export function sortEffectsByCategory<T extends CompanionEffect>(
  effects: readonly T[]
): readonly T[] {
  return [...effects].sort(
    (a, b) => CATEGORY_SORT_ORDER[getEffectCategory(a)] - CATEGORY_SORT_ORDER[getEffectCategory(b)]
  )
}
