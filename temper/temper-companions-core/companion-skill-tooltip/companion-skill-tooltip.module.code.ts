import type { Targeting } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import {
  computeAugmentedDurations,
  formatDuration,
  substituteDescriptionPlaceholders,
} from "../companion-description-utils/companion-description-utils.module.code.ts"
import { calculatePeriodicTooltipValue } from "../companion-periodic-formula/companion-periodic-formula.module.code.ts"
import type {
  CompanionDamageComponent,
  CompanionDelayedEffectComponent,
  CompanionDotComponent,
  CompanionEffect,
  CompanionHealComponent,
  CompanionHotComponent,
  CompanionMultiHitComponent,
  CompanionPeriodicTriggerComponent,
  CompanionPlayerTriggerComponent,
  CompanionRetaliationComponent,
  CompanionShieldComponent,
  CompanionSkillEffectComponent,
  CompanionSynergyComponent,
} from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import { evaluateSkillFormula } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import type { CompanionValueFormula } from "../companion-value-formula/companion-value-formula.module.code.ts"

type FormulaEffect =
  | CompanionDamageComponent
  | CompanionDotComponent
  | CompanionHealComponent
  | CompanionHotComponent
  | CompanionShieldComponent
  | CompanionMultiHitComponent
  | CompanionRetaliationComponent
  | CompanionPlayerTriggerComponent

function hasFormula(
  effect: CompanionEffect | CompanionSkillEffectComponent
): effect is FormulaEffect & { formula: CompanionValueFormula } {
  return "formula" in effect && effect.formula !== undefined
}

function isSynergyWithEffect(effect: CompanionEffect): effect is CompanionSynergyComponent {
  return effect.type === "synergy" && "effect" in effect
}

function isDelayedWithEffect(effect: CompanionEffect): effect is CompanionDelayedEffectComponent {
  return effect.type === "delayed" && "effect" in effect
}

function isPeriodicTriggerWithEffect(
  effect: CompanionEffect
): effect is CompanionPeriodicTriggerComponent {
  return effect.type === "periodic-trigger" && "effect" in effect
}

function getFormulaEffectsInOrder(effects: readonly CompanionEffect[]): readonly FormulaEffect[] {
  const result: FormulaEffect[] = []

  for (const effect of effects) {
    if (hasFormula(effect)) {
      result.push(effect)
    }

    if (isSynergyWithEffect(effect) && hasFormula(effect.effect)) {
      result.push(effect.effect)
    }
    if (isDelayedWithEffect(effect) && hasFormula(effect.effect)) {
      result.push(effect.effect)
    }
    if (isPeriodicTriggerWithEffect(effect) && hasFormula(effect.effect)) {
      result.push(effect.effect)
    }
  }

  return result
}

export function updateDescriptionWithCalculatedValues(
  description: string,
  effects: readonly CompanionEffect[],
  stats: CompanionFormulaStats | undefined
): string {
  const durations = computeAugmentedDurations(
    effects,
    stats?.buffDuration ?? 0,
    stats?.abilityCooldown
  )
  const formattedDurations = new Map<number, string>()
  for (const [slot, { value, truncate }] of durations) {
    formattedDurations.set(slot, formatDuration(value, truncate))
  }

  const formulaEffects = getFormulaEffectsInOrder(effects)
  const values = formulaEffects.map((effect) => {
    const value = calculateEffectValue(effect, stats)
    return value !== undefined ? Math.round(value).toLocaleString() : undefined
  })

  return substituteDescriptionPlaceholders(description, formattedDurations, values)
}

export function calculateEffectValue(
  effect: CompanionEffect,
  stats: CompanionFormulaStats | undefined
): number | undefined {
  if (!hasFormula(effect) || !stats) return undefined

  const formula = effect.formula

  switch (effect.type) {
    case "damage":
    case "multi-hit":
    case "retaliation":
    case "player-trigger":
      return evaluateSkillFormula(formula, stats, "damage")

    case "dot": {
      return calculatePeriodicTooltipValue(
        formula,
        stats,
        "damage",
        effect.duration,
        effect.tickInterval,
        effect.initialTick,
        effect.displayMode
      )
    }

    case "heal":
    case "shield":
      return evaluateSkillFormula(formula, stats, "heal")

    case "hot": {
      return calculatePeriodicTooltipValue(
        formula,
        stats,
        "heal",
        effect.duration,
        effect.tickInterval,
        effect.initialTick,
        effect.displayMode,
        undefined,
        effect.hdApplication
      )
    }

    default:
      return undefined
  }
}

export function extractPrimaryTargeting(effects: readonly CompanionEffect[]): Targeting | null {
  for (const effect of effects) {
    if ("target" in effect && effect.target) {
      return effect.target
    }
  }
  return null
}
