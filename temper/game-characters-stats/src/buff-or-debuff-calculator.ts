import { type BuffOrDebuffSource, buffOrDebuff } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import { type BuffOrDebuffEffect } from "@akasha/temper-formula-framework/effect"
import { type EffectSource, isNamedSource } from "@akasha/temper-formula-framework/effect-source"
import { isBuffOrDebuffEffect } from "@akasha/temper-formula-framework/effect"

function getBuffOrDebuffId(effect: BuffOrDebuffEffect): string {
  return "buffId" in effect ? effect.buffId : effect.debuffId
}

export function calculateBuffs(sources: readonly EffectSource[]): readonly BuffOrDebuffSource[] {
  const buffSources: BuffOrDebuffSource[] = []

  for (const source of sources) {
    if (isNamedSource(source)) {
      buffSources.push(source)
    }
  }

  for (const source of sources) {
    if (isNamedSource(source)) {
      continue
    }

    for (const effect of source.effects) {
      if (isBuffOrDebuffEffect(effect)) {
        const buffId = getBuffOrDebuffId(effect)
        if (buffOrDebuff.has(buffId)) {
          buffSources.push(buffOrDebuff.data[buffId])
        }
      }
    }
  }

  const buffMap = new Map<string, BuffOrDebuffSource>()
  for (const buff of buffSources) {
    if (!buffMap.has(buff.id)) {
      buffMap.set(buff.id, buff)
    }
  }

  return Array.from(buffMap.values())
}
