import { assertNever } from "../../../shared/utils-narrow/src/assert-never"
import type { PotionSource } from "@temper/game-items-alchemy/potions-source"
import type { BuffOrDebuffSource } from "@temper/shared-formula-framework/buff-or-debuff-source"
import type { BuffOrDebuffEffect } from "@temper/shared-formula-framework/effects-types"
import type { EffectSource } from "@temper/shared-formula-framework/effect-source"
import type { SkillSource } from "@temper/shared-formula-framework/skill-source"
import { getMetricDisplayName, metrics } from "./metrics/metrics.generated"
import { isBuffOrDebuffEffect, isMetricEffect, type MetricEffect } from "@temper/shared-formula-framework/effects-types"

function getBuffOrDebuffId(effect: BuffOrDebuffEffect): string {
  return "buffId" in effect ? effect.buffId : effect.debuffId
}

function isSkillSource(source: EffectSource): source is SkillSource {
  return source.categoryId === "skills"
}

function isPotionSource(source: EffectSource): source is PotionSource {
  return source.categoryId === "potions"
}

interface BuffEffectDetail {
  metricName: string
  effectType: string
  effectValue: string
}

interface BuffSourceDetail {
  sourceType: "skill" | "potion" | "set" | "other"
  sourceName: string
  sourceId: string
}

interface BuffExplanation {
  buffName: string
  description: string
  effects: readonly BuffEffectDetail[]
  sources: readonly BuffSourceDetail[]
}

function formatEffectValue(effect: MetricEffect): string {
  switch (effect.effectType) {
    case "fractional-change": {
      const pct = effect.effectValue * 100
      const sign = pct >= 0 ? "+" : ""
      const display = pct.toFixed(2).replace(/\.?0+$/, "")
      return `${sign}${display}%`
    }
    case "integer":
      return `+${Math.round(effect.effectValue).toLocaleString()}`
    case "number":
      return `+${effect.effectValue.toLocaleString()}`
    case "number-per-seconds": {
      const perSecond = effect.effectValue.value / effect.effectValue.seconds
      return `+${perSecond.toFixed(2)}/s`
    }
    case "number-for-seconds": {
      return `+${effect.effectValue.value} for ${effect.effectValue.seconds}s`
    }
    case "fractional-change-for-seconds": {
      const pct = effect.effectValue.value * 100
      const sign = pct >= 0 ? "+" : ""
      const display = pct.toFixed(2).replace(/\.?0+$/, "")
      return `${sign}${display}% for ${effect.effectValue.seconds}s`
    }
    case "conditional-chance": {
      return `${(effect.effectValue.chance * 100).toFixed(1)}% chance for ${effect.effectValue.value}`
    }
    default:
      assertNever(effect)
  }
}

function findBuffSources(
  buffId: string,
  allSources: readonly EffectSource[]
): readonly BuffSourceDetail[] {
  const sources: BuffSourceDetail[] = []

  for (const source of allSources) {
    if (isSkillSource(source)) {
      const buffEffects: BuffOrDebuffEffect[] = source.effects.filter(isBuffOrDebuffEffect)
      const hasBuff = buffEffects.some((b) => getBuffOrDebuffId(b) === buffId)

      if (hasBuff) {
        sources.push({
          sourceType: "skill",
          sourceName: source.skillName,
          sourceId: source.skillId,
        })
      }
    }

    if (isPotionSource(source)) {
      let hasBuff = false
      for (const effect of source.effects) {
        if (isBuffOrDebuffEffect(effect) && getBuffOrDebuffId(effect) === buffId) {
          hasBuff = true
          break
        }
      }

      if (hasBuff) {
        sources.push({
          sourceType: "potion",
          sourceName: source.name,
          sourceId: source.id,
        })
      }
    }
  }

  return sources
}

export function explainBuff(
  buff: BuffOrDebuffSource,
  allSources: readonly EffectSource[]
): BuffExplanation {
  const buffName = buff.name
  const description = buff.description

  const metricEffects: MetricEffect[] = buff.effects.filter(isMetricEffect)
  const effects: BuffEffectDetail[] = metricEffects.map((effect) => {
    return {
      metricName: metrics.has(effect.metricId)
        ? getMetricDisplayName(effect.metricId)
        : effect.metricId,
      effectType: effect.effectType,
      effectValue: formatEffectValue(effect),
    }
  })

  const sources = findBuffSources(buff.id, allSources)

  return {
    buffName,
    description,
    effects,
    sources,
  }
}
